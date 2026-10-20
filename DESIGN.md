---
name: Upper-Intermediate English (LI436)
description: Interactive grammar lessons where every idea is followed by something to touch and every answer explains itself.
colors:
  ground: "#ffffff"
  surface: "#f6f7f9"
  surface-2: "#eef0f4"
  line: "#e3e6eb"
  line-strong: "#cdd2da"
  ink: "#14161b"
  ink-2: "#474e5c"
  ink-3: "#636b79"
  action-blue: "#2453e6"
  action-blue-hover: "#1c44c4"
  action-blue-soft: "#ebf0fe"
  action-blue-ink: "#1a3fb3"
  good: "#0f7a4f"
  good-soft: "#e5f5ec"
  good-ink: "#0b5a3a"
  bad: "#c42b37"
  bad-soft: "#fdecee"
  bad-ink: "#8f1d27"
  pattern-1: "#2e7d32"
  pattern-1-soft: "#e6f2e6"
  pattern-2: "#1f4e79"
  pattern-2-soft: "#e3ecf5"
  pattern-3: "#00796b"
  pattern-3-soft: "#ddf1ee"
  pattern-4: "#455a64"
  pattern-4-soft: "#e6ebee"
  pattern-5: "#6b2fa0"
  pattern-5-soft: "#efe6f7"
  pattern-6: "#b45309"
  pattern-6-soft: "#fbeadb"
  selection: "#cfdcff"
  badge-field: "#eef3ff"
  badge-navy: "#1c2b5a"
  badge-red: "#e8325a"
  badge-blue: "#1e6fd9"
  badge-yellow: "#f2a900"
  badge-green: "#3da34a"
typography:
  hero:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.75rem, 7vw, 5rem)"
    fontWeight: 600
    lineHeight: 0.98
    letterSpacing: "-0.045em"
  display:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 6vw, 4.25rem)"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.04em"
  morph:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 6vw, 4rem)"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.6rem, 3.2vw, 2.25rem)"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    letterSpacing: "-0.025em"
  question:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.15rem, 2.4vw, 1.35rem)"
    fontWeight: 500
    lineHeight: 1.375
  body:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.7
    fontFeature: "\"ss01\", \"cv11\""
  ui:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 600
  label:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 500
rounded:
  marker: "6px"
  sm: "8px"
  card: "12px"
  pill: "9999px"
spacing:
  gutter: "20px"
  gutter-wide: "32px"
  block-gap: "32px"
  activity-pad: "20px"
  activity-pad-wide: "28px"
  section-y: "64px"
  container: "1152px"
components:
  button-primary:
    backgroundColor: "{colors.action-blue}"
    textColor: "{colors.ground}"
    typography: "{typography.ui}"
    rounded: "{rounded.card}"
    padding: "0 20px"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.action-blue-hover}"
  button-primary-disabled:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.ink-3}"
  button-secondary:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.ink}"
    typography: "{typography.ui}"
    rounded: "{rounded.card}"
    padding: "12px 20px"
  button-reset:
    textColor: "{colors.ink-2}"
    typography: "{typography.ui}"
    rounded: "{rounded.card}"
    padding: "0 16px"
    height: "44px"
  activity-card:
    backgroundColor: "{colors.ground}"
    rounded: "{rounded.card}"
    padding: "{spacing.activity-pad-wide}"
  answer-option:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "12px 16px"
    height: "48px"
  answer-option-selected:
    backgroundColor: "{colors.action-blue-soft}"
    textColor: "{colors.action-blue-ink}"
  answer-option-correct:
    backgroundColor: "{colors.good-soft}"
    textColor: "{colors.good-ink}"
  answer-option-wrong:
    backgroundColor: "{colors.bad-soft}"
    textColor: "{colors.bad-ink}"
  word-chip:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "0 12px"
    height: "40px"
  word-chip-selected:
    backgroundColor: "{colors.action-blue}"
    textColor: "{colors.ground}"
  verb-picker:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.ink-2}"
    rounded: "{rounded.pill}"
    padding: "6px 14px"
  verb-picker-active:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.ground}"
  feedback-correct:
    backgroundColor: "{colors.good-soft}"
    textColor: "{colors.good-ink}"
    rounded: "{rounded.card}"
    padding: "14px 16px"
  feedback-wrong:
    backgroundColor: "{colors.bad-soft}"
    textColor: "{colors.bad-ink}"
    rounded: "{rounded.card}"
    padding: "14px 16px"
  callout:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink-2}"
    rounded: "{rounded.card}"
    padding: "16px 20px"
  pattern-badge:
    textColor: "{colors.ground}"
    rounded: "{rounded.card}"
    size: "40px"
  input-search:
    backgroundColor: "{colors.ground}"
    rounded: "{rounded.card}"
    height: "48px"
    padding: "0 16px 0 40px"
  nav-link:
    textColor: "{colors.ink-2}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "8px 12px"
---

# Design System: Upper-Intermediate English (LI436)

## Overview

**Creative North Star: "The Answer Key That Talks Back"**

A learning site held to the category standard of Brilliant, Khan Academy, Duolingo web and BBC Learning English. The page is a white sheet with ink text; nothing decorates it. Each idea is stated in plain prose and then immediately handed to the student as something to touch: a verb to switch, a word to drop in a gap, a chip to sort. Every check answers with an explanation, never a bare right or wrong.

Density is calm and reading-first: a 68ch prose column, generous section rhythm, large tappable answers sized for a thumb on a phone. Color is spent on meaning only. One blue means "act here", green and red mean "you were right / you were wrong", and six small pattern hues carry the same code as the printed learning guide so the screen and the paper agree. Motion is quick, eased out and purposeful: words morph, wrong answers shake, feedback slides open.

The system rejects the decorated course portal: banner heroes, stock photography, icon-card walls, drop-shadowed tiles.

**Key Characteristics:**
- White ground, ink text, hairline 1px borders, 12px corners, flat surfaces.
- One action blue for primaries, selection and progress; nothing else is blue.
- Green and red appear only as answer feedback.
- Six pattern hues as small markers (badges, highlighted verb phrases, dots), always with their soft tint.
- Geist throughout, semibold and tightly tracked at display sizes.
- Every practice block lives in the same bordered Activity frame with Check, Feedback, Next, Score, Try again.

## Colors

A near-monochrome ink-on-white system with one action color, a feedback pair, and a six-hue marker code borrowed from the printed guide.

### Primary
- **Action Blue** (action-blue): primary buttons, the selected-but-unchecked answer, selected chips, progress bars, inline links, focus rings and the text caret. Hover deepens to action-blue-hover; selected answers sit on action-blue-soft with action-blue-ink text.

### Secondary
- **Correct Green** (good, good-soft, good-ink): correct answers, correct chips, the correct feedback panel, a perfect score, the section-done check. good-ink is the text color on good-soft.
- **Wrong Red** (bad, bad-soft, bad-ink): wrong answers, wrong chips, the wrong feedback panel. bad-ink is the text color on bad-soft.

### Tertiary
- **Pattern Markers** (pattern-1 through pattern-6, each with a -soft tint): 1 green (verb + -ING), 2 navy (verb + TO), 3 teal (verb + object + TO), 4 slate (verb + object + base verb), 5 purple (-ING or TO, same meaning), 6 amber (-ING or TO, different meaning). Used as the numbered square badge, the bracketed part of a formula or example (hue text on soft tint), the bullet dot of an example list, and bucket colors in SortBuckets.

### Neutral
- **Ground** (ground): page and Activity background.
- **Surface** (surface) and **Surface 2** (surface-2): callouts, the verb list well, the topic card teaser well, hover fills, inactive progress segments, disabled buttons.
- **Selection** (selection): the text selection highlight.
- **Hairline** (line) and **Hairline Strong** (line-strong): card borders and dividers; line-strong for unselected chips, inputs and secondary buttons.
- **Ink** (ink), **Ink 2** (ink-2), **Ink 3** (ink-3): headings and emphasis; body prose; metadata, instructions and captions.

### Brand Badge
- **Course badge** (src/assets/brand/course-badge.png): the course's own round badge, used as the header mark, favicon, link preview and the home hero.
- **Badge colors** (badge-navy, badge-red, badge-blue, badge-yellow, badge-green, on badge-field): sampled from the badge and used only for the draggable word tiles that float around it in the home hero, the soft circle behind it, and the heart in the footer credit.

### Named Rules
**The Badge Rule.** Badge colors live only next to the badge (the home hero) and in the footer heart. Lessons, activities and controls never use them.

**The One Blue Rule.** Action blue marks the thing to press or the thing chosen, and nothing else. Never use it as decoration, section tint or illustration fill.

**The Feedback-Only Rule.** Green and red appear only after the student checks an answer (plus the done tick and the perfect score). Never use them for headings, callouts, warnings or brand accents.

**The Guide Code Rule.** Pattern hue N always means pattern N, matching the printed learning guide. A new lesson that has no numbered patterns does not borrow these hues for decoration; a new lesson with its own categories maps them in order and keeps them small.

## Typography

**Display Font:** Geist (with ui-sans-serif, system-ui)
**Body Font:** Geist (with ui-sans-serif, system-ui)

**Character:** One family, worked through weight and tracking. Display and headlines are semibold (600) with negative tracking that tightens as size grows; body is regular at a comfortable 17px with stylistic sets ss01 and cv11 on.

### Hierarchy
- **Display** (600, clamp 2.5rem to 4.25rem, 1.02, -0.04em): page titles (home hero, lesson title). The lesson title tops out at 4rem.
- **Morph** (600, clamp 2.25rem to 4rem, 1.15, -0.03em): the PatternMorph sentence at display size; the home instance uses clamp(2rem, 5vw, 3.25rem).
- **Headline** (600, clamp 1.6rem to 2.25rem, ~1.25, -0.03em): lesson section titles; home section titles run slightly larger (up to 2.75rem).
- **Title** (600, 18 to 20px, tight tracking): Activity titles, MDX h3, period headings.
- **Question** (500, clamp 1.15rem to 1.35rem, snug): the prompt sentence in a practice block.
- **Body** (400, 17px, 1.7): lesson prose, capped at 68ch. Example sentences run 18px in ink.
- **UI** (600, 15px): buttons, chips, answer labels, feedback text.
- **Label** (500, 14px): meta rows, nav, instructions (15px ink-3), captions (13px).

### Named Rules
**The Plain Voice Rule.** Student-facing text avoids em dashes and middle dots. Use commas, colons, periods or a pipe ("LI436 | 2026-2") for separators.

**The Tabular Count Rule.** Scores, counts, weeks and badge numerals use tabular numerals.

## Layout

A single 1152px container (max-w-6xl) with 20px side gutters on phones and 32px from 640px up. The home hero is a two-column grid from 1024px (text left, live PatternMorph card right), stacking on phones with text first. Lessons use a 220px sticky section nav plus a content column at 1024px and up; below that the nav disappears and the content runs full width. A sticky header (64px) and, inside lessons, a sticky progress strip (44px) sit under it with a translucent white backdrop; anchor scroll offset accounts for both.

Sections separate with a hairline divider and 56 to 64px vertical padding; blocks inside a section are spaced 32px apart. Activity frames pad 20px on phones and 28px from 640px. Prose never exceeds 68ch even when the column is wider; interactive blocks take the full column.

## Elevation & Depth

Flat by default. Surfaces separate by hairline borders and the white / surface tonal step, never by shadow. The defined --shadow-1 and --shadow-2 tokens are not used by the build. The only shadows are physical affordances on draggable word chips: a 1px bottom edge at rest so a chip reads as a movable tile, and a lifted shadow while it is being dragged.

### Shadow Vocabulary
- **Chip edge** (`box-shadow: 0 1px 0 rgb(20 22 27 / 0.06)`): resting draggable or tappable word chips in SortBuckets and SentenceBuilder.
- **Chip lifted** (`box-shadow: 0 8px 24px rgb(20 22 27 / 0.18)`): the drag overlay only.

### Named Rules
**The Flat Card Rule.** Cards, Activity frames, callouts and panels have no shadow. Depth comes from a 1px line border or a surface fill.

**The Lift-On-Drag Rule.** A shadow means "you are holding this". It appears on a chip in the drag state and nowhere else.

## Shapes

Gently rounded and consistent. 12px (card) is the house corner: Activity frames, answer options, primary and secondary buttons, feedback panels, callouts, inputs, figures, pattern badges. 8px (sm) for smaller interactive pieces: word chips, inline choices, nav links, timeline bars. 6px (marker) for in-line highlights and small numeral badges. Fully round only for the PatternMorph verb picker and progress bars. Borders are 1px hairlines; selectable answers and inputs use a 2px border so selection and focus read clearly.

## Components

### Buttons
Confident and plain: solid blue, semibold, generously tall.
- **Shape:** 12px corners.
- **Primary:** action blue with white 15px semibold text, 44px minimum height, 20px side padding. One primary per action area (Check, Next, See score, Open the lesson).
- **Hover / Focus / Active:** hover deepens to action-blue-hover over 200ms; active scales to 0.98; focus shows the global 2px action-blue outline at 2px offset. Disabled turns surface-2 with ink-3 text.
- **Secondary:** white with a line-strong border and ink text; hover darkens the border to ink-3 (the PDF download).
- **Reset (ghost):** no fill, ink-2 text with a rotate icon; hover fills surface.

### Chips
- **Verb picker (PatternMorph):** pill, 1px line-strong border, white, ink-2 14px medium; active is solid ink with white text. Ink, not blue, because it controls a demo rather than submitting an answer.
- **Word chips (SortBuckets, SentenceBuilder):** 8px corners, 40 to 44px tall, line-strong border, chip edge shadow; selected fills action blue; after checking, good-soft or bad-soft with a 40% feedback border and a check or X, wrong chips reveal where they belong.
- **Verb list tags:** 6px corners, 1px line border, white on a surface well, no interaction.

### Cards / Containers
- **Activity frame:** 12px corners, 1px line border, white, 20px / 28px padding, title (18px semibold) plus optional ink-3 instructions. Every practice block uses it.
- **Callout (Tip):** surface fill, no border, 12px corners, an ink lucide icon (lightbulb for tip, triangle for careful). Never tinted by kind.
- **Contrast table:** bordered 12px box, surface header row, hairline row and column dividers, Spanish left, English right with the pattern part marked.

### Inputs / Fields
- **Style:** 48px tall, 2px line-strong border, 12px corners, white, 16px text, leading 16px search icon in ink-3.
- **Focus:** border turns action blue.
- **Gap blanks:** a 2px bottom rule that fills action-blue-soft when chosen and good-soft when confirmed.

### Navigation
- **Site header:** sticky, translucent white with backdrop blur and a hairline bottom border; course mark plus name and "code | semester" on the left, 14px medium ink-2 links on the right that fill surface on hover.
- **Lesson section nav:** sticky left column of 14px links; current section is surface-filled, semibold ink; completed sections show a green check.
- **Progress strip:** 6px pill track in surface-2 with an action-blue fill animating over 700ms on the ease-out curve, and a tabular "done/total" count.

### Feedback panel
Slides open (opacity and height, 350ms, ease-out) under the answers with role="status". Correct: good-soft, good-ink text, circle-check icon, "Correct!" plus the explanation. Wrong: bad-soft, bad-ink, circle-x, "Not quite." plus the explanation. Answers animate in kind: a wrong pick shakes horizontally, a right one pulses to 1.03.

### Answer options (ChoiceSet)
Full-width-on-phone, two columns from 640px, 48px minimum height, 2px border, 12px corners, 16px medium text. Unselected: line border on white, hover surface. Selected: action-blue border on action-blue-soft. Checked: correct in good, wrong in bad with an icon, the rest fade to 45%. A row of 4px segments above tracks question progress in action blue.

### PatternMorph (signature)
A live sentence ("They [verb 1] [verb 2] out.") where choosing verb 1 morphs verb 2 with a springy blur-and-slide word swap and layout reflow. Verb 2 sits in its pattern's soft tint and hue; below, a small numeral badge and "Pattern N: formula" label. Autoplays on the home page and pauses on hover; reduced motion swaps to a plain fade. Sizes: hero (home) and display (lesson opener).

### Pattern section header
A 40px solid pattern-hue square with the white numeral beside the section headline, and a formula line where the bracketed part takes the pattern hue on its tint.

### StopTimeline
A two-tab toggle (white segment with a line-strong ring sliding between tabs) above a sentence and a timeline: two 8px-cornered bars around an ink octagonal STOP sign, the active action filled pattern-6, the other surface-2 or dashed.

## Do's and Don'ts

### Do:
- **Do** wrap every new practice block in the Activity frame and end it with Feedback that explains the answer, then Score and Try again.
- **Do** build new lessons in MDX from the registered blocks (Section, PatternMorph, ChoiceSet, SortBuckets, InlineChoice, GapFill, SpotMistake, SentenceBuilder, StopTimeline, FlipCards, Contrast, Examples, Tip, VerbFinder, VerbList, Results) before inventing a new component.
- **Do** keep corners at 12px for containers and answers, 8px for chips, 6px for in-line marks.
- **Do** keep tappable answers at 44px minimum height (48px for answer options) and text inputs at 16px to avoid phone zoom.
- **Do** mark the grammar part of an example with the pattern hue on its soft tint, and use the same hue for that pattern everywhere on the page.
- **Do** honor prefers-reduced-motion: every morph and slide must collapse to a fade or nothing.
- **Do** write student-facing copy without em dashes or middle dots.

### Don't:
- **Don't** put shadows on cards, Activity frames, callouts or buttons; shadow is reserved for a dragged chip.
- **Don't** introduce a second action color or use blue decoratively.
- **Don't** use green or red outside answer feedback (no green "tip" or red "careful" callouts; callouts stay neutral surface with ink icons).
- **Don't** reassign pattern hues to new meanings or enlarge them into backgrounds and banners.
- **Don't** add banner heroes, stock photography or icon-card grids.
- **Don't** add small label lines (eyebrows or kickers) above headings; the heading and its metadata row carry the context.
- **Don't** add a new type family or set display text in a system face; Geist through next/font only.
