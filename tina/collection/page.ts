// collections/page.ts
import type { Collection } from 'tinacms'

import { heroBlockSchema }          from '@/components/blocks/hero'
import { contentBlockSchema }       from '@/components/blocks/content'
import { testimonialBlockSchema }   from '@/components/blocks/testimonial'
import { featureBlockSchema }       from '@/components/blocks/features'
import { videoBlockSchema }         from '@/components/blocks/video'
import { calloutBlockSchema }       from '@/components/blocks/callout'
import { statsBlockSchema }         from '@/components/blocks/stats'
import { ctaBlockSchema }           from '@/components/blocks/call-to-action'
import { otherSolversBlockSchema }  from '@/components/blocks/other-solvers'
import { textSectionBlockSchema }   from '@/components/blocks/text-section'
import { keyFeaturesBlockSchema }   from '@/components/blocks/keyFeatures'
import { whyChooseBlockSchema }     from '@/components/blocks/whyChoose'
import { faqBlockSchema }           from '@/components/blocks/faqSection'
import { workingMechanismBlockSchema } from '@/components/blocks/workingMechanisim'
import { letterBoxHowToBlockSchema }   from '@/components/blocks/howTo'

const Page: Collection = {
  label:  'Pages',
  name:   'page',
  path:   'content/pages',
  format: 'mdx',

  ui: {
    router: ({ document }) => {
      const fp = document._sys.breadcrumbs.join('/')
      return fp === 'index' ? '/index' : `/${fp}`
    },
  },

  fields: [
    /* ─────────────  MAIN PAGE SECTIONS  ───────────── */
    {
      type:  'object',
      list:  true,
      name:  'blocks',
      label: 'Sections',
      ui:    { visualSelector: true },
      templates: [
        heroBlockSchema,
        calloutBlockSchema,
        featureBlockSchema,
        statsBlockSchema,
        ctaBlockSchema,
        contentBlockSchema,
        testimonialBlockSchema,
        videoBlockSchema,
        otherSolversBlockSchema,
        textSectionBlockSchema,
        whyChooseBlockSchema,
        keyFeaturesBlockSchema,
        faqBlockSchema,
        workingMechanismBlockSchema,
        letterBoxHowToBlockSchema,
      ],
    },

    /* ────────────────  NEW SEO FIELDS  ─────────────── */
   /* ───────── SEO / Head controls ───────── */
{
  type:  'object',
  name:  'head',
  label: 'Head / Metadata',
  fields: [
    /* -------- basic -------- */
    { type: 'string',  name: 'title',        label: 'Page Title' },
    {
      type: 'string',
      name: 'description',
      label: 'Meta Description',
      ui:   { component: 'textarea' },
    },
    {
      type:  'string',
      name:  'keywords',
      label: 'Keywords (comma‑separated)',
      ui:    { component: 'textarea' },
    },
    { type: 'string',  name: 'canonical',    label: 'Canonical URL' },

    /* -------- robots -------- */
    {
      type: 'boolean',
      name: 'noindex',
      label: 'No‑index?',
      ui:   { description: 'Adds <meta name="robots" content="noindex, nofollow" /> when checked' },
    },

    /* -------- Open Graph (Facebook, LinkedIn…) -------- */
    { type: 'string',  name: 'ogTitle',       label: 'OG Title (fallbacks to Page Title)' },
    { type: 'string',  name: 'ogDescription', label: 'OG Description (fallbacks to Meta Description)', ui:{component:'textarea'} },
    {
      type: 'image',
      name: 'ogImage',
      label: 'OG Image (upload)',
      // @ts-ignore
      ui:   { uploadDir: () => '/' },
    },

    /* -------- Twitter -------- */
    {
      type:    'string',
      name:    'twitterCard',
      label:   'Twitter Card Type',
      options: [ 'summary', 'summary_large_image' ],
    },
    { type: 'string',  name: 'twitterSite',  label: '@site (Twitter handle)' },
    { type: 'string',  name: 'twitterImage', label: 'Twitter Image (URL or upload)' },

    /* -------- additional raw markup -------- */
    {
      type: 'string',
      name: 'extra',
      label: 'Extra <head> markup',
      ui: {
        component: 'textarea',
        description: 'Raw HTML – script, style or extra <meta> tags',
      },
    },
  ],
},

  ],
}

export default Page
