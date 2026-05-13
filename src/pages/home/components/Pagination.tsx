import type { Dispatch, SetStateAction } from "react";
import type { Document } from "../../../types/document";

interface PaginationProps {
  documents: Document[];
  ITEMS_PER_PAGE: number;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

export const Pagination = ({
  documents,
  ITEMS_PER_PAGE,
  currentPage,
  setCurrentPage,
}: PaginationProps) => {
  const totalPages = Math.ceil(documents.length / ITEMS_PER_PAGE);

  return (
    <>
      {" "}
      {documents.length > ITEMS_PER_PAGE && (
        <div className="mt-4 flex items-center justify-center gap-3">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="rounded border px-3 py-1 disabled:cursor-not-allowed disabled:opacity-50 bg-[#3570b2] text-white hover:bg-[#0770e7] cursor-pointer"
          >
            Anterior
          </button>

          <span className="text-sm text-gray-600">
            Página {currentPage} de {totalPages}
          </span>

          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="rounded border px-3 py-1 disabled:cursor-not-allowed disabled:opacity-50 bg-[#3570b2] hover:bg-[#0770e7] text-white cursor-pointer"
          >
            Próxima
          </button>
        </div>
      )}
    </>
  );
};
