import type { CSSProperties, ReactNode } from "react";

/**
 * Hand-drawn lettering.
 *
 * No handwritten/script webfont is reachable in this environment, so every
 * phrase on the card is drawn as inline SVG strokes. Each glyph is a small
 * set of stroke paths on a 100-unit em box; the composer lays them out with
 * a per-letter wobble so the result reads as written by hand rather than
 * typeset. Every phrase also carries its exact string as accessible text.
 */

type Glyph = {
  /** advance width in em units */
  w: number;
  /** stroke paths, coordinates in a 0..100 x 0..100 em box (baseline at y=100) */
  d: string[];
};

const G: Record<string, Glyph> = {
  a: {
    w: 62,
    d: [
      "M56 44 C48 34 34 34 28 46 C22 58 26 74 38 76 C48 78 56 70 56 58 C56 50 56 44 56 40",
      "M56 40 C56 56 56 68 58 76",
    ],
  },
  b: {
    w: 60,
    d: [
      "M18 8 C17 34 16 60 16 78",
      "M18 46 C26 36 40 36 46 46 C52 58 46 74 34 76 C26 78 20 72 18 64",
    ],
  },
  c: {
    w: 54,
    d: ["M48 44 C40 34 26 36 22 48 C18 60 24 74 36 76 C42 77 46 74 48 70"],
  },
  d: {
    w: 60,
    d: [
      "M46 8 C45 34 44 60 44 78",
      "M46 46 C38 36 24 36 18 46 C12 58 18 74 30 76 C38 77 44 72 46 64",
    ],
  },
  e: {
    w: 56,
    d: [
      "M20 58 C30 58 42 58 48 56 C50 46 42 36 32 38 C22 40 18 52 20 62 C22 72 32 78 42 74",
    ],
  },
  f: {
    w: 46,
    d: [
      "M42 12 C34 8 28 14 28 24 C28 44 28 62 28 78",
      "M14 42 C22 40 32 40 40 42",
    ],
  },
  g: {
    w: 60,
    d: [
      "M56 44 C48 34 34 34 28 46 C22 58 26 74 38 76 C48 78 56 70 56 58 C56 50 56 44 56 40",
      "M56 40 C56 62 56 80 54 92 C52 104 40 108 32 102",
    ],
  },
  h: {
    w: 58,
    d: [
      "M18 8 C17 34 16 60 16 78",
      "M18 46 C26 36 38 36 42 46 C46 56 46 68 46 78",
    ],
  },
  i: {
    w: 26,
    d: ["M14 44 C13 56 13 68 13 78", "M14 26 C13 29 14 31 16 30"],
  },
  j: {
    w: 34,
    d: [
      "M24 44 C23 58 23 72 22 84 C21 96 12 100 6 94",
      "M24 26 C23 29 24 31 26 30",
    ],
  },
  k: {
    w: 54,
    d: [
      "M18 8 C17 34 16 60 16 78",
      "M46 42 C38 52 30 60 22 66",
      "M28 60 C34 66 40 72 46 78",
    ],
  },
  l: {
    w: 26,
    d: ["M14 8 C13 34 13 60 13 78"],
  },
  m: {
    w: 84,
    d: [
      "M14 44 C13 56 13 68 13 78",
      "M14 48 C20 38 30 38 34 48 C38 58 38 68 38 78",
      "M38 48 C44 38 54 38 58 48 C62 58 62 68 62 78",
    ],
  },
  n: {
    w: 58,
    d: [
      "M16 44 C15 56 15 68 15 78",
      "M16 48 C24 38 36 38 40 48 C44 58 44 68 44 78",
    ],
  },
  o: {
    w: 60,
    d: [
      "M32 38 C22 38 16 48 16 58 C16 70 24 78 34 78 C44 78 50 68 50 58 C50 46 42 38 32 38 Z",
    ],
  },
  p: {
    w: 60,
    d: [
      "M18 44 C17 62 17 82 16 100",
      "M18 46 C26 36 40 36 46 46 C52 58 46 74 34 76 C26 78 20 72 18 64",
    ],
  },
  q: {
    w: 60,
    d: [
      "M56 44 C48 34 34 34 28 46 C22 58 26 74 38 76 C48 78 56 70 56 58 C56 50 56 44 56 40",
      "M50 68 C54 76 58 84 62 92",
    ],
  },
  r: {
    w: 44,
    d: ["M16 44 C15 56 15 68 15 78", "M16 50 C22 40 30 36 38 40"],
  },
  s: {
    w: 50,
    d: [
      "M44 44 C36 36 22 38 20 48 C18 58 32 60 40 64 C48 68 46 78 34 78 C26 78 20 74 18 70",
    ],
  },
  t: {
    w: 42,
    d: [
      "M22 16 C21 40 21 62 22 74 C23 82 30 84 36 80",
      "M8 42 C18 40 30 40 38 42",
    ],
  },
  u: {
    w: 58,
    d: [
      "M16 44 C15 58 15 70 18 76 C24 84 36 82 42 72 C46 64 46 54 46 44",
      "M46 44 C46 58 46 68 48 78",
    ],
  },
  v: {
    w: 54,
    d: ["M14 42 C20 56 26 68 30 78", "M30 78 C36 64 42 52 48 42"],
  },
  w: {
    w: 78,
    d: [
      "M12 42 C16 56 20 68 24 78",
      "M24 78 C30 64 34 54 38 46",
      "M38 46 C42 56 46 66 50 78",
      "M50 78 C56 64 60 52 66 42",
    ],
  },
  x: {
    w: 54,
    d: ["M14 42 C24 54 34 66 44 78", "M44 42 C34 54 24 66 14 78"],
  },
  y: {
    w: 54,
    d: [
      "M14 42 C20 54 26 64 30 72",
      "M46 42 C38 58 30 76 24 90 C20 100 12 102 6 96",
    ],
  },
  z: {
    w: 52,
    d: [
      "M14 42 C26 42 38 42 46 42",
      "M46 42 C34 54 22 66 14 78",
      "M14 78 C26 78 38 78 48 78",
    ],
  },
  A: {
    w: 66,
    d: [
      "M10 78 C22 52 32 28 38 10",
      "M38 10 C44 30 54 54 62 78",
      "M22 56 C34 54 46 54 54 56",
    ],
  },
  B: {
    w: 62,
    d: [
      "M18 10 C17 34 17 58 18 78",
      "M18 10 C34 8 46 14 46 26 C46 38 34 44 20 44",
      "M20 44 C38 42 52 48 52 62 C52 74 36 80 18 78",
    ],
  },
  C: {
    w: 62,
    d: ["M54 22 C46 10 28 10 20 24 C12 38 14 62 26 74 C36 84 50 82 56 72"],
  },
  D: {
    w: 64,
    d: [
      "M18 10 C17 34 17 58 18 78",
      "M18 10 C40 8 56 22 56 44 C56 66 40 80 18 78",
    ],
  },
  E: {
    w: 56,
    d: [
      "M46 12 C34 10 24 10 18 12 C17 34 17 58 18 78",
      "M18 44 C30 44 40 44 46 44",
      "M18 78 C30 78 40 78 48 76",
    ],
  },
  F: {
    w: 54,
    d: [
      "M46 12 C34 10 24 10 18 12 C17 34 17 58 18 78",
      "M18 44 C30 44 40 44 46 44",
    ],
  },
  G: {
    w: 66,
    d: [
      "M56 22 C48 10 30 10 22 24 C14 38 16 62 28 74 C38 84 54 82 58 70 C58 62 58 56 58 52",
      "M58 52 C48 52 42 52 38 52",
    ],
  },
  H: {
    w: 66,
    d: [
      "M18 10 C17 34 17 58 18 78",
      "M58 10 C57 34 57 58 58 78",
      "M18 44 C34 44 44 44 58 44",
    ],
  },
  I: {
    w: 30,
    d: ["M16 10 C15 34 15 58 16 78"],
  },
  J: {
    w: 46,
    d: ["M36 10 C35 34 35 58 34 68 C33 80 20 84 12 76"],
  },
  K: {
    w: 62,
    d: [
      "M18 10 C17 34 17 58 18 78",
      "M56 12 C44 30 32 44 22 54",
      "M30 46 C40 56 50 68 58 78",
    ],
  },
  L: {
    w: 52,
    d: ["M18 10 C17 34 17 58 18 78", "M18 78 C30 78 40 78 48 76"],
  },
  M: {
    w: 80,
    d: [
      "M14 78 C16 54 18 30 20 12",
      "M20 12 C30 34 38 52 42 62",
      "M42 62 C48 46 56 28 64 12",
      "M64 12 C66 34 66 58 66 78",
    ],
  },
  N: {
    w: 68,
    d: [
      "M16 78 C17 54 18 30 18 12",
      "M18 12 C34 34 48 56 58 78",
      "M58 78 C58 56 58 32 58 12",
    ],
  },
  O: {
    w: 70,
    d: [
      "M36 10 C20 10 12 26 12 44 C12 64 22 80 38 80 C54 80 62 64 62 44 C62 24 52 10 36 10 Z",
    ],
  },
  P: {
    w: 58,
    d: [
      "M18 10 C17 34 17 58 18 78",
      "M18 10 C36 8 50 16 50 30 C50 44 34 48 18 46",
    ],
  },
  Q: {
    w: 70,
    d: [
      "M36 10 C20 10 12 26 12 44 C12 64 22 80 38 80 C54 80 62 64 62 44 C62 24 52 10 36 10 Z",
      "M44 62 C50 70 56 78 62 86",
    ],
  },
  R: {
    w: 60,
    d: [
      "M18 10 C17 34 17 58 18 78",
      "M18 10 C36 8 50 16 50 30 C50 42 34 46 18 44",
      "M32 44 C42 56 50 68 56 78",
    ],
  },
  S: {
    w: 58,
    d: [
      "M50 20 C42 10 24 10 20 22 C16 34 34 38 44 44 C54 50 52 68 38 74 C26 79 16 74 12 66",
    ],
  },
  T: {
    w: 58,
    d: ["M10 12 C26 10 42 10 52 12", "M32 12 C31 34 31 58 32 78"],
  },
  U: {
    w: 66,
    d: ["M16 10 C15 34 15 58 18 68 C22 80 42 82 50 70 C56 60 56 34 56 10"],
  },
  V: {
    w: 62,
    d: ["M12 10 C22 34 30 58 34 78", "M34 78 C42 56 52 32 58 10"],
  },
  W: {
    w: 88,
    d: [
      "M12 10 C18 34 22 58 26 78",
      "M26 78 C34 56 40 34 44 18",
      "M44 18 C50 36 56 58 60 78",
      "M60 78 C68 56 74 32 80 10",
    ],
  },
  X: {
    w: 62,
    d: ["M12 10 C26 32 42 56 56 78", "M56 10 C42 32 26 56 12 78"],
  },
  Y: {
    w: 60,
    d: [
      "M12 10 C22 28 30 42 34 52",
      "M56 10 C46 28 38 42 34 52",
      "M34 52 C33 62 33 70 34 78",
    ],
  },
  Z: {
    w: 58,
    d: [
      "M12 12 C26 10 42 10 52 12",
      "M52 12 C38 32 24 56 12 78",
      "M12 78 C26 78 42 78 52 76",
    ],
  },
  " ": { w: 34, d: [] },
  "'": { w: 20, d: ["M12 14 C11 22 10 28 9 34"] },
  ":": { w: 22, d: ["M12 44 C11 46 12 48 14 47", "M12 72 C11 74 12 76 14 75"] },
  ".": { w: 20, d: ["M12 74 C11 76 12 78 14 77"] },
  ",": { w: 20, d: ["M12 74 C11 80 9 86 6 90"] },
  "/": { w: 34, d: ["M24 12 C18 34 12 58 8 78"] },
  "<": { w: 40, d: ["M30 40 C22 48 16 54 12 58", "M12 58 C18 62 24 68 30 76"] },
  "3": {
    w: 52,
    d: [
      "M14 22 C22 10 42 12 42 26 C42 38 30 42 22 42",
      "M22 42 C34 40 46 46 46 60 C46 74 28 82 14 72",
    ],
  },
  "0": {
    w: 52,
    d: [
      "M26 10 C14 10 10 26 10 44 C10 64 16 80 28 80 C40 80 44 62 44 44 C44 24 38 10 26 10 Z",
    ],
  },
  "1": { w: 34, d: ["M12 24 C18 20 24 16 28 12", "M26 12 C25 34 25 58 26 78"] },
  "7": { w: 50, d: ["M12 12 C26 10 40 10 48 12", "M48 12 C38 34 28 58 24 78"] },
  "4": {
    w: 54,
    d: [
      "M36 10 C30 30 22 52 12 68",
      "M12 68 C26 68 40 68 50 68",
      "M40 52 C39 62 39 70 40 78",
    ],
  },
  "2": {
    w: 52,
    d: [
      "M12 24 C18 10 40 10 44 26 C46 40 30 54 12 78",
      "M12 78 C26 78 40 78 48 76",
    ],
  },
  "9": {
    w: 52,
    d: [
      "M42 24 C36 10 16 12 14 28 C12 44 30 48 40 42",
      "M40 42 C40 58 38 72 30 80 C24 86 16 86 12 82",
    ],
  },
  "5": {
    w: 52,
    d: [
      "M42 12 C30 10 20 10 16 12 C14 24 14 34 14 40",
      "M14 40 C28 36 44 42 44 58 C44 74 26 82 12 72",
    ],
  },
  "8": {
    w: 52,
    d: [
      "M26 10 C16 10 12 20 14 28 C16 36 26 40 30 42 C38 44 44 50 44 60 C44 74 26 82 14 72 C8 64 12 50 22 44 C30 40 38 34 38 24 C38 14 32 10 26 10 Z",
    ],
  },
  "6": {
    w: 52,
    d: [
      "M42 16 C34 8 18 14 14 32 C10 50 14 72 26 78 C38 84 46 72 44 60 C42 48 30 44 22 48 C16 52 14 58 14 62",
    ],
  },
  "¡": { w: 22, d: ["M12 44 C11 58 11 68 12 78", "M12 26 C11 29 12 31 14 30"] },
  "!": { w: 22, d: ["M12 12 C11 34 11 52 12 64", "M12 74 C11 76 12 78 14 77"] },
  "¿": {
    w: 54,
    d: [
      "M16 44 C18 32 30 30 36 36 C42 42 40 52 32 58 C26 62 24 68 24 74",
      "M24 86 C23 88 24 90 26 89",
    ],
  },
  "?": {
    w: 50,
    d: [
      "M14 26 C18 12 38 12 42 26 C44 38 32 44 26 50 C22 54 22 60 22 64",
      "M22 76 C21 78 22 80 24 79",
    ],
  },
  "(": { w: 30, d: ["M22 10 C12 26 10 50 14 68 C16 76 20 82 24 86"] },
  ")": { w: 30, d: ["M10 10 C20 26 22 50 18 68 C16 76 12 82 8 86"] },
  "♡": {
    w: 62,
    d: [
      "M31 78 C18 66 8 56 8 44 C8 34 16 28 24 30 C28 31 31 35 31 39 C31 35 34 31 38 30 C46 28 54 34 54 44 C54 56 44 66 31 78 Z",
    ],
  },
  "♥": {
    w: 62,
    d: [
      "M31 78 C18 66 8 56 8 44 C8 34 16 28 24 30 C28 31 31 35 31 39 C31 35 34 31 38 30 C46 28 54 34 54 44 C54 56 44 66 31 78 Z",
    ],
  },
};

const FALLBACK: Glyph = { w: 50, d: ["M14 44 C14 56 14 68 14 78"] };

type LetteringProps = {
  text: string;
  /** rendered height of the lettering in px */
  size?: number;
  /** stroke color, any CSS color */
  color?: string;
  /** stroke width in em units (100 = full em) */
  weight?: number;
  /** extra rotation applied to the whole phrase, degrees */
  tilt?: number;
  /** per-letter vertical wobble amplitude in em units */
  wobble?: number;
  /** per-letter rotation amplitude in degrees */
  jitter?: number;
  /** deterministic seed so SSR and client agree */
  seed?: number;
  className?: string;
  style?: CSSProperties;
  /** decorative marks drawn after the phrase (e.g. sparkles) */
  children?: ReactNode;
};

function pseudoRandom(seed: number, index: number): number {
  const x = Math.sin(seed * 12.9898 + index * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

/**
 * Renders one phrase as hand-drawn SVG strokes. The SVG scales to the
 * requested `size` and the accessible string is exposed via `aria-label`.
 */
export function HandLettering({
  text,
  size = 48,
  color = "oklch(var(--ribbon))",
  weight = 9,
  tilt = 0,
  wobble = 3,
  jitter = 2.4,
  seed = 7,
  className,
  style,
  children,
}: LetteringProps) {
  const chars = Array.from(text);
  const gap = 5;

  let cursor = 0;
  const placed = chars.map((char, index) => {
    const glyph = G[char] ?? FALLBACK;
    const r1 = pseudoRandom(seed, index);
    const r2 = pseudoRandom(seed + 31, index);
    const r3 = pseudoRandom(seed + 71, index);
    const dy = (r1 - 0.5) * 2 * wobble;
    const rot = (r2 - 0.5) * 2 * jitter;
    const scale = 0.94 + r3 * 0.12;
    const x = cursor;
    cursor += glyph.w * scale + gap;
    return { char, glyph, x, dy, rot, scale, index };
  });

  const width = Math.max(cursor - gap, 1);
  const height = 118;
  const baseline = 100;

  return (
    <span
      className={className}
      style={{ display: "inline-block", lineHeight: 0, ...style }}
      role="img"
      aria-label={text}
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        height={size}
        preserveAspectRatio="xMidYMid meet"
        style={{ display: "block", overflow: "visible" }}
        aria-hidden="true"
        focusable="false"
      >
        <g transform={`rotate(${tilt} ${width / 2} ${baseline})`}>
          {placed.map(({ char, glyph, x, dy, rot, scale, index }) => (
            <g
              key={`${char}-${index}`}
              transform={`translate(${x} ${baseline + dy}) rotate(${rot} 0 0) scale(${scale})`}
            >
              {glyph.d.map((d) => (
                <path
                  key={`${char}-${index}-${d}`}
                  d={d}
                  transform="translate(0 -100)"
                  fill="none"
                  stroke={color}
                  strokeWidth={weight}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ))}
            </g>
          ))}
        </g>
        {children}
      </svg>
    </span>
  );
}

/** Small hand-drawn sparkle / star mark used around the emphasized word. */
export function Sparkle({
  size = 18,
  color = "oklch(var(--accent))",
  className,
  style,
}: {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 40 40"
      width={size}
      height={size}
      className={className}
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M20 4 C21 14 22 18 20 20 C18 18 10 17 4 20 C12 22 18 24 20 26 C22 24 30 23 36 20 C28 18 22 16 20 14 Z"
        fill="none"
        stroke={color}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Hand-drawn heart outline used for doodles and floating hearts. */
export function HeartDoodle({
  size = 24,
  color = "oklch(var(--ribbon))",
  filled = false,
  className,
  style,
}: {
  size?: number;
  color?: string;
  filled?: boolean;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 62 84"
      width={size}
      height={size * (84 / 62)}
      className={className}
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M31 78 C18 66 8 56 8 44 C8 34 16 28 24 30 C28 31 31 35 31 39 C31 35 34 31 38 30 C46 28 54 34 54 44 C54 56 44 66 31 78 Z"
        fill={filled ? color : "none"}
        stroke={color}
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
