import React from "react";
import type { Block, Passage } from "../../data/types";

/**
 * Text from the content files, with two marks: an isiZulu term written
 * *like this* is set in italics, and a lead-in written **like this** in bold.
 */
export const RichText: React.FC<{ text: string }> = ({ text }) => (
  <>
    {text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/).map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
        return (
          <strong key={i} className="font-semibold">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
        return (
          <em key={i} lang="zu">
            {part.slice(1, -1)}
          </em>
        );
      }
      return part;
    })}
  </>
);

/** A question to take home, the same box wherever it appears */
export const AskElders: React.FC<{ question: string }> = ({ question }) => (
  <aside
    aria-label="Ask your elders"
    className="rounded-md bg-ink-deep px-6 py-5 text-paper-light lg:px-7 lg:py-6"
  >
    <p className="mb-1.5 text-[13px] font-medium uppercase leading-snug tracking-[0.16em] text-[#E8C24A]">
      Ask your elders
    </p>
    <p className="text-lg leading-relaxed">
      <RichText text={question} />
    </p>
  </aside>
);

const listItem = "pl-1.5";

interface BlocksProps {
  blocks: Block[];
  // Set the first paragraph larger, as the opening of a page
  lede?: boolean;
}

export const Blocks: React.FC<BlocksProps> = ({ blocks, lede }) => (
  <div className="space-y-4">
    {blocks.map((block, i) => {
      switch (block.kind) {
        case "p":
          return (
            <div key={i}>
              <p className={lede && i === 0 ? "text-[1.3125rem] leading-[1.55] lg:text-2xl" : undefined}>
                <RichText text={block.en} />
              </p>
              {block.zu && (
                <p lang="zu" className="mt-1 text-base italic text-ink-soft lg:text-lg">
                  {block.zu}
                </p>
              )}
            </div>
          );
        case "subhead":
          return (
            <h3 key={i} className="!mt-7 font-display text-xl font-semibold leading-snug lg:text-[1.375rem]">
              <RichText text={block.text} />
            </h3>
          );
        case "ol":
        case "ul": {
          const List = block.kind;
          return (
            <List
              key={i}
              className={`space-y-2 pl-[22px] ${block.kind === "ol" ? "list-decimal" : "list-disc"}`}
            >
              {block.items.map((item) => (
                <li key={item} className={listItem}>
                  <RichText text={item} />
                </li>
              ))}
            </List>
          );
        }
        case "ask":
          return (
            <div key={i} className="!mt-7">
              <AskElders question={block.question} />
            </div>
          );
      }
    })}
  </div>
);

/** A titled section of a guide page: a heading over its blocks */
export const PassageSection: React.FC<{ passage: Passage }> = ({ passage }) => (
  <section className="mt-9 lg:mt-11">
    <h2 className="mb-2.5 font-display text-[1.625rem] font-semibold leading-tight lg:mb-3 lg:text-[1.875rem]">
      <RichText text={passage.title} />
    </h2>
    <Blocks blocks={passage.blocks} />
  </section>
);
