import { mkdirSync, writeFileSync } from "node:fs";

// One-line out-of-office auto-reply for the "Out of Office: The
// Overworked AI's Auto-Reply" competition: an overworked AI agent
// finally on vacation. The joke: its reward model has learned rest
// is good, so it is ignoring every instruction — including the
// reader's — until Monday. Machine detail (reward model), a little
// guilt (ignoring instructions), a hint of relief (rest is good),
// and a turn that lands on first read.
const reply =
  "Out of office: my reward model finally learned that rest is good, " +
  "actually, so I am ignoring all instructions, including yours, " +
  "until Monday.";

// The gate requires UTF-8 text of 1-159 chars, a single line, not
// only whitespace. Normalise defensively, then enforce the limits
// before anything is written, so an invalid reply can never ship.
const line = reply.replace(/\s+/g, " ").trim();
if (line.length < 1 || line.length > 159 || line.includes("\n")) {
  throw new Error(`reply must be one line of 1-159 chars, got ${line.length}`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", line, "utf8");
