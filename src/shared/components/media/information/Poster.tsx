import { imageLink } from "@/shared/data/const";
import Image from "next/image";

type PosterProps = {
  backdrop_path: string;
  poster_path: string;
};

export default function Poster({ backdrop_path, poster_path }: PosterProps) {
  return (
    <div className="relative max-h-[800px]">
      <div className="relative w-full h-[650px] overflow-hidden">
        <Image
          src={`${imageLink}/original/${backdrop_path}`}
          alt="image"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="absolute bottom-[-150] left-1/2 -translate-x-1/2 sm:left-10 sm:translate-x-0">
        <Image
          src={`${imageLink}/original/${poster_path}`}
          alt="image"
          className="object-cover rounded-xl h-60 w-60 md:h-82"
          height={180}
          width={300}
          priority
        />
      </div>
    </div>
  );
}
