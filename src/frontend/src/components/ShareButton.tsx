import { HeartDoodle } from "@/components/HandLettering";
import { useEffect, useRef, useState } from "react";

type Status = "idle" | "copied" | "shared" | "error";

/**
 * Pink pill button that shares the card with the device's native share sheet
 * when available, and otherwise copies the link to the clipboard. Shows a
 * brief Spanish confirmation and never treats a cancelled share as an error.
 */
export function ShareButton() {
  const [status, setStatus] = useState<Status>("idle");
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  function flash(next: Status) {
    setStatus(next);
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
    }
    timerRef.current = window.setTimeout(() => setStatus("idle"), 2600);
  }

  async function handleShare() {
    const url = window.location.href;
    const shareData = {
      title: "Un ramo de flores pa' ti",
      text: "Un ramo de flores pa' ti <3 — Que tu resto de día sea BONITO así como tú.",
      url,
    };

    if (typeof navigator.share === "function") {
      try {
        await navigator.share(shareData);
        flash("shared");
        return;
      } catch (error) {
        // The user dismissing the share sheet is a normal outcome, not an error.
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
        // Any other failure falls through to the clipboard path below.
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      flash("copied");
    } catch {
      flash("error");
    }
  }

  const label =
    status === "copied"
      ? "¡Enlace copiado!"
      : status === "shared"
        ? "¡Gracias por compartir!"
        : status === "error"
          ? "No se pudo copiar el enlace"
          : null;

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        type="button"
        data-ocid="card.share_button"
        onClick={() => {
          void handleShare();
        }}
        className="group inline-flex min-h-[44px] items-center gap-2 rounded-full bg-ribbon px-7 py-3 font-body text-base font-bold text-foreground shadow-soft transition-smooth hover:-translate-y-0.5 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:translate-y-0"
      >
        <span>Compartir</span>
        <HeartDoodle
          size={16}
          filled
          color="oklch(var(--ribbon-deep))"
          className="transition-transform duration-300 group-hover:scale-110"
        />
      </button>

      <p
        data-ocid="card.share_status"
        aria-live="polite"
        className={`min-h-[1.25rem] font-body text-sm font-semibold transition-opacity duration-300 ${
          label ? "opacity-100" : "opacity-0"
        } ${status === "error" ? "text-accent" : "text-muted-foreground"}`}
      >
        {label ?? "\u00A0"}
      </p>
    </div>
  );
}
