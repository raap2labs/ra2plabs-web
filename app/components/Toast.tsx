"use client";

import { useEffect } from "react";
import { Check, XClose } from "./Icons";

type ToastProps = {
  show: boolean;
  type: "success" | "error";
  message: string;
  onClose: () => void;
};

export default function Toast({ show, type, message, onClose }: ToastProps) {
  useEffect(() => {
    if (!show) return;
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div
      className={`fixed top-24 right-6 z-[100] flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-2xl border transition-all duration-300 ${
        type === "success"
          ? "bg-green-900/90 border-green-700/50 text-green-300"
          : "bg-red-900/90 border-red-700/50 text-red-300"
      }`}
      role="status"
    >
      {type === "success" ? (
        <Check className="w-5 h-5 shrink-0" />
      ) : (
        <XClose className="w-5 h-5 shrink-0" />
      )}
      <span className="text-sm font-medium">{message}</span>
      <button
        onClick={onClose}
        className="ml-2 opacity-60 hover:opacity-100 transition-opacity"
        aria-label="Cerrar"
      >
        <XClose className="w-4 h-4" />
      </button>
    </div>
  );
}
