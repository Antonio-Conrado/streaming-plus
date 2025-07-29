import Rating from "@/shared/components/Rating";
import { Genre } from "@/shared/interfaces/movie";
import FavoriteMedia from "./FavoriteMedia";

type GeneralInformationProps = {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  overview: string;
  genres: Genre[];
};

export default function GeneralInformation({
  id,
  title,
  poster_path,
  vote_average,
  overview,
  genres,
}: GeneralInformationProps) {
  return (
    <>
      <section className=" relative mt-40 lg:mt-10  px-5 ">
        <div className="flex flex-col gap-4">
          <div className="flex justify-center gap-4">
            <h1 className="text-3xl text-center mb-2">{title}</h1>
            <Rating vote_average={vote_average} />
          </div>
          <FavoriteMedia
            id={id}
            title={title}
            poster_path={poster_path}
            vote_average={vote_average}
          />
        </div>

        <div className="flex justify-around md:w-1/2 md:mx-auto">
          {genres.map((genre) => (
            <div key={genre.id} className="flex flex-row gap-3 mt-5 ">
              <div className="border-l-2 border-l-red-600"></div>
              <p className="font-semibold">{genre.name}</p>
            </div>
          ))}
        </div>

        <p className="font-semibold mt-8 md:pl-82 text-xl">
          Descripción:{" "}
          <span className="font-normal text-sm">
            {overview ? overview : "No hay información disponible"}
          </span>
        </p>
      </section>
    </>
  );
}
