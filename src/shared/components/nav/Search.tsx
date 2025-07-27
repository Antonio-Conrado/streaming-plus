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
        className="input input-bordered w-3/4  md:w-auto"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearchMedia(e.currentTarget.value);
          }
        }}
      />
    </div>
  );
}

// "use client";

// import { fetchSearchMedia } from "@/lib/tmdb/media-api";
// import { useEffect, useState } from "react";

// export default function Search() {
//   const [isError, setIsError] = useState(false);
//   const handleSearchMedia = async (query: string) => {
//     const data = await fetchSearchMedia(query);
//     console.log(data);
//     if (data.results.length === 0) setIsError(true);
//   };

//   useEffect(() => {
//     if (isError) {
//       setTimeout(() => {
//         setIsError(false);
//       }, 3000);
//     }
//   }, [isError]);

//   return (
//     <div className="mr-5 ">
//       <div className="flex justify-center ">
//         <input
//           type="text"
//           placeholder="Buscar película o serie"
//           className="input input-bordered w-3/4  md:w-auto"
//           onKeyDown={(e) => {
//             if (e.key === "Enter") {
//               handleSearchMedia(e.currentTarget.value);
//             }
//           }}
//         />
//       </div>

//       {isError && (
//         <div className="absolute right-[-60] top-[-20]">
//           <div role="alert" className="alert alert-error">
//             <span>No se encontró el contenido solicitado.</span>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
