import { create } from 'zustand';
import { BinColor, LogicState, SpawnedObject } from './types';
import { CONFIG } from './constants';
import * as THREE from 'three';

interface SimulationStore {
  status: string;
  servoAngle: number;
  targetAngle: number;
  currentBin: BinColor;
  logicState: LogicState;
  
  // Object Management
  objects: SpawnedObject[];
  spawnObject: (color: BinColor) => void;
  updateObject: (id: string, updates: Partial<SpawnedObject>) => void;
  
  // Logic Actions
  setSystemIdle: () => void;
  triggerDetection: (color: BinColor) => void;
  updateServo: (angle: number) => void;
}

const INITIAL_LOGIC: LogicState = {
  voltages: { r: CONFIG.voltages.LOW, g: CONFIG.voltages.LOW, b: CONFIG.voltages.LOW },
  comparators: { r: false, g: false, b: false },
  binaryCode: 0, // Default Black
};

export const useStore = create<SimulationStore>((set, get) => ({
  status: 'IDLE',
  servoAngle: 0,
  targetAngle: 0,
  currentBin: BinColor.BLACK,
  logicState: INITIAL_LOGIC,
  objects: [],

  spawnObject: (colorName) => {
    set((state) => ({
      objects: [
        ...state.objects,
        {
          id: Math.random().toString(36).substr(2, 9),
          colorName,
          colorHex: '', // Will be filled by spawner or map
          position: new THREE.Vector3(0, 0.3, -7), // Start of belt
          velocity: new THREE.Vector3(0, 0, 0),
          state: 'CONVEY',
          detected: false,
          sorted: false,
        },
      ],
      status: `INJECTED ${colorName.toUpperCase()}`,
    }));
  },

  updateObject: (id, updates) => {
    set((state) => ({
      objects: state.objects.map((obj) => (obj.id === id ? { ...obj, ...updates } : obj)),
    }));
  },

  setSystemIdle: () => {
    set({
      status: 'IDLE',
      logicState: INITIAL_LOGIC,
      targetAngle: 0, // Reset to Black position
      currentBin: BinColor.BLACK
    });
  },

  triggerDetection: (colorName) => {
    // Map color name to RGB presence (0 or 1)
    const colorMapRef: any = {
      'Black': [0,0,0], 'Red': [1,0,0], 'Green': [0,1,0], 'Yellow': [1,1,0],
      'Blue': [0,0,1], 'Magenta': [1,0,1], 'Cyan': [0,1,1], 'White': [1,1,1]
    };
    
    const rgb = colorMapRef[colorName] || [0,0,0];
    
    const vR = rgb[0] ? CONFIG.voltages.HIGH : CONFIG.voltages.LOW;
    const vG = rgb[1] ? CONFIG.voltages.HIGH : CONFIG.voltages.LOW;
    const vB = rgb[2] ? CONFIG.voltages.HIGH : CONFIG.voltages.LOW;
    
    const cR = vR > CONFIG.thresholds.RED;
    const cG = vG > CONFIG.thresholds.GREEN;
    const cB = vB > CONFIG.thresholds.BLUE;
    
    // Logic: Blue is MSB (4), Green (2), Red (1)
    const code = (Number(cB) << 2) | (Number(cG) << 1) | Number(cR);
    
    // Determine Angle
    // 0=0, 1=45, 2=90, ...
    const angle = code * 45;
    
    // Find bin name from index
    const binNames = Object.values(BinColor);
    const targetBin = binNames[code];

    set({
      logicState: {
        voltages: { r: vR, g: vG, b: vB },
        comparators: { r: cR, g: cG, b: cB },
        binaryCode: code
      },
      targetAngle: angle,
      currentBin: targetBin,
      status: 'SORTING DETECTED'
    });
  },

  updateServo: (angle) => {
    set({ servoAngle: angle });
  }

}));