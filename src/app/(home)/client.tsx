/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

// Imports
import Editor from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

// Icons
import { GoDependabot } from "react-icons/go";
import { BiSolidBalloon } from "react-icons/bi";

// Style
import style from "./style.module.css";

// Components
import { elementFixed } from "./data/fixed";
import { mapDimension } from "./data/mapDimensions";

// Types
import { bot, moveOptions, player, Room } from "./types";

export default function HomeClient(
    { players, room, bots }: 
    { players: Array<player>, room: Room, bots: Array<bot> }
) {
    const playersRef = useRef<Record<string, HTMLDivElement | null>>({})
    const socketRef = useRef<Socket | null>(null);

    // SERVER
    const [selected, useSelected] = useState({
        label: "Bot padrão",
        value: "default",
    });

    // CLIENT
    const [open, setOpen] = useState(false);

    const movePlayer = (userId: string, direction: player["rotation"], position: player["position"]) => {
        console.log(userId, direction, position)
    }

    useEffect(() => {
        // Conecta ao socket da mesma origem (Next.js)
        const socket = io({
            path: "/api/socket",
            transports: ["websocket"], // força uso do websocket puro
        });

        socketRef.current = socket;

        socket.on("connect", () => {
            console.log("✅ Conectado ao servidor Socket.IO");
        });

        socket.on("disconnect", () => {
            console.log("❌ Desconectado do servidor Socket.IO");
        });

        socket.on("position", (content: { userId: string, position: player["position"] }) => {
            movePlayer(content.userId, "ArrowUp", content.position)
        });

        // Mantém a conexão viva (equivalente ao seu ping)
        const pingInterval = setInterval(() => {
            if (socket.connected) {
                socket.emit("ping");
            }
        }, 29000);

        return () => {
            clearInterval(pingInterval);
            socket.off("moviment-receive");
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        document.addEventListener("keydown", (e) => {
            const key: player["rotation"] = e.key as any;
            if(moveOptions.includes(key) && socketRef.current){
                socketRef.current.emit("rotate", key);
            }
        })
        document.addEventListener("keyup", (e) => {
            const key: player["rotation"] = e.key as any;
            if(moveOptions.includes(key) && socketRef.current){
                socketRef.current.emit("move", key);
            }
        })
    }, [])

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

    const createPlayerRender = (player: player) => {
        const rotation = "rotateZ(-90deg)"

        return <div ref={(el) => { playersRef.current[player.id] = el }} style={{ transform: rotation }} key={player.id} className="w-full h-full z-10" id={player.id}>
            <div className="flex justify-end items-center relative">
                <BiSolidBalloon className={`${style.icon}`} size={20} color={player.color} />
                <div style={{
                    backgroundImage: `linear-gradient(to right, ${player.color}a0, ${player.color}33)`
                }} className="absolute w-0 h-3/4 left-full rounded-l-full"></div>
            </div>
        </div>
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
                                {getElement(i1, i2) !== null && getElement(i1, i2)}
                                {
                                    players.map(player => {
                                        if(player.position.x === i2 && player.position.y === i1){
                                            return createPlayerRender(player)
                                        }

                                        return null;
                                    })
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

                    {bots.map((item, index) => (
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
