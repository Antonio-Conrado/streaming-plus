"use client";
import { fetchSeasonById } from "@/lib/tmdb/serie-api";
import ShowTrailer from "@/shared/components/media/trailer/ShowTrailer";
import { playSerie } from "@/shared/data/const";
import { Episode } from "@/shared/interfaces/season";
import { SerieDetail } from "@/shared/interfaces/serie";
import { useEffect, useRef, useState } from "react";

type Props = {
  serie: SerieDetail;
};

export default function ShowEpisodes({ serie }: Props) {
  const dropdownRef = useRef<HTMLDetailsElement | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>();
  const [currentEpisode, setCurrentEpisode] = useState<{
    season: number;
    episode: number;
  } | null>(null);
  const [ready, setReady] = useState(false);

  const handleShowEpisodes = async (season_number: number) => {
    const season = await fetchSeasonById(serie.id, season_number);
    if (!season) return;
    setEpisodes(season.episodes);
  };

  const watchEpisode = (season_number: number, episode_number: number) => {
    setCurrentEpisode({ season: season_number, episode: episode_number });
    setReady(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        dropdownRef.current.removeAttribute("open");
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <section className="mt-5 my-10">
      <div className="flex justify-around gap-5 md:pl-82">
        <ShowTrailer id={serie.id} type="SERIE" />
        <details ref={dropdownRef} className="dropdown relative">
          <summary className="btn btn-accent rounded-md">Temporadas</summary>
          <ul className="absolute top-full left-[-25] md:left-[-5] menu bg-base-100 rounded-box z-10 w-40 md:w-52 gap-2 shadow-sm max-h-52 flex flex-row overflow-y-auto">
            {serie.seasons
              .filter((season) => season.name !== "Especiales")
              .map((season) => (
                <li key={season.id} className="w-fit">
                  <button
                    className="btn btn-success rounded-md h-full"
                    onClick={() => handleShowEpisodes(season.season_number)}
                  >
                    {season.name}
                  </button>
                </li>
              ))}
          </ul>
        </details>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-5 gap-2 w-3/4 mx-auto">
        {episodes?.map((episode) => (
          <div
            key={episode.id}
            className="btn btn-soft btn-default rounded-md flex justify-start"
            onClick={() =>
              watchEpisode(episode.season_number, episode.episode_number)
            }
          >
            {episode.episode_number} - {episode.name}
          </div>
        ))}
      </div>

      <div className="mt-10 w-[95%] mx-auto flex justify-center">
        {currentEpisode && !ready && (
          <button
            onClick={() => setReady(true)}
            className="btn btn-accent rounded-md"
          >
            Ver episodio
          </button>
        )}

        {currentEpisode && ready && (
          <iframe
            src={`${playSerie}/${serie.id}/${currentEpisode.season}/${currentEpisode.episode}`}
            className="w-full h-[500px] lg:h-[700px]"
            allowFullScreen
            frameBorder={0}
          />
        )}
      </div>
    </section>
  );
}
