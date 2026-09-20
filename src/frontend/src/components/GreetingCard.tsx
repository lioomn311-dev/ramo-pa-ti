import { Bouquet } from "@/components/Bouquet";
import {
  HandLettering,
  HeartDoodle,
  Sparkle,
} from "@/components/HandLettering";

/**
 * The portrait greeting card: hand-lettered title, the tulip bouquet, the
 * handwritten message with the emphasized word, and the closing signature.
 * Each block reveals in a gentle stagger on load.
 */

const FLOATING_HEARTS = [
  {
    left: "-6%",
    top: "16%",
    size: 22,
    delay: "0s",
    duration: "7s",
    opacity: 0.7,
  },
  {
    left: "96%",
    top: "30%",
    size: 18,
    delay: "1.4s",
    duration: "9s",
    opacity: 0.6,
  },
  {
    left: "-4%",
    top: "62%",
    size: 16,
    delay: "2.2s",
    duration: "8s",
    opacity: 0.55,
  },
  {
    left: "98%",
    top: "72%",
    size: 20,
    delay: "0.8s",
    duration: "10s",
    opacity: 0.65,
  },
  {
    left: "88%",
    top: "6%",
    size: 14,
    delay: "3s",
    duration: "7.5s",
    opacity: 0.5,
  },
];

export function GreetingCard() {
  return (
    <article
      data-ocid="card.panel"
      className="animate-pop-in relative w-full max-w-[min(92vw,30rem)] rounded-[2rem] bg-card px-6 py-8 shadow-card sm:px-9 sm:py-10"
      style={{ animationDelay: "0.05s" }}
    >
      {/* floating hearts drifting around the card */}
      {FLOATING_HEARTS.map((heart) => (
        <span
          key={`${heart.left}-${heart.top}`}
          aria-hidden="true"
          className="pointer-events-none absolute animate-float"
          style={{
            left: heart.left,
            top: heart.top,
            animationDelay: heart.delay,
            animationDuration: heart.duration,
            opacity: heart.opacity,
          }}
        >
          <HeartDoodle size={heart.size} filled color="oklch(var(--ribbon))" />
        </span>
      ))}

      {/* ---- title ---- */}
      <header
        className="animate-rise-in flex flex-col items-center"
        style={{ animationDelay: "0.15s" }}
      >
        <HandLettering
          text="Un ramo de"
          size={44}
          color="oklch(var(--ribbon))"
          weight={9}
          tilt={-1.5}
          seed={11}
          className="w-full max-w-[16rem]"
        />
        <HandLettering
          text="flores pa' ti <3"
          size={44}
          color="oklch(var(--ribbon))"
          weight={9}
          tilt={1}
          seed={23}
          className="mt-1 w-full max-w-[18rem]"
        />
      </header>

      {/* ---- bouquet ---- */}
      <div
        className="animate-rise-in mt-4 flex justify-center"
        style={{ animationDelay: "0.3s" }}
      >
        <Bouquet className="h-auto w-full max-w-[19rem]" />
      </div>

      {/* ---- message + signature ---- */}
      <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div
          className="animate-rise-in order-2 sm:order-1"
          style={{ animationDelay: "0.6s" }}
        >
          <HandLettering
            text="De: mí / Para: ti ♡"
            size={22}
            color="oklch(var(--ink))"
            weight={8}
            tilt={-1}
            seed={41}
            className="w-full max-w-[11rem]"
          />
        </div>

        <div
          className="animate-rise-in order-1 flex flex-col items-end sm:order-2"
          style={{ animationDelay: "0.45s" }}
        >
          <HandLettering
            text="Que tu resto"
            size={24}
            color="oklch(var(--ink))"
            weight={8}
            tilt={-1}
            seed={53}
            className="w-full max-w-[10rem]"
          />
          <HandLettering
            text="de día sea"
            size={24}
            color="oklch(var(--ink))"
            weight={8}
            tilt={0.5}
            seed={67}
            className="mt-0.5 w-full max-w-[9rem]"
          />
          <div className="relative mt-1 flex items-center gap-1">
            <Sparkle
              size={14}
              className="animate-float"
              style={{ animationDuration: "6s" }}
            />
            <HandLettering
              text="BONITO"
              size={34}
              color="oklch(var(--accent))"
              weight={10}
              tilt={-1}
              seed={79}
              className="w-full max-w-[9.5rem]"
            />
            <Sparkle
              size={12}
              className="animate-float"
              style={{ animationDuration: "7.5s" }}
            />
          </div>
          <HandLettering
            text="así como tú."
            size={24}
            color="oklch(var(--ink))"
            weight={8}
            tilt={1}
            seed={91}
            className="mt-0.5 w-full max-w-[10rem]"
          />
        </div>
      </div>
    </article>
  );
}
