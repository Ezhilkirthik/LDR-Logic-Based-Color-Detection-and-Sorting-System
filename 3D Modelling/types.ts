import * as THREE from 'three';

export enum BinColor {
  BLACK = 'Black',
  RED = 'Red',
  GREEN = 'Green',
  YELLOW = 'Yellow',
  BLUE = 'Blue',
  MAGENTA = 'Magenta',
  CYAN = 'Cyan',
  WHITE = 'White'
}

export interface SimulationConfig {
  voltages: {
    HIGH: number;
    LOW: number;
  };
  thresholds: {
    RED: number;
    GREEN: number;
    BLUE: number;
  };
  physics: {
    beltSpeed: number;
    gravity: number;
    endOfBeltZ: number;
    sensorZ: number;
    floorY: number;
  };
}

export interface LogicState {
  voltages: { r: number; g: number; b: number };
  comparators: { r: boolean; g: boolean; b: boolean };
  binaryCode: number; // 0-7
}

export interface SpawnedObject {
  id: string;
  colorName: BinColor;
  colorHex: string;
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  state: 'CONVEY' | 'DROP' | 'LANDED';
  detected: boolean;
  sorted: boolean;
}