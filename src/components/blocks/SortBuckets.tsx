"use client";

import { useMemo, useState } from "react";
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { Check, X } from "lucide-react";
import { Activity, Feedback, PrimaryButton, ResetButton, Score } from "./shared";
import { useRecord } from "@/components/lesson/LessonContext";
import { cn } from "@/lib/cn";

type Bucket = { id: string; label: string; hint?: string; color?: string };
type Item = { word: string; bucket: string };

const POOL = "__pool";

export function SortBuckets({
  id,
  title = "Sort the verbs",
  instructions = "Drag each verb to its group. On a phone, tap a verb and then tap a group.",
  buckets,
  items,
}: {
  id: string;
  title?: string;
  instructions?: string;
  buckets: Bucket[];
  items: Item[];
}) {
  const record = useRecord(id);
  const initial = useMemo(() => Object.fromEntries(items.map((i) => [i.word, POOL])), [items]);
  const [place, setPlace] = useState<Record<string, string>>(initial);
  const [selected, setSelected] = useState<string | null>(null);
  const [dragging, setDragging] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 120, tolerance: 6 } }),
    useSensor(KeyboardSensor),
  );

  const answer = Object.fromEntries(items.map((i) => [i.word, i.bucket]));
  const allPlaced = items.every((i) => place[i.word] !== POOL);
  const correct = items.filter((i) => place[i.word] === i.bucket).length;

  function move(word: string, to: string) {
    if (checked) return;
    setPlace((p) => ({ ...p, [word]: to }));
    setSelected(null);
  }

  function onDragStart(e: DragStartEvent) {
    setDragging(String(e.active.id));
    setSelected(null);
  }
  function onDragEnd(e: DragEndEvent) {
    setDragging(null);
    if (e.over) move(String(e.active.id), String(e.over.id));
  }

  function check() {
    setChecked(true);
    record({ correct, total: items.length, done: true });
  }
  function reset() {
    setPlace(initial);
    setChecked(false);
    setSelected(null);
  }

  const inZone = (zone: string) => items.filter((i) => place[i.word] === zone);

  return (
    <Activity title={title} instructions={instructions}>
      <DndContext id={`dnd-${id}`} sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd} onDragCancel={() => setDragging(null)}>
        <LayoutGroup id={id}>
          <Zone
            id={POOL}
            onTap={() => selected && move(selected, POOL)}
            className="mb-4 min-h-[72px] rounded-xl bg-surface p-3"
            label="Verbs to sort"
            active={!!selected}
          >
            {inZone(POOL).length === 0 ? (
              <p className="px-1 py-2 text-sm text-ink-3">All verbs placed.{!checked && " Check your answers."}</p>
            ) : (
              inZone(POOL).map((i) => (
                <Chip
                  key={i.word}
                  word={i.word}
                  selected={selected === i.word}
                  hidden={dragging === i.word}
                  onTap={() => setSelected((s) => (s === i.word ? null : i.word))}
                />
              ))
            )}
          </Zone>

          <div className={cn("grid gap-3", buckets.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2")}>
            {buckets.map((b) => (
              <Zone
                key={b.id}
                id={b.id}
                label={b.label}
                onTap={() => selected && move(selected, b.id)}
                active={!!selected}
                className="flex min-h-[150px] flex-col rounded-xl border-2 border-dashed border-line-strong p-3"
                header={
                  <div className="mb-2 flex items-center gap-2 px-1">
                    {b.color && <span className="size-2.5 rounded-full" style={{ backgroundColor: b.color }} aria-hidden="true" />}
                    <span className="text-sm font-semibold text-ink">{b.label}</span>
                    {b.hint && <span className="text-xs text-ink-3">{b.hint}</span>}
                  </div>
                }
              >
                {inZone(b.id).map((i) => (
                  <Chip
                    key={i.word}
                    word={i.word}
                    selected={selected === i.word}
                    hidden={dragging === i.word}
                    status={checked ? (answer[i.word] === b.id ? "right" : "wrong") : undefined}
                    fix={checked && answer[i.word] !== b.id ? buckets.find((x) => x.id === answer[i.word])?.label : undefined}
                    onTap={() => setSelected((s) => (s === i.word ? null : i.word))}
                  />
                ))}
              </Zone>
            ))}
          </div>
        </LayoutGroup>

        <DragOverlay dropAnimation={{ duration: 220, easing: "cubic-bezier(0.16, 1, 0.3, 1)" }}>
          {dragging ? <ChipFace word={dragging} lifted /> : null}
        </DragOverlay>
      </DndContext>

      <Feedback show={checked} correct={correct === items.length} title={correct === items.length ? "Perfect sorting!" : "Some verbs are in the wrong group."}>
        {correct === items.length
          ? "Every verb is in the right group."
          : "The red verbs show the group they belong to. Read them again, then try once more."}
      </Feedback>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        {checked ? <Score correct={correct} total={items.length} /> : <span className="text-sm text-ink-3 tabular">{items.length - inZone(POOL).length}/{items.length} placed</span>}
        <div className="flex gap-2">
          {checked ? (
            <ResetButton onClick={reset} />
          ) : (
            <PrimaryButton onClick={check} disabled={!allPlaced}>
              Check
            </PrimaryButton>
          )}
        </div>
      </div>
    </Activity>
  );
}

function Zone({
  id,
  label,
  header,
  children,
  className,
  onTap,
  active,
}: {
  id: string;
  label: string;
  header?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  onTap: () => void;
  active: boolean;
}) {
  const { setNodeRef, isOver } = useDroppable({ id });
  return (
    <div
      ref={setNodeRef}
      role="group"
      aria-label={label}
      onClick={(e) => {
        if (e.target === e.currentTarget || (e.target as HTMLElement).dataset.zonepad) onTap();
      }}
      className={cn(
        className,
        "transition-[border-color,background-color] duration-200",
        isOver && "border-accent bg-accent-soft",
        active && !isOver && "cursor-pointer border-accent/60",
      )}
    >
      {header && <div data-zonepad onClick={onTap}>{header}</div>}
      <div data-zonepad className="flex flex-1 flex-wrap content-start gap-2" onClick={(e) => e.target === e.currentTarget && onTap()}>
        {children}
      </div>
    </div>
  );
}

function Chip({
  word,
  selected,
  hidden,
  status,
  fix,
  onTap,
}: {
  word: string;
  selected: boolean;
  hidden: boolean;
  status?: "right" | "wrong";
  fix?: string;
  onTap: () => void;
}) {
  const { attributes, listeners, setNodeRef } = useDraggable({ id: word, disabled: !!status });
  return (
    <motion.button
      layout
      layoutId={word}
      transition={{ type: "spring", stiffness: 500, damping: 38 }}
      ref={setNodeRef}
      type="button"
      {...listeners}
      {...attributes}
      onClick={onTap}
      aria-pressed={selected}
      aria-label={`${word}${status === "right" ? ", correct" : status === "wrong" ? `, incorrect, belongs in ${fix}` : ""}`}
      className={cn("touch-none rounded-lg outline-offset-2", hidden && "opacity-30")}
    >
      <ChipFace word={word} selected={selected} status={status} fix={fix} />
    </motion.button>
  );
}

function ChipFace({
  word,
  selected,
  status,
  fix,
  lifted,
}: {
  word: string;
  selected?: boolean;
  status?: "right" | "wrong";
  fix?: string;
  lifted?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex min-h-10 items-center gap-1.5 rounded-lg border px-3 text-[15px] font-medium transition-[background-color,border-color,box-shadow] duration-150",
        !status && !selected && "cursor-grab border-line-strong bg-white text-ink shadow-[0_1px_0_rgb(20_22_27/0.06)] hover:border-ink-3",
        selected && !status && "border-accent bg-accent text-white",
        status === "right" && "border-good/40 bg-good-soft text-[#0b5a3a]",
        status === "wrong" && "border-bad/40 bg-bad-soft text-[#8f1d27]",
        lifted && "cursor-grabbing border-ink bg-white shadow-[0_8px_24px_rgb(20_22_27/0.18)]",
      )}
    >
      {word}
      {status === "right" && <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />}
      {status === "wrong" && (
        <>
          <X className="size-3.5" strokeWidth={3} aria-hidden="true" />
          <AnimatePresence>
            <motion.span initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: "auto" }} className="overflow-hidden whitespace-nowrap text-xs font-semibold">
              {fix}
            </motion.span>
          </AnimatePresence>
        </>
      )}
    </span>
  );
}
