export type drawLineOptionType = {
  from: { x: number; y: number },
  to: { x: number; y: number },
  colors: [string, string];
};

export const drawLine = (
  ctx: CanvasRenderingContext2D,
  numberBlocks: [number, number],
  dimensions: [number, number],
  options: {
    from: { x: number; y: number };
    to: { x: number; y: number };
    colors: [string, string]; // Ex: ["#00f", "#0ff"]
  }
) => {
  const w = dimensions[0] / numberBlocks[1];
  const h = dimensions[1] / numberBlocks[0];

  const { from, to, colors } = options;

  // Coordenadas centrais dos blocos
  const fromX = from.x * w + w / 2;
  const fromY = from.y * h + h / 2;
  const toX = to.x * w + w / 2;
  const toY = to.y * h + h / 2;

  // Cria o degradê entre o ponto inicial e final
  const gradient = ctx.createLinearGradient(fromX, fromY, toX, toY);
  gradient.addColorStop(0, colors[0]);
  gradient.addColorStop(1, colors[1]);

  ctx.beginPath();
  ctx.moveTo(fromX, fromY);
  ctx.lineTo(toX, toY);
  ctx.strokeStyle = gradient;
  ctx.lineWidth = Math.min(w, h) / 3;
  ctx.lineCap = "round";
  ctx.stroke();
  ctx.closePath();
};

