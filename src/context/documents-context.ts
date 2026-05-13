import { createContext } from "react";
import type { Document } from "../types/document";

export interface DocumentsContextProps {
  documents: Document[];
  loading: boolean;
  fetchDocuments: () => Promise<void>;
  handleDelete: (id: string) => Promise<void>;
  status: "progress" | "finished";
}

export const DocumentsContext = createContext({} as DocumentsContextProps);
