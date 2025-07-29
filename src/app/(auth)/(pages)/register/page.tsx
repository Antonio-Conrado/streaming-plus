"use client";
import { useActionState } from "react";
import Form from "../../_components/Form";
import Link from "next/link";
import { register } from "../../_actions/register-actions";

const initialState = {
  message: "",
  isSuccess: false,
};
export default function RegisterPage() {
  const [state, formAction, pending] = useActionState(register, initialState);

  return (
    <div>
      {state.message && (
        <div className="toast toast-top toast-end">
          <div
            className={`alert ${
              state.isSuccess ? "alert-success" : "alert-error"
            }`}
          >
            <span>{state.message}</span>
          </div>
        </div>
      )}

      <div className=" flex items-center justify-center h-[90vh]">
        <div className="bg-base-200 border border-gray-700 rounded-lg h-auto  w-72 md:w-96  p-5 shadow-md">
          <Form
            formAction={formAction}
            state={state}
            pending={pending}
            value="Registrarse"
            type="REGISTER"
          />
          <div className="mt-4">
            <Link href={"/login"} className="text-sm hover:text-info ">
              ¿Ya tienes una cuenta? Inicia sesión
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
