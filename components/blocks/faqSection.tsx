"use client";
import { useState } from "react";
import { tinaField } from "tinacms/dist/react";
import { Section } from "../layout/section";

export const FaqSection = ({ data }: { data: any }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
<Section background={data?.background}>
  <div
  className="absolute left-1/2 translate-x-[-50%] translate-y-[50%] w-[400px] h-[400px] bg-[#56FF78]/20 rounded-full blur-3xl z-[-1]"
></div>
  <div className="  mx-auto text-white">
    <h2 className="text-center text-3xl font-bold mb-8" data-tina-field={tinaField(data, "title")}>
      {data.title}
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {data.items?.map((item: any, index: number) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={index}
        className="bg-white/10 p-5 rounded-[12px] border border-white/10 hover:border-[#67FF56] transition relative h-fit"

          >
            <button
              onClick={() => toggle(index)}
              className="flex justify-between items-start w-full text-left gap-3"
            >
              <span
                className="font-medium text-white text-[24px]"
                data-tina-field={tinaField(item, "question")}
              >
                {item.question}
              </span>

              {/* Icon Container (fixed size) */}
              <div className="w-[38px] h-[38px] shrink-0 rounded-[6px] bg-white/10 flex items-center justify-center">
                <svg
                  className="transition-transform duration-300"
                  style={{ transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }}
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.3415 18.2474C2.92586 18.6111 2.88374 19.2429 3.24742 19.6585C3.61111 20.0741 4.24287 20.1163 4.6585 19.7526L3.3415 18.2474ZM20.9978 5.06652C21.0345 4.51546 20.6176 4.03895 20.0665 4.00221L11.0865 3.40354C10.5354 3.36681 10.0589 3.78375 10.0221 4.33481C9.98541 4.88587 10.4024 5.36238 10.9534 5.39911L18.9357 5.93127L18.4035 13.9135C18.3668 14.4646 18.7837 14.9411 19.3348 14.9779C19.8859 15.0146 20.3624 14.5976 20.3991 14.0466L20.9978 5.06652ZM4.6585 19.7526L20.6585 5.75258L19.3415 4.24742L3.3415 18.2474L4.6585 19.7526Z"
                    fill="white"
                  />
                </svg>
              </div>
            </button>

            {/* Answer Section with Animation */}
            <div
              className={`transition-all duration-500 ease-in-out overflow-hidden ${
                isOpen ? "max-h-[500px] opacity-100 mt-3" : "max-h-0 opacity-0"
              }`}
            >
              <hr className="border-t border-white/20 my-2" />
              <p
                className="text-[20px] text-white/80"
                data-tina-field={tinaField(item, "answer")}
              >
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  </div>
</Section>



  );
};
import type { Template } from "tinacms";

export const faqBlockSchema: Template = {
  name: "faq",
  label: "FAQ",
  ui: {
    previewSrc: "/blocks/faq-preview.png",
    defaultItem: {
      title: "Frequently Asked Questions",
      items: [
        {
          question: "What makes your service different?",
          answer: "We provide 24/7 support, custom solutions, and guaranteed satisfaction.",
        },
        {
          question: "How quickly can I get started?",
          answer: "You can get started within 24 hours after signing up.",
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
      type: "object",
      name: "items",
      label: "FAQ Items",
      list: true,
      fields: [
        { type: "string", name: "question", label: "Question" },
        { type: "string", name: "answer", label: "Answer" },
      ],
    },
  ],
};
