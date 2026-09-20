/**
 * Hand-drawn bouquet of yellow tulips wrapped in a kraft paper cone and tied
 * with a pink ribbon. Drawn as one inline SVG so it scales cleanly and stays
 * in the shared OKLCH palette. Purely decorative — the card text carries the
 * meaning, so the SVG is hidden from assistive tech.
 */

type Tulip = {
  x: number;
  y: number;
  scale: number;
  rot: number;
  /** stem control point, relative to the wrap mouth */
  stemX: number;
};

const TULIPS: Tulip[] = [
  { x: 300, y: 96, scale: 1.0, rot: -2, stemX: 300 },
  { x: 246, y: 108, scale: 0.96, rot: -9, stemX: 268 },
  { x: 354, y: 108, scale: 0.96, rot: 9, stemX: 332 },
  { x: 196, y: 132, scale: 0.92, rot: -16, stemX: 240 },
  { x: 404, y: 132, scale: 0.92, rot: 16, stemX: 360 },
  { x: 300, y: 138, scale: 0.94, rot: 1, stemX: 300 },
  { x: 152, y: 168, scale: 0.88, rot: -22, stemX: 214 },
  { x: 448, y: 168, scale: 0.88, rot: 22, stemX: 386 },
  { x: 248, y: 158, scale: 0.9, rot: -6, stemX: 272 },
  { x: 352, y: 158, scale: 0.9, rot: 6, stemX: 328 },
  { x: 200, y: 190, scale: 0.86, rot: -14, stemX: 244 },
  { x: 400, y: 190, scale: 0.86, rot: 14, stemX: 356 },
  { x: 300, y: 186, scale: 0.88, rot: 0, stemX: 300 },
  { x: 258, y: 214, scale: 0.82, rot: -5, stemX: 278 },
  { x: 342, y: 214, scale: 0.82, rot: 5, stemX: 322 },
  { x: 168, y: 216, scale: 0.8, rot: -20, stemX: 226 },
  { x: 432, y: 216, scale: 0.8, rot: 20, stemX: 374 },
  { x: 300, y: 236, scale: 0.78, rot: 0, stemX: 300 },
];

function TulipHead({
  x,
  y,
  scale,
  rot,
}: { x: number; y: number; scale: number; rot: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${scale})`}>
      {/* cup body */}
      <path
        d="M-26 4 C-30 -18 -22 -38 -12 -46 C-6 -50 6 -50 12 -46 C22 -38 30 -18 26 4 C22 18 -22 18 -26 4 Z"
        fill="oklch(var(--tulip))"
        stroke="oklch(var(--tulip-deep))"
        strokeWidth={3.4}
        strokeLinejoin="round"
      />
      {/* left petal */}
      <path
        d="M-13 -44 C-20 -30 -24 -12 -22 6 C-16 12 -10 10 -8 2 C-10 -16 -11 -32 -13 -44 Z"
        fill="oklch(var(--tulip-deep))"
        opacity={0.55}
      />
      {/* right petal */}
      <path
        d="M13 -44 C20 -30 24 -12 22 6 C16 12 10 10 8 2 C10 -16 11 -32 13 -44 Z"
        fill="oklch(var(--tulip-deep))"
        opacity={0.4}
      />
      {/* centre petal line */}
      <path
        d="M0 -46 C-2 -28 -2 -10 0 6"
        fill="none"
        stroke="oklch(var(--tulip-deep))"
        strokeWidth={2.6}
        strokeLinecap="round"
        opacity={0.75}
      />
      {/* hand-drawn wobble accents */}
      <path
        d="M-18 -30 C-14 -34 -10 -36 -6 -37"
        fill="none"
        stroke="oklch(var(--tulip-deep))"
        strokeWidth={2}
        strokeLinecap="round"
        opacity={0.5}
      />
    </g>
  );
}

export function Bouquet({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 760"
      className={className}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      focusable="false"
      role="presentation"
    >
      <defs>
        <linearGradient id="wrapShade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="oklch(var(--paper-wrap-deep))" />
          <stop offset="38%" stopColor="oklch(var(--paper-wrap))" />
          <stop offset="72%" stopColor="oklch(var(--paper-wrap))" />
          <stop offset="100%" stopColor="oklch(var(--paper-wrap-deep))" />
        </linearGradient>
        <linearGradient id="ribbonShade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(var(--ribbon))" />
          <stop offset="100%" stopColor="oklch(var(--ribbon-deep))" />
        </linearGradient>
      </defs>

      {/* ---- stems gathering into the wrap ---- */}
      <g
        stroke="oklch(var(--leaf))"
        strokeWidth={9}
        strokeLinecap="round"
        fill="none"
      >
        {TULIPS.map((t) => (
          <path
            key={`stem-${t.x}-${t.y}`}
            d={`M${t.x} ${t.y + 30} C${t.x} ${t.y + 120} ${t.stemX} 300 ${t.stemX} 430`}
          />
        ))}
      </g>
      {/* stem shadows for depth */}
      <g
        stroke="oklch(var(--leaf-deep))"
        strokeWidth={3}
        strokeLinecap="round"
        fill="none"
        opacity={0.5}
      >
        {TULIPS.filter((_, i) => i % 3 === 0).map((t) => (
          <path
            key={`stem-shade-${t.x}-${t.y}`}
            d={`M${t.x + 4} ${t.y + 40} C${t.x + 4} ${t.y + 130} ${t.stemX + 4} 300 ${t.stemX + 4} 430`}
          />
        ))}
      </g>

      {/* ---- leaves fanning out of the wrap ---- */}
      <g
        fill="oklch(var(--leaf))"
        stroke="oklch(var(--leaf-deep))"
        strokeWidth={3}
        strokeLinejoin="round"
      >
        <path d="M300 430 C250 400 190 372 140 356 C176 392 232 424 300 452 Z" />
        <path d="M300 430 C350 400 410 372 460 356 C424 392 368 424 300 452 Z" />
        <path d="M300 440 C262 424 214 410 176 406 C214 428 258 448 300 462 Z" />
        <path d="M300 440 C338 424 386 410 424 406 C386 428 342 448 300 462 Z" />
      </g>
      <g
        stroke="oklch(var(--leaf-deep))"
        strokeWidth={2.4}
        strokeLinecap="round"
        fill="none"
        opacity={0.6}
      >
        <path d="M300 440 C250 414 196 388 148 364" />
        <path d="M300 440 C350 414 404 388 452 364" />
      </g>

      {/* ---- kraft paper cone ---- */}
      <path
        d="M300 300 C356 300 404 322 424 360 C452 414 452 470 430 528 C410 580 366 620 300 640 C234 620 190 580 170 528 C148 470 148 414 176 360 C196 322 244 300 300 300 Z"
        fill="url(#wrapShade)"
        stroke="oklch(var(--paper-wrap-deep))"
        strokeWidth={4}
        strokeLinejoin="round"
      />
      {/* crumpled top edge of the wrap */}
      <path
        d="M176 360 C204 340 240 330 268 336 C286 340 296 352 300 362 C304 352 314 340 332 336 C360 330 396 340 424 360"
        fill="none"
        stroke="oklch(var(--paper-wrap-deep))"
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* vertical fold lines */}
      <g
        stroke="oklch(var(--paper-wrap-deep))"
        strokeWidth={3}
        strokeLinecap="round"
        fill="none"
        opacity={0.75}
      >
        <path d="M300 306 C298 380 298 500 300 636" />
        <path d="M246 314 C238 392 232 512 244 620" />
        <path d="M354 314 C362 392 368 512 356 620" />
        <path d="M198 348 C186 420 180 520 200 592" />
        <path d="M402 348 C414 420 420 520 400 592" />
      </g>
      {/* fold highlights */}
      <g
        stroke="oklch(var(--paper-wrap))"
        strokeWidth={5}
        strokeLinecap="round"
        fill="none"
        opacity={0.55}
      >
        <path d="M272 320 C266 396 262 512 272 616" />
        <path d="M328 320 C334 396 338 512 328 616" />
      </g>
      {/* crumple creases near the mouth */}
      <g
        stroke="oklch(var(--paper-wrap-deep))"
        strokeWidth={2.4}
        strokeLinecap="round"
        fill="none"
        opacity={0.5}
      >
        <path d="M214 372 C232 384 250 392 268 396" />
        <path d="M386 372 C368 384 350 392 332 396" />
        <path d="M232 560 C258 574 282 582 300 584" />
        <path d="M368 560 C342 574 318 582 300 584" />
      </g>

      {/* ---- pink ribbon: knot, two loops, two tails ---- */}
      <g>
        {/* left loop */}
        <path
          d="M300 566 C262 528 214 522 200 548 C186 574 224 600 300 578 Z"
          fill="url(#ribbonShade)"
          stroke="oklch(var(--ribbon-deep))"
          strokeWidth={4}
          strokeLinejoin="round"
        />
        {/* right loop */}
        <path
          d="M300 566 C338 528 386 522 400 548 C414 574 376 600 300 578 Z"
          fill="url(#ribbonShade)"
          stroke="oklch(var(--ribbon-deep))"
          strokeWidth={4}
          strokeLinejoin="round"
        />
        {/* loop inner folds */}
        <g
          stroke="oklch(var(--ribbon-deep))"
          strokeWidth={2.6}
          strokeLinecap="round"
          fill="none"
          opacity={0.6}
        >
          <path d="M292 566 C266 548 234 542 216 550" />
          <path d="M308 566 C334 548 366 542 384 550" />
        </g>
        {/* hanging tails */}
        <path
          d="M288 578 C276 620 262 664 250 706 C266 700 280 690 292 676 C296 644 296 610 296 584 Z"
          fill="url(#ribbonShade)"
          stroke="oklch(var(--ribbon-deep))"
          strokeWidth={4}
          strokeLinejoin="round"
        />
        <path
          d="M312 578 C326 618 342 660 356 700 C340 696 324 686 312 672 C308 642 308 608 308 584 Z"
          fill="url(#ribbonShade)"
          stroke="oklch(var(--ribbon-deep))"
          strokeWidth={4}
          strokeLinejoin="round"
        />
        {/* tail folds */}
        <g
          stroke="oklch(var(--ribbon-deep))"
          strokeWidth={2.4}
          strokeLinecap="round"
          fill="none"
          opacity={0.55}
        >
          <path d="M282 596 C276 634 268 668 258 696" />
          <path d="M320 596 C328 632 338 666 348 694" />
        </g>
        {/* knot */}
        <path
          d="M300 548 C316 548 326 558 326 570 C326 582 314 590 300 590 C286 590 274 582 274 570 C274 558 284 548 300 548 Z"
          fill="oklch(var(--ribbon))"
          stroke="oklch(var(--ribbon-deep))"
          strokeWidth={4}
          strokeLinejoin="round"
        />
        <path
          d="M286 562 C292 556 308 556 314 562"
          fill="none"
          stroke="oklch(var(--ribbon-deep))"
          strokeWidth={2.4}
          strokeLinecap="round"
          opacity={0.6}
        />
      </g>

      {/* ---- tulip heads on top ---- */}
      {TULIPS.map((t) => (
        <TulipHead
          key={`head-${t.x}-${t.y}`}
          x={t.x}
          y={t.y}
          scale={t.scale}
          rot={t.rot}
        />
      ))}
    </svg>
  );
}
