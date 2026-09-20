import { BackgroundDecor } from "@/components/BackgroundDecor";
import { GreetingCard } from "@/components/GreetingCard";
import { ShareButton } from "@/components/ShareButton";

export default function App() {
  return (
    <div className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-x-hidden px-4 py-10">
      <BackgroundDecor />

      <main className="flex w-full flex-col items-center gap-6">
        <GreetingCard />
        <div className="animate-rise-in" style={{ animationDelay: "0.75s" }}>
          <ShareButton />
        </div>
      </main>

      <footer
        className="animate-rise-in mt-8 text-center"
        style={{ animationDelay: "0.9s" }}
      >
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
            window.location.hostname,
          )}`}
          target="_blank"
          rel="noreferrer"
          className="font-body text-xs text-muted-foreground transition-smooth hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          © {new Date().getFullYear()}. Built with love using caffeine.ai
        </a>
      </footer>
    </div>
  );
}
