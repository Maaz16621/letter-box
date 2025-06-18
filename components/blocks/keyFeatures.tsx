"use client";
import { tinaField } from "tinacms/dist/react";
import { Section } from "../layout/section";

export const KeyFeatures = ({ data }: { data: any }) => {
  const [firstWord, ...restWords] = (data?.title || "").split(" ");
  const secondPart = restWords.join(" ");

  return (
   <Section background={data?.background}>
  <div className="   mx-auto">
    
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
      className="text-center text-white/80 text-sm"
    >
      {data.description}
    </p>


    <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <div
  className="absolute left-1/2 translate-x-[-50%] translate-y-[50%] w-[200px] h-[200px] bg-[#56FF78]/20 rounded-full blur-3xl z-[-1]"
></div>
      {data.features?.map((feature: any, index: number) => (
        <div
          key={index}
          className="bg-white/5 text-white p-6 rounded-lg border border-white/10 hover:border-[#67FF56] transition hover:shadow-lg hover:shadow-[#67FF56]/30"
          data-tina-field={tinaField(feature, "heading")}
        >
          {/* Heading with icon and text inline */}
          <div className="flex items-center gap-2 mb-2">
            {feature.icon && (
              <img
                src={feature.icon}
                alt={feature.heading}
                className="w-6 h-6 object-contain"
              />
            )}
            <h3 className="font-semibold text-lg">{feature.heading}</h3>
          </div>
          <p className="text-sm text-white/80">{feature.subtext}</p>
        </div>
      ))}
    </div>
  </div>
</Section>

  );
};
import type { Template } from "tinacms";

export const keyFeaturesBlockSchema: Template = {
  name: "keyFeatures",
  label: "Key Features",
  ui: {
    previewSrc: "/blocks/key-features.png",
    defaultItem: {
      title: "Key Features",
      description:
        "Unlike other Wordle Solvers, our tool comes with intriguing features that make it the best-in-class tool available online.",
      features: [
        {
          heading: "Quick & Lightening Fast",
          subtext:
            "With a response time of just 1-2 seconds, our Wordle AI will quickly provide a list of valid five-letter words.",
          icon: "/icons/bolt.svg",
        },
        {
          heading: "Predict Answer Using the Power of AI",
          subtext:
            "It analyzes your input, searches through a dictionary, and filters the most relevant words.",
          icon: "/icons/ai.svg",
        },
        {
          heading: "Simple but Eye Catchy Interface",
          subtext:
            "A visually appealing UI that makes puzzle-solving a pleasure. Clean and intuitive!",
          icon: "/icons/ui.svg",
        },
        {
          heading: "Arranged Output Results",
          subtext:
            "Results are highlighted in color based on your inputs. Easy to process and read.",
          icon: "/icons/layout.svg",
        },
        {
          heading: "No Registration Required",
          subtext:
            "Enter your guess and get results — no registration, no subscriptions.",
          icon: "/icons/unlock.svg",
        },
        {
          heading: "Word Difficulty & Composition",
          subtext:
            "Classifies words by difficulty and letter type to improve vocabulary.",
          icon: "/icons/difficulty.svg",
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
      type: "object",
      name: "features",
      label: "Features",
      list: true,
      fields: [
        {
          type: "string",
          name: "heading",
          label: "Heading",
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
