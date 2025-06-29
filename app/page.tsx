// app/page.tsx (or /app/page.js)
import client from '@/tina/__generated__/client';
import Layout from '@/components/layout/layout';
import ClientPage from './[...urlSegments]/client-page';

// keep the route-level revalidate if you want
export const revalidate = 60;          // Page is eligible for ISR

// ⬇️ Force dynamic render OR remove this line and rely on ISR — your choice
export const dynamic = 'force-dynamic';

export default async function Home() {
  const data = await client.queries.page(
    { relativePath: 'index.mdx' },
    {
      fetchOptions: {
        next: {
          revalidate: 60,              // same freshness as the rest
          // use 0 or 'no-store' if you want *instant* updates
        },
      },
    },
  );

  return (
    <Layout rawPageData={data}>
      <ClientPage {...data} />
    </Layout>
  );
}
