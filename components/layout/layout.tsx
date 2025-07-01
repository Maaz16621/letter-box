/* Layout.tsx */
import React, { PropsWithChildren } from "react";
import { LayoutProvider } from "./layout-context";
import client from "../../tina/__generated__/client";
import { Header } from "./nav/header";
import { Footer } from "./nav/footer";
import SmoothScroll from "../SmoothScroll";

type LayoutProps = PropsWithChildren & { rawPageData?: any };

export default async function Layout({ children, rawPageData }: LayoutProps) {
  const { data: globalData } = await client.queries.global(
    { relativePath: "index.json" },
    { fetchOptions: { next: { revalidate: 60 } } }
  );

  return (
    <LayoutProvider globalSettings={globalData.global} pageData={rawPageData}>
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <SmoothScroll />
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </div>
    </LayoutProvider>
  );
}
