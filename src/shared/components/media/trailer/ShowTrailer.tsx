"use client";

import { fetchMovieVideos } from "@/lib/tmdb/movie-api";
import { fetchSerieVideos } from "@/lib/tmdb/serie-api";
import { useEffect, useState } from "react";

type Props = {
  id: number;
  type: "SERIE" | "MOVIE";
};

export default function ShowTrailer({ id, type }: Props) {
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [error, setError] = useState<boolean>(false); // NUEVO estado de error

  const handleClick = async () => {
    const linkVideo =
      type === "SERIE"
        ? await fetchSerieVideos(id)
        : await fetchMovieVideos(id);

    if (!linkVideo || !linkVideo.results) {
      setError(true);
      return;
    }

    const trailer = linkVideo.results.find(
      (result) => result.type === "Trailer"
    );

    if (trailer) {
      setTrailerKey(trailer.key);
      setError(false);
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(false);
      }, 5000);
    }
  }, [error]);

  const handleClose = () => {
    setTrailerKey(null);
  };

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <button className="btn btn-secondary rounded-md" onClick={handleClick}>
        Ver tráiler
      </button>

      {error && (
        <div className="toast toast-top toast-end">
          <div className="alert alert-error">
            <span>El trailer no está disponible en este momento.</span>
          </div>
        </div>
      )}

      {trailerKey && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={handleClose}
        >
          <div
            className="w-11/12 max-w-3xl aspect-video px-5 relative"
            onClick={stopPropagation}
          >
            <button
              className="absolute top-[-30] right-5 text-white text-5xl font-bold cursor-pointer"
              onClick={handleClose}
              aria-label="Cerrar"
            >
              &times;
            </button>

            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title="YouTube trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}
