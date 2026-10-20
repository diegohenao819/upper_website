// The course map. To publish a new entry:
// 1. write src/content/lessons/<slug>.mdx
// 2. register it in src/content/lessons/index.ts
// 3. set its status to "published" below.

export type TopicStatus = "published" | "planned";

export type Topic = {
  slug: string;
  title: string;
  kind: "Grammar" | "Vocabulary" | "Reading" | "Writing" | "Pronunciation" | "Project";
  week: string;
  summary: string;
  status: TopicStatus;
  minutes?: number;
  guidePdf?: string;
};

export type Period = {
  id: "period-1" | "period-2";
  number: 1 | 2;
  theme: string;
  weight: string;
  topics: Topic[];
};

export const course = {
  name: "Upper-Intermediate English",
  code: "LI436",
  semester: "2026-II",
  university: "Universidad Tecnológica de Pereira",
  program: "Licenciatura en Bilingüismo con Énfasis en Inglés",
  level: "B1.2",
};

export const periods: Period[] = [
  {
    id: "period-1",
    number: 1,
    theme: "Globalization",
    weight: "50%",
    topics: [
      {
        slug: "globalization-vocabulary",
        title: "Vocabulary and reading",
        kind: "Vocabulary",
        week: "Sep 7 to 11",
        summary: "Key words to read and talk about a connected world.",
        status: "planned",
      },
      {
        slug: "reported-speech",
        title: "Reported speech",
        kind: "Grammar",
        week: "Sep 14 to 18",
        summary: "Tell others what someone said, asked or ordered.",
        status: "planned",
      },
      {
        slug: "types-of-sentences",
        title: "Types of sentences",
        kind: "Grammar",
        week: "Sep 21 to 25",
        summary: "Simple, compound and complex sentences, and when to use each.",
        status: "planned",
      },
      {
        slug: "response-paragraph",
        title: "The response paragraph",
        kind: "Writing",
        week: "Sep 28 to Oct 2",
        summary: "Summarize a text, react to it and argue your position.",
        status: "planned",
      },
      {
        slug: "project-1-oral-presentation",
        title: "Project 1: Oral presentation",
        kind: "Project",
        week: "Oct 12 to 16",
        summary: "A reflective position on globalization, presented live.",
        status: "planned",
      },
    ],
  },
  {
    id: "period-2",
    number: 2,
    theme: "Human Rights",
    weight: "50%",
    topics: [
      {
        slug: "verb-patterns",
        title: "Verb patterns",
        kind: "Grammar",
        week: "Oct 19 to 23",
        summary: "-ING or TO? Learn which form comes after each verb.",
        status: "published",
        minutes: 45,
        guidePdf: "/guides/verb-patterns-learning-guide.pdf",
      },
      {
        slug: "human-rights-reading",
        title: "Reading and discussion",
        kind: "Reading",
        week: "Oct 26 to 30",
        summary: "Read, question and discuss texts about human rights.",
        status: "planned",
      },
      {
        slug: "word-formation-collocations",
        title: "Suffixes, prefixes and collocations",
        kind: "Vocabulary",
        week: "Nov 2 to 6",
        summary: "Build new words and use them with their natural partners.",
        status: "planned",
      },
      {
        slug: "idioms-ed-pronunciation",
        title: "Idioms and -ed pronunciation",
        kind: "Pronunciation",
        week: "Nov 9 to 13",
        summary: "Everyday idioms, and the three sounds of -ed.",
        status: "planned",
      },
      {
        slug: "project-2-video-podcast",
        title: "Project 2: Video podcast",
        kind: "Project",
        week: "Nov 16 to 20",
        summary: "An 8 to 10 minute argumentative discussion on a human rights topic.",
        status: "planned",
      },
    ],
  },
];

export const allTopics = periods.flatMap((p) =>
  p.topics.map((t) => ({ ...t, period: p })),
);

export function getTopic(slug: string) {
  return allTopics.find((t) => t.slug === slug);
}
