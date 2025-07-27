import Image from "next/image";
import Link from "next/link";
import { imageLink } from "../data/const";
import { Person } from "../interfaces/Person";

type CardProps<T extends Person> = {
  data: T;
};

export default function Actor<T extends Person>({ data }: CardProps<T>) {
  return (
    <Link href={`/actor/${data.id}`}>
      <div tabIndex={0} className="min-w-[220px] max-w-[220px] max-h-60">
        <div className="w-full h-60 overflow-hidden relative rounded-t-lg">
          <Image
            src={`${imageLink}/w500/${data.profile_path}`}
            alt={data.name ?? "El nombre no está disponible"}
            fill
            priority
            className="object-cover rounded-full"
            sizes="220px"
          />
        </div>

        <h3 className="text-lg font-semibold text-gray-100 truncate text-center">
          {data.name}
        </h3>
      </div>
    </Link>
  );
}
