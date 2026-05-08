import type { CivicEvent, VerificationStatus } from "@/types/civic";

export type VerifyResponse = {
  engine: string;
  status: VerificationStatus;
  canonical: string;
  original_hash: string;
  replay_hash: string;
};

export async function verifyWithApi(
  snapshot: CivicEvent,
  replaySnapshot?: CivicEvent
): Promise<VerifyResponse> {
  const response = await fetch("/api/verify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      snapshot,
      replaySnapshot,
    }),
  });

  if (!response.ok) {
    throw new Error("Verification API failed");
  }

  return response.json();
}