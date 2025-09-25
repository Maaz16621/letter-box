"use client";
import { tinaField } from "tinacms/dist/react";
import { Section } from "../layout/section";
import Image from "next/image";
import CurveImage from "@/public/curve-path.png";
import React, { useEffect, useState } from "react";

export const WorkingMechanism = ({ data }: { data: any }) => {
  const [firstWord, ...restWords] = (data?.title || "").split(" ");
  const secondPart = restWords.join(" ");

  return (
    <Section background={data?.background}>
      <div className="relative mx-auto max-w-7xl overflow-visible px-4 sm:px-6 lg:px-8">

        <h2
          data-tina-field={tinaField(data, "title")}
          className="mb-2 text-center text-3xl font-bold"
        >
          <span className="text-white">{firstWord} </span>
          <span className="bg-gradient-to-r from-[#34792C] to-[#67FF56] bg-clip-text text-transparent">
            {secondPart}
          </span>
        </h2>
        <p
          data-tina-field={tinaField(data, "description")}
          className="mx-auto mb-10 max-w-xl text-center text-sm text-white/80"
        >
          {data.description}
        </p>

        <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 lg:block hidden">
          <Image
            src={CurveImage}
            alt="Line path"
            width={1320}
            height={148}
            className="h-auto w-full"
            priority
          />
        </div>

        <div
          className="
            grid auto-rows-fr
            grid-cols-1 gap-10
            sm:grid-cols-2
          "
        >
          {data.steps?.map((step: any, index: number) => {
            return (
              <div
                key={index}
                data-tina-field={tinaField(step, "heading")}
                className="flex flex-col items-center text-center"
              >
                <div
                  className="
                    flex aspect-square min-w-[110px] min-h-[110px]
                    sm:min-w-[120px] sm:min-h-[120px]
                    flex-col items-center justify-center rounded-xl
                    border border-white/10 bg-white/5 p-4 transition
                    hover:border-[#67FF56] hover:shadow-lg hover:shadow-[#67FF56]/30
                  "
                >
                  {step.icon && (
                    <img
                      src={step.icon}
                      alt={step.heading}
                      className="mb-2 h-8 w-8 object-contain"
                    />
                  )}
                </div>
                <h3 className="mt-2 text-sm font-semibold text-white">
                  {step.heading}
                </h3>
                <p className="mt-1 text-xs text-white/70">{step.subtext}</p>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
};



import type { Template } from "tinacms";

export const workingMechanismBlockSchema: Template = {
  name: "workingMechanism",
  label: "Working Mechanism",
  ui: {
    previewSrc: "/blocks/working-mechanism.png",
    defaultItem: {
      title: "WORKING MECHANISM",
      description:
        "Below is a visual representation of how our Wordle AI works to discover answers for Wordle and other 5-letter word games:",
      steps: [
        {
          heading: "Update Input Values",
          subtext: "Takes user input and initiates analysis.",
          icon: "/icons/chat.svg",
        },
        {
          heading: "Update Constraints",
          subtext: "Narrows down the search space using rules.",
          icon: "/icons/constraints.svg",
        },
        {
          heading: "Parse the Feedback",
          subtext: "Processes feedback to adapt strategy.",
          icon: "/icons/parse.svg",
        },
        {
          heading: "Filter Possible Words",
          subtext: "Eliminates invalid words from dictionary.",
          icon: "/icons/filter.svg",
        },
        {
          heading: "Select next best Guess",
          subtext: "Uses logic and AI to choose next word.",
          icon: "/icons/guess.svg",
        },
        {
          heading: "Generate Output",
          subtext: "Presents the most accurate solution.",
          icon: "/icons/output.svg",
        },
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
      type: "object" ,
      name: "steps",
      label: "Steps",
      list: true,
      ui: {
        itemProps: (item) => ({
          label: item?.heading,
        }),
      },
      fields: [
        {
          type: "string",
          name: "heading",
          label: "Step Heading",
        },
        {
          type: "string",
          name: "subtext",
          label: "Subtext",
        },
        {
          type: "image",
          name: "icon",
          label: "Icon (SVG or PNG)",
        },
      ],
    },
  ],
};
