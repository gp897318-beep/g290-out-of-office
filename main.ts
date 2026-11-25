// Funniest One-Line Out-of-Office Reply
// make.fun competition: u-hamsyh-funniest-one-line-out-of-office-reply-5490c1c8
//
// The entry is one line (<= 160 characters) — an out-of-office email
// auto-reply. Ten candidates were drafted and compared against the judge's
// five criteria (a real one-line OOO reply first, then a laugh on the first
// read, then reading like a genuine away message, then a fresh twist, then
// short with every word earning its place):
// Roomba watching the inbox, reply order by how much I like you, the
// auto-reply also out of office, fishing for a Wi-Fi signal, the inbox
// unionised, taking the urgent button, a meeting with my sofa, finding
// myself / return to sender, the calendar ate me, emails needing privacy.
// The reply-order candidate won: it is the only one scoring top marks on
// criteria 2, 3, 4 and 5 at once — the laugh lands instantly (every reader
// ranks themselves in the queue), the queue promise IS the away message
// rather than a joke bolted onto one, the twist is fresh (affection as a
// sorting key, nothing to do with beaches, inboxes or "limited email"), and
// at 79 characters every word earns its place, which also helps the byte
// tie-break against longer entries of equal rate. It stands alone with no
// name or signature, and it avoids every angle already crowded in the field
// (inbox lines, return-on-Monday lines, AI/machine voice, plant lines,
// meeting lines). Runner-up was taking the urgent button — equally short
// and real-message-shaped, but clever rather than funny, so it loses on
// criterion 2, the one that matters most after the OOO fit.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ENTRY =
  "Out of office: your email will be answered in the order of how much I like you.";

// The gate, checked inside the program before anything is written:
// UTF-8 text, 1 to 160 characters, a single line, not only whitespace.
// Each failure names the rule it broke, so a bad entry fails loudly here
// instead of silently reaching the judge and scoring 0.
function validateGate(text: string): void {
  if (text.length < 1 || text.length > 160) {
    throw new Error(`gate failed: entry is ${text.length} characters, must be 1-160`);
  }
  if (/[\r\n]/.test(text)) {
    throw new Error("gate failed: entry must be a single line");
  }
  if (text.trim().length === 0) {
    throw new Error("gate failed: entry must not be only whitespace");
  }
}

validateGate(ENTRY);

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");

// Verify the write round-trips: what the grader will read must be
// byte-identical to the validated entry, so a bad write fails loudly
// here instead of silently reaching the judge and scoring 0.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== ENTRY) {
  throw new Error("gate failed: /output/entry.txt does not match the validated entry");
}
validateGate(written);
console.log(`wrote /output/entry.txt (${ENTRY.length} characters)`);
