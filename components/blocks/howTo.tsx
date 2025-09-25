
/* LetterBoxHowTo.tsx */
"use client";
import { tinaField } from "tinacms/dist/react";
import { Section } from "../layout/section";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
gsap.registerPlugin(ScrollTrigger);

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export const LetterBoxHowTo = ({ data }: { data: any }) => {
  const [first, ...rest] = (data?.title || "").split(" ");
  const secondPart = rest.join(" ");

  const totalSteps = data.steps?.length || 0;
  const [active, setActive] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const pinRef = useRef<HTMLDivElement>(null);

  // Scroll to a specific step (desktop only)
  const scrollToStep = (idx: number) => {
    if (!pinRef.current || isMobile) return;
    const st = ScrollTrigger.getById("howto-scroll");
    if (st) {
      const start = st.start;
      const end = st.end;
      const targetScroll = start + ((end - start) * (idx / (totalSteps - 1)));
      gsap.to(window, { scrollTo: targetScroll, duration: 0.7, ease: "power2.inOut" });
    }
  };

  /* toggle mobile */
  useEffect(() => {
    const resize = () => setIsMobile(window.innerWidth < 768);
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    if (isMobile || !pinRef.current || totalSteps < 2) return;

    const st = ScrollTrigger.create({
      id: "howto-scroll",
      trigger: pinRef.current,
      start: "center center",
      end: `+=${window.innerHeight * (totalSteps - 1)}`,
      pin: true,
      scrub: true,
      snap: { snapTo: 1 / (totalSteps - 1), duration: 0.25 },
      onUpdate: ({ progress }) =>
        setActive(Math.round(progress * (totalSteps - 1))),
    });

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("resize", refresh);
    return () => {
      st.kill();
      window.removeEventListener("resize", refresh);
    };
  }, [isMobile, totalSteps]);

  const current = data.steps?.[active] || {};

 return (
  <Section background={data?.background}>
    <div ref={pinRef} className="relative flex items-center justify-center ">
      {/* ⬇️ Spotlights */}
 
        <div className="absolute top-1/4 right-0 w-72 h-72 bg-[#67FF56]/20 rounded-full blur-3xl md:w-96 md:h-96 z-10" />
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-[#67FF56]/15 rounded-full blur-3xl md:w-96 md:h-96 z-10" />
      

      {/* ⬇️ Main content */}
      <div className="relative z-10 mx-auto w-full max-w-9xl px-4 sm:px-6 lg:px-8">
        <h2
          data-tina-field={tinaField(data, "title")}
          className="mb-2 text-center text-2xl font-extrabold sm:text-3xl"
        >
          <span className="text-white">{first} </span>
          <span className="bg-gradient-to-r from-[#34792C] to-[#67FF56] bg-clip-text text-transparent">
            {secondPart}
          </span>
        </h2>

        <p
          data-tina-field={tinaField(data, "subtitle")}
          className="mx-auto mb-10 max-w-2xl text-center text-sm text-white/80"
        >
          {data.subtitle}
        </p>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Steps */}
          <div className="flex flex-col gap-3">
            {data.steps?.map((step: any, idx: number) => {
              const clickProps = isMobile
                ? { onClick: () => setActive(idx) }
                : { onClick: () => scrollToStep(idx) };
              return (
                <div
                  key={idx}
                  {...clickProps}
                  data-tina-field={tinaField(step, "label")}
                  className={`flex cursor-pointer items-center gap-3 rounded-md border p-3 transition
                    ${
                      idx === active
                        ? "border-[#67FF56]/70 bg-white/5 shadow-[0_0_10px_rgba(103,255,86,0.4)]"
                        : "border-white/10 bg-white/5 hover:border-[#67FF56]/50"
                    }`}
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded bg-[#1A1C23] text-xs font-semibold text-white border border-white/20">
                    {idx + 1}
                  </span>
                  <p className="text-sm font-medium text-white">{step.label}</p>
                </div>
              );
            })}
          </div>

          {/* Description */}
          <div className="rounded-xl bg-white/5 border border-white/10 p-6 text-sm leading-relaxed text-white/80">
            {current.label && (
              <h3 className="mb-2 text-base font-semibold text-white">
                {current.label}
              </h3>
            )}
            {current.text}
          </div>

          {/* Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full rounded-2xl bg-white/5 border border-white/10 p-4 flex items-center justify-center">
              {current.image && (
                <Image
                  src={current.image}
                  alt={current.label || "Step image"}
                  width={280}
                  height={280}
                  className="h-auto w-full rounded-lg object-contain"
                  priority
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  </Section>
);

};


/* letterBoxHowToBlockSchema.ts */
import type { Template } from "tinacms";

export const letterBoxHowToBlockSchema: Template = {
  name: "letterBoxHowTo",
  label: "How‑To Letter Box",
  ui: {
    defaultItem: {
      title: "HOW TO USE THE LETTER BOX TOOL EFFECTIVELY?",
      subtitle:
        "The following steps will guide you if you get tangled using our tool.",
      steps: [
        {
          label: "Input Your Letters",
          text: "Enter the four sets of letters exactly as they appear in the puzzle.",
          image: "/illustrations/step‑1.png",
        },
        {
          label: "Auto‑fill the Puzzle",
          text: "Click Auto‑Fill to let our solver populate possible paths.",
          image: "/illustrations/step‑2.png",
        },
        {
          label: "Choose the Length",
          text: "Select the desired word length for more accurate filtering.",
          image: "/illustrations/step‑3.png",
        },
        {
          label: "Get the Answer",
          text: "Hit Solve and your optimal path will appear instantly.",
          image: "/illustrations/step‑4.png",
        },
      ],
    },
  },
  fields: [
    { type: "string", name: "title", label: "Title" },
    { type: "string", name: "subtitle", label: "Subtitle" },
    {
      type: "object",
      name: "steps",
      label: "Steps",
      list: true,
      ui: { itemProps: (item) => ({ label: item?.label }) },
      fields: [
        { type: "string", name: "label", label: "Step Label" },
        {
          type: "string",
          name: "text",
          label: "Step Text",
          ui: { component: "textarea" },
        },
        { type: "image", name: "image", label: "Step Image" },
      ],
    },
  ],
};
