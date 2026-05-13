import { useDocuments } from "../../../hooks/useDocuments";

export const LeadDescription = () => {
  const { status } = useDocuments();

  const isFinished = status === "finished";

  return (
    <article className="w-full rounded bg-[#ffffff] p-4 shadow-md sm:p-6">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-medium sm:text-xl">
          Lead: Documento para criar contrato
        </h2>

        <span className="flex w-fit items-center gap-2 rounded px-2 py-1 text-sm bg-[#ebf0f5] text-gray-500">
          <span
            className={`inline-block h-2 w-2 rounded-full ${
              isFinished ? "bg-green-500" : "bg-yellow-500"
            }`}
          />

          <p>{isFinished ? "Finalizado" : "Em andamento"}</p>
        </span>
      </header>

      <section className="my-4 max-h-40 overflow-y-auto pr-2">
        <p className="text-sm leading-relaxed ">
          <strong>Observação:</strong> Para que o lead seja marcado como{" "}
          <strong>Finalizado</strong>, é necessário gerar ao menos{" "}
          <strong>2 documentos</strong>. Enquanto a quantidade mínima não for
          atingida, o status permanecerá como <strong>Em andamento</strong>.
        </p>
      </section>

      <footer className="flex flex-col gap-2 text-sm sm:flex-row sm:gap-10 ">
        <p>
          <strong>Criado por:</strong> João da Silva
        </p>

        <p>
          <strong>Data de criação:</strong> 12 de maio 2026
        </p>
      </footer>
    </article>
  );
};
