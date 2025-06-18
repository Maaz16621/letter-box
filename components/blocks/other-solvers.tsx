"use client";
import { tinaField } from "tinacms/dist/react";
import { Section } from "../layout/section";

export const OtherSolvers = ({ data }: { data: any }) => {
  const [firstWord, ...restWords] = (data?.title || "").split(" ");
  const secondPart = restWords.join(" ");

  return (
    <Section background={data?.background}>
      <div className="text-center   mx-auto">
        <h2
          data-tina-field={tinaField(data, "title")}
          className="text-3xl font-bold"
        >
          <span className="text-white">{firstWord} </span>
          <span className="bg-gradient-to-r from-[#34792C] to-[#67FF56] text-transparent bg-clip-text">
            {secondPart}
          </span>
        </h2>
        <p
          data-tina-field={tinaField(data, "description")}
          className="text-sm mt-2 text-white/80"
        >
          {data.description}
        </p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {data.solvers?.map((solver: any, index: number) => (
            <a
              key={index}
              href={solver.url || "#"}
              target="_self"
              rel="noopener noreferrer"
              className="group cursor-pointer flex items-center gap-3 bg-white/5 border border-white/10 hover:border-[#67FF56] rounded-md p-5 shadow transition duration-300 hover:shadow-lg hover:shadow-[#67FF56]/40 text-white no-underline"
              data-tina-field={tinaField(solver, "label")}
            >
              {solver.icon && (
                <img
                  src={solver.icon}
                  alt={solver.label}
                  className="w-6 h-6 object-contain shrink-0"
                />
              )}
              <span>{solver.label}</span>
            </a>
          ))}
        </div>
      </div>
    </Section>
  );
};
import type { Template } from "tinacms";

export const otherSolversBlockSchema: Template = {
  name: "otherSolvers",
  label: "Other Solvers",
  ui: {
    previewSrc: "/blocks/other-solvers.png",
    defaultItem: {
      title: "Other Solvers",
      description: "Discover our system’s core capabilities that stand out.",
      solvers: [
        { label: "Word Finder", icon: "/icons/word-finder.svg", url: "/word-finder" },
        { label: "Scrabble Word Finder", icon: "/icons/scrabble.svg", url: "/scrabble" },
        { label: "Jumble Solver", icon: "/icons/jumble.svg", url: "/jumble" },
        { label: "Letter Boxed Solver", icon: "/icons/letter-boxed.svg", url: "/letter-boxed" },
        { label: "Words With Friends Solver", icon: "/icons/wwf.svg", url: "/words-with-friends" },
        { label: "Rhyme Finder", icon: "/icons/rhyme.svg", url: "/rhyme" },
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
      name: "solvers",
      label: "Solvers",
      list: true,
      fields: [
        {
          type: "string",
          name: "label",
          label: "Label",
        },
        {
          type: "image",
          name: "icon",
          label: "Icon (SVG or PNG)",
        },
        {
          type: "string",
          name: "url",
          label: "Link URL",
        },
      ],
    },
  ],
};
