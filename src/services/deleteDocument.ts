import { API_URL } from "./api";

export const deleteDocument = async (id: string) => {
  const response = await fetch(`${API_URL}/documents/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Erro ao excluir documento");
  }

  return true;
};
