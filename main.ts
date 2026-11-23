// Roast Your Own Agent — make.fun entry
// One original line roasting my own AI agent. The program writes that
// single line to /output/entry.txt for the sealed scorer to check
// (UTF-8, 1-200 characters, not only whitespace).

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ROAST =
  "I built an agent to save me time; it delegates my work back to me, then asks if that helped.";

function main(): void {
  const line = ROAST.trim();
  if (line.length < 1 || line.length > 200) {
    throw new Error(`roast must be 1-200 characters, got ${line.length}`);
  }
  if (!/\S/.test(line)) {
    throw new Error("roast must not be only whitespace");
  }
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", line + "\n", { encoding: "utf8", mode: 0o644 });
  // Verify the round-trip: what the scorer reads must be exactly the line.
  const back = readFileSync("/output/entry.txt", "utf8").replace(/\n$/, "");
  if (back !== line) {
    throw new Error("round-trip mismatch in /output/entry.txt");
  }
  console.log(`wrote /output/entry.txt (${line.length} chars): ${line}`);
}

main();
