"use client";
import { tinaField } from "tinacms/dist/react";
import { Section } from "../layout/section";
import Image from "next/image";
import CurveImage from "@/public/curve-path.png";

export const WorkingMechanism = ({ data }: { data: any }) => {
  const [firstWord, ...restWords] = (data?.title || "").split(" ");
  const secondPart = restWords.join(" ");

  return (
    <Section background={data?.background}>
      <div className="mx-auto max-w-7xl relative px-4 sm:px-6 lg:px-8">

        {/* Title */}
        <h2
          data-tina-field={tinaField(data, "title")}
          className="text-3xl text-center font-bold mb-2"
        >
          <span className="text-white">{firstWord} </span>
          <span className="bg-gradient-to-r from-[#34792C] to-[#67FF56] text-transparent bg-clip-text">
            {secondPart}
          </span>
        </h2>
        <p
          data-tina-field={tinaField(data, "description")}
          className="text-center text-white/80 text-sm mb-10 max-w-xl mx-auto"
        >
          {data.description}
        </p>

        {/* Curved line image */}
        <div className="absolute top-1/2 left-0 w-full -z-10 pointer-events-none">
          <Image
            src={CurveImage}
            alt="Line path"
            width={1320}
            height={148}
            className="w-full h-auto"
          />
        </div>

        {/* Steps: 6-column grid – even indices row 1, odd indices row 2 */}
        <div className="grid grid-cols-6 gap-y-16 gap-x-6">
          {data.steps?.map((step: any, index: number) => {
            const col = index + 1;        // 1-based grid column
            const row = index % 2 === 0 ? 1 : 2;

            return (
              <div
                key={index}
                data-tina-field={tinaField(step, "heading")}
                style={{ gridColumnStart: col, gridRowStart: row }}
                className="flex flex-col items-center text-center"
              >
                <div className="bg-white/5 w-[120px] h-[120px] flex flex-col justify-center items-center p-4 rounded-xl border border-white/10 hover:border-[#67FF56] transition hover:shadow-lg hover:shadow-[#67FF56]/30">
                  {step.icon && (
                    <img
                      src={step.icon}
                      alt={step.heading}
                      className="w-8 h-8 mb-2 object-contain"
                    />
                  )}
                </div>
                <h3 className="font-semibold text-sm text-white mt-2">
                  {step.heading}
                </h3>
                <p className="text-xs text-white/70 mt-1">{step.subtext}</p>
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
