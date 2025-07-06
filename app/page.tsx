import client from '@/tina/__generated__/client';
import Layout from '@/components/layout/layout';
import ClientPage from './[...urlSegments]/client-page';
import type { Metadata } from 'next';

export const revalidate = 60;
export const dynamic = 'force-dynamic';

/** Accepts Tina head OR null → Next.js Metadata */
export function tinaHeadToMetadata(
  head: {
    title?: string | null;
    description?: string | null;
    canonical?: string | null;
    keywords?: string | null;
    noindex?: boolean | null;
    ogImage?: { src?: string } | string | null;
    twitterCard?: string | null;
  } | null
): Metadata {
  if (!head) return {};

  /* ── Twitter‑card must be a literal union ───────── */
  const validTC = ['summary', 'summary_large_image', 'player', 'app'] as const;
  type Card = (typeof validTC)[number];
  const card = validTC.includes(head.twitterCard as Card)
    ? (head.twitterCard as Card)
    : undefined;

  return {
    title:       head.title ?? undefined,
    description: head.description ?? undefined,
    keywords:    head.keywords ?? undefined,

    alternates: head.canonical
      ? { canonical: head.canonical }
      : undefined,

    robots: head.noindex ? { index: false, follow: false } : undefined,

    openGraph: head.title
      ? {
          title:       head.title,
          description: head.description ?? undefined,
          images: head.ogImage
            ? [
                typeof head.ogImage === 'string'
                  ? { url: head.ogImage, width: 1200, height: 630 }
                  : { url: head.ogImage?.src ?? '', width: 1200, height: 630 },
              ]
            : undefined,
        }
      : undefined,

    twitter: card
      ? {
          card,
          title: head.title ?? undefined,
          description: head.description ?? undefined,
          images: head.ogImage
            ? [
                typeof head.ogImage === 'string'
                  ? head.ogImage
                  : head.ogImage?.src ?? '',
              ]
            : undefined,
        }
      : undefined,
  };
}


// Dynamically generate metadata from Tina CMS
export async function generateMetadata(): Promise<Metadata> {
  const { data } = await client.queries.page({
    relativePath: 'index.mdx',
  });

  /* head may be undefined → coerce to null */
  return tinaHeadToMetadata(data.page?.head ?? null);
}

// Main page component
export default async function Home() {
  const pageRes = await client.queries.page(
    { relativePath: 'index.mdx' },
    { fetchOptions: { next: { revalidate: 60 } } },
  );

  return (
    <Layout rawPageData={pageRes.data}>
      {/* spread the whole result – now types line up */}
      <ClientPage {...pageRes} />
    </Layout>
  );
}
