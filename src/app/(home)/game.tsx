/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useRef, useEffect } from "react";
import { elementFixed } from "./data/fixed";
import { mapDimension } from "./data/mapDimensions";
import { createBalloonElement, createElementSquare } from "./components/square";
import { drawLine, drawLineOptionType } from "./components/line";
import { moveOptions, player, rotation } from "./types";

export default function Game() {
  const refCanvas = useRef<HTMLCanvasElement | null>(null);
  const dimensions: [number, number] = [2048, 1080];

  /** Renderiza todos os elementos na tela (fixos, jogador e linha) */
  function renderScreen(
    ctx: CanvasRenderingContext2D,
    you: player,
    line: drawLineOptionType | null
  ) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Renderiza os elementos fixos
    elementFixed[0]().forEach((item) =>
      createElementSquare(mapDimension, dimensions, ctx, item, "#301600")
    );

    // Renderiza a linha (se existir)
    if (line) drawLine(ctx, mapDimension, dimensions, line);

    // Renderiza o jogador
    createBalloonElement(
      mapDimension,
      dimensions,
      ctx,
      you.position,
      "#0b8600",
      you.rotation,
      you.name,
      you.live
    );
    
  }

  function hasCollision(next: { x: number; y: number }): boolean {
    const fixedBlocks = elementFixed[0]();
  
    return fixedBlocks.some((block) => {
      const bx = block.x;
      const by = block.y;
      return Math.round(next.x) === bx && Math.round(next.y) === by;
    });
  }
  useEffect(() => {
    // Configuração inicial
    const lineColors: [string, string] = ["#063901a3", "#0b860046"];
    const newPosition = { x: 2, y: 2 };

    const players: player[] = [
      {
        id: "123",
        color: "#0b8600",
        name: "Você",
        rotation: "ArrowUp",
        live: 0.5,
        position: { x: 2, y: 2 },
      },
    ];

    const canvas = refCanvas.current;
    if (!canvas) return;

    canvas.width = dimensions[0];
    canvas.height = dimensions[1];

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    ctx.scale(dpr, dpr);

    // Estado interno de controle
    let growing = false;
    let isMoving = false;
    let currentDirection: rotation | null = null;
    let currentLine: drawLineOptionType | null = null;

    renderScreen(ctx, players[0], null);

    /** Cresce a linha enquanto tecla estiver pressionada */
    function growLine(direction: rotation) {
      if (!ctx || !currentLine) return;
    
      // Cópia da posição atual da ponta da linha
      const next = { ...currentLine.to };
    
      // Calcula a nova posição
      switch (direction) {
        case "ArrowUp":
          next.y -= 1;
          break;
        case "ArrowDown":
          next.y += 1;
          break;
        case "ArrowLeft":
          next.x -= 1;
          break;
        case "ArrowRight":
          next.x += 1;
          break;
      }
    
      // ⚠️ Verifica se a próxima posição colide com algo
      if (hasCollision(next)) {
        growing = false;
        return; // para imediatamente aqui
      }
    
      // ✅ Atualiza o ponto final da linha
      currentLine.to = next;
      newPosition.x = next.x;
      newPosition.y = next.y;
      players[0].rotation = direction;
    
      // Redesenha a tela
      renderScreen(ctx, players[0], currentLine);
    
      // Continua crescendo enquanto a tecla estiver pressionada
      if (growing && currentDirection === direction) {
        requestAnimationFrame(() => growLine(direction));
      }
    }

    /** Anima o movimento até o destino */
    function animateMove() {
      if (!ctx) return;

      const loopFrames = 20;
      const startX = players[0].position.x;
      const startY = players[0].position.y;
      const deltaX = newPosition.x - startX;
      const deltaY = newPosition.y - startY;
      let frame = 0;
      isMoving = true;
    
      function step() {
        frame++;
        const t = frame / loopFrames;
        const ease = 1 - Math.pow(1 - t, 3);
    
        const nextX = startX + deltaX * ease;
        const nextY = startY + deltaY * ease;
    
        // Se detectar colisão, cancela o movimento
        if (hasCollision({ x: nextX, y: nextY })) {
          isMoving = false;
          return;
        }
    
        players[0].position.x = nextX;
        players[0].position.y = nextY;
    
        renderScreen(ctx as any, players[0], null);
    
        if (frame < loopFrames) {
          requestAnimationFrame(step);
        } else {
          isMoving = false;
        }
      }
    
      requestAnimationFrame(step);
    }

    const Aim = (key: rotation, repeat: boolean) => {isMoving
      // Ignora repetições automáticas do keydown
      if (repeat) return;
      if (isMoving) return;

      const direction: rotation = key;

      // já está crescendo na mesma direção → não reinicia
      if (growing && currentDirection === direction) return;

      currentDirection = direction;
      growing = true;

      // só inicia linha se ainda não existir
      currentLine = {
        colors: lineColors,
        from: { ...players[0].position },
        to: { ...players[0].position },
      };

      requestAnimationFrame(() => growLine(direction));
    }

    const release = (key: rotation) => {
      if (key === currentDirection) {
        growing = false;
        currentDirection = null;
      }

      animateMove();
    }

    /** Evento: tecla solta */
    document.addEventListener("keyup", (e) => {
      const key: any = e.key;
      if(moveOptions.includes(key)){
        release(key);
      }
    });

    /** Evento: tecla pressionada */
    document.addEventListener("keydown", (e: any) => {
      const key: any = e.key;
      if(moveOptions.includes(key)){
        Aim(key, e.repeat)
      }
    })
  }, []);

  return (
    <canvas
      ref={refCanvas}
      className="bg-gray-200 max-w-full max-h-full"
    ></canvas>
  );
}
