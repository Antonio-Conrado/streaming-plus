import Image from "next/image";
import { Movie } from "@/shared/interfaces/movies";

type Props = {
  item: Movie;
  index: number;
  current: number;
  imageLink: string;
};

export default function HeroImage({ item, index, current, imageLink }: Props) {
  return (
    <div
      key={item.id || index}
      className={`absolute inset-0 transition-opacity duration-1000 ease-in-out  cursor-pointer ${
        index === current ? "opacity-100 z-0" : "opacity-0 z-0"
      }`}
    >
      <Image
        src={`${imageLink}/w1280${item.backdrop_path ?? item.poster_path}`}
        alt={`Imagen destacada ${index + 1}`}
        fill
        className="object-cover opacity-70"
        priority
      />
    </div>
  );
}
