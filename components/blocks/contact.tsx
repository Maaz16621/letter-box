"use client";
import React from "react";
import { tinaField } from "tinacms/dist/react";
import { Section } from "../layout/section";
import { Mail, Phone, MapPin, PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export const ContactBlock = ({ data }: { data: any }) => {
  return (
    <Section background={data?.background}>
      <div
        className={cn(
          "relative grid h-full w-full max-w-6xl mx-auto mt-12 text-white border bg-[#1A1A1A]/30 shadow-md md:grid-cols-2 lg:grid-cols-3 rounded-2xl overflow-hidden"
        )}
      >
        {/* Decorative corners */}
        <PlusIcon className="absolute -top-3 -left-3 h-6 w-6 text-green-400" />
        <PlusIcon className="absolute -top-3 -right-3 h-6 w-6 text-green-400" />
        <PlusIcon className="absolute -bottom-3 -left-3 h-6 w-6 text-green-400" />
        <PlusIcon className="absolute -right-3 -bottom-3 h-6 w-6 text-green-400" />

        {/* LEFT SIDE */}
        <div className="flex flex-col justify-center px-6 py-10 md:py-16 lg:col-span-2">
          <h2
            className="text-3xl font-bold mb-4 md:text-4xl lg:text-5xl"
            data-tina-field={tinaField(data, "title")}
          >
            {data.title || "Get in touch"}
          </h2>
          <p
            className="text-white/80 mb-8 max-w-xl text-sm md:text-base lg:text-lg"
            data-tina-field={tinaField(data, "description")}
          >
            {data.description ||
              "If you have any questions regarding our Services or need help, please fill out the form here. We do our best to respond within 1 business day."}
          </p>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            <ContactInfo
              icon={Mail}
              label="Email"
              value={data.email || "contact@21st.dev"}
            />
            <ContactInfo
              icon={Phone}
              label="Phone"
              value={data.phone || "+92 312 1234567"}
            />
            <ContactInfo
              icon={MapPin}
              label="Address"
              value={data.address || "Faisalabad, Pakistan"}
            />
          </div>
        </div>

        {/* RIGHT SIDE (Form Section) */}
        <div className="flex items-center justify-center bg-[#111]/60 border-t md:border-t-0 md:border-l p-6">
          <form
            className="w-full max-w-sm flex flex-col gap-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="text"
              placeholder="Name"
              className="p-3 !w-full !h-auto !rounded-md bg-black/30 border border-white/10 text-white placeholder-gray-400"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="p-3 rounded-md bg-black/30 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              className="p-3 rounded-md bg-black/30 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <textarea
              placeholder="Message"
              rows={4}
              className="p-3 rounded-md bg-black/30 border border-white/10 text-white placeholder-gray-400"
            ></textarea>
            <button
              type="submit"
              className="p-3 bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold rounded-md hover:opacity-90 transition-opacity"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </Section>
  );
};

// Reusable Contact Info box (like ContactCard)
function ContactInfo({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 py-3">
      <div className="bg-white/10 rounded-lg p-3">
        <Icon className="h-5 w-5 text-green-400" />
      </div>
      <div>
        <p className="font-medium">{label}</p>
        <p className="text-white/70 text-sm">{value}</p>
      </div>
    </div>
  );
}

import type { Template } from "tinacms";

export const contactBlockSchema: Template = {
  name: "contactBlock",
  label: "Contact / Get in Touch",
  ui: {
    previewSrc: "/blocks/contactBlock.png",
    defaultItem: {
      title: "Get in touch",
      description:
        "If you have any questions regarding our Services or need help, please fill out the form here. We do our best to respond within 1 business day.",
      email: "contact@21st.dev",
      phone: "+92 312 1234567",
      address: "Faisalabad, Pakistan",
    },
  },
  fields: [
    { type: "string", name: "title", label: "Title" },
    {
      type: "string",
      name: "description",
      label: "Description",
      ui: { component: "textarea" },
    },
    { type: "string", name: "email", label: "Email" },
    { type: "string", name: "phone", label: "Phone" },
    { type: "string", name: "address", label: "Address" },
  ],
};
