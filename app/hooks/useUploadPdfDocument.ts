import { useMutation } from "@tanstack/react-query";

import { uploadPdfDocument } from "../api/client";
import type { PdfUploadPayload, PdfUploadResponse } from "../models/document";

export function useUploadPdfDocument() {
  return useMutation<PdfUploadResponse, Error, PdfUploadPayload>({
    mutationFn: uploadPdfDocument,
  });
}
