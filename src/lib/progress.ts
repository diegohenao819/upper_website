"use client";

import { useSyncExternalStore } from "react";

// Progress lives only in the student's browser (no accounts, no server).
// Shape: { lessons: { [slug]: { exercises: { [id]: Result }, lastSection?: Place } } }

export type Result = { correct: number; total: number; done: boolean };
export type Place = { id: string; label: string; at: number };
type LessonState = { exercises: Record<string, Result>; lastSection?: Place };
type State = { lessons: Record<string, LessonState> };

const KEY = "uie-progress-v1";
const EMPTY: State = { lessons: {} };

let state: State = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) state = JSON.parse(raw) as State;
  } catch {
    state = EMPTY;
  }
}

function save() {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // storage blocked (private mode): progress just won't persist
  }
}

function update(fn: (s: State) => State) {
  load();
  state = fn(state);
  save();
  listeners.forEach((l) => l());
}

function subscribe(l: () => void) {
  load();
  listeners.add(l);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      loaded = false;
      load();
      l();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(l);
    window.removeEventListener("storage", onStorage);
  };
}

const getSnapshot = () => {
  load();
  return state;
};
const getServerSnapshot = () => EMPTY;

export function useProgress() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function recordResult(lesson: string, id: string, result: Result) {
  update((s) => {
    const l = s.lessons[lesson] ?? { exercises: {} };
    return {
      lessons: { ...s.lessons, [lesson]: { ...l, exercises: { ...l.exercises, [id]: result } } },
    };
  });
}

export function recordPlace(lesson: string, place: Place) {
  update((s) => {
    const l = s.lessons[lesson] ?? { exercises: {} };
    if (l.lastSection?.id === place.id) return s;
    return { lessons: { ...s.lessons, [lesson]: { ...l, lastSection: place } } };
  });
}

export function resetLesson(lesson: string) {
  update((s) => {
    const rest = { ...s.lessons };
    delete rest[lesson];
    return { lessons: rest };
  });
}

export function lessonSummary(s: State, lesson: string, exerciseCount: number) {
  const l = s.lessons[lesson];
  const results = l ? Object.values(l.exercises) : [];
  const done = results.filter((r) => r.done).length;
  const correct = results.reduce((a, r) => a + r.correct, 0);
  const total = results.reduce((a, r) => a + r.total, 0);
  return {
    done,
    exerciseCount,
    ratio: exerciseCount ? Math.min(1, done / exerciseCount) : 0,
    correct,
    total,
    lastSection: l?.lastSection,
  };
}
