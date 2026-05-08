import { canonicalize } from "./canonical";
import type { CivicEvent, VerificationStatus } from "@/types/civic";

export async function createHash(snapshot: CivicEvent): Promise<string> {
  const canonical = canonicalize(snapshot);
  const encoder = new TextEncoder();
  const data = encoder.encode(canonical);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);

  return Array.from(new Uint8Array(hashBuffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export function verifySnapshot(
  originalHash: string,
  replayHash: string
): VerificationStatus {
  return originalHash === replayHash ? "PASS" : "FAIL";
}