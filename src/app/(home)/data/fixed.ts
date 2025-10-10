import { mapDimension } from "./mapDimensions";

type positionsType = { x: number; y: number };

export const elementFixed = [
  () => {
    const positions: Array<positionsType> = [];

    // TOP
    for (let i = 0; i < mapDimension[1]; i++) {
      positions.push({ y: 0, x: i });
    }

    // LEFT
    for (let i = 1; i < mapDimension[0] - 1; i++) {
      positions.push({ y: i, x: 0 });
    }

    // RIGHT
    for (let i = 1; i < mapDimension[0] - 1; i++) {
      positions.push({ y: i, x: mapDimension[1] - 1 });
    }

    // BOTTOM
    for (let i = 0; i < mapDimension[1]; i++) {
      positions.push({ y: mapDimension[0] - 1, x: i });
    }

    // CENTER
    // Top Left
    for (let i = 0; i < 5; i++) {
      positions.push({ y: 11, x: 6 + i });
    }
    for (let i = 0; i < 6; i++) {
      positions.push({ y: 6 + i, x: 11 });
    }

    // Top Right
    for (let i = 0; i < 5; i++) {
      positions.push({ y: 11, x: mapDimension[1] - 11 + i });
    }
    for (let i = 0; i < 6; i++) {
      positions.push({ y: 6 + i, x: mapDimension[1] - 12 });
    }

    // Botton Left
    for (let i = 0; i < 6; i++) {
      positions.push({ y: mapDimension[0] - 12, x: 6 + i });
    }
    for (let i = 0; i < 5; i++) {
      positions.push({ y: mapDimension[0] - 11 + i, x: 11 });
    }

    // Botton Right
    for (let i = 0; i < 6; i++) {
      positions.push({ y: mapDimension[0] - 12, x: mapDimension[1] - 12 + i });
    }
    for (let i = 0; i < 5; i++) {
      positions.push({ y: mapDimension[0] - 11 + i, x: mapDimension[1] - 12 });
    }

    // LINE
    for (let i = 0; i < mapDimension[1] / 4; i++) {
      positions.push({
        y: mapDimension[0] / 2,
        x: Math.ceil((mapDimension[1] / 3)) + 3 +i,
      });
    }

    return positions;
  },
];
