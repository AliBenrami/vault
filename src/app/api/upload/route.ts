import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const formData = await request.formData();

  const response = await fetch("http://127.0.0.1:8000/upload", {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  if (!data.success) {
    return NextResponse.json({ error: data.error }, { status: 500 });
  }

  return NextResponse.json(data);
}
