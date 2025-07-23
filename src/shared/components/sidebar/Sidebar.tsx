"use client";
import { useState } from "react";
import Link from "next/link";
import NavItems from "../nav/NavItems";
export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <div className="drawer">
        <input
          id="my-drawer-3"
          type="checkbox"
          className="drawer-toggle"
          checked={isOpen}
          onChange={toggleSidebar}
        />
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <div className="navbar bg-base-300 w-full">
            <div className="flex-none lg:hidden">
              <label
                htmlFor="my-drawer-3"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-6 w-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>

            {/* title */}
            <div className="mx-2 flex-1">
              <Link href="/" className="hover:text-cyan-500 text-xl">
                Streaming Plus
              </Link>
            </div>

            {/* large screen */}
            <div className="hidden lg:flex w-fit items-center justify-between ">
              <NavItems />

              {/* authentication */}
              <div></div>
            </div>
          </div>
        </div>

        {/* small screeen */}
        <div className="drawer-side lg:hidden">
          <label
            htmlFor="my-drawer-3"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 h-full w-80 p-2 flex flex-col ">
            <NavItems />

            {/* authentication */}
            <div className="mt-auto mb-10"></div>
          </ul>
        </div>
      </div>
    </>
  );
}
