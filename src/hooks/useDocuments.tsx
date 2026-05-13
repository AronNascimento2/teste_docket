import { useContext } from "react";
import { DocumentsContext } from "../context/documents-context";

export const useDocuments = () => {
  return useContext(DocumentsContext);
};
