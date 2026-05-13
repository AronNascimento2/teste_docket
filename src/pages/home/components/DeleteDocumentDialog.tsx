import { useState } from "react";
import { Trash, X } from "lucide-react";
import { useDocuments } from "../../../hooks/useDocuments";
import { showToast } from "../../../components/ui/ShowToast";

interface DeleteDocumentDialogProps {
  id: string;
}

export const DeleteDocumentDialog = ({ id }: DeleteDocumentDialogProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { handleDelete, fetchDocuments } = useDocuments();

  const handleConfirm = async () => {
    if (loading) return;

    setLoading(true);

    try {
      await handleDelete(id);

      setOpen(false);
      showToast({
        message: "Documento excluído com sucesso!",
        type: "success",
      });
      await fetchDocuments();
    } catch {
      showToast({
        message: "Erro ao excluir documento",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-md p-2 text-[#3570b2] transition hover:bg-blue-50 hover:text-[#0770e7] cursor-pointer"
      >
        <Trash size={20} />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="relative w-full max-w-[600px] rounded-sm bg-[#ffffff] shadow-xl">
            <div className="flex flex-col gap-6 p-6 px-7">
              <div className="flex items-center justify-between">
                <h2 className="text-[22px] font-semibold text-gray-900">
                  Confirmar exclusão
                </h2>

                <X
                  className="cursor-pointer text-gray-500 transition hover:text-gray-700"
                  onClick={() => setOpen(false)}
                />
              </div>

              <p className="text-[16px] text-gray-600">
                Tem certeza que deseja excluir este documento?
              </p>
            </div>

            <div className="flex justify-end gap-6 rounded-b-sm bg-[#f3f3f3] p-4 px-6">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="h-8 w-20 cursor-pointer rounded-full border border-[#3570b2] text-sm font-medium text-[#3570b2] transition hover:bg-[#0770e7] hover:text-white"
              >
                Cancelar
              </button>

              <button
                disabled={loading}
                type="button"
                onClick={handleConfirm}
                className="flex h-8 w-20 cursor-pointer items-center justify-center rounded-full bg-[#e65562] text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  "Excluir"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
