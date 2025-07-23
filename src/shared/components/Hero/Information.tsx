import Link from "next/link";
import Rating from "../Rating";

type Props = {
  index: number;
  current: number;
  id: number;
  title: string;
  vote_average: number;
  isSidebarOpen: boolean;
};

export default function Information({
  index,
  current,
  id,
  title,
  vote_average,
  isSidebarOpen,
}: Props) {
  if (index !== current) return null;

  return (
    <div
      className={`absolute bottom-10 left-50 right-50 text-white ${
        isSidebarOpen ? "z-0" : "z-10"
      } lg:z-10`}
    >
      <div className="flex justify-center gap-6">
        <Link
          className="text-2xl text-center transition-all duration-200 ease-in hover:text-gray-300 hover:text-[25px] cursor-pointer"
          href={`/movie/${id}`}
        >
          {title}
        </Link>
        <Rating vote_average={vote_average} />
      </div>
    </div>
  );
}
