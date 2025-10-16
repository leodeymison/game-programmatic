/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useRef, useEffect } from "react";
import { elementFixed } from "./data/fixed";
import { mapDimension } from "./data/mapDimensions";
import { createBalloonElement, createElementSquare } from "./components/square";
import { player } from "./types";

export default function Game() {
  const refCanvas = useRef<HTMLCanvasElement | null>(null);
  const dimensions: [number, number] = [2048, 1080];

  function renderScreen(ctx: CanvasRenderingContext2D, players: player){
    // Limpa a tela
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Renderiza os fixos
    elementFixed[0]().forEach(item => {
      createElementSquare(mapDimension, dimensions, ctx, item, "#301600")
    });

    // Players
    createBalloonElement(mapDimension, dimensions, ctx, players.position, "#0b8600")
  }

  useEffect(() => {
    const players: Array<player> = [
      {
        id: "123",
        color: "#0b8600",
        name: "Meu players",
        rotation: "ArrowUp",
        position: { x: 2, y: 2 }
      }
    ]

    const canvas = refCanvas.current;

    if (!canvas) return;

    canvas.width = dimensions[0];
    canvas.height = dimensions[1];

    const ctx = canvas.getContext("2d");
      
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    ctx.scale(dpr, dpr);

    renderScreen(ctx, players[0]);

    document.addEventListener("keyup", (e) => {
      if(e.key === "ArrowUp"){
        players[0].position.y -= 1;
        renderScreen(ctx, players[0]);
      }
      if(e.key === "ArrowDown"){
        players[0].position.y += 1;
        renderScreen(ctx, players[0]);
      }
      if(e.key === "ArrowLeft"){
        players[0].position.x -= 1;
        renderScreen(ctx, players[0]);
      }
      if(e.key === "ArrowRight"){
        players[0].position.x += 1;
        renderScreen(ctx, players[0]);
      }
    })
  }, []);


  return (
    <canvas
      ref={refCanvas}
      className="bg-gray-200 flex max-w-full max-h-full"
    ></canvas>
  );
}
