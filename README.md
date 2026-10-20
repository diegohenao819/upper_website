# Upper-Intermediate English (LI436)

Interactive companion site for the Upper-Intermediate English course, Licenciatura en Bilingüismo con Énfasis en Inglés, Universidad Tecnológica de Pereira. Built with Next.js (App Router), MDX, Tailwind CSS, Motion and dnd-kit.

Students learn each topic by doing: choosing, sorting, building sentences and writing answers, with instant feedback that explains every answer. Progress is saved only in the student's browser (no accounts, no database).

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Publish a new entry

1. **Write the lesson** in `src/content/lessons/<slug>.mdx`. Use `src/content/lessons/verb-patterns.mdx` as the model. Wrap each part in `<Section id="..." title="...">`.
2. **Register its sections and activities** in `src/content/lessons/meta.ts`. Every activity `id` must match the `id` prop of a practice block in the MDX file.
3. **Load the file** in `src/content/lessons/index.ts` (one line).
4. **Open it** in `src/content/topics.ts`: change the topic's `status` from `"planned"` to `"published"` and add `minutes` (and `guidePdf` if there is a PDF in `public/guides/`).

Push to GitHub and Vercel publishes it.

## Blocks you can use in any lesson

No import needed inside `.mdx` files.

| Block | What students do |
|---|---|
| `PatternMorph` | Change verb 1 and watch verb 2 transform (verb patterns) |
| `ChoiceSet` | Multiple choice, one question at a time, with explanations |
| `SortBuckets` | Drag words into groups (tap to place on phones) |
| `InlineChoice` | Choose the right form inside a text: `{to live*\|living::reason}` |
| `GapFill` | Write the answer; several correct answers allowed |
| `SpotMistake` | Tap the wrong words: `She suggested [to go] to the beach.` |
| `SentenceBuilder` | Put the pieces of a sentence in order |
| `FlipCards` | Read, guess, flip to see the meaning |
| `StopTimeline` | Animated timeline: stopped to help vs stopped helping |
| `Examples`, `VerbList`, `Tip`, `Contrast`, `Figure`, `VerbFinder` | Reference content |
| `Results` | Score summary at the end of a lesson |

Inside examples, `[brackets]` mark the highlighted part and `**double stars**` mark the object.

## Deploy

Push the repository to GitHub, then import it in Vercel (framework preset: Next.js, no environment variables needed).

## Style notes

- Student-facing text avoids em dashes and middle dots.
- Images need a license that allows reuse; credit them in the caption.
