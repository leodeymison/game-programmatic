export type rotation = "ArrowLeft" | "ArrowUp" | "ArrowRight" | "ArrowDown";

export type player = {
    id: string;
    name: string;
    color: string;
    position: { x: number, y: number },
    rotation: rotation
}

export type Room = {
    id: string;
}

export const moveOptions: Array<rotation> = ["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"];

export type bot = { label: string; value: string }