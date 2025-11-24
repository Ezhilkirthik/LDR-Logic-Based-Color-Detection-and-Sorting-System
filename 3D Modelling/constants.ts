import { BinColor, SimulationConfig } from './types';

export const CONFIG: SimulationConfig = {
  voltages: {
    HIGH: 3.5,
    LOW: 0.5,
  },
  thresholds: {
    RED: 1.90,
    GREEN: 2.17,
    BLUE: 1.66,
  },
  physics: {
    beltSpeed: 3.0,
    gravity: 9.8,
    endOfBeltZ: 5.8,
    sensorZ: 0.0,
    floorY: -0.4, // Relative to belt surface
  },
};

export const COLOR_MAP: Record<BinColor, { hex: string; rgb: [number, number, number]; angle: number; index: number }> = {
  [BinColor.BLACK]:   { hex: '#1a1a1a', rgb: [0, 0, 0], angle: 0, index: 0 },
  [BinColor.RED]:     { hex: '#ff0000', rgb: [1, 0, 0], angle: 45, index: 1 },
  [BinColor.GREEN]:   { hex: '#00ff00', rgb: [0, 1, 0], angle: 90, index: 2 },
  [BinColor.YELLOW]:  { hex: '#ffff00', rgb: [1, 1, 0], angle: 135, index: 3 },
  [BinColor.BLUE]:    { hex: '#0000ff', rgb: [0, 0, 1], angle: 180, index: 4 },
  [BinColor.MAGENTA]: { hex: '#ff00ff', rgb: [1, 0, 1], angle: 225, index: 5 },
  [BinColor.CYAN]:    { hex: '#00ffff', rgb: [0, 1, 1], angle: 270, index: 6 },
  [BinColor.WHITE]:   { hex: '#ffffff', rgb: [1, 1, 1], angle: 315, index: 7 },
};

// 7-Segment Map (a, b, c, d, e, f, g)
// 0 = On, 1 = On (Wait, standard logic is 1=On)
export const SEGMENT_MAP: Record<number, boolean[]> = {
  0: [true, true, true, true, true, true, false],
  1: [false, true, true, false, false, false, false],
  2: [true, true, false, true, true, false, true],
  3: [true, true, true, true, false, false, true],
  4: [false, true, true, false, false, true, true],
  5: [true, false, true, true, false, true, true],
  6: [true, false, true, true, true, true, true],
  7: [true, true, true, false, false, false, false],
};