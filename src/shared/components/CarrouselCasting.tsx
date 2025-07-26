"use client";
import { useRef } from "react";
import CarouselNavigation from "./CarouselNavigation";
import { Person } from "../interfaces/Person";
import Actor from "./Actor";

type CarrouselProps<T extends Person> = {
  title: string;
  data: { cast: T[] };
};

export default function CarrouselCasting<T extends Person>({
  title,
  data,
}: CarrouselProps<T>) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const goToPrev = () => {
    scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const goToNext = () => {
    scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <>
      <div className="relative">
        <CarouselNavigation goToPrev={goToPrev} goToNext={goToNext} />
        <h1 className="absolute text-white text-xl top-[-10]  px-10">
          {title}
        </h1>
        <div
          ref={scrollRef}
          className="overflow-x-auto scroll-smooth scrollbar-hide "
        >
          <div className="flex gap-1 px-10 py-5 pb-20">
            {data.cast.map((item) => (
              <Actor key={item.id} data={item} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
