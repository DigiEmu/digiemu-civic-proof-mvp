import { canonicalize } from "@/lib/canonical";
import type { CivicEvent, VerificationStatus } from "@/types/civic";

export type CoreVerifyResult = {
  engine: string;
  status: VerificationStatus;
  canonical: string;
  original_hash: string;
  replay_hash: string;
};

async function sha256(input: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);

  return Array.from(new Uint8Array(hashBuffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export async function verifyWithCoreAdapter(
  snapshot: CivicEvent,
  replaySnapshot?: CivicEvent
): Promise<CoreVerifyResult> {
  const originalCanonical = canonicalize(snapshot);
  const replayCanonical = canonicalize(replaySnapshot ?? snapshot);

  const originalHash = await sha256(originalCanonical);
  const replayHash = await sha256(replayCanonical);

  return {
    engine: "digiemu-core-adapter-local-v0.1",
    status: originalHash === replayHash ? "PASS" : "FAIL",
    canonical: originalCanonical,
    original_hash: originalHash,
    replay_hash: replayHash,
  };
}