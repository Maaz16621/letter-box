"use client";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { Section } from "../layout/section";

export const TextSection = ({ data }: { data: any }) => {
  const [firstWord, ...restWords] = (data?.heading || "").split(" ");
  const secondPart = restWords.join(" ");

  return (
 <Section background={data?.background}>
  <div className="w-full max-w-6xl mx-auto px-4 text-center">
    <h2
      className="text-3xl font-bold"
      data-tina-field={tinaField(data, "heading")}
    >
      <span className="text-white">{firstWord} </span>
      <span className="bg-gradient-to-r from-[#34792C] to-[#67FF56] text-transparent bg-clip-text">
        {secondPart}
      </span>
    </h2>

    <div
      className="prose prose-invert mt-4 mx-auto text-white/80 max-w-none text-left"
      data-tina-field={tinaField(data, "subtext")}
    >
      <TinaMarkdown content={data.subtext} />
    </div>
  </div>
</Section>

  );
};
import type { Template } from "tinacms";
export const textSectionBlockSchema: Template = {
  name: "textSection",
  label: "Text Section",
  ui: {
    previewSrc: "/blocks/text-section.png",
    defaultItem: {
      heading: "Our Features",
      subtext: {
        type: "root",
        children: [
          {
            type: "p",
            children: [
              {
                text: "This section uses Tina's built-in rich text editor to support bold, links, and more.",
              },
            ],
          },
        ],
      },
    },
  },
  fields: [
    {
      type: "string",
      name: "heading",
      label: "Heading",
    },
   {
  type: "rich-text",
  name: "subtext",
  label: "Subtext",
  templates: [
    {
      name: "callout",
      label: "Callout",
      fields: [
        {
          type: "string",
          name: "text",
          label: "Text",
        },
        {
          type: "string",
          name: "style",
          label: "Style",
          options: ["info", "warning", "success"],
        },
      ],
    },
    {
      name: "bullet_list",
      label: "Bullet List",
      fields: [
        {
          type: "string",
          name: "items",
          label: "List Item",
          list: true,
        },
      ],
    },
  ],
},
  ],
};
