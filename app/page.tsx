// app/page.tsx ----------------------------------------------
import client from '@/tina/__generated__/client';
import Layout from '@/components/layout/layout';
import ClientPage from './[...urlSegments]/client-page';
import { tinaHeadToMetadata } from '@/lib/seo';

export const revalidate = 60;
export const dynamic    = 'force-dynamic';

export async function generateMetadata() {
  const { data } = await client.queries.page({ relativePath: 'index.mdx' });
  return tinaHeadToMetadata(data.page.head);
}

export default async function Home() {
  const pageRes = await client.queries.page(
    { relativePath: 'index.mdx' },
    { fetchOptions: { next: { revalidate: 60 } } },
  );

  return (
    <Layout rawPageData={pageRes.data}>
      <ClientPage {...pageRes} />
    </Layout>
  );
}
