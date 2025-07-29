import { Register } from "../_interfaces/session";

type InitialState<T> = {
  message: string;
  errors?: Record<string, { errors: string[] }>;
  values?: T;
};

type Props<T> = {
  formAction: (payload: FormData) => void;
  state: InitialState<T>;
  pending: boolean;
  value: string;
  type: "LOGIN" | "REGISTER";
};

export default function Form<T>({
  formAction,
  state,
  pending,
  value,
  type,
}: Props<T>) {
  return (
    <form
      action={formAction}
      className="flex justify-center flex-col"
      noValidate
    >
      <h3 className="text-center hover:text-cyan-400">Streaming Plus</h3>

      {type === "REGISTER" && (
        <fieldset className="fieldset ">
          <legend className="fieldset-legend">Nombre</legend>
          <input
            type="text"
            className={`input  ${state.errors?.name && "border-red-600"}`}
            placeholder="Ingrese su nombre"
            name="name"
            defaultValue={
              type === "REGISTER" ? (state.values as Register)?.name ?? "" : ""
            }
          />
          {state.errors?.name?.errors.map((error) => (
            <p key={error}>{error}</p>
          ))}
        </fieldset>
      )}

      <fieldset className="fieldset">
        <legend className="fieldset-legend">Correo eléctronico</legend>
        <input
          type="email"
          className={`input ${state.errors?.email && "border-red-600"}`}
          placeholder="Ingrese un correo eléctronico"
          name="email"
          defaultValue={(state.values as Register)?.email ?? ""}
        />
        {state.errors?.email?.errors.map((error) => (
          <p key={error}>{error}</p>
        ))}
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Contraseña</legend>
        <input
          type="password"
          className={`input  ${state.errors?.password && "border-red-600"}`}
          placeholder="Ingrese una contraseña"
          name="password"
        />
        {state.errors?.password?.errors.map((error) => (
          <p key={error}>{error}</p>
        ))}
      </fieldset>

      {pending ? (
        <span className="loading loading-spinner text-info mx-auto mt-5"></span>
      ) : (
        <input
          type="submit"
          className="btn rounded-md btn-accent mt-5 w-2/4 mx-auto"
          value={value}
        />
      )}
    </form>
  );
}
