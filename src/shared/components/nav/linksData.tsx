import { Film, Tv, Heart, Info, Clapperboard, ScanSearch } from "lucide-react";
import { NavigationLink } from "./type";

export const linksData: NavigationLink[] = [
  {
    icon: <ScanSearch className="w-5 h-5" />,
    title: "Explorar",
    path: "/",
    isActive: false,
  },
  {
    icon: <Clapperboard className="w-5 h-5" />,
    title: "Películas",
    path: "/movies",
    isActive: false,
  },
  {
    icon: <Tv className="w-5 h-5" />,
    title: "Series",
    path: "/series",
    isActive: false,
  },
  {
    icon: <Film className="w-5 h-5" />,
    title: "Anime",
    path: "/animes",
    isActive: false,
  },
  {
    icon: <Heart className="w-5 h-5" />,
    title: "Favoritos",
    path: "/favorites",
    isActive: false,
  },
  {
    icon: <Info className="w-5 h-5" />,
    title: "Acerca de",
    path: "/about",
    isActive: false,
  },
];
