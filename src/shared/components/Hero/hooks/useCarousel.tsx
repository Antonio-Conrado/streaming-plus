import { Movie } from "@/shared/interfaces/movies";
import { useEffect, useState } from "react";

type Props = {
  latestMovies: Movie[];
};

export default function useCarousel({ latestMovies }: Props) {
  const [current, setCurrent] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Check if the sidebar is active to adjust the z-index
  useEffect(() => {
    const checkbox = document.getElementById(
      "my-drawer-3"
    ) as HTMLInputElement | null;
    if (!checkbox) return;

    const handleChange = () => setIsSidebarOpen(checkbox.checked);
    // Initialize state
    handleChange();

    checkbox.addEventListener("change", handleChange);
    return () => checkbox.removeEventListener("change", handleChange);
  }, []);

  //  Interval to automatically change the slide
  useEffect(() => {
    if (!latestMovies.length) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % latestMovies.length);
    }, 12000);

    return () => clearInterval(interval);
  }, [latestMovies]);

  const goToPrev = () => {
    setCurrent(
      (prev) => (prev - 1 + latestMovies.length) % latestMovies.length
    );
  };

  const goToNext = () => {
    setCurrent((prev) => (prev + 1) % latestMovies.length);
  };

  return {
    current,
    isSidebarOpen,
    goToPrev,
    goToNext,
  };
}
