"use client";
import { useEffect, useRef, useState } from "react";
import Card from "./Card";
import { Media } from "../interfaces/mediaInformation";
import { fetchTrendingMovies } from "@/lib/tmdb/movie-api";
import { ArrowBigUp } from "lucide-react";
import { fetchTopRatedSeries } from "@/lib/tmdb/serie-api";

type InfiniteScrollProps<T extends Media> = {
  type: "MOVIES" | "SERIES";
  data: { results: T[] };
};

export default function InfiniteScroll<T extends Media>({
  type,
  data,
}: InfiniteScrollProps<T>) {
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<Media[]>(data.results);
  const [isLoading, setIsLoading] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (page === 1) return;

    const request =
      type === "MOVIES" ? fetchTrendingMovies(page) : fetchTopRatedSeries(page);

    const loadMore = async () => {
      setIsLoading(true);
      const newData = await request;
      if (!newData) return;
      setItems((prev) => [...prev, ...newData.results]);
      setIsLoading(false);
    };

    loadMore();
  }, [page, type]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );

    const targetElement = observerRef.current;
    if (targetElement) observer.observe(targetElement);

    return () => {
      if (targetElement) observer.unobserve(targetElement);
    };
  }, [isLoading]);

  return (
    <main className="relative">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 px-4">
        {items.map((item) => (
          <Card key={item.id} data={item} />
        ))}
        <div ref={observerRef} className="h-10 col-span-full"></div>
        {isLoading && (
          <div className="fixed inset-0 bottom-2 flex items-end justify-center z-50 ">
            <span className="loading loading-spinner text-accent loading-xl"></span>
          </div>
        )}
      </div>

      <button
        className="fixed bottom-5 right-5 z-50 bg-purple-700 text-white px-3 py-1 rounded"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <ArrowBigUp />
      </button>
    </main>
  );
}
