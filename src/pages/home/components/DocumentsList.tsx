import { useState } from "react";
import { useDocuments } from "../../../hooks/useDocuments";
import { DocumentCard } from "./DocumentCard";
import { EmptyState } from "./EmptyState";
import { Pagination } from "./Pagination";

const ITEMS_PER_PAGE = 10;

export const DocumentsList = () => {
  const { documents, loading } = useDocuments();
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const currentDocuments = documents.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  if (loading || documents.length === 0) {
    return <EmptyState loading={loading} />;
  }

  return (
    <div>
      <p className="pb-4 text-xl sm:text-left text-[#2e2d2c] text-center font-semibold sm:text-2xl">
        {documents.length}{" "}
        {documents.length > 1
          ? "documentos solicitados"
          : "documento solicitado"}
      </p>

      <div className="h-190 overflow-y-auto pr-2">
        <div className="flex flex-col gap-1">
          {currentDocuments.map((document) => (
            <DocumentCard key={document.id} document={document} />
          ))}
        </div>
      </div>

      <Pagination
        documents={documents}
        ITEMS_PER_PAGE={ITEMS_PER_PAGE}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};
