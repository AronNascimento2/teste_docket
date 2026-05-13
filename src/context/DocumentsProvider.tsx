import { useCallback, useEffect, useMemo, useState } from "react";
import { getDocuments } from "../services/getDocuments";
import type { Document } from "../types/document";
import { DocumentsContext } from "./documents-context";
import { deleteDocument } from "../services/deleteDocument";

export const DocumentsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchDocuments = useCallback(async () => {
    try {
      setLoading(true);

      const response = await getDocuments();

      setDocuments(response);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDelete = useCallback(async (id: string) => {
    await deleteDocument(id);
  }, []);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  const status: "progress" | "finished" =
    documents.length >= 2 ? "finished" : "progress";

  const value = useMemo(
    () => ({
      documents,
      loading,
      fetchDocuments,
      handleDelete,
      status,
    }),
    [documents, loading, fetchDocuments, handleDelete, status],
  );

  return (
    <DocumentsContext.Provider value={value}>
      {children}
    </DocumentsContext.Provider>
  );
};
