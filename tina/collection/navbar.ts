// tina/collection/navbar.ts
import { Collection } from "tinacms";

const Navbar: Collection = {
  name: "navbar",
  label: "Navbar",
  path: "content/navbar",
  format: "json",
  ui: {
    allowedActions: {
      create: false,
      delete: false,
    },
  },
  fields: [
    {
      type: "string",
      name: "buttonText",
      label: "Button Text",
    },
    {
      type: "string",
      name: "buttonColor",
      label: "Button Color",
    },
    {
      type: "string",
      name: "buttonLink",
      label: "Button Link",
    },
    {
      type: "string",
      name: "logoType",
      label: "Logo Type",
      options: [
        { label: "Text", value: "text" },
        { label: "Image", value: "image" },
      ],
    },
    {
      type: "string",
      name: "logoText",
      label: "Logo Text",
      required: false,
    },
    {
      type: "image",
      name: "logoImage",
      label: "Logo Image",
      required: false,
    },
  ],
};

export default Navbar;
