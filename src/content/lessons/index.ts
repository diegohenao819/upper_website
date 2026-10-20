import type { ComponentType } from "react";

// One line per published lesson.
export const lessonContent: Record<string, () => Promise<{ default: ComponentType }>> = {
  "verb-patterns": () => import("./verb-patterns.mdx"),
};
