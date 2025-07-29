"use client";

import { useRouter } from "next/navigation";

export default function Search() {
  const router = useRouter();
  const handleSearchMedia = async (query: string) => {
    if (query) router.push(`/media?query=${query}`);
  };

  return (
    <div className="flex justify-center ">
      <input
        type="text"
        placeholder="Buscar película o serie"
        className="input input-bordered w-fit "
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearchMedia(e.currentTarget.value);
          }
        }}
      />
    </div>
  );
}
