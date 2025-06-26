"use client";
import { tinaField } from "tinacms/dist/react";
import { Section } from "../layout/section";
import Image from "next/image";

export const LetterBoxHowTo = ({ data }: { data: any }) => {
  const [first, ...rest] = (data?.title || "").split(" ");
  const secondPart = rest.join(" ");

  return (
    <Section background={data?.background}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Headline */}
        <h2
          data-tina-field={tinaField(data, "title")}
          className="text-center text-2xl sm:text-3xl font-extrabold mb-2"
        >
          <span className="text-white">{first} </span>
          <span className="bg-gradient-to-r from-[#34792C] to-[#67FF56] text-transparent bg-clip-text">
            {secondPart}
          </span>
        </h2>
        <p
          data-tina-field={tinaField(data, "subtitle")}
          className="text-center text-white/80 text-sm mb-10 max-w-2xl mx-auto"
        >
          {data.subtitle}
        </p>

        {/* 3-column layout */}
        <div className="grid gap-8 lg:grid-cols-3">

          {/* Column 1 – numbered items */}
      {/* Column 1 – numbered items, full height */}
<div className="flex flex-col h-full justify-between">
  {data.steps?.map((step: any, idx: number) => (
    <div
      key={idx}
      data-tina-field={tinaField(step, "label")}
      className={`flex items-center gap-3 p-3 rounded-md border ${
        idx === 0
          ? "border-[#67FF56]/70 bg-white/5 shadow-[0_0_10px_1px_rgba(103,255,86,0.4)]"
          : "border-white/10 bg-white/5"
      }`}
    >
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-[#1A1C23] text-white text-xs font-semibold border border-white/20">
        {idx + 1}
      </span>
      <p className="text-white text-sm font-medium">{step.label}</p>
    </div>
  ))}
</div>

          {/* Column 2 – description box */}
          <div
            data-tina-field={tinaField(data, "description")}
            className="rounded-xl bg-white/5 border border-white/10 p-6 text-white/80 text-sm leading-relaxed"
          >
            {data.description}
          </div>

          {/* Column 3 – image */}
         {/* Column 3 – image inside a dark card */}
<div className="flex justify-center lg:justify-end">
  <div className="rounded-2xl bg-white/5 border border-white/10 p-4 w-full">
    {data.image && (
      <Image
        src={data.image}
        alt="Letter box demo"
        width={260}
        height={260}
        className="rounded-lg object-contain"
      />
    )}
  </div>
</div>

        </div>
      </div>
    </Section>
  );
};

import type { Template } from "tinacms";

export const letterBoxHowToBlockSchema: Template = {
  name: "letterBoxHowTo",
  label: "How-To Letter Box",
  ui: {

    defaultItem: {
      title: "HOW TO USE THE LETTER BOX TOOL EFFECTIVELY?",
      subtitle: "The following are some steps to help you if you get tangled using our tool.",
      steps: [
        { label: "Input Your Letters:" },
        { label: "Auto-fill the Puzzle:" },
        { label: "Choose the Length:" },
        { label: "Get the Answer:" }
      ],
      description:
        "To get more filtered output, make sure you enter those gray letters in the “Enter Grey Letters” area. Our Wordle AI allows you to exclude up to 25 letters at a time.",
      image: "/illustrations/letter-box-demo.png"
    }
  },
  fields: [
    { type: "string", name: "title", label: "Title" },
    { type: "string", name: "subtitle", label: "Subtitle" },
    {
      type: "object",
      name: "steps",
      label: "Steps",
      list: true,
      ui: {
        itemProps: (item) => ({ label: item?.label })
      },
      fields: [
        { type: "string", name: "label", label: "Step Label" }
      ]
    },
    { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
    { type: "image", name: "image", label: "Demo Image" }
  ]
};
