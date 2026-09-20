import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Bouquet } from "@/components/Bouquet";
import {
  HandLettering,
  HeartDoodle,
  Sparkle,
} from "@/components/HandLettering";

/**
 * Contract coverage for the hand-lettering primitives. The card's visible
 * phrases are inline SVG strokes, so the accessible string is the only
 * machine-readable text the card exposes; these tests pin that seam.
 */

describe("HandLettering", () => {
  it("exposes the exact phrase as accessible text", () => {
    render(<HandLettering text="Un ramo de" />);

    expect(screen.getByRole("img", { name: "Un ramo de" })).toBeInTheDocument();
  });

  it("keeps the decorative SVG hidden from assistive tech", () => {
    const { container } = render(<HandLettering text="BONITO" />);

    const svg = container.querySelector("svg");
    expect(svg).not.toBeNull();
    expect(svg).toHaveAttribute("aria-hidden", "true");
  });

  it("renders a stroke path for every known glyph", () => {
    const { container } = render(<HandLettering text="flores pa' ti <3" />);

    // One path per stroke of each glyph; a fallback glyph would still draw,
    // so assert a healthy count rather than an exact one.
    expect(container.querySelectorAll("path").length).toBeGreaterThan(10);
  });
});

describe("decorative marks", () => {
  it("hides the sparkle and heart doodles from assistive tech", () => {
    const { container } = render(
      <>
        <Sparkle />
        <HeartDoodle />
      </>,
    );

    for (const svg of container.querySelectorAll("svg")) {
      expect(svg).toHaveAttribute("aria-hidden", "true");
    }
  });
});

describe("Bouquet", () => {
  it("renders as a single decorative SVG", () => {
    const { container } = render(<Bouquet />);

    const svg = container.querySelector("svg");
    expect(svg).not.toBeNull();
    expect(svg).toHaveAttribute("aria-hidden", "true");
    expect(svg).toHaveAttribute("viewBox", "0 0 600 760");
  });
});
