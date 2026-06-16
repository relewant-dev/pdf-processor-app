"use client";

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";

import { anonymizeCvPdf } from "../api/client";
import { useExecutePrompt } from "../hooks/useExecutePrompt";
import { useUploadPdfDocument } from "../hooks/useUploadPdfDocument";
import { IconButton } from "./IconButton";
import { DocumentIcon, MicrophoneIcon, PlusIcon, VoiceWaveIcon } from "./icons";
import { ModeSelector } from "./ModeSelector";
import { TextInput } from "./TextInput";

const ANONYMIZED_CV_FILENAME = "anonymized-cv.pdf";

export const PromptComposer = () => {
  const [message, setMessage] = useState("");
  const [selectedPdf, setSelectedPdf] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const executePrompt = useExecutePrompt();
  const uploadPdfDocument = useUploadPdfDocument();
  const [cvAnonymizationError, setCvAnonymizationError] = useState<Error | null>(null);
  const [isAnonymizingCv, setIsAnonymizingCv] = useState(false);
  const [anonymizedCvDownloadUrl, setAnonymizedCvDownloadUrl] = useState<string | null>(null);
  const isPending = executePrompt.isPending || uploadPdfDocument.isPending || isAnonymizingCv;
  const error = executePrompt.error ?? uploadPdfDocument.error ?? cvAnonymizationError;
  const response = uploadPdfDocument.data?.response ?? executePrompt.data?.response;
  const canSubmit = Boolean(message.trim() || selectedPdf) && !isPending;

  useEffect(() => {
    return () => {
      if (anonymizedCvDownloadUrl) {
        URL.revokeObjectURL(anonymizedCvDownloadUrl);
      }
    };
  }, [anonymizedCvDownloadUrl]);

  const clearAnonymizedCvDownload = () => {
    setAnonymizedCvDownloadUrl(null);
  };

  const openPdfPicker = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedMessage = message.trim();

    if (isPending || (!trimmedMessage && !selectedPdf)) {
      return;
    }

    if (selectedPdf && !trimmedMessage) {
      executePrompt.reset();
      uploadPdfDocument.reset();
      setCvAnonymizationError(null);
      clearAnonymizedCvDownload();
      setIsAnonymizingCv(true);

      anonymizeCvPdf(selectedPdf)
        .then((anonymizedPdf) => {
          setAnonymizedCvDownloadUrl(URL.createObjectURL(anonymizedPdf));
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
      clearAnonymizedCvDownload();
      uploadPdfDocument.mutate({ file: selectedPdf, question: trimmedMessage });
      return;
    }

    uploadPdfDocument.reset();
    setCvAnonymizationError(null);
    clearAnonymizedCvDownload();
    executePrompt.mutate({ message: trimmedMessage });
  };

  const handlePdfChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;

    if (!file) {
      return;
    }

    setSelectedPdf(file);
    uploadPdfDocument.reset();
    executePrompt.reset();
    setCvAnonymizationError(null);
    clearAnonymizedCvDownload();
  };

  const handleRemovePdf = () => {
    setSelectedPdf(null);
    uploadPdfDocument.reset();
    setCvAnonymizationError(null);
    clearAnonymizedCvDownload();

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex w-full flex-col gap-[18px]">
      <form className="flex min-h-[58px] w-full items-center gap-2.5 rounded-full border border-neutral-200 bg-white/95 py-[7px] pl-[18px] pr-2 shadow-[0_16px_42px_rgba(20,20,30,0.08),0_2px_8px_rgba(20,20,30,0.08)] max-[560px]:gap-1.5 max-[560px]:pl-3" aria-label="Assistant prompt composer" onSubmit={handleSubmit}>
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
          <PlusIcon className="h-5 w-5" />
        </IconButton>

        <TextInput
          label={selectedPdf ? "Question about attached PDF" : "Prompt"}
          placeholder={selectedPdf ? "Ask a question, or leave empty to anonymize a CV" : "Ask anything"}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          disabled={isPending}
        />

        <div className="flex shrink-0 items-center gap-2" aria-label="Prompt actions">
          <ModeSelector value="Instant" aria-label="Response mode: Instant" />
          <IconButton label="Use microphone" disabled={isPending}>
            <MicrophoneIcon className="h-[19px] w-[19px]" />
          </IconButton>
          <IconButton
            label={isPending ? "Sending prompt" : "Send prompt"}
            variant="filled"
            type="submit"
            disabled={!canSubmit}
          >
            <VoiceWaveIcon className="h-5 w-5" />
          </IconButton>
        </div>
      </form>

      <div className="flex flex-wrap items-center gap-x-3.5 gap-y-2.5 max-[560px]:flex-col max-[560px]:items-start">
        <button className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3.5 py-2.5 text-sm font-semibold text-neutral-900 shadow-[0_8px_24px_rgba(20,20,30,0.06)] transition duration-150 ease-out hover:border-neutral-300 hover:bg-neutral-50 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-55" type="button" onClick={openPdfPicker} disabled={isPending}>
          <DocumentIcon className="h-[18px] w-[18px]" />
          <span>{selectedPdf ? "Replace PDF document" : "Upload PDF document"}</span>
        </button>
        <p className="m-0 flex-[1_1_260px] text-[13px] leading-snug text-neutral-400">
          Attach a PDF and ask a question, or leave the prompt empty to anonymize an uploaded CV.
        </p>
      </div>

      {selectedPdf ? (
        <div className="inline-flex max-w-full items-center gap-2.5 self-start rounded-full border border-neutral-200 bg-neutral-50 py-1.5 pl-3 pr-2.5 text-sm text-zinc-700" aria-label="Selected PDF attachment">
          <span className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap">{selectedPdf.name}</span>
          <button className="shrink-0 rounded-full border-0 bg-transparent text-[13px] font-semibold text-zinc-600 hover:text-neutral-950 hover:underline disabled:cursor-not-allowed disabled:opacity-55" type="button" onClick={handleRemovePdf} disabled={isPending}>
            Remove
          </button>
        </div>
      ) : null}

      <div className="min-h-6 text-[15px] leading-normal text-neutral-900 [&_[role=alert]]:text-red-700 [&_p]:m-0" aria-live="polite">
        {isPending ? <p>{isAnonymizingCv ? "Anonymizing CV…" : selectedPdf ? "Reading PDF…" : "Thinking…"}</p> : null}
        {error ? <p role="alert">{error.message}</p> : null}
        {anonymizedCvDownloadUrl ? (
          <div className="flex flex-wrap items-center gap-3">
            <p>Your anonymized CV is ready.</p>
            <a className="inline-flex items-center justify-center rounded-full border-0 bg-black px-4 py-2.5 text-sm font-semibold text-white no-underline transition duration-150 ease-out hover:bg-neutral-800 active:scale-[0.98]" href={anonymizedCvDownloadUrl} download={ANONYMIZED_CV_FILENAME}>
              Download anonymized CV
            </a>
          </div>
        ) : null}
        {response ? <p>{response}</p> : null}
      </div>
    </div>
  );
};
