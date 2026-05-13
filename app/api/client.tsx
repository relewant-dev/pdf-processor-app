import type { PromptPayload, PromptResponse } from "../models/prompt";

type ApiErrorResponse = {
  detail?: unknown;
};

function formatErrorDetail(detail: unknown): string | undefined {
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
}

async function formatErrorMessage(response: Response): Promise<string> {
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
}

async function request<TResponse>(path: string, init?: RequestInit): Promise<TResponse> {
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
}

export function executePrompt(payload: PromptPayload) {
  return request<PromptResponse>("/api/prompts/execute", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
