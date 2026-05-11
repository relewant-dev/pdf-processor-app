"use client";

import { useState, type FormEvent } from "react";

import { useExecutePrompt } from "../hooks/useExecutePrompt";
import { IconButton } from "./IconButton";
import { MicrophoneIcon, PlusIcon, VoiceWaveIcon } from "./icons";
import { ModeSelector } from "./ModeSelector";
import { TextInput } from "./TextInput";

export function PromptComposer() {
  const [message, setMessage] = useState("");
  const executePrompt = useExecutePrompt();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedMessage = message.trim();

    if (!trimmedMessage || executePrompt.isPending) {
      return;
    }

    executePrompt.mutate({ message: trimmedMessage });
  }

  return (
    <div className="prompt-stack">
      <form className="prompt-composer" aria-label="Assistant prompt composer" onSubmit={handleSubmit}>
        <IconButton label="Add attachment">
          <PlusIcon className="prompt-icon" />
        </IconButton>

        <TextInput
          label="Prompt"
          placeholder="Ask anything"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          disabled={executePrompt.isPending}
        />

        <div className="prompt-actions" aria-label="Prompt actions">
          <ModeSelector value="Instant" aria-label="Response mode: Instant" />
          <IconButton label="Use microphone">
            <MicrophoneIcon className="prompt-icon prompt-icon--microphone" />
          </IconButton>
          <IconButton
            label={executePrompt.isPending ? "Sending prompt" : "Send prompt"}
            variant="filled"
            type="submit"
            disabled={!message.trim() || executePrompt.isPending}
          >
            <VoiceWaveIcon className="prompt-icon" />
          </IconButton>
        </div>
      </form>

      <div className="prompt-result" aria-live="polite">
        {executePrompt.isPending ? <p>Thinking…</p> : null}
        {executePrompt.isError ? <p role="alert">{executePrompt.error.message}</p> : null}
        {executePrompt.data?.response ? <p>{executePrompt.data.response}</p> : null}
      </div>
    </div>
  );
}
