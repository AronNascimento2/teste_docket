import { useState } from "react";
import { DocumentForm } from "./components/DocumentForm";
import { DocumentsList } from "./components/DocumentsList";
import { LeadDescription } from "./components/LeadDescription";
import { ResponsiveTabs } from "./components/ResponsiveTabs";

type ActiveTab = "form" | "list";

const tabs: { label: string; value: ActiveTab }[] = [
  { label: "Cadastro", value: "form" },
  { label: "Documentos", value: "list" },
];

export const Home = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>("form");

  return (
    <main className="pb-10">
      <p className="mb-6 text-2xl font-bold">Pedido #1</p>

      <LeadDescription />

      <div className="mt-4 sm:mt-6">
        <ResponsiveTabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        <div className="hidden gap-6 lg:flex">
          <DocumentForm />

          <div className="flex w-full min-w-0 flex-col">
            <DocumentsList />
          </div>
        </div>
      </div>
    </main>
  );
};
