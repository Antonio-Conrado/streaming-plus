"use client";
import { usePathname } from "next/navigation";
import { linksData } from "./linksData";
import NavLink from "./NavLink";

export default function NavItems() {
  const pathname = usePathname();
  return (
    <div className="flex flex-col items-center gap-4 lg:gap-1 lg:flex-row lg:items-center font-semibold mt-5 ">
      {linksData.map((link) => (
        <NavLink
          key={link.path}
          title={link.title}
          path={link.path}
          icon={link.icon}
          isActive={pathname.startsWith(link.path)}
        />
      ))}
    </div>
  );
}
