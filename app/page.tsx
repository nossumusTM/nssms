import ChromaticDrip from "./components/ChromaticDrip";
import PresentationSlider from "./components/PresentationSlider";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-ink">
      <ChromaticDrip />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80" />
      <div className="relative z-10">
        <PresentationSlider />
      </div>
    </main>
  );
}