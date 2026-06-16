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

  const backendResponse = await fetch(`${BACKEND_URL}/api/cv/anonymized-pdf`, {
    method: "POST",
    body: payload,
  });

  if (!backendResponse.ok) {
    const responseText = await backendResponse.text();

    return new NextResponse(responseText || `Request failed with status ${backendResponse.status}`, {
      status: backendResponse.status,
      headers: {
        "Content-Type": backendResponse.headers.get("Content-Type") ?? "text/plain",
      },
    });
  }

  const anonymizedPdf = await backendResponse.arrayBuffer();

  return new NextResponse(anonymizedPdf, {
    status: backendResponse.status,
    headers: {
      "Content-Disposition": backendResponse.headers.get("Content-Disposition") ?? 'attachment; filename="anonymized-cv.pdf"',
      "Content-Type": backendResponse.headers.get("Content-Type") ?? "application/pdf",
    },
  });
}
