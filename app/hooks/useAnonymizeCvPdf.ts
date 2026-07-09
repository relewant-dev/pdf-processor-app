import { useMutation } from "@tanstack/react-query";

import { anonymizeCvPdf } from "../api/client";

export const useAnonymizeCvPdf = () => {
  return useMutation<Blob, Error, File>({
    mutationFn: anonymizeCvPdf,
  });
};
