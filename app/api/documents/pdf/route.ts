import { NextResponse } from "next/server";

const DEFAULT_BACKEND_URL = "http://localhost:8000";
const BACKEND_URL = (process.env.BACKEND_URL ?? process.env.NEXT_PUBLIC_BACKEND_URL ?? DEFAULT_BACKEND_URL).replace(
  /\/$/,
  "",
);

export async function POST(request: Request) {
  let payload: FormData;

  try {
    payload = await request.formData();
  } catch (error) {
    const detail = error instanceof Error ? error.message : "Request body must be valid multipart form data.";

    return NextResponse.json({ detail }, { status: 400 });
  }

  const backendResponse = await fetch(`${BACKEND_URL}/api/documents/pdf`, {
    method: "POST",
    body: payload,
  });

  const responseText = await backendResponse.text();

  if (!backendResponse.ok) {
    return new NextResponse(responseText || `Request failed with status ${backendResponse.status}`, {
      status: backendResponse.status,
      headers: {
        "Content-Type": backendResponse.headers.get("Content-Type") ?? "text/plain",
      },
    });
  }

  if (!responseText) {
    return new NextResponse(null, { status: backendResponse.status });
  }

  return new NextResponse(responseText, {
    status: backendResponse.status,
    headers: {
      "Content-Type": backendResponse.headers.get("Content-Type") ?? "application/json",
    },
  });
}
