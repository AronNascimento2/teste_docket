import { File } from "lucide-react";
import { Loader } from "../../../components/ui/Loader";

interface EmptyStateProps {
  loading?: boolean;
}

export const EmptyState = ({ loading }: EmptyStateProps) => {
  return (
    <section className="flex h-[50vh] w-full items-center justify-center rounded-sm bg-white shadow-md">
      {loading ? (
        <Loader text="Carregando..." withBackground={false} />
      ) : (
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-200">
            <File className="text-gray-500" size={28} />
          </div>

          <p className="text-lg text-gray-500">Nenhum documento criado</p>
        </div>
      )}
    </section>
  );
};
