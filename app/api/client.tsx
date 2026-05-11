import type { PromptPayload, PromptResponse } from "../models/prompt";

const DEFAULT_BACKEND_URL = "http://localhost:8000";
const API_BASE_URL = (process.env.NEXT_PUBLIC_BACKEND_URL ?? DEFAULT_BACKEND_URL).replace(/\/$/, "");

async function request<TResponse>(path: string, init?: RequestInit): Promise<TResponse> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Request failed with status ${response.status}`);
  }

  return response.json() as Promise<TResponse>;
}

export function executePrompt(payload: PromptPayload) {
  return request<PromptResponse>("/api/prompts/execute", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
