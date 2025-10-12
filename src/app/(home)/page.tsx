/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import Editor from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";
import { GoDependabot } from "react-icons/go";
import style from "./style.module.css";
import { elementFixed } from "./data/fixed";
import { mapDimension } from "./data/mapDimensions";
import { BiSolidBalloon } from "react-icons/bi";

type player = {
  id: string;
  name: string;
  color: string;
  position: { x: number, y: number },
  rotation: "ArrowLeft" | "ArrowUp" | "ArrowRight" | "ArrowDown"
}

const moveOptions = ["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"];

export default function football() {
  const wsRef = useRef<WebSocket | null>(null);

  // SERVER
  const [playerYou, setPlayerYou] = useState<player | null>({
    id: "123",
    name: "Você",
    color: "#F00000",
    position: { x: 3, y: 10 },
    rotation: "ArrowUp"
  });
  const [players, setPlayers] = useState<Array<player>>([])
  const [selected, useSelected] = useState({
    label: "Bot padrão",
    value: "default",
  });

  // CLIENT
  const [socket, setSocket] = useState<any>(null);
  const [aim, setAim] = useState<number>(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const ws = new WebSocket(`${protocol}//${window.location.host}/api/ws`);
    wsRef.current = ws;


    ws.onopen = () => {
      console.log("Conectado")
    };

    ws.onclose = () => {
      console.log("Desconectado")
    };

    ws.onmessage = (event) => {
      console.log("mensagem enviada")
    };

    const pingInterval = setInterval(() => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(`{"event":"ping"}`);
      }
    }, 29000);

    return () => {
      clearInterval(pingInterval);
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [])

  const movePlayer = (player: player, direction: player["rotation"]) => {
    let newPosition = player.position;

    if(direction === "ArrowUp"){
      newPosition.y -= 1;
    }
    if(direction === "ArrowDown"){
      newPosition.y += 1;
    }
    if(direction === "ArrowLeft"){
      newPosition.x -= 1;
    }
    if(direction === "ArrowRight"){
      newPosition.x += 1;
    }

    setPlayerYou({
      ...player,
      rotation: direction,
      position: newPosition
    })
  }

  const rotationPlayer = (player: player, direction: player["rotation"]) => {
    setPlayerYou({
      ...player,
      rotation: direction,
    })
  }

  useEffect(() => {
    setPlayers([
      {
        id: "123",
        color: "#0d6d00",
        name: "ANDroid010",
        position: { x: 10, y: 20 },
        rotation: "ArrowUp"
      }
    ])

    document.addEventListener("keydown", (e) => {
      if(moveOptions.includes(e.key) && playerYou){
        rotationPlayer(playerYou, e.key as any)
      }
    })
    document.addEventListener("keyup", (e) => {
      if(moveOptions.includes(e.key) && playerYou){
        movePlayer(playerYou, e.key as any)
      }
    })
  }, [])

  const options = [
    {
      label: "Bot padrão",
      value: "default",
    },
    {
      label: "Bot tático",
      value: "12d32d232d2d232d2d",
    },
  ];

  const getElement = (y: number, x: number) => {
    const elem = elementFixed[0]().filter(
      (item) => item.x === x && item.y === y && item
    );
    if (elem.length) {
      return <div className="bg-gray-950 w-full h-full flex justify-center items-center rounded-md">
        <div className="w-2/4 h-2/4 bg-gray-700 rounded-md"></div>
      </div>
    }

    return null;
  };

  const playerRender = (
    current: { y: number, x: number },
    player: player
  ) => {
    if(current.x === player.position.x && current.y === player.position.y){
      let rotation = "rotateZ(-90deg)"
      if(player.rotation === "ArrowUp"){
        rotation = "rotateZ(-90deg)"
      }
      if(player.rotation === "ArrowDown"){
        rotation = "rotateZ(90deg)"
      }
      if(player.rotation === "ArrowLeft"){
        rotation = "rotateZ(180deg)"
      }
      if(player.rotation === "ArrowRight"){
        rotation = "rotateZ(0deg)"
      }

      return <div style={{ transform: rotation }} key={player.id} className="w-full h-full relative" id={player.id}>
      <div className="flex justify-end items-center">
        <BiSolidBalloon className={`${style.icon}`} size={20} color={player.color} />
        <div style={{
          backgroundImage: `linear-gradient(to right, ${player.color}a0, ${player.color}33)`
        }} className="absolute w-20 h-3/4 left-full rounded-l-full"></div>
      </div>
    </div>
    }
  }

  return (
    <main className="w-full h-screen grid grid-cols-12 bg-gray-950">
      <section className="col-span-9 px-2 flex flex-col justify-center bg-gray-950">
        <div
          className={`relative bg-gray-300 rounded-md w-full aspect-[2048/1080] border-2 flex justify-center items-center`}
        >
          <div className="w-full h-full flex justify-center items-center flex-col">
            {Array(mapDimension[0])
              .fill("")
              .map((item, i1) => (
                <div key={i1} className="flex w-full h-full">
                  {Array(mapDimension[1])
                    .fill("")
                    .map((item, i2) => (
                      <div
                        key={i2}
                        className="border border-gray-200 h-full w-full"
                      >
                        {/* FIXED */}
                        {getElement(i1, i2) !== null && getElement(i1, i2)}

                        {/* YOU PLAYER */}
                        {
                          playerYou && (
                            playerRender({ y: i1, x: i2 }, playerYou)
                          )
                        }

                        {/* PLAYERS */}
                        {
                          players.map(player => (
                            playerRender({ y: i1, x: i2 }, player)
                          ))
                        }
                      </div>
                    ))}
                </div>
              ))}
          </div>
        </div>
      </section>
      <section className="col-span-3 bg-gray-800">
        <form className="flex flex-col p-4 h-screen">
          <div className="relative w-full">
            <div
              onClick={() => setOpen((prev) => !prev)}
              className="flex items-center bg-gray-700 rounded-lg"
            >
              <span className="pl-3 pr-1">
                <GoDependabot />
              </span>
              <div className="w-full px-2 py-3 focus:outline-none rounded-lg cursor-pointer">
                {selected.label}
              </div>
            </div>

            {open && (
              <div
                className={`${style.scroll2} absolute z-10 top-full left-0 bg-gray-700 w-full p-2 h-60 overflow-y-auto mt-1 rounded-lg`}
              >
                <div className="mb-2 border-b border-gray-400 pb-2">
                  <input
                    type="text"
                    placeholder="Pesquisar"
                    className="w-full p-2 rounded-md focus:outline-none bg-gray-600"
                  />
                </div>

                {options.map((item, index) => (
                  <ul key={index}>
                    <li
                      className={`${
                        selected.value === item.value
                          ? "bg-gray-500 cursor-not-allowed"
                          : "hover:bg-gray-600 cursor-pointer"
                      } p-2 rounded-lg mb-1`}
                    >
                      {item.label}
                    </li>
                  </ul>
                ))}
              </div>
            )}
          </div>
          <div className="w-full h-full flex mt-4">
            <Editor
              height="98%"
              defaultLanguage="javascript"
              defaultValue="// Escreva seu código aqui"
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: "on",
                wordWrap: "on",
                scrollBeyondLastLine: false,
                automaticLayout: true,
              }}
            />
          </div>

          <button className="bg-green-600 py-4 w-full flex justify-center items-center rounded-2xl">
            Salvar
          </button>
        </form>
      </section>
    </main>
  );
}
