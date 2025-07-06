"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLayout } from "../layout-context";

/* ───────────────────────────────────────── */

export const Header = () => {
  const { globalSettings } = useLayout();
  const header = globalSettings!.header!;

  const [open, setOpen] = useState(false);
  const [angle, setAngle] = useState(0);        // rotation for SVG

  /* mobile‑only toggle */
  const toggle = () => {
    // only run on < md (Tailwind's default 768 px)
    if (window.innerWidth >= 768) return;
    setOpen(!open);
    setAngle((deg) => deg + 90);
  };

  return (
    <>
      {/* dark overlay – mobile only */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/60 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <header className="absolute z-40 top-8 left-1/2 -translate-x-1/2 w-[80vw]">
        <nav className="relative border rounded-lg border-white/30 shadow-lg">
          {/* glassy background */}
          <div aria-hidden className="absolute inset-0 rounded-lg bg-white/10" />

          {/* ─────── Top bar ─────── */}
          <div className="relative flex items-center justify-between px-2">
            {/* SVG icon – visible everywhere, clickable only on mobile */}
            <button
              onClick={toggle}
              aria-label="Toggle menu"
              className="p-2 md:pointer-events-none"
            >
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  transform: `rotate(${angle}deg)`,
                  transition: "transform .3s ease",
                }}
              >
                <rect width="28.8" height="21.333" rx="6" fill="#67FF56" />
                <rect x="19.2" y="26.667" width="28.8" height="21.333" rx="6" fill="#67FF56" />
                <rect x="33.6" width="14.4" height="21.333" rx="6" fill="#34792C" />
                <rect y="26.667" width="14.4" height="21.333" rx="6" fill="#34792C" />
              </svg>
            </button>

            {/* centred logo */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <Link href="/" aria-label="Go home" className="flex flex-col items-center space-y-1">
                <img
                  src={header.logoImage ?? undefined}
                  alt={header.logoText ?? "Logo"}
                  className="h-8 w-auto select-none pointer-events-none"
                />
                <span
                  className="font-bold pointer-events-none select-none text-xs xs:text-sm"
                  style={{ color: header.color ?? "#000" }}
                >
                  {header.logoText ?? "Logo"}
                </span>
              </Link>
            </div>

            {/* CTA button – hidden on mobile */}
            {header.buttonText && header.buttonLink && (
              <div className="ml-auto hidden md:block">
                <Link
                  href={header.buttonLink}
                  className="inline-block rounded-lg px-5 py-2 text-sm font-semibold transition-colors"
                  style={{ backgroundColor: header.buttonColor ?? undefined, color: "#fff" }}
                >
                  {header.buttonText}
                </Link>
              </div>
            )}
          </div>

          {/* ─────── Mobile menu ─────── */}
          <div
            className={`md:hidden transition-all duration-300 ${
              open ? "max-h-96 opacity-100 py-4" : "max-h-0 opacity-0 overflow-hidden"
            }`}
          >
            <ul className="space-y-4 px-4">
              {header.nav!.filter(Boolean).map((item, i) => (
                <li key={i}>
                  <Link
                    href={item!.href ?? "#"}
                    className="block text-muted-foreground hover:text-white duration-150"
                    onClick={() => setOpen(false)}
                  >
                    {item!.label ?? "No label"}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
};
