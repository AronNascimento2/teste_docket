import type { Document } from "../../../types/document";
import { DeleteDocumentDialog } from "./DeleteDocumentDialog";
interface DocumentCardProps {
  document: Document;
}

export const DocumentCard = ({ document }: DocumentCardProps) => {
  const isPF = document.person.type === "pf";

  return (
    <div className="mb-4 w-full rounded bg-[#ffffff] shadow transition  ">
      <div className="flex items-center justify-between border-b-2 border-gray-200 p-4 px-6">
        <p className="text-2xl text-[#2e2d2c] font-semibold">
          {document.title}
        </p>

        <DeleteDocumentDialog id={document.id} />
      </div>

      <div className="grid gap-6 p-6 px-8 md:grid-cols-2 ">
        <div className="space-y-2">
          <h3 className="font-semibold">
            {isPF ? "Pessoa física" : "Pessoa jurídica"}
          </h3>

          <p>
            <span>{isPF ? "Nome:" : "Razão social:"}</span>{" "}
            {isPF ? document.person.name : document.person.corporateName}
          </p>

          <p>
            <span>{isPF ? "CPF:" : "CNPJ:"}</span> {document.person.document}
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold">Dados do cartório</h3>

          <p>
            <span>CEP:</span> {document.registryOffice.cep}
          </p>

          <p className="gap-6 flex items-center">
            <span>Rua: {document.registryOffice.street}</span> Nº{" "}
            {document.registryOffice.number}
          </p>

          <div className="flex gap-4">
            <p>
              <span>Cidade:</span> {document.registryOffice.city}
            </p>

            <p>
              <span>UF:</span> {document.registryOffice.uf}
            </p>
          </div>
        </div>
      </div>

      <div className="border-t-2 w-[94%] mx-auto border-gray-200  py-4 ">
        <p>
          <span className="font-semibold">Data de criação: </span>
          {new Date(document.created_at).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>
    </div>
  );
};
