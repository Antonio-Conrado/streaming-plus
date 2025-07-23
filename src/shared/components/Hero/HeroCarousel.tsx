"use client";
import { Movie } from "../../interfaces/movies";
import HeroImage from "./HeroImage";
import CarouselNavigation from "../CarouselNavigation";
import Information from "./Information";
import useCarousel from "./hooks/useCarousel";

type Props = {
  imageLink: string | undefined;
  latetsMovies: Movie[];
};

export default function HeroCarousel({ imageLink, latetsMovies }: Props) {
  const { current, isSidebarOpen, goToPrev, goToNext } = useCarousel({
    latestMovies: latetsMovies,
  });
  return (
    <div className="relative w-full h-[650px] overflow-hidden">
      {latetsMovies.map((item, index) => (
        <div key={item.id || index}>
          <HeroImage
            item={item}
            index={index}
            current={current}
            imageLink={imageLink || ""}
          />
          <Information
            index={index}
            current={current}
            id={item.id}
            title={item.title}
            vote_average={item.vote_average}
            isSidebarOpen={isSidebarOpen}
          />
        </div>
      ))}

      <CarouselNavigation
        goToPrev={goToPrev}
        goToNext={goToNext}
        isSidebarOpen={isSidebarOpen}
      />
    </div>
  );
}
