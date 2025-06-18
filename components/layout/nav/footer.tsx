"use client";
import React from "react";
import Link from "next/link";
import { Icon } from "../../icon";
import { useLayout } from "../layout-context";

export const Footer = () => {
  const { globalSettings } = useLayout();
  const { header, footer } = globalSettings!;

  const pages = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "FAQ", href: "/faq" },
  ];

  return (
    <footer className="pt-20 px-6 text-white bg-transparent">
      <div className="max-w-5xl mx-auto px-6 text-center ">
        {/* Logo & Text */}
        <Link href="/" aria-label="Go home" className="inline-flex flex-col items-center mb-4">
          {header?.logoImage && (
            <img
              src={header.logoImage}
              alt={header.logoText ?? "Logo"}
              className="h-10 w-auto mb-1"
            />
          )}
          <span className="text-lg font-semibold">{header?.logoText}</span>
        </Link>

        {/* Subtext */}
        <p className="text-sm text-white/60 mb-6">{footer?.subtext}</p>

        {/* Social Icons */}
        <div className="flex justify-center gap-5 flex-wrap mb-10">
          {footer?.social?.map((link, index) => (
            <Link
              key={`${link?.icon?.name}-${index}`}
              href={link?.url ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon
                data={{ ...link!.icon, size: "small" }}
                className="w-4 h-4 text-white hover:text-[#67FF56] transition-colors duration-200"
              />
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom box section */}
       {/* Bottom box section */}
      <div className="bg-white/10 backdrop-blur-md border border-white/20  max-w-[1400px] mx-auto py-4 text-sm my-4 rounded-lg">
        <div className="mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Left - Rights */}
          <div className="text-white/50 text-center md:text-left">
            © {new Date().getFullYear()} {header?.logoText}. All rights reserved.
          </div>

          {/* Right - Page links */}
          <div className="flex flex-wrap justify-center md:justify-end gap-4">
            {pages.map((page, index) => (
              <Link
                key={index}
                href={page.href}
                className="text-white/70 hover:text-[#67FF56] transition"
              >
                {page.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Stylized title at the very end */}
<h2
  className="text-[6.1vw] font-extrabold text-transparent stroke-white text-center"
  style={{
    fontFamily: 'Ubuntu, sans-serif',
    transform: 'scaleY(1.3)', // adjust this value as needed
    transformOrigin: 'center',
  }}
>
  <span
    className="text-transparent"
    style={{
      WebkitTextStroke: '1.5px white',
      color: 'transparent',
    }}
  >
    LETTER BOXED SOLVER
  </span>
</h2>





    </footer>
  );
};
