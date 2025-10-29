// app/page.tsx ----------------------------------------------
import client from '@/tina/__generated__/client';
import Layout from '@/components/layout/layout';
import ClientPage from './[...urlSegments]/client-page';
import { tinaHeadToMetadata } from '@/lib/seo';

export const revalidate = 60;
export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  const { data } = await client.queries.page({ relativePath: 'index.mdx' });
  const baseMetadata = tinaHeadToMetadata(data.page.head);

  // Add Google site verification meta tag
  return {
    ...baseMetadata,
    verification: {
      google: 'rmSa4IB2G2yvHBt6kj7PyJUmoWJmND7Hzxm8kKWk4oA',
    },
  };
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
