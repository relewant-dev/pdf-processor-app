"use client";

import { useRef, useState, type ChangeEvent, type FormEvent, type KeyboardEvent } from "react";

import { useAnonymizeCvPdf } from "../hooks/useAnonymizeCvPdf";
import { useExecutePrompt } from "../hooks/useExecutePrompt";
import { useUploadPdfDocument } from "../hooks/useUploadPdfDocument";
import { DocumentIcon, SendIcon } from "./icons";

export const PromptComposer = () => {
  const [message, setMessage] = useState("");
  const [selectedPdf, setSelectedPdf] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const executePrompt = useExecutePrompt();
  const uploadPdfDocument = useUploadPdfDocument();
  const anonymizeCvPdf = useAnonymizeCvPdf();
  const isPending = executePrompt.isPending || uploadPdfDocument.isPending || anonymizeCvPdf.isPending;
  const error = executePrompt.error ?? uploadPdfDocument.error ?? anonymizeCvPdf.error;
  const response = uploadPdfDocument.data?.response ?? executePrompt.data?.response;
  const trimmedMessage = message.trim();
  const canSubmit = Boolean(trimmedMessage || selectedPdf) && !isPending;

  const openPdfPicker = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isPending || !canSubmit) {
      return;
    }

    if (selectedPdf && !trimmedMessage) {
      executePrompt.reset();
      uploadPdfDocument.reset();
      anonymizeCvPdf.mutate(selectedPdf, {
        onSuccess: (anonymizedPdf) => {
          const downloadUrl = URL.createObjectURL(anonymizedPdf);
          const downloadLink = document.createElement("a");
          downloadLink.href = downloadUrl;
          downloadLink.download = `anonymized-${selectedPdf.name}`;
          downloadLink.click();
          URL.revokeObjectURL(downloadUrl);
        },
      });
      return;
    }

    if (selectedPdf) {
      executePrompt.reset();
      anonymizeCvPdf.reset();
      uploadPdfDocument.mutate({ file: selectedPdf, question: trimmedMessage });
      return;
    }

    uploadPdfDocument.reset();
    anonymizeCvPdf.reset();
    executePrompt.mutate({ message: trimmedMessage });
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key !== "Enter" || event.shiftKey) {
      return;
    }

    event.preventDefault();

    if (canSubmit) {
      event.currentTarget.form?.requestSubmit();
    }
  };

  const handlePdfChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;

    if (!file) {
      return;
    }

    setSelectedPdf(file);
    uploadPdfDocument.reset();
    anonymizeCvPdf.reset();
    executePrompt.reset();
  };

  const handleRemovePdf = () => {
    setSelectedPdf(null);
    uploadPdfDocument.reset();
    anonymizeCvPdf.reset();

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex w-full flex-col gap-[18px]">
      <form
        className="flex min-h-[58px] w-full items-end gap-2.5 rounded-[30px] border border-neutral-200 bg-white/95 py-2 pl-[18px] pr-2 shadow-[0_16px_42px_rgba(20,20,30,0.08),0_2px_8px_rgba(20,20,30,0.08)] max-[560px]:gap-1.5 max-[560px]:pl-3"
        aria-label="Assistant prompt composer"
        onSubmit={handleSubmit}
      >
        <input
          ref={fileInputRef}
          className="sr-only"
          type="file"
          accept="application/pdf,.pdf"
          aria-label="Upload PDF document"
          onChange={handlePdfChange}
          disabled={isPending}
        />

        <label className="min-w-0 flex-1 py-2">
          <span className="sr-only">{selectedPdf ? "Question about attached PDF" : "Prompt"}</span>
          <textarea
            className="max-h-40 min-h-6 w-full resize-none border-0 bg-transparent text-base leading-6 text-neutral-900 outline-none placeholder:text-neutral-400 disabled:cursor-not-allowed disabled:opacity-55"
            placeholder={selectedPdf ? "Ask a question about the attached PDF" : "Ask anything"}
            rows={1}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isPending}
          />
        </label>

        <button
          className="mb-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-0 bg-neutral-950 text-white shadow-[0_8px_24px_rgba(20,20,30,0.14)] transition duration-150 ease-out hover:bg-neutral-800 active:scale-[0.97] disabled:cursor-not-allowed disabled:bg-neutral-200 disabled:text-neutral-400 disabled:shadow-none"
          type="submit"
          aria-label={isPending ? "Sending prompt" : "Send prompt"}
          disabled={!canSubmit}
        >
          {isPending ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden="true" />
          ) : (
            <SendIcon className="h-5 w-5" />
          )}
        </button>
      </form>

      <div className="flex flex-wrap items-center gap-x-3.5 gap-y-2.5 max-[560px]:flex-col max-[560px]:items-start">
        <button className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3.5 py-2.5 text-sm font-semibold text-neutral-900 shadow-[0_8px_24px_rgba(20,20,30,0.06)] transition duration-150 ease-out hover:border-neutral-300 hover:bg-neutral-50 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-55" type="button" onClick={openPdfPicker} disabled={isPending}>
          <DocumentIcon className="h-[18px] w-[18px]" />
          <span>{selectedPdf ? "Replace PDF document" : "Upload PDF document"}</span>
        </button>
        <p className="m-0 flex-[1_1_260px] text-[13px] leading-snug text-neutral-400">
          Attach a PDF and ask a question about it, or send it without text to anonymize a CV.
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
        {isPending ? <p>{selectedPdf && !trimmedMessage ? "Anonymizing CV…" : selectedPdf ? "Reading PDF…" : "Thinking…"}</p> : null}
        {error ? <p role="alert">{error.message}</p> : null}
        {anonymizeCvPdf.isSuccess ? <p>Your anonymized CV download is ready.</p> : null}
        {response ? <p>{response}</p> : null}
      </div>
    </div>
  );
};
