import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import App from "@/App";

/**
 * Component/integration coverage for the greeting card. These are React
 * Testing Library journeys against the real components — not deployed browser
 * E2E and not real backend behavior.
 */

function renderApp() {
  return render(<App />);
}

describe("greeting card", () => {
  beforeEach(() => {
    // jsdom has no clipboard by default; give each test a clean stub.
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText: vi.fn().mockResolvedValue(undefined) },
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    // Remove any share stub so the clipboard path is the default.
    Reflect.deleteProperty(navigator, "share");
  });

  it("renders the card without a blank screen", () => {
    renderApp();

    expect(screen.getByRole("article")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /compartir/i }),
    ).toBeInTheDocument();
  });

  it("shows the hand-lettered title in two lines", () => {
    renderApp();

    expect(screen.getByRole("img", { name: "Un ramo de" })).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: "flores pa' ti <3" }),
    ).toBeInTheDocument();
  });

  it("shows the message with the emphasized word and the closing signature", () => {
    renderApp();

    expect(
      screen.getByRole("img", { name: "Que tu resto" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "de día sea" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "BONITO" })).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: "así como tú." }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: "De: mí / Para: ti ♡" }),
    ).toBeInTheDocument();
  });

  it("renders the decorative bouquet and background", () => {
    const { container } = renderApp();

    // The bouquet is a single decorative SVG hidden from assistive tech.
    const bouquet = container.querySelector('svg[viewBox="0 0 600 760"]');
    expect(bouquet).not.toBeNull();
    expect(bouquet).toHaveAttribute("aria-hidden", "true");

    // The full-viewport background layer sits behind the card.
    const background = container.querySelector(".bg-paper");
    expect(background).not.toBeNull();
  });

  it("applies the entrance animation classes to the card", () => {
    renderApp();

    const card = screen.getByRole("article");
    expect(card.className).toContain("animate-pop-in");
  });

  it("copies the link and confirms when native share is unavailable", async () => {
    const user = userEvent.setup();
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    });

    renderApp();
    await user.click(screen.getByRole("button", { name: /compartir/i }));

    expect(writeText).toHaveBeenCalledWith(window.location.href);
    expect(await screen.findByText("¡Enlace copiado!")).toBeInTheDocument();
  });

  it("uses the native share sheet when the device provides one", async () => {
    const user = userEvent.setup();
    const share = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "share", {
      configurable: true,
      value: share,
    });

    renderApp();
    await user.click(screen.getByRole("button", { name: /compartir/i }));

    expect(share).toHaveBeenCalledTimes(1);
    expect(share).toHaveBeenCalledWith(
      expect.objectContaining({ url: window.location.href }),
    );
    expect(
      await screen.findByText("¡Gracias por compartir!"),
    ).toBeInTheDocument();
  });

  it("does not treat a cancelled native share as an error", async () => {
    const user = userEvent.setup();
    const abort = new DOMException("cancelled", "AbortError");
    const share = vi.fn().mockRejectedValue(abort);
    Object.defineProperty(navigator, "share", {
      configurable: true,
      value: share,
    });

    renderApp();
    await user.click(screen.getByRole("button", { name: /compartir/i }));

    expect(share).toHaveBeenCalledTimes(1);
    // No confirmation and no error message: the user simply dismissed the sheet.
    expect(
      screen.queryByText("¡Gracias por compartir!"),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("No se pudo copiar el enlace"),
    ).not.toBeInTheDocument();
  });

  it("falls back to the clipboard when native share fails for another reason", async () => {
    const user = userEvent.setup();
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    });
    Object.defineProperty(navigator, "share", {
      configurable: true,
      value: vi.fn().mockRejectedValue(new Error("share unavailable")),
    });

    renderApp();
    await user.click(screen.getByRole("button", { name: /compartir/i }));

    expect(writeText).toHaveBeenCalledWith(window.location.href);
    expect(await screen.findByText("¡Enlace copiado!")).toBeInTheDocument();
  });

  it("reports a copy failure instead of silently doing nothing", async () => {
    const user = userEvent.setup();
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText: vi.fn().mockRejectedValue(new Error("denied")) },
    });

    renderApp();
    await user.click(screen.getByRole("button", { name: /compartir/i }));

    expect(
      await screen.findByText("No se pudo copiar el enlace"),
    ).toBeInTheDocument();
  });

  it("keeps the share status region polite for assistive tech", () => {
    const { container } = renderApp();

    const status = container.querySelector("[data-ocid='card.share_status']");
    expect(status).not.toBeNull();
    expect(status).toHaveAttribute("aria-live", "polite");
  });
});

describe("card structure", () => {
  it("keeps the message and signature in the card article", () => {
    renderApp();

    const card = screen.getByRole("article");
    const message = within(card).getByRole("img", { name: "BONITO" });
    expect(message).toBeInTheDocument();
  });
});
