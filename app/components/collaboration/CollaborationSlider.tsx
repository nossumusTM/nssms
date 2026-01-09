"use client";

export type CollaborationItem = {
  id: string;
  title: string;
  description: string;
  content: string;
};

type CollaborationSliderProps = {
  items: CollaborationItem[];
  onSelect: (item: CollaborationItem) => void;
};

export default function CollaborationSlider({
  items,
  onSelect,
}: CollaborationSliderProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.4em] text-white/60">
          Featured collaborations
        </p>
        <p className="text-xs text-white/50">Tap to expand</p>
      </div>
      <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item)}
            className="glass w-64 flex-shrink-0 snap-center rounded-3xl p-5 text-left transition hover:-translate-y-1 hover:border-white/30"
          >
            <h3 className="text-lg font-semibold text-white">{item.title}</h3>
            <p className="mt-2 text-sm text-white/70">{item.description}</p>
            <div className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/60">
              View
              <span aria-hidden="true">↗</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}