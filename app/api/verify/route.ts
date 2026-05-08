import { NextResponse } from "next/server";
import { canonicalize } from "@/lib/canonical";
import type { CivicEvent } from "@/types/civic";

async function createServerHash(snapshot: CivicEvent): Promise<string> {
  const canonical = canonicalize(snapshot);
  const encoder = new TextEncoder();
  const data = encoder.encode(canonical);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);

  return Array.from(new Uint8Array(hashBuffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      snapshot: CivicEvent;
      replaySnapshot?: CivicEvent;
    };

    if (!body.snapshot) {
      return NextResponse.json(
        { error: "Missing snapshot" },
        { status: 400 }
      );
    }

    const originalHash = await createServerHash(body.snapshot);
    const replayHash = await createServerHash(
      body.replaySnapshot ?? body.snapshot
    );

    const status = originalHash === replayHash ? "PASS" : "FAIL";

    return NextResponse.json({
      engine: "digiemu-local-api-adapter-v0.1",
      status,
      canonical: canonicalize(body.snapshot),
      original_hash: originalHash,
      replay_hash: replayHash,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Verification failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}