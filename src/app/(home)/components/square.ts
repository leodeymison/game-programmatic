import { positionsType } from "../data/fixed";
import { rotation } from "../types";

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
  rotation: rotation = "ArrowUp",
  name: string,
  health: number = 1 // valor entre 0 e 1
) => {
  const w = dimensions[0] / numberBlocks[1];
  const h = dimensions[1] / numberBlocks[0];
  const margin = 1;

  const x = position.x * w + margin + w / 2;
  const y = position.y * h + margin + h / 2;
  const balloonWidth = w * 0.6;
  const balloonHeight = h * 0.7;
  const knotSize = h * 0.3;

  const rotationMap: Record<typeof rotation, number> = {
    ArrowUp: 0,
    ArrowRight: Math.PI / 2,
    ArrowDown: Math.PI,
    ArrowLeft: -Math.PI / 2,
  };

  const angle = rotationMap[rotation];

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);

  // corpo da bexiga
  ctx.beginPath();
  ctx.ellipse(0, 0, balloonWidth / 2, balloonHeight / 2, 0, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();

  // nó da bexiga
  const knotY = balloonHeight / 2;
  ctx.beginPath();
  ctx.moveTo(-4, knotY);
  ctx.lineTo(4, knotY);
  ctx.lineTo(0, knotY + knotSize);
  ctx.closePath();
  ctx.fill();

  // reflexo
  ctx.beginPath();
  ctx.ellipse(-balloonWidth * 0.2, -balloonHeight * 0.2, 4, 8, 0, 0, 2 * Math.PI);
  ctx.fillStyle = "rgba(255,255,255,0.3)";
  ctx.fill();

  ctx.restore(); // remove rotação para desenhar HUD

  // ==============================
  // NOME DO PERSONAGEM (ACIMA)
  // ==============================
  ctx.font = `${h * 0.5}px Arial`;
  ctx.fillStyle = "#000";
  ctx.textAlign = "center";
  ctx.fillText(name, x, y - balloonHeight);

  // ==============================
  // BARRA DE VIDA (ABAIXO)
  // ==============================
  const barWidth = balloonWidth * 2;
  const barHeight = 4;
  const spacing = h * 0.4; // espaço entre o balão e a barra
  const barX = x - barWidth / 2;
  const barY = y + balloonHeight / 2 + spacing;

  // fundo (vermelho escuro)
  ctx.fillStyle = "#F00";
  ctx.fillRect(barX, barY, barWidth, barHeight);

  // vida (verde proporcional)
  ctx.fillStyle = "#00ff00";
  ctx.fillRect(barX, barY, barWidth * Math.max(0, Math.min(1, health)), barHeight);
};