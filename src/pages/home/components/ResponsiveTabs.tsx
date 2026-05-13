import { DocumentForm } from "./DocumentForm";
import { DocumentsList } from "./DocumentsList";

type ActiveTab = "form" | "list";

interface ResponsiveTabsProps {
  tabs: {
    label: string;
    value: ActiveTab;
  }[];
  activeTab: ActiveTab;
  onTabChange: React.Dispatch<React.SetStateAction<ActiveTab>>;
}

export const ResponsiveTabs = ({
  tabs,
  activeTab,
  onTabChange,
}: ResponsiveTabsProps) => {
  return (
    <>
      <div className="mb-4 flex rounded border border-gray-200 bg-[#ffffff] p-1 shadow-sm lg:hidden">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.value;

          return (
            <button
              key={tab.value}
              type="button"
              onClick={() => onTabChange(tab.value)}
              className={`flex-1 rounded px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-[#3570b2] text-white shadow-md"
                  : "text-gray-500 hover:bg-gray-100 hover:text-gray-800"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="lg:hidden">
        {activeTab === "form" ? <DocumentForm /> : <DocumentsList />}
      </div>
    </>
  );
};
