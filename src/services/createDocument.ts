import { API_URL } from "./api";

interface CreateDocumentPayload {
  title: string;
  person: {
    type: "pf" | "pj";
    name?: string;
    corporateName?: string;
    document: string;
  };
  registryOffice: {
    cep: string;
    street: string;
    number: string;
    city: string;
    uf: string;
  };
}

export const createDocument = async (payload: CreateDocumentPayload) => {
  const response = await fetch(`${API_URL}/documents`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Erro ao criar documento");
  }

  return response.json();
};
