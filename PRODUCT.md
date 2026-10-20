# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js (App Router, TypeScript), deployed on Vercel from a GitHub repository. Chosen by the course professor. Lessons are MDX files in the repo that combine prose with reusable interactive blocks.

## Users

Students of LI436 Upper-Intermediate English (Licenciatura en Bilingüismo con Énfasis en Inglés, Universidad Tecnológica de Pereira, Colombia), CEFR B1.2 target, Spanish-speaking future English teachers. In semester 2026-II the course is mainly online and asynchronous, so students study alone, often on phones, between other courses.

The author is Diego Henao, one of the course professors, who adds new entries over the semester with help from Claude.

## Product Purpose

A companion website with one entry per language topic of the course. Each entry teaches the topic from zero for self-study and lets students learn by doing: sorting, dragging, answering questions with instant feedback. Success: a student who has never heard of the topic can understand it, practice it, and know whether they got it right, without a teacher present.

## Positioning

Built by the course's own professor around the course's own syllabus, themes (Globalization, Human Rights) and the typical errors of Spanish-speaking learners. Not a generic grammar site.

## Operating Context

- Official grades, submissions and deadlines live in Kevra (the LMS), not here. The site is self-study practice and reference.
- Topics follow the 2026-II schedule: Period 1 Globalization (vocabulary and reading, reported speech, types of sentences, response paragraph, Project 1 oral presentation); Period 2 Human Rights (verb patterns, reading and discussion, suffixes prefixes and collocations, idioms and -ed pronunciation, Project 2 video podcast).
- Entries are published progressively as the course advances; unpublished topics appear as upcoming.
- Each entry may have a companion PDF learning guide (the Verb Patterns guide exists).

## Capabilities and Constraints

- No login, no database. Progress and scores are saved only in the student's browser (localStorage) and must degrade gracefully when storage is unavailable.
- No personal data collected.
- Content is in English (the target language); short Spanish notes are allowed where they clarify contrasts with Spanish.
- Must work well on phones; every drag interaction needs a tap or keyboard alternative.

## Brand Commitments

- Identity of the course itself: "Upper-Intermediate English", course code LI436. UTP is mentioned in text only; no institutional logos or colors.
- Style preference of the author: no em dashes and no middle dots in student-facing text.
- Visual direction (chosen 2026-10-19): the category standard for modern learning sites, executed at full craft, not a themed concept. Quality bar: Brilliant.org (learn by manipulating, minimal), Duolingo web (instant, clear feedback), Khan Academy (lesson structure and visible progress), BBC Learning English (trustworthy English content).

## Evidence on Hand

- Course syllabus: `Upper Intermediate English 2026 II Revised Student Syllabus.docx`.
- Verb Patterns content: learning guide v2 (6 patterns, verb lists, common mistakes, exercises with answer key).
- No testimonials, usage data or student results exist; do not fabricate any.

## Product Principles

1. Learn by doing: every concept is followed by an interaction that checks it.
2. Feedback explains, not just marks: every answer says why.
3. Clear and short beats complete: no walls of text.
4. Built to grow: a new entry should be one content file plus existing blocks.
5. Respect the student's context: works on a phone, offline-tolerant, no accounts.

## Accessibility & Inclusion

Keyboard and screen-reader access for all interactive blocks, tap alternatives to drag and drop, sufficient contrast, reduced-motion support.
