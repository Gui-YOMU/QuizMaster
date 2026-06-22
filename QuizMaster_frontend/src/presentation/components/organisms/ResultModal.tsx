import { Check, TimerOff, X } from "lucide-react";

interface ResultModalProps {
  status: string | null;
}

export const ResultModal = ({ status }: ResultModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <dialog
        className="absolute top-1/2 left-1/2 -translate-1/2 w-75 h-75 flex flex-col p-3 border-5 border-border"
        open
      >
        {status === "good" && <div className="w-full h-full flex justify-center items-center"><Check size={180} color="#2EB961"/></div>}
        {status === "bad" && <div className="w-full h-full flex justify-center items-center"><X  size={180} color="#DA5959"/></div>}
        {status === "timeout" && <div className="w-full h-full flex justify-center items-center"><TimerOff  size={180} color="#DB9725"/></div>}
      </dialog>
    </div>
  );
};
