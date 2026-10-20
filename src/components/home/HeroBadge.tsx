"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import badge from "@/assets/brand/course-badge.png";

// Word tiles in the badge's own colors. They float, and you can drag them.
const TILES = [
  { text: "learn", color: "#e8325a", x: "-4%", y: "8%", r: -8, d: 0 },
  { text: "by", color: "#1e6fd9", x: "84%", y: "4%", r: 7, d: 0.8 },
  { text: "doing", color: "#f2a900", x: "88%", y: "70%", r: -6, d: 1.6, dark: true },
  { text: "A", color: "#1c2b5a", x: "-2%", y: "74%", r: 6, d: 2.2 },
  { text: "Z", color: "#3da34a", x: "40%", y: "-6%", r: -5, d: 1.2 },
];

export function HeroBadge() {
  const reduce = useReducedMotion();
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[min(440px,82vw)]">
      {/* soft color field behind the badge */}
      <div className="absolute inset-[6%] rounded-full bg-[#eef3ff]" aria-hidden="true" />
      <motion.div
        className="absolute inset-[10%]"
        animate={reduce ? undefined : { y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image
          src={badge}
          alt="Upper-Intermediate English course badge"
          priority
          sizes="(min-width: 1024px) 360px, 70vw"
          className="h-full w-full drop-shadow-[0_18px_30px_rgb(28_43_90/0.18)]"
        />
      </motion.div>

      {TILES.map((t) => (
        <motion.div
          key={t.text}
          drag
          dragSnapToOrigin
          dragElastic={0.6}
          whileDrag={{ scale: 1.12, rotate: 0, zIndex: 10 }}
          whileHover={{ scale: 1.06 }}
          initial={{ opacity: 0, scale: 0.6, rotate: t.r }}
          animate={reduce ? { opacity: 1, scale: 1, rotate: t.r } : { opacity: 1, scale: 1, rotate: t.r, y: [0, -8, 0] }}
          transition={{
            opacity: { delay: 0.2 + t.d * 0.15, duration: 0.4 },
            scale: { delay: 0.2 + t.d * 0.15, type: "spring", stiffness: 300, damping: 18 },
            y: { duration: 4 + t.d, repeat: Infinity, ease: "easeInOut", delay: t.d },
          }}
          className="absolute cursor-grab touch-none select-none active:cursor-grabbing"
          style={{ left: t.x, top: t.y }}
          aria-hidden="true"
        >
          <span
            className="block rounded-xl px-3.5 py-2 text-[clamp(15px,2.2vw,20px)] font-semibold shadow-[0_6px_16px_rgb(20_22_27/0.16)]"
            style={{ backgroundColor: t.color, color: t.dark ? "#1c2b5a" : "#ffffff" }}
          >
            {t.text}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
