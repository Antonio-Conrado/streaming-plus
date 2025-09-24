"use client";
import { useState } from "react";
import { playVideo } from "@/shared/data/const";

export default function PlayStreaming({ id }: { id: string }) {
  const [ready, setReady] = useState(false);

  return (
    <div className="w-full h-[90vh] flex items-center justify-center">
      {!ready ? (
        <button
          onClick={() => setReady(true)}
          className="btn btn-accent rounded-md"
        >
          Reproducir
        </button>
      ) : (
        <iframe
          src={`${playVideo}/${id}`}
          className="w-full h-full"
          allowFullScreen
          frameBorder={0}
        />
      )}
    </div>
  );
}
