import type { Collection } from "tinacms";
import { ColorPickerInput } from "../fields/color";
import { iconSchema } from "../fields/icon";

const Global: Collection = {
  label: "Global",
  name: "global",
  path: "content/global",
  format: "json",
  ui: {
    global: true,
  },
  fields: [
    {
      type: "object",
      label: "Header",
      name: "header",
      fields: [
        {
          type: "string",
          label: "Logo Type",
          name: "logoType",
          options: [
            { label: "Text", value: "text" },
            { label: "Image", value: "image" },
          ],
          required: true,
        },
       {
  type: "string",
  label: "Logo Text",
  name: "logoText",
  ui: {
    // @ts-ignore
    condition: (formValues) => formValues.logoType === "text",
  },
},

        {
          type: "string",
          label: "Logo Image URL",
          name: "logoImage",
          ui: {
             // @ts-ignore
            condition: (formData) => formData.header?.logoType === "image",
          },
        },
        {
          type: "string",
          label: "Color",
          name: "color",
          options: [
            { label: "Default", value: "default" },
            { label: "Primary", value: "primary" },
          ],
        },
        {
          type: "object",
          label: "Nav Links",
          name: "nav",
          list: true,
          ui: {
            itemProps: (item) => ({
              label: item?.label,
            }),
            defaultItem: {
              href: "/",
              label: "Home",
            },
          },
          fields: [
            {
              type: "string",
              label: "Link",
              name: "href",
            },
            {
              type: "string",
              label: "Label",
              name: "label",
            },
          ],
        },
        {
          type: "string",
          label: "Button Text",
          name: "buttonText",
          required: false,
        },
        {
          type: "string",
          label: "Button Color",
          name: "buttonColor",
          required: false,
          options: [
            { label: "Default", value: "default" },
            { label: "Primary", value: "primary" },
            { label: "Secondary", value: "secondary" },
          ],
        },
        {
          type: "string",
          label: "Button Link",
          name: "buttonLink",
          required: false,
        },
      ],
    },
    {
      type: "object",
      label: "Footer",
      name: "footer",
      fields: [
        {
          type: "object",
          label: "Social Links",
          name: "social",
          list: true,
          ui: {
            itemProps: (item) => ({
              label: item?.icon?.name || 'undefined',
            }),
          },
          fields: [
            iconSchema as any,
            {
              type: "string",
              label: "Url",
              name: "url",
            },
          ],
        },
      ],
    },
    {
      type: "object",
      label: "Theme",
      name: "theme",
      fields: [
        {
          type: "string",
          label: "Primary Color",
          name: "color",
          ui: {
           component: ColorPickerInput as any,
          },
        },
        {
          type: "string",
          name: "font",
          label: "Font Family",
          options: [
            {
              label: "System Sans",
              value: "sans",
            },
            {
              label: "Nunito",
              value: "nunito",
            },
            {
              label: "Lato",
              value: "lato",
            },
          ],
        },
        {
          type: "string",
          name: "darkMode",
          label: "Dark Mode",
          options: [
            {
              label: "System",
              value: "system",
            },
            {
              label: "Light",
              value: "light",
            },
            {
              label: "Dark",
              value: "dark",
            },
          ],
        },
      ],
    },
  ],
};

export default Global;
