"use client";

import { useRef, useState, type ChangeEvent, type FormEvent } from "react";

import { anonymizeCvPdf } from "../api/client";
import { useExecutePrompt } from "../hooks/useExecutePrompt";
import { useUploadPdfDocument } from "../hooks/useUploadPdfDocument";
import { IconButton } from "./IconButton";
import { DocumentIcon, MicrophoneIcon, PlusIcon, VoiceWaveIcon } from "./icons";
import { ModeSelector } from "./ModeSelector";
import { TextInput } from "./TextInput";

const ANONYMIZED_CV_FILENAME = "anonymized-cv.pdf";

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export function PromptComposer() {
  const [message, setMessage] = useState("");
  const [selectedPdf, setSelectedPdf] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const executePrompt = useExecutePrompt();
  const uploadPdfDocument = useUploadPdfDocument();
  const [cvAnonymizationError, setCvAnonymizationError] = useState<Error | null>(null);
  const [isAnonymizingCv, setIsAnonymizingCv] = useState(false);
  const [cvAnonymizationSuccess, setCvAnonymizationSuccess] = useState(false);
  const isPending = executePrompt.isPending || uploadPdfDocument.isPending || isAnonymizingCv;
  const error = executePrompt.error ?? uploadPdfDocument.error ?? cvAnonymizationError;
  const response = uploadPdfDocument.data?.response ?? executePrompt.data?.response;
  const canSubmit = Boolean(message.trim() || selectedPdf) && !isPending;

  function openPdfPicker() {
    fileInputRef.current?.click();
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedMessage = message.trim();

    if (isPending || (!trimmedMessage && !selectedPdf)) {
      return;
    }

    if (selectedPdf && !trimmedMessage) {
      executePrompt.reset();
      uploadPdfDocument.reset();
      setCvAnonymizationError(null);
      setCvAnonymizationSuccess(false);
      setIsAnonymizingCv(true);

      anonymizeCvPdf(selectedPdf)
        .then((anonymizedPdf) => {
          downloadBlob(anonymizedPdf, ANONYMIZED_CV_FILENAME);
          setCvAnonymizationSuccess(true);
        })
        .catch((caughtError: unknown) => {
          setCvAnonymizationError(
            caughtError instanceof Error ? caughtError : new Error("Unable to anonymize this CV PDF."),
          );
        })
        .finally(() => {
          setIsAnonymizingCv(false);
        });
      return;
    }

    if (selectedPdf) {
      executePrompt.reset();
      setCvAnonymizationError(null);
      setCvAnonymizationSuccess(false);
      uploadPdfDocument.mutate({ file: selectedPdf, question: trimmedMessage });
      return;
    }

    uploadPdfDocument.reset();
    setCvAnonymizationError(null);
    setCvAnonymizationSuccess(false);
    executePrompt.mutate({ message: trimmedMessage });
  }

  function handlePdfChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;

    if (!file) {
      return;
    }

    setSelectedPdf(file);
    uploadPdfDocument.reset();
    executePrompt.reset();
    setCvAnonymizationError(null);
    setCvAnonymizationSuccess(false);
  }

  function handleRemovePdf() {
    setSelectedPdf(null);
    uploadPdfDocument.reset();
    setCvAnonymizationError(null);
    setCvAnonymizationSuccess(false);

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
        <IconButton label="Add PDF attachment" onClick={openPdfPicker} disabled={isPending}>
          <PlusIcon className="prompt-icon" />
        </IconButton>

        <TextInput
          label={selectedPdf ? "Question about attached PDF" : "Prompt"}
          placeholder={selectedPdf ? "Ask a question, or leave empty to anonymize a CV" : "Ask anything"}
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
            disabled={!canSubmit}
          >
            <VoiceWaveIcon className="prompt-icon" />
          </IconButton>
        </div>
      </form>

      <div className="document-upload-panel">
        <button className="document-upload-button" type="button" onClick={openPdfPicker} disabled={isPending}>
          <DocumentIcon className="document-upload-button__icon" />
          <span>{selectedPdf ? "Replace PDF document" : "Upload PDF document"}</span>
        </button>
        <p className="document-upload-panel__hint">
          Attach a PDF and ask a question, or leave the prompt empty to anonymize an uploaded CV.
        </p>
      </div>

      {selectedPdf ? (
        <div className="attachment-chip" aria-label="Selected PDF attachment">
          <span className="attachment-chip__name">{selectedPdf.name}</span>
          <button className="attachment-chip__remove" type="button" onClick={handleRemovePdf} disabled={isPending}>
            Remove
          </button>
        </div>
      ) : null}

      <div className="prompt-result" aria-live="polite">
        {isPending ? <p>{isAnonymizingCv ? "Anonymizing CV…" : selectedPdf ? "Reading PDF…" : "Thinking…"}</p> : null}
        {error ? <p role="alert">{error.message}</p> : null}
        {cvAnonymizationSuccess ? <p>Your anonymized CV download has started.</p> : null}
        {response ? <p>{response}</p> : null}
      </div>
    </div>
  );
}
