import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  goToPrev: () => void;
  goToNext: () => void;
  isSidebarOpen?: boolean;
};
export default function CarouselNavigation({
  goToPrev,
  goToNext,
  isSidebarOpen,
}: Props) {
  return (
    <>
      <button
        onClick={goToPrev}
        className={`absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60 transition ${
          isSidebarOpen ? "z-0" : "z-10"
        }`}
        aria-label="Anterior"
      >
        <ChevronLeft size={28} />
      </button>

      <button
        onClick={goToNext}
        className={`absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60 transition ${
          isSidebarOpen ? "z-0" : "z-10"
        } `}
        aria-label="Siguiente"
      >
        <ChevronRight size={28} />
      </button>
    </>
  );
}
