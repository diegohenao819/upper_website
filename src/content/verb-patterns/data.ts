// Verb lists from the course handout "Verb Patterns - List 2026".

export type PatternId = 1 | 2 | 3 | 4 | 5 | 6;

export type Pattern = {
  id: PatternId;
  name: string;
  short: string;
  formula: string;
  example: string;
  verbs: string[];
};

export const patterns: Pattern[] = [
  {
    id: 1,
    name: "verb + -ING",
    short: "-ING",
    formula: "verb 1 + verb-ING",
    example: "I enjoy going to the park.",
    verbs: [
      "admit", "anticipate", "apologize for", "avoid", "be used to", "can't help", "consider",
      "deny", "discuss", "dislike", "dread", "enjoy", "fancy", "feel like", "finish", "go",
      "imagine", "involve", "keep", "look forward to", "mention", "mind", "miss", "postpone",
      "practice", "quit", "recommend", "resume", "risk", "suggest", "accuse sb of",
    ],
  },
  {
    id: 2,
    name: "verb + TO + verb",
    short: "TO",
    formula: "verb 1 + to + verb",
    example: "They decided to buy a new car.",
    verbs: [
      "afford", "agree", "ask", "attempt", "choose", "decide", "deserve", "expect", "fail",
      "hope", "learn", "manage", "mean", "need", "offer", "plan", "pretend", "promise",
      "refuse", "struggle", "threaten", "volunteer", "wait", "want", "would like",
      "would love", "would hate", "would prefer",
    ],
  },
  {
    id: 3,
    name: "verb + object + TO + verb",
    short: "OBJECT + TO",
    formula: "verb 1 + object + to + verb",
    example: "The coach told me to be on time.",
    verbs: [
      "advise", "allow", "ask", "beg", "convince", "encourage", "expect", "forbid", "force",
      "hire", "invite", "order", "permit", "persuade", "remind", "require", "teach", "tell",
      "urge", "want", "warn",
    ],
  },
  {
    id: 4,
    name: "verb + object + base verb",
    short: "OBJECT + BASE",
    formula: "verb 1 + object + base verb",
    example: "She made me watch her favorite movie.",
    verbs: ["make", "let", "help", "would rather"],
  },
  {
    id: 5,
    name: "-ING or TO, same meaning",
    short: "BOTH",
    formula: "verb 1 + verb-ING  =  verb 1 + to + verb",
    example: "I like swimming. = I like to swim.",
    verbs: [
      "like", "love", "hate", "prefer", "begin", "start", "continue", "can't bear",
      "can't stand", "propose",
    ],
  },
  {
    id: 6,
    name: "-ING or TO, different meaning",
    short: "CHANGE",
    formula: "verb 1 + verb-ING  ≠  verb 1 + to + verb",
    example: "I stopped to help her. ≠ I stopped helping her.",
    verbs: ["remember", "forget", "try", "stop", "regret"],
  },
];

export function findVerb(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return patterns
    .map((p) => ({ pattern: p, matches: p.verbs.filter((v) => v.startsWith(q) || v.includes(` ${q}`)) }))
    .filter((r) => r.matches.length > 0);
}
