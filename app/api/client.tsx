import type { PdfUploadPayload, PdfUploadResponse } from "../models/document";
import type { PromptPayload, PromptResponse } from "../models/prompt";

type ApiErrorResponse = {
  detail?: unknown;
};

const formatErrorDetail = (detail: unknown): string | undefined => {
  if (!detail) {
    return undefined;
  }

  if (typeof detail === "string") {
    return detail;
  }

  if (Array.isArray(detail)) {
    return detail
      .map((item) => {
        if (typeof item === "string") {
          return item;
        }

        if (item && typeof item === "object" && "msg" in item && typeof item.msg === "string") {
          return item.msg;
        }

        return JSON.stringify(item);
      })
      .join("\n");
  }

  return JSON.stringify(detail);
};

const formatErrorMessage = async (response: Response): Promise<string> => {
  const errorText = await response.text();

  if (!errorText) {
    return `Request failed with status ${response.status}`;
  }

  try {
    const parsed = JSON.parse(errorText) as ApiErrorResponse;
    return formatErrorDetail(parsed.detail) ?? errorText;
  } catch {
    return errorText;
  }
};

const request = async <TResponse,>(path: string, init?: RequestInit): Promise<TResponse> => {
  const response = await fetch(path, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(await formatErrorMessage(response));
  }

  return response.json() as Promise<TResponse>;
};

export const executePrompt = (payload: PromptPayload) => {
  return request<PromptResponse>("/api/prompts/execute", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

export const uploadPdfDocument = async ({ file, question, maxChars }: PdfUploadPayload) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("question", question);

  if (maxChars !== undefined) {
    formData.append("max_chars", String(maxChars));
  }

  const response = await fetch("/api/documents/pdf", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(await formatErrorMessage(response));
  }

  return response.json() as Promise<PdfUploadResponse>;
};

export const anonymizeCvPdf = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("/api/cv/anonymized-pdf", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(await formatErrorMessage(response));
  }

  const pdfBlob = await response.blob();

  return pdfBlob.type === "application/pdf" ? pdfBlob : new Blob([pdfBlob], { type: "application/pdf" });
};
