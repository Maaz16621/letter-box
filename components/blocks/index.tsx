import { tinaField } from "tinacms/dist/react";
import { Page, PageBlocks } from "../../tina/__generated__/types";
import { Hero } from "./hero";
import { Content } from "./content";
import { Features } from "./features";
import { Testimonial } from "./testimonial";
import { Video } from "./video";
import { Callout } from "./callout";
import { Stats } from "./stats";
import { CallToAction } from "./call-to-action";
import { OtherSolvers } from "./other-solvers";
import { TextSection } from "./text-section";
import { KeyFeatures } from "./keyFeatures";
import { WhyChoose } from "./whyChoose";
import { FaqSection } from "./faqSection";

export const Blocks = (props: Omit<Page, "id" | "_sys" | "_values">) => {
  if (!props.blocks) return null;
  return (
    <>
      {props.blocks.map(function (block, i) {
        return (
          <div key={i} data-tina-field={tinaField(block)}>
            <Block {...block} />
          </div>
        );
      })}
    </>
  );
};

const Block = (block: PageBlocks) => {
  switch (block.__typename) {
    case "PageBlocksVideo":
      return <Video data={block} />;
    case "PageBlocksHero":
      return <Hero data={block} />;
    case "PageBlocksCallout":
      return <Callout data={block} />;
    case "PageBlocksStats":
      return <Stats data={block} />;
    case "PageBlocksContent":
      return <Content data={block} />;
    case "PageBlocksFeatures":
      return <Features data={block} />;
    case "PageBlocksTestimonial":
      return <Testimonial data={block} />;
    case "PageBlocksCta":
      return <CallToAction data={block} />;
    case "PageBlocksOtherSolvers":
      return <OtherSolvers data={block} />;
    case "PageBlocksTextSection":
      return <TextSection data={block} />;
    case "PageBlocksKeyFeatures": // ✅ NEW BLOCK CASE
      return <KeyFeatures data={block} />;
 
         case "PageBlocksWhyChoose":
  return <WhyChoose data={block} />;
         case "PageBlocksFaq":
  return <FaqSection data={block} />;

default:
      return null;
  }
};
