import { Header } from "./Header";
import { Footer } from "./Footer";

type LayoutProps = {
  children: React.ReactNode;
};

export const AppLayout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="mx-auto w-full max-w-500 px-4 py-4 sm:px-8 sm:py-6 flex-1">
        {children}
      </main>

      <Footer />
    </div>
  );
};
