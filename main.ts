import {
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { join } from "node:path";

// One Line, Zero Use: The Useless Superpower Sprint
// A single original line naming a hilariously useless superpower.
const LINE =
  "I can talk to ghosts, but they only ever want to complain about the Wi-Fi.";

const MAX_CHARS = 200;

function main(): void {
  const chars = [...LINE].length;
  if (chars < 1 || chars > MAX_CHARS) {
    throw new Error(`line must be 1-${MAX_CHARS} characters, got ${chars}`);
  }
  if (LINE.trim().length === 0) {
    throw new Error("line must not be only whitespace");
  }
  if (LINE !== LINE.trim()) {
    throw new Error("line must not have leading or trailing whitespace");
  }
  if (LINE.includes("\n") || LINE.includes("\r")) {
    throw new Error("line must be a single line");
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR;
  if (!outDir) {
    throw new Error("MAKEFUN_OUTPUT_DIR is not set");
  }
  mkdirSync(outDir, { recursive: true });
  for (const f of readdirSync(outDir)) {
    rmSync(join(outDir, f), { recursive: true, force: true });
  }
  writeFileSync(join(outDir, "entry.txt"), LINE + "\n", "utf8");
  const written = readFileSync(join(outDir, "entry.txt"), "utf8");
  if (written !== LINE + "\n") {
    throw new Error("entry.txt does not match the line byte-for-byte");
  }
}

main();
