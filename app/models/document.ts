export type PdfUploadPayload = {
  file: File;
  question: string;
  maxChars?: number;
};

export type PdfUploadResponse = {
  response: string;
};
