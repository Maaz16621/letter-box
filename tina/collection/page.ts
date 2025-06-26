import type { Collection } from 'tinacms';
import { heroBlockSchema } from '@/components/blocks/hero';
import { contentBlockSchema } from '@/components/blocks/content';
import { testimonialBlockSchema } from '@/components/blocks/testimonial';
import { featureBlockSchema } from '@/components/blocks/features';
import { videoBlockSchema } from '@/components/blocks/video';
import { calloutBlockSchema } from '@/components/blocks/callout';
import { statsBlockSchema } from '@/components/blocks/stats';
import { ctaBlockSchema } from '@/components/blocks/call-to-action';
import { otherSolversBlockSchema } from '@/components/blocks/other-solvers';
import { textSectionBlockSchema } from '@/components/blocks/text-section';
import { keyFeaturesBlockSchema } from '@/components/blocks/keyFeatures';
import { whyChooseBlockSchema } from '@/components/blocks/whyChoose';
import { faqBlockSchema } from '@/components/blocks/faqSection';
import { workingMechanismBlockSchema } from '@/components/blocks/workingMechanisim';
import { LetterBoxHowTo, letterBoxHowToBlockSchema } from '@/components/blocks/howTo';
const Page: Collection = {
  label: 'Pages',
  name: 'page',
  path: 'content/pages',
  format: 'mdx',
  ui: {
    router: ({ document }) => {
      const filepath = document._sys.breadcrumbs.join('/');
      if (filepath === 'home') {
        return '/';
      }
      return `/${filepath}`;
    },
  },
  fields: [
    {
      type: 'object',
      list: true,
      name: 'blocks',
      label: 'Sections',
      ui: {
        visualSelector: true,
      },
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
  ],
};

export default Page;
