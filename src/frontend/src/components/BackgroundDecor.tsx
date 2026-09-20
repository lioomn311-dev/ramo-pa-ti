import { HeartDoodle } from "@/components/HandLettering";

/**
 * Full-viewport decorative background: soft yellow and pink blobs, gentle pink
 * waves, and scattered hand-drawn heart and star doodles. Everything is
 * positioned with percentages so it reflows on mobile, and sits behind the
 * card. Kept low-contrast so the card stays the focus.
 */

type Doodle = {
  kind: "heart" | "star";
  left: string;
  top: string;
  size: number;
  rotate: number;
  delay: string;
  duration: string;
  filled?: boolean;
};

const DOODLES: Doodle[] = [
  {
    kind: "heart",
    left: "7%",
    top: "9%",
    size: 30,
    rotate: -14,
    delay: "0s",
    duration: "7s",
    filled: true,
  },
  {
    kind: "star",
    left: "88%",
    top: "7%",
    size: 26,
    rotate: 12,
    delay: "1.2s",
    duration: "9s",
  },
  {
    kind: "heart",
    left: "92%",
    top: "26%",
    size: 22,
    rotate: 18,
    delay: "0.6s",
    duration: "8s",
  },
  {
    kind: "star",
    left: "5%",
    top: "34%",
    size: 20,
    rotate: -8,
    delay: "2s",
    duration: "10s",
  },
  {
    kind: "heart",
    left: "12%",
    top: "62%",
    size: 26,
    rotate: 10,
    delay: "1.6s",
    duration: "7.5s",
    filled: true,
  },
  {
    kind: "star",
    left: "90%",
    top: "58%",
    size: 24,
    rotate: -16,
    delay: "0.3s",
    duration: "8.5s",
  },
  {
    kind: "heart",
    left: "84%",
    top: "82%",
    size: 28,
    rotate: -6,
    delay: "2.4s",
    duration: "9.5s",
  },
  {
    kind: "star",
    left: "9%",
    top: "86%",
    size: 22,
    rotate: 14,
    delay: "1s",
    duration: "7.2s",
  },
  {
    kind: "heart",
    left: "48%",
    top: "4%",
    size: 18,
    rotate: 8,
    delay: "1.8s",
    duration: "8.2s",
  },
  {
    kind: "star",
    left: "62%",
    top: "94%",
    size: 20,
    rotate: -10,
    delay: "0.9s",
    duration: "9.2s",
  },
];

function StarDoodle({ size, color }: { size: number; color: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      width={size}
      height={size}
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

export function BackgroundDecor() {
  return (
    <div
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
    >
      {/* cream paper base with faint confetti specks */}
      <div className="absolute inset-0 bg-paper" />
      <div className="paper-grain absolute inset-0 opacity-70" />

      {/* soft yellow and pink blobs */}
      <div
        className="absolute -left-[12%] -top-[10%] h-[46vmin] w-[46vmin] rounded-full blur-3xl"
        style={{ background: "oklch(var(--tulip) / 0.28)" }}
      />
      <div
        className="absolute -right-[14%] top-[6%] h-[52vmin] w-[52vmin] rounded-full blur-3xl"
        style={{ background: "oklch(var(--ribbon) / 0.26)" }}
      />
      <div
        className="absolute -bottom-[16%] left-[8%] h-[54vmin] w-[54vmin] rounded-full blur-3xl"
        style={{ background: "oklch(var(--ribbon) / 0.22)" }}
      />
      <div
        className="absolute bottom-[4%] right-[2%] h-[40vmin] w-[40vmin] rounded-full blur-3xl"
        style={{ background: "oklch(var(--tulip) / 0.24)" }}
      />

      {/* gentle pink waves */}
      <svg
        className="absolute inset-x-0 top-[18%] h-[26vmin] w-full opacity-60"
        viewBox="0 0 1200 200"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M0 120 C180 60 320 170 520 120 C720 70 860 170 1060 120 C1130 104 1180 110 1200 118"
          fill="none"
          stroke="oklch(var(--ribbon) / 0.4)"
          strokeWidth={5}
          strokeLinecap="round"
        />
        <path
          d="M0 160 C200 110 340 200 560 156 C780 112 900 196 1120 152 C1160 144 1185 148 1200 152"
          fill="none"
          stroke="oklch(var(--ribbon) / 0.28)"
          strokeWidth={4}
          strokeLinecap="round"
        />
      </svg>
      <svg
        className="absolute inset-x-0 bottom-[10%] h-[22vmin] w-full opacity-50"
        viewBox="0 0 1200 200"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M0 90 C220 150 380 40 600 96 C820 152 980 46 1200 100"
          fill="none"
          stroke="oklch(var(--ribbon) / 0.34)"
          strokeWidth={5}
          strokeLinecap="round"
        />
      </svg>

      {/* scattered hand-drawn doodles */}
      {DOODLES.map((doodle) => (
        <span
          key={`${doodle.kind}-${doodle.left}-${doodle.top}`}
          className="absolute animate-float"
          style={{
            left: doodle.left,
            top: doodle.top,
            animationDelay: doodle.delay,
            animationDuration: doodle.duration,
            transform: `rotate(${doodle.rotate}deg)`,
          }}
        >
          {doodle.kind === "heart" ? (
            <HeartDoodle
              size={doodle.size}
              filled={doodle.filled}
              color={
                doodle.filled
                  ? "oklch(var(--ribbon) / 0.55)"
                  : "oklch(var(--ribbon) / 0.6)"
              }
            />
          ) : (
            <StarDoodle
              size={doodle.size}
              color="oklch(var(--tulip-deep) / 0.7)"
            />
          )}
        </span>
      ))}
    </div>
  );
}
