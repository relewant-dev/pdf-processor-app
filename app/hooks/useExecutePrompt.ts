import { useMutation } from "@tanstack/react-query";

import { executePrompt } from "../api/client";
import type { PromptPayload, PromptResponse } from "../models/prompt";

export function useExecutePrompt() {
  return useMutation<PromptResponse, Error, PromptPayload>({
    mutationFn: executePrompt,
  });
}
