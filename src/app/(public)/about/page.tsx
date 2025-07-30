export default function AboutPage() {
  return (
    <section className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">Acerca de Streaming Plus</h1>

      <p className="mb-4 text-base leading-relaxed">
        <strong>Streaming Plus</strong> es un proyecto personal construido con{" "}
        <strong>Next.js</strong>, <strong>Tailwind CSS</strong>,{" "}
        <strong>DaisyUI</strong> y <strong>Supabase</strong>. Permite a los
        usuarios explorar y ver información sobre películas y series utilizando
        datos de{" "}
        <a
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          la API de TMDb
        </a>
        .
      </p>

      <p className="mb-4">
        Los usuarios autenticados también pueden marcar contenido como favorito
        y gestionar sus propias listas. Supabase se utiliza para manejar las
        sesiones de usuario y almacenar de forma segura la información de
        favoritos.
      </p>

      <p className="mb-4">
        Puedes ver el código fuente completo en GitHub:
        <br />
        <a
          href="https://github.com/Antonio-Conrado/streaming-plus"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          Repositorio GitHub
        </a>
      </p>

      <hr className="my-6" />

      <p className="text-sm text-gray-300">
        ⚠️ Si ves anuncios o ventanas emergentes en este sitio, no provienen de
        nosotros. Para una experiencia más segura y sin publicidad, se
        recomienda usar un navegador enfocado en la privacidad como{" "}
        <a
          href="https://brave.com/download/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-orange-500 underline font-semibold"
        >
          Brave
        </a>
        , que bloquea rastreadores y anuncios de forma predeterminada.
      </p>
    </section>
  );
}
