import Link from "next/link";
import { NavigationLink } from "./type";

export default function NavLink({
  icon,
  title,
  path,
  isActive,
}: NavigationLink) {
  return (
    <div
      className={`
         w-3/4  lg:w-fit rounded-xl flex items-center justify-center gap-2 transition-all duration-300 ease-in-out px-4
          py-[0.5rem] hover:bg-blue-100 hover:text-gray-800 cursor-pointer
          ${isActive ? "bg-blue-500 text-white" : "text-gray-400   "}
        `}
    >
      <span className="lg:hidden"> {icon}</span>
      <Link href={path}>{title}</Link>
    </div>
  );
}
