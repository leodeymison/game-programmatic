/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useRef, useEffect } from "react";
import { elementFixed, positionsType } from "./data/fixed";
import { mapDimension } from "./data/mapDimensions";
import { createElementSquare } from "./components/square";

export default function Game() {
  const refCanvas = useRef<HTMLCanvasElement | null>(null);
  const dimensions: [number, number] = [2048, 1080];

  useEffect(() => {
    const canvas = refCanvas.current;

    if (!canvas) return;

    canvas.width = dimensions[0];
    canvas.height = dimensions[1];

    const ctx = canvas.getContext("2d");
      
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    ctx.scale(dpr, dpr);

    elementFixed[0]().forEach(item => {
      createElementSquare(mapDimension, dimensions, ctx, item, "#301600")
    })
  }, []);

  return (
    <canvas
      ref={refCanvas}
      className="bg-gray-200 flex max-w-full max-h-full"
    ></canvas>
  );
}
