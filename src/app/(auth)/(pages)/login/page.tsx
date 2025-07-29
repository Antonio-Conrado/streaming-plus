"use client";
import { useActionState, useEffect } from "react";
import { login } from "../../_actions/login-actions";
import Form from "../../_components/Form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store/useStore";
import { getUserNameById } from "@/lib/supabase/user";

const initialState = {
  message: "",
  isSuccess: false,
  userId: null,
  errors: undefined,
  values: {
    email: "",
    password: "",
  },
};

export default function LoginPage() {
  const router = useRouter();
  const setUser = useStore((state) => state.setUser);
  const [state, formAction, pending] = useActionState(login, initialState);

  useEffect(() => {
    if (state.isSuccess && state.userId) {
      getUserNameById(state.userId).then((user) => {
        if (user) {
          setUser(user.id, user.name);
          router.push("/favorites");
        }
      });
    }
  }, [state, router, setUser]);

  return (
    <div className="relative">
      {state.message.includes("inválidas") && (
        <div className="toast toast-top toast-end">
          <div className="alert alert-error">
            <span>{state.message}</span>
          </div>
        </div>
      )}
      <div className=" flex items-center justify-center h-[90vh] ">
        <div className="bg-base-200 border border-gray-700 rounded-lg h-auto w-72 md:w-96 p-5 shadow-md">
          <Form
            formAction={formAction}
            state={state}
            pending={pending}
            value="Iniciar sesión"
            type={"LOGIN"}
          />
          <div className="mt-4">
            <Link href={"/register"} className="text-sm hover:text-info ">
              ¿No tienes una cuenta? Regístrate
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
