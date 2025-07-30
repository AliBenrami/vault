import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const response = await fetch("http://127.0.0.1:8000/call-rag-llm", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: "Failed to call RAG LLM" },
      { status: 500 }
    );
  }

  const data = await response.json();
  return NextResponse.json(data);
}
