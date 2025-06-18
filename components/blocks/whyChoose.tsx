"use client";
import { tinaField } from "tinacms/dist/react";
import { Section } from "../layout/section";
import React from "react";

export const WhyChoose = ({ data }: { data: any }) => {
  const [firstWord, secondWord, ...rest] = (data?.title || "").split(" ");
  const lastPart = rest.join(" ");

  return (
    <Section background={data?.background}>
      <div
  className="absolute left-1/2 translate-x-[-50%] translate-y-[10%] w-[350px] h-[350px] bg-[#56FF78]/20 rounded-full blur-3xl z-[-1]"
></div>
      <div className="  mx-auto text-white">
        <h2 className="text-center text-3xl font-bold mb-2" data-tina-field={tinaField(data, "title")}>
          <span className="text-[#67FF56]">{firstWord} </span>
          <span className="text-white">{secondWord} </span>
          <span className="bg-gradient-to-r from-[#34792C] to-[#67FF56] text-transparent bg-clip-text">
            {lastPart}
          </span>
        </h2>
        <p className="text-center text-white/80 text-sm mb-8" data-tina-field={tinaField(data, "description")}>
          {data.description}
        </p>

        <div className="flex flex-col md:flex-row gap-10 justify-between items-start">
          {/* Left List */}
       <ul className="space-y-4 w-full md:w-1/2">
  {data.listItems?.map((item: any, index: number) => (
    <li key={index} className="flex items-start gap-3 text-sm" data-tina-field={tinaField(item, "text")}>
      {/* Add your static icon here if needed */}
      <span className="shrink-0 mt-1">
        {/* Inline your SVG icon here */}
        <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="5.10149" height="5.10149" rx="1" fill="url(#paint0_linear_423_68)" />
          <rect x="0.0517578" y="5.89464" width="5.10149" height="5.10149" rx="1" fill="url(#paint1_linear_423_68)" />
          <rect x="6.29785" y="0.00386047" width="5.10149" height="5.10149" rx="1" fill="url(#paint2_linear_423_68)" />
          <rect x="6.34961" y="5.89851" width="5.10149" height="5.10149" rx="1" fill="url(#paint3_linear_423_68)" />
          <defs>
            <linearGradient id="paint0_linear_423_68" x1="2.55075" y1="0" x2="2.55075" y2="5.10149" gradientUnits="userSpaceOnUse">
              <stop stopColor="#67FF56" />
              <stop offset="1" stopColor="#34792C" />
            </linearGradient>
            <linearGradient id="paint1_linear_423_68" x1="2.6025" y1="5.89464" x2="2.6025" y2="10.9961" gradientUnits="userSpaceOnUse">
              <stop stopColor="#67FF56" />
              <stop offset="1" stopColor="#34792C" />
            </linearGradient>
            <linearGradient id="paint2_linear_423_68" x1="8.8486" y1="0.00386047" x2="8.8486" y2="5.10535" gradientUnits="userSpaceOnUse">
              <stop stopColor="#67FF56" />
              <stop offset="1" stopColor="#34792C" />
            </linearGradient>
            <linearGradient id="paint3_linear_423_68" x1="8.90036" y1="5.89851" x2="8.90036" y2="11" gradientUnits="userSpaceOnUse">
              <stop stopColor="#67FF56" />
              <stop offset="1" stopColor="#34792C" />
            </linearGradient>
          </defs>
        </svg>
      </span>
      <span>{item.text}</span>
    </li>
  ))}
</ul>

<div className="w-full md:w-1/2 bg-[#1F3723] p-2 rounded-xl grid grid-cols-[2fr_4fr] gap-x-2 gap-y-3">
  {data.tableItems?.map((item: any, index: number) => (
    <React.Fragment key={index}>
      <div className="bg-white text-black px-4 py-2 rounded-lg text-sm font-medium text-center">
        {item.label}
      </div>
      <div className="bg-white text-black px-4 py-2 rounded-lg text-sm text-center">
        {item.value}
      </div>
    </React.Fragment>
  ))}
</div>




        </div>
      </div>
    </Section>
  );
};
// whyChooseBlockSchema.ts
import type { Template } from "tinacms";


export const whyChooseBlockSchema: Template = {
  name: "whyChoose",
  label: "Why Choose",
  ui: {
    previewSrc: "/blocks/whyChoose.png",
    defaultItem: {
      title: "Why Choose Us",
      description: "Here are some reasons why our service stands out.",
      listItems: [
        { text: "Expert support available 24/7" },
        { text: "Proven track record with satisfied clients" },
        { text: "Customizable solutions tailored to your needs" },
      ],
      tableItems: [
        { label: "Clients Served", value: "5,000+" },
        { label: "Years of Experience", value: "10+" },
        { label: "Response Time", value: "< 5 min" },
        { label: "Satisfaction", value: "99%" },
      ],
    },
  },
  fields: [
    {
      type: "string",
      name: "title",
      label: "Title",
    },
    {
      type: "string",
      name: "description",
      label: "Description",
    },
    {
      type: "object",
      name: "listItems",
      label: "List Items",
      list: true,
      fields: [
        { type: "string", name: "text", label: "Text" },
      ],
    },
    {
      type: "object",
      name: "tableItems",
      label: "Table Items",
      list: true,
      fields: [
        { type: "string", name: "label", label: "Label" },
        { type: "string", name: "value", label: "Value" },
      ],
    },
  ],
};

