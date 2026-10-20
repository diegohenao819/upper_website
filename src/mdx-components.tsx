import type { MDXComponents } from "mdx/types";
import { Section } from "@/components/lesson/Section";
import { PatternMorph } from "@/components/blocks/PatternMorph";
import { ChoiceSet } from "@/components/blocks/ChoiceSet";
import { SortBuckets } from "@/components/blocks/SortBuckets";
import { InlineChoice } from "@/components/blocks/InlineChoice";
import { GapFill } from "@/components/blocks/GapFill";
import { SpotMistake } from "@/components/blocks/SpotMistake";
import { SentenceBuilder } from "@/components/blocks/SentenceBuilder";
import { StopTimeline } from "@/components/blocks/StopTimeline";
import { FlipCards } from "@/components/blocks/FlipCards";
import { Contrast, Examples, Figure, Tip, VerbFinder, VerbList } from "@/components/blocks/Reference";
import { Results } from "@/components/blocks/Results";

// Every block below can be used in any lesson .mdx file without importing it.
const blocks = {
  Section,
  PatternMorph,
  ChoiceSet,
  SortBuckets,
  InlineChoice,
  GapFill,
  SpotMistake,
  SentenceBuilder,
  StopTimeline,
  FlipCards,
  Contrast,
  Examples,
  Figure,
  Tip,
  VerbFinder,
  VerbList,
  Results,
};

const components: MDXComponents = {
  ...blocks,
  p: (props) => <p className="max-w-[68ch] text-[17px] leading-[1.7] text-ink-2 [&_strong]:font-semibold [&_strong]:text-ink" {...props} />,
  h3: (props) => <h3 className="pt-2 text-xl font-semibold tracking-tight text-ink" {...props} />,
  ul: (props) => <ul className="max-w-[68ch] list-disc space-y-1.5 pl-5 text-[17px] leading-[1.7] text-ink-2 marker:text-ink-3" {...props} />,
  ol: (props) => <ol className="max-w-[68ch] list-decimal space-y-1.5 pl-5 text-[17px] leading-[1.7] text-ink-2 marker:text-ink-3" {...props} />,
  strong: (props) => <strong className="font-semibold text-ink" {...props} />,
  a: (props) => <a className="font-medium text-accent underline hover:text-accent-hover" {...props} />,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
