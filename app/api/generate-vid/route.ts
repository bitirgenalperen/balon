import { NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { prompt } = body as { prompt?: string };

    if (!prompt) {
      return NextResponse.json(
        { detail: "Prompt is required." },
        { status: 400 }
      );
    }

    const output = await replicate.run(
      "wan-video/wan-2.2-t2v-fast",
      {
        input: {
          prompt,
        },
      }
    );
    

    if (output) {
      return NextResponse.json({ videoUrl: (output as any).url() }, { status: 200 });
    } else {
      throw new Error("API did not return a valid video URL.");
    }
  } catch (error: any) {
    console.error("Replicate API Error:", error);
    return NextResponse.json(
      { detail: error.message || "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
