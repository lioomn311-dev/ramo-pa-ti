import { defineConfig } from "vitest/config";
import { fileURLToPath, URL } from "url";

/**
 * Vitest config for the frontend suite. The `test` script passes
 * `--environment jsdom`; this file only wires the `@` alias and the
 * jest-dom setup module so tests can import app modules the same way the
 * app does.
 */
export default defineConfig({
  resolve: {
    alias: [
      {
        find: "declarations",
        replacement: fileURLToPath(new URL("../declarations", import.meta.url)),
      },
      {
        find: "@",
        replacement: fileURLToPath(new URL("./src", import.meta.url)),
      },
    ],
  },
  test: {
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    // The sandbox sets conflicting min/max thread counts for the default
    // `forks` pool; a single-threaded pool sidesteps that and is plenty for
    // this suite.
    pool: "threads",
    poolOptions: {
      threads: { singleThread: true },
    },
  },
});
