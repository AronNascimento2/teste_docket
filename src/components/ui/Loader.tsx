interface LoaderProps {
  fullscreen?: boolean;
  text?: string;
  withBackground?: boolean;
}

export const Loader = ({
  fullscreen = false,
  text = "Carregando...",
  withBackground = true,
}: LoaderProps) => {
  if (fullscreen) {
    return (
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center ${
          withBackground ? "bg-black/30 backdrop-blur-[1px]" : ""
        }`}
      >
        <div
          className={`flex w-72 flex-col items-center rounded p-5 shadow-2xl ${
            withBackground ? "bg-[#ffffff]" : ""
          }`}
        >
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-[#3570b2]" />

          <p className="mt-4 text-center text-sm font-medium text-gray-700">
            {text}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex h-[50vh] flex-col items-center justify-center ${
        withBackground ? "bg-[#ffffff] shadow-md" : ""
      }`}
    >
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#3570b2] border-t-transparent" />

      <p className="text-lg font-medium text-gray-700">{text}</p>
    </div>
  );
};
