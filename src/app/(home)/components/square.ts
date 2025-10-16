import { positionsType } from "../data/fixed";

export const createElementSquare = (
    numberBlocks: [number, number],
    dimensions: [number, number],
    ctx: CanvasRenderingContext2D,
    position: positionsType,
    color: string,
    radius = 6 // raio dos cantos
  ) => {
    const w = dimensions[0] / numberBlocks[1];
    const h = dimensions[1] / numberBlocks[0];
    const margin = 2;
  
    // aplica a margem
    const x = position.x * w + margin;
    const y = position.y * h + margin;
    const innerW = w - margin * 2;
    const innerH = h - margin * 2;
  
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + innerW - radius, y);
    ctx.arcTo(x + innerW, y, x + innerW, y + radius, radius);
    ctx.lineTo(x + innerW, y + innerH - radius);
    ctx.arcTo(x + innerW, y + innerH, x + innerW - radius, y + innerH, radius);
    ctx.lineTo(x + radius, y + innerH);
    ctx.arcTo(x, y + innerH, x, y + innerH - radius, radius);
    ctx.lineTo(x, y + radius);
    ctx.arcTo(x, y, x + radius, y, radius);
    ctx.closePath();
  
    ctx.fillStyle = color;
    ctx.fill();
  };