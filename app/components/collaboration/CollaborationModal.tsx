"use client";

import { useEffect } from "react";
import type { CollaborationItem } from "./CollaborationSlider";

type CollaborationModalProps = {
  item: CollaborationItem | null;
  onClose: () => void;
};

export default function CollaborationModal({
  item,
  onClose,
}: CollaborationModalProps) {
  useEffect(() => {
    if (!item) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/70 p-6 backdrop-blur">
      <div className="glass relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-3xl p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-6 top-6 rounded-full border border-white/20 px-3 py-1 text-xs uppercase tracking-[0.3em] text-white/70 transition hover:border-white/40"
        >
          Close
        </button>
        <p className="text-xs uppercase tracking-[0.4em] text-white/60">
          Collaboration
        </p>
        <h2 className="mt-4 text-3xl font-semibold text-white md:text-4xl">
          {item.title}
        </h2>
        <p className="mt-4 text-lg text-white/80">{item.description}</p>
        <p className="mt-6 text-base text-white/70">{item.content}</p>
      </div>
    </div>
  );
}