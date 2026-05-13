import { API_URL } from "./api";
import type { Document } from "../types/document";

export const getDocuments = async (): Promise<Document[]> => {
  const response = await fetch(`${API_URL}/documents`);

  if (!response.ok) {
    throw new Error("Erro ao buscar documentos");
  }

  const documents: Document[] = await response.json();

  return documents.sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  );
};
