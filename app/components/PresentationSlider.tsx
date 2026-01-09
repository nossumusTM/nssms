"use client";

import type { PointerEvent } from "react";
import { useEffect, useRef, useState } from "react";
import CollaborationModal from "./collaboration/CollaborationModal";
import CollaborationSlider, {
  CollaborationItem,
} from "./collaboration/CollaborationSlider";

type Slide = {
  id: "home" | "who" | "projects" | "shares" | "collaborations";
  title: string;
  subtitle: string;
  body: string;
  highlights?: string[];
  metrics?: { label: string; value: string }[];
};

const slides: Slide[] = [
  {
    id: "home",
    title: "Nossumus Foundation",
    subtitle: "Chromatic futures crafted with care.",
    body:
      "We steward long-horizon ideas, empower creative communities, and cultivate technologies that nurture every voice.",
    highlights: ["Stewardship labs", "Human-first systems", "Open collaboration"],
  },
  {
    id: "who",
    title: "Who We Are",
    subtitle: "A foundation for luminous thinking.",
    body:
      "Nossumus is a collective of technologists, artists, and researchers devoted to restorative progress, transparent funding, and inclusive collaboration.",
    highlights: [
      "Pluralistic leadership",
      "Cultural futurism",
      "Ethical funding models",
    ],
  },
  {
    id: "projects",
    title: "Projects",
    subtitle: "Current initiatives & emergent experiments.",
    body:
      "From adaptive learning networks to regenerative design labs, our projects align cultural imagination with responsible systems design.",
    highlights: [
      "Regenerative design lab",
      "Open learning stacks",
      "Civic data craftsmanship",
    ],
    metrics: [
      { label: "Active initiatives", value: "12" },
      { label: "Regions", value: "9" },
      { label: "Partners", value: "38" },
    ],
  },
  {
    id: "shares",
    title: "Shares",
    subtitle: "Beginning in 2026 and onward.",
    body:
      "We distribute shares annually to partners who deepen public trust, expand creative access, and guide our evolving stewardship model.",
    highlights: [
      "Annual distribution cycle",
      "Community-guided allocation",
      "Transparent reporting",
    ],
    metrics: [
      { label: "First share year", value: "2026" },
      { label: "Annual reviews", value: "3" },
      { label: "Open seats", value: "6" },
    ],
  },
  {
    id: "collaborations",
    title: "Collaborations",
    subtitle: "Collective resonance across disciplines.",
    body:
      "Explore our active alliances and open calls for co-creation across research, art, and sustainable technology.",
    highlights: [
      "Residency exchanges",
      "Research sprints",
      "Public showcases",
    ],
  },
];

const collaborationItems: CollaborationItem[] = [
  {
    id: "aurora",
    title: "Aurora Systems",
    description: "Atmospheric sensing + climate storytelling.",
    content:
      "Aurora Systems merges data and artistry to visualize atmospheric shifts, inviting communities to co-design climate resilience strategies.",
  },
  {
    id: "kinetic",
    title: "Kinetic Commons",
    description: "Open-source movement laboratories.",
    content:
      "Kinetic Commons is a global network of motion researchers building open protocols for embodied learning and wellness.",
  },
  {
    id: "lumen",
    title: "Lumen Studios",
    description: "Shared creative residencies.",
    content:
      "Lumen Studios supports interdisciplinary residencies where artists and engineers prototype future cultural institutions together.",
  },
];

export default function PresentationSlider() {
  const [index, setIndex] = useState(0);
  const [activeCollaboration, setActiveCollaboration] = useState(
    null as CollaborationItem | null
  );
  const touchStartX = useRef<number | null>(null);

  const isHome = index === 0;

  const goToSlide = (next: number) => {
    setIndex(Math.min(Math.max(next, 0), slides.length - 1));
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    touchStartX.current = event.clientX;
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const deltaX = event.clientX - touchStartX.current;
    const threshold = 70;
    if (deltaX > threshold) {
      goToSlide(index - 1);
    } else if (deltaX < -threshold) {
      goToSlide(index + 1);
    }
    touchStartX.current = null;
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        goToSlide(index + 1);
      }
      if (event.key === "ArrowLeft") {
        goToSlide(index - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [index]);

  return (
    <section className="relative flex min-h-screen flex-col">
      <nav className="flex items-center justify-between gap-4 px-6 py-5 text-sm text-white/70 md:px-12">
        <span className="uppercase tracking-[0.3em]">Nossumus</span>
        <div className="hidden items-center gap-3 md:flex">
          {slides.map((slide, slideIndex) => (
            <button
              key={slide.id}
              onClick={() => goToSlide(slideIndex)}
              className={`rounded-full px-3 py-1 transition ${
                slideIndex === index
                  ? "bg-white/15 text-white"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {slide.title}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => goToSlide(index - 1)}
            className="rounded-full border border-white/20 px-3 py-1 text-xs uppercase tracking-[0.3em] text-white/70 transition hover:border-white/40"
            disabled={index === 0}
          >
            Prev
          </button>
          <button
            onClick={() => goToSlide(index + 1)}
            className="rounded-full border border-white/20 px-3 py-1 text-xs uppercase tracking-[0.3em] text-white/70 transition hover:border-white/40"
            disabled={index === slides.length - 1}
          >
            Next
          </button>
        </div>
      </nav>

      <div
        className="relative flex flex-1 flex-col justify-center overflow-hidden px-6 py-16 md:px-12"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      >
        <div
          className="flex w-full transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((slide, slideIndex) => (
            <div
              key={slide.id}
              className={`flex w-full flex-shrink-0 flex-col gap-8 pr-8 md:pr-16 ${
                slide.id === "home"
                  ? "items-center text-center"
                  : "items-start text-left"
              }`}
            >
              <div className="flex w-full flex-col gap-6 md:max-w-2xl">
                <p className="text-xs uppercase tracking-[0.4em] text-white/60">
                  {slideIndex + 1} / {slides.length}
                </p>
                {slide.id === "home" && (
                  <div className="mx-auto flex items-center gap-4 rounded-full border border-white/20 bg-white/10 px-6 py-3 backdrop-blur">
                    <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-plasma via-surge to-halo shadow-glow">
                      <span className="text-lg font-semibold text-white">N</span>
                      <span className="absolute -bottom-1 h-2 w-2 rounded-full bg-white" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs uppercase tracking-[0.4em] text-white/60">
                        Foundation
                      </p>
                      <p className="text-base font-semibold text-white">
                        Nossumus
                      </p>
                    </div>
                  </div>
                )}
                <h1
                  className={`text-4xl font-semibold leading-tight text-white md:text-6xl ${
                    slideIndex === 0 ? "text-glow" : ""
                  }`}
                >
                  {slide.title}
                </h1>
                <p className="text-base text-white/80 md:text-lg">
                  {slide.subtitle}
                </p>
                <p className="text-sm text-white/70 md:text-base">
                  {slide.body}
                </p>
              </div>

              {slide.highlights && (
                <div className="flex flex-wrap gap-3">
                  {slide.highlights.map((highlight) => (
                    <span
                      key={highlight}
                      className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/70"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              )}

              {slide.metrics && (
                <div className="grid w-full gap-4 sm:grid-cols-3">
                  {slide.metrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="glass rounded-2xl px-5 py-4"
                    >
                      <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                        {metric.label}
                      </p>
                      <p className="mt-2 text-2xl font-semibold text-white">
                        {metric.value}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {slide.id === "home" && (
                <div className="flex flex-wrap justify-center gap-4">
                  <button
                    onClick={() => goToSlide(1)}
                    className="rounded-full bg-white px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-ink shadow-glow transition hover:-translate-y-1 hover:shadow-xl"
                  >
                    Enter Nossumus
                  </button>
                  <button className="rounded-full border border-white/30 px-6 py-3 text-sm uppercase tracking-[0.3em] text-white/80 transition hover:border-white/60">
                    Contact
                  </button>
                </div>
              )}

              {slide.id === "collaborations" && (
                <div className="w-full max-w-3xl">
                  <CollaborationSlider
                    items={collaborationItems}
                    onSelect={(item) => setActiveCollaboration(item)}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 flex items-center gap-3">
          {slides.map((slide, slideIndex) => (
            <button
              key={slide.id}
              onClick={() => goToSlide(slideIndex)}
              className={`h-2 w-2 rounded-full transition ${
                slideIndex === index ? "bg-white" : "bg-white/30"
              }`}
              aria-label={`Go to ${slide.title}`}
            />
          ))}
        </div>
      </div>

      {isHome && (
        <div className="absolute bottom-8 right-6 hidden rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/60 md:block">
          Swipe / Drag to explore
        </div>
      )}

      <CollaborationModal
        item={activeCollaboration}
        onClose={() => setActiveCollaboration(null)}
      />
    </section>
  );
}