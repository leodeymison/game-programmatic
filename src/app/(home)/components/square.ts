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

export const createBalloonElement = (
  numberBlocks: [number, number],
  dimensions: [number, number],
  ctx: CanvasRenderingContext2D,
  position: positionsType,
  color: string,
) => {
  const w = dimensions[0] / numberBlocks[1];
  const h = dimensions[1] / numberBlocks[0];
  const margin = 1;

  const x = position.x * w + margin + w / 2; // centro
  const y = position.y * h + margin + h / 2;
  const balloonWidth = w * 0.6; // tamanho relativo
  const balloonHeight = h * 0.7;
  const knotSize = h * 0.2; // “nó” da bexiga

  ctx.beginPath();

  // desenha corpo oval da bexiga
  ctx.ellipse(x, y, balloonWidth / 2, balloonHeight / 2, 0, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();

  // desenha o “nó” da bexiga
  const knotY = y + balloonHeight / 2;
  ctx.beginPath();
  ctx.moveTo(x - 4, knotY);
  ctx.lineTo(x + 4, knotY);
  ctx.lineTo(x, knotY + knotSize);
  ctx.closePath();
  ctx.fill();

  // opcional: reflexo de luz
  ctx.beginPath();
  ctx.ellipse(x - balloonWidth * 0.2, y - balloonHeight * 0.2, 4, 8, 0, 0, 2 * Math.PI);
  ctx.fillStyle = "rgba(255,255,255,0.3)";
  ctx.fill();
};