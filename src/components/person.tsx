"use client";

import "@google/model-viewer";

export default function ModelPerson({ src }: { src: string }) {
  return (
    <model-viewer
      src={src}
      alt="Modelo 3D"
      style={{ width: "70px", height: "70px", background: "transparent" }}
      camera-controls={false}
      auto-rotate={false}
      disable-zoom
    ></model-viewer>
  );
}
