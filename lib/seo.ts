// lib/seo.ts -------------------------------------------------
import type { Metadata } from 'next';
import type { PageHead } from '@/tina/__generated__/types';

/** converts the Tina “head” object to Next.js Metadata */
export function tinaHeadToMetadata(head: PageHead | null | undefined): Metadata {
  if (!head) return {};

  const {
    title,
    description,
    keywords,
    canonical,
    noindex,
    ogImage,
    twitterCard,
    extra, // ignored by Metadata – you’ll add it manually in <Layout />
  } = head;

  return {
    title:       title ?? undefined,
    description: description ?? undefined,
    keywords:    keywords ?? undefined,
    alternates:  canonical ? { canonical } : undefined,
    robots:      noindex ? { index: false, follow: true } : undefined,
    openGraph:   ogImage ? { images: [{ url: ogImage }] } : undefined,
    twitter:     twitterCard || ogImage
      ? {
          card:  (twitterCard as any) ?? 'summary_large_image',
          images: ogImage ? [ogImage] : undefined,
        }
      : undefined,
  };
}
