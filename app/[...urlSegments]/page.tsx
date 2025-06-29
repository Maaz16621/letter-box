import { notFound } from 'next/navigation';
import client from '@/tina/__generated__/client';
import Layout from '@/components/layout/layout';
import { Section } from '@/components/layout/section';
import ClientPage from './client-page';

/**
 * Ensures the page is dynamically rendered on the server for each request.
 * This is crucial for fetching the latest data from TinaCMS.
 */
export const dynamic = 'force-dynamic';

export default async function Page({
  params,
}: {
  params: Promise<{ urlSegments: string[] }>;
}) {
  const resolvedParams = await params;
  const filepath = resolvedParams.urlSegments.join('/');

  let data;
  try {
    // Fetch data from TinaCMS.
    // The 'fetchOptions' are added here to control Next.js's caching behavior.
    // 'revalidate: 60' tells Next.js to re-fetch this data from Tina Cloud
    // at most every 60 seconds. This is a good balance between freshness
    // and performance. You can adjust this value based on how frequently
    // your content changes and how quickly you need updates to appear.
    data = await client.queries.page(
      {
        relativePath: `${filepath}.mdx`,
      },
      {
        fetchOptions: {
          next: {
            revalidate: 60, // Revalidate data every 60 seconds
            // You can also use 'no-store' to always fetch the latest data,
            // but this might impact performance for frequently accessed pages.
            // For most CMS content, 'revalidate' is preferred.
            // revalidate: 0, // Set to 0 to always revalidate on every request (equivalent to no-store for this fetch)
          },
        },
      }
    );
  } catch (error) {
    console.error(`Error fetching page data for ${filepath}:`, error);
    notFound();
  }

  return (
    <Layout rawPageData={data}>
      <Section>
        <ClientPage {...data} />
      </Section>
    </Layout>
  );
}

export async function generateStaticParams() {
  let pages = await client.queries.pageConnection();
  const allPages = pages;

  if (!allPages.data.pageConnection.edges) {
    return [];
  }

  while (pages.data.pageConnection.pageInfo.hasNextPage) {
    pages = await client.queries.pageConnection({
      after: pages.data.pageConnection.pageInfo.endCursor,
    });

    if (!pages.data.pageConnection.edges) {
      break;
    }

    allPages.data.pageConnection.edges.push(...pages.data.pageConnection.edges);
  }

  const params = allPages.data?.pageConnection.edges
    .map((edge) => ({
      urlSegments: edge?.node?._sys.breadcrumbs || [],
    }))
    .filter((x) => x.urlSegments.length >= 1)
    .filter((x) => !x.urlSegments.every((x) => x === 'index')); // exclude the home page

  return params;
}
