import Image from "next/image";
import Link from "next/link";
import { imageLink } from "../data/const";
import Rating from "./Rating";
import { Media } from "../interfaces/mediaInformation";
import { generateMediaUrl } from "../helpers/generateMediaUrl";

type CardProps<T extends Media> = {
  data: T;
};

export default function Card<T extends Media>({ data }: CardProps<T>) {
  return (
    <Link href={generateMediaUrl(data)}>
      <div
        tabIndex={0}
        className="
        rounded-lg
        shadow-lg
        min-w-[280px]
        max-w-[280px]
        hover:shadow-2xl
        transition-shadow
        duration-300
        focus:outline-none
        focus:ring-4
        focus:ring-indigo-400
        flex
        flex-col
        items-center
        mx-auto
      "
      >
        <div className="w-full h-80 bg-gray-100 overflow-hidden rounded-t-lg">
          <Image
            src={`${imageLink}/w500/${data.poster_path}`}
            alt={data.title ?? data.name ?? "El título no está disponible"}
            width={320}
            height={256}
            priority
            style={{
              objectFit: "cover",
            }}
            className="hover:scale-115 transition-all duration-300 ease-in"
          />
        </div>

        <div className="flex items-center justify-center gap-3 py-3 px-4 w-full">
          <h3 className="text-lg font-semibold text-gray-100 truncate text-center">
            {data.title ?? data.name}
          </h3>

          <Rating vote_average={data.vote_average} />
        </div>
      </div>
    </Link>
  );
}
