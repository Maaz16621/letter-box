"use client";

import React from "react";
import Link from "next/link";
import { useLayout } from "../layout-context";
import { Menu, X } from "lucide-react";

export const Header = () => {
  const { globalSettings } = useLayout();
  const header = globalSettings!.header!;

  const [menuState, setMenuState] = React.useState(false);

  return (
    <header>
      <nav
        data-state={menuState && "active"}
        className="bg-background/50 absolute z-20 top-[30px] left-1/2 transform -translate-x-1/2 border-b backdrop-blur-3xl
          w-full max-w-full
          md:max-w-[80vw]"
      >
        <div className="mx-auto px-6">
          <div className="flex items-center justify-between py-3">
            {/* Hamburger always visible on mobile */}
            <button
              onClick={() => setMenuState(!menuState)}
              aria-label={menuState ? "Close Menu" : "Open Menu"}
              className="block  p-2"
            >
              {menuState ? (
                <X className="w-6 h-6" />
              ) : (
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="28.7996" height="21.333" rx="6" fill="#67FF56"/>
<rect x="19.1992" y="26.6663" width="28.7996" height="21.333" rx="6" fill="#67FF56"/>
<rect x="33.6006" width="14.3998" height="21.333" rx="6" fill="#34792C"/>
<rect y="26.6663" width="14.3998" height="21.333" rx="6" fill="#34792C"/>
</svg>

              )}
            </button>

            {/* Logo center */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <Link
                href="/"
                aria-label="home"
                className="flex items-center space-x-2 pointer-events-auto"
              >
                {header.logoType === "image" && header.logoImage ? (
                  <img
                    src={header.logoImage}
                    alt={header.logoText || "Logo"}
                    className="h-8 w-auto"
                  />
                ) : (
                  <span
                    className={`font-bold text-lg ${
                      header.color === "primary" ? "text-blue-600" : "text-black"
                    }`}
                  >
                    {header.logoText || "My Logo"}
                  </span>
                )}
              </Link>
            </div>

            {/* Button right */}
            <div className="ml-auto">
              {header.buttonText && header.buttonLink && (
                <Link
                  href={header.buttonLink}
                  className={`inline-block rounded-lg px-5 py-2 text-sm font-semibold transition-colors ${
                    header.buttonColor === "primary"
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : header.buttonColor === "secondary"
                      ? "bg-gray-600 text-white hover:bg-gray-700"
                      : "bg-gray-200 text-black hover:bg-gray-300"
                  }`}
                >
                  {header.buttonText}
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Mobile menu (toggle) */}
        <div
          className={`lg:hidden ${
            menuState ? "block" : "hidden"
          } bg-background border rounded p-4 mt-2`}
        >
          <ul className="space-y-4">
            {header.nav!.filter(Boolean).map((item, index) => (
              <li key={index}>
                <Link
                  href={item!.href ?? "#"}
                  className="text-muted-foreground hover:text-accent-foreground block duration-150"
                >
                  <span>{item!.label ?? "No Label"}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};
