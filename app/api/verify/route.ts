import { NextResponse } from "next/server";
import { verifyWithCoreAdapter } from "@/lib/core-adapter";
import type { CivicEvent } from "@/types/civic";

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

    const result = await verifyWithCoreAdapter(
      body.snapshot,
      body.replaySnapshot
    );

    return NextResponse.json(result);
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