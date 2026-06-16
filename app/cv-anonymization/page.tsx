"use client";

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";

import { anonymizeCvPdf } from "../api/client";

const PDF_MIME_TYPE = "application/pdf";
const DOWNLOAD_FILENAME = "anonymized-cv.pdf";

function isPdfFile(file: File) {
  return file.type === PDF_MIME_TYPE || file.name.toLowerCase().endsWith(".pdf");
}

function downloadBlobUrl(url: string) {
  const link = document.createElement("a");
  link.href = url;
  link.download = DOWNLOAD_FILENAME;
  document.body.appendChild(link);
  link.click();
  link.remove();
}

export default function CvAnonymizationPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const downloadUrlRef = useRef<string | null>(null);

  useEffect(() => {
    downloadUrlRef.current = downloadUrl;
  }, [downloadUrl]);

  useEffect(() => {
    return () => {
      if (downloadUrlRef.current) {
        URL.revokeObjectURL(downloadUrlRef.current);
      }
    };
  }, []);

  function replaceDownloadUrl(url: string | null) {
    setDownloadUrl((currentUrl) => {
      if (currentUrl) {
        URL.revokeObjectURL(currentUrl);
      }

      return url;
    });
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;
    replaceDownloadUrl(null);
    setSelectedFile(file);
    setError(null);

    if (file && !isPdfFile(file)) {
      setError("Please select a PDF file before anonymizing your CV.");
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    replaceDownloadUrl(null);
    setError(null);

    if (!selectedFile) {
      setError("Choose a CV PDF to anonymize.");
      return;
    }

    if (!isPdfFile(selectedFile)) {
      setError("Please select a PDF file before anonymizing your CV.");
      return;
    }

    setIsLoading(true);

    try {
      const anonymizedPdf = await anonymizeCvPdf(selectedFile);
      const url = URL.createObjectURL(anonymizedPdf);
      replaceDownloadUrl(url);
      downloadBlobUrl(url);
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Unable to anonymize this CV PDF.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="cv-page-shell" aria-labelledby="cv-page-title">
      <section className="cv-card">
        <div className="cv-card__header">
          <p className="cv-card__eyebrow">CV anonymization</p>
          <h1 id="cv-page-title">Upload a CV PDF to anonymize it.</h1>
          <p className="cv-card__description">
            Select a PDF resume or CV, send it for anonymization, and download the anonymized PDF when it is ready.
          </p>
        </div>

        <form className="cv-upload-form" onSubmit={handleSubmit}>
          <label className="cv-file-field" htmlFor="cv-pdf">
            <span className="cv-file-field__label">CV PDF</span>
            <input
              id="cv-pdf"
              type="file"
              name="file"
              accept="application/pdf,.pdf"
              onChange={handleFileChange}
              disabled={isLoading}
            />
          </label>

          {selectedFile ? <p className="cv-file-name">Selected: {selectedFile.name}</p> : null}

          <button className="cv-submit-button" type="submit" disabled={isLoading || !selectedFile}>
            {isLoading ? "Anonymizing CV…" : "Anonymize and download"}
          </button>
        </form>

        <div className="cv-status" aria-live="polite">
          {error ? <p role="alert">{error}</p> : null}
          {downloadUrl ? (
            <a className="cv-download-link" href={downloadUrl} download={DOWNLOAD_FILENAME}>
              Download anonymized CV
            </a>
          ) : null}
        </div>
      </section>
    </main>
  );
}
