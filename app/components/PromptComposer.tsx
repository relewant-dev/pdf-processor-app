"use client";

import { useRef, useState, type ChangeEvent, type FormEvent } from "react";

import { useExecutePrompt } from "../hooks/useExecutePrompt";
import { useUploadPdfDocument } from "../hooks/useUploadPdfDocument";
import { IconButton } from "./IconButton";
import { MicrophoneIcon, PlusIcon, VoiceWaveIcon } from "./icons";
import { ModeSelector } from "./ModeSelector";
import { TextInput } from "./TextInput";

export function PromptComposer() {
  const [message, setMessage] = useState("");
  const [selectedPdf, setSelectedPdf] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const executePrompt = useExecutePrompt();
  const uploadPdfDocument = useUploadPdfDocument();
  const isPending = executePrompt.isPending || uploadPdfDocument.isPending;
  const error = executePrompt.error ?? uploadPdfDocument.error;
  const response = uploadPdfDocument.data?.response ?? executePrompt.data?.response;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedMessage = message.trim();

    if (!trimmedMessage || isPending) {
      return;
    }

    if (selectedPdf) {
      executePrompt.reset();
      uploadPdfDocument.mutate({ file: selectedPdf, question: trimmedMessage });
      return;
    }

    uploadPdfDocument.reset();
    executePrompt.mutate({ message: trimmedMessage });
  }

  function handlePdfChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;

    if (!file) {
      return;
    }

    setSelectedPdf(file);
    uploadPdfDocument.reset();
  }

  function handleRemovePdf() {
    setSelectedPdf(null);
    uploadPdfDocument.reset();

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  return (
    <div className="prompt-stack">
      <form className="prompt-composer" aria-label="Assistant prompt composer" onSubmit={handleSubmit}>
        <input
          ref={fileInputRef}
          className="sr-only"
          type="file"
          accept="application/pdf,.pdf"
          aria-label="Upload PDF document"
          onChange={handlePdfChange}
          disabled={isPending}
        />
        <IconButton label="Add PDF attachment" onClick={() => fileInputRef.current?.click()} disabled={isPending}>
          <PlusIcon className="prompt-icon" />
        </IconButton>

        <TextInput
          label={selectedPdf ? "Question about attached PDF" : "Prompt"}
          placeholder={selectedPdf ? "Ask a question about the attached PDF" : "Ask anything"}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          disabled={isPending}
        />

        <div className="prompt-actions" aria-label="Prompt actions">
          <ModeSelector value="Instant" aria-label="Response mode: Instant" />
          <IconButton label="Use microphone" disabled={isPending}>
            <MicrophoneIcon className="prompt-icon prompt-icon--microphone" />
          </IconButton>
          <IconButton
            label={isPending ? "Sending prompt" : "Send prompt"}
            variant="filled"
            type="submit"
            disabled={!message.trim() || isPending}
          >
            <VoiceWaveIcon className="prompt-icon" />
          </IconButton>
        </div>
      </form>

      {selectedPdf ? (
        <div className="attachment-chip" aria-label="Selected PDF attachment">
          <span className="attachment-chip__name">{selectedPdf.name}</span>
          <button className="attachment-chip__remove" type="button" onClick={handleRemovePdf} disabled={isPending}>
            Remove
          </button>
        </div>
      ) : null}

      <div className="prompt-result" aria-live="polite">
        {isPending ? <p>{selectedPdf ? "Reading PDF…" : "Thinking…"}</p> : null}
        {error ? <p role="alert">{error.message}</p> : null}
        {response ? <p>{response}</p> : null}
      </div>
    </div>
  );
}
