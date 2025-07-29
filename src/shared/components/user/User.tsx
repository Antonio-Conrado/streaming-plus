"use client";

import { logout } from "@/app/(auth)/_actions/logout-action";
import { useStore } from "@/lib/store/useStore";
import { User2 } from "lucide-react";
import Link from "next/link";
import { startTransition, useActionState } from "react";
import { useEffect, useState } from "react";

const initialState = {
  message: "",
  isSuccess: false,
};

export default function User() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const user = useStore((state) => state.user);
  const clearUser = useStore((state) => state.clearUser);
  const clearFavoritesMedia = useStore((state) => state.clearFavoritesMedia);
  const [, action] = useActionState(logout, initialState);
  const [isOpen, setIsOpen] = useState(false);

  if (!isClient) return null;

  const handleLogout = () => {
    startTransition(() => {
      action();
      clearUser();
      clearFavoritesMedia();
    });
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {user ? (
        <>
          <button className="btn m-1">
            <User2 />
          </button>

          <div
            className={`absolute right-0 z-50 bg-base-100 rounded-box w-40 p-2 shadow transition-opacity duration-200 py-3 ${
              isOpen
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <ul>
              <li className="text-sm py-3 mr-2 cursor-default">{user.name}</li>
              <li>
                <button
                  onClick={handleLogout}
                  className="text-sm py-3 cursor-pointer w-full btn rounded-md hover:btn-secondary"
                >
                  Cerrar sesión
                </button>
              </li>
            </ul>
          </div>
        </>
      ) : (
        <Link href="/login" className="btn m-1">
          Login
        </Link>
      )}
    </div>
  );
}
