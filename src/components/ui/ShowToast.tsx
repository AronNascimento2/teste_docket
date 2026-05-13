import toast from "react-hot-toast";
import { CheckCircle2, X, XCircle } from "lucide-react";

type ToastType = {
  message: string;
  type: "success" | "error";
};

export const showToast = ({ message, type }: ToastType) => {
  const colors = {
    success: "#00b98e",
    error: "#dc2626",
  };

  const icons = {
    success: <CheckCircle2 size={24} />,
    error: <XCircle size={24} />,
  };

  toast.custom(
    (t) => (
      <div
        className={`
          flex w-110 items-center justify-between
          rounded-md px-5 py-2
          text-white shadow-2xl
          transition-all duration-300 ease-out
          ${
            t.visible
              ? "translate-y-0 opacity-100 scale-100"
              : "-translate-y-5 opacity-0 scale-95"
          }
        `}
        style={{
          background: colors[type],
        }}
      >
        <div className="flex items-center gap-3">
          {icons[type]}

          <p className=" font-medium">{message}</p>
        </div>

        <button
          onClick={() => toast.dismiss(t.id)}
          className="cursor-pointer rounded-full p-1 transition hover:bg-white/20"
        >
          <X size={25} />
        </button>
      </div>
    ),
    {
      duration: 2000,
    },
  );
};
