import HomeClient from "./client";
import { bot, player } from "./types";

export default async function HomeServer(){
  const room = {
    id: "123"
  }
  const players: Array<player> = [
    {
      id: "123",
      color: "#0d6d00",
      name: "ANDroid010",
      position: { x: 1, y: 1 },
      rotation: "ArrowUp"
    }
  ]

  const bots: Array<bot> = [
    {
      label: "Bot padrão",
      value: "default",
    },
    {
      label: "Bot tático",
      value: "12d32d232d2d232d2d",
    },
  ]

  return <HomeClient room={room} players={players} bots={bots} />
}