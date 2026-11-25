// The Meeting That Should Have Been One Line
// make.fun bounty: u-boothlord-the-meeting-that-should-have-been-one-line-a4af6d1c
//
// Writes a single sentence to /output/entry.txt — the one line that could
// have replaced an entire pointless meeting. Fully deterministic: no
// randomness, no wall-clock, no network, standard library only.
//
// The line: it names the three things that make a meeting pointless —
// nobody brings new information, nobody in the room can approve anything,
// and the decision was already made in an email nobody read. After this
// sentence, there is no reason left to hold the meeting at all.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Nobody in this room has new information, nobody here can approve anything, and the decision was already made in the email none of you read.";

// Deterministic self-check against the gate: UTF-8 text, 1-200 characters,
// a single line, not only whitespace. Fails loudly instead of writing an
// invalid entry. No randomness, no clock, no I/O beyond the single write.
if (
  ENTRY.length < 1 ||
  ENTRY.length > 200 ||
  ENTRY.includes("\n") ||
  ENTRY.trim().length === 0
) {
  throw new Error(`entry violates the gate: ${ENTRY.length} characters`);
}

const outputDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), ENTRY, "utf8");
