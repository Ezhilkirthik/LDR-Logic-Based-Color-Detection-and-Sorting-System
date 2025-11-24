
import React from 'react';
import { SimulationScene } from './components/Simulation';
import { CircuitSidebar, ControlHUD } from './components/Overlay';

const App: React.FC = () => {
  return (
    <div className="flex w-full h-screen overflow-hidden bg-slate-950">
      {/* Left Sidebar: Circuit Logic & Internals */}
      <div className="w-[380px] h-full relative z-20 shadow-2xl">
        <CircuitSidebar />
      </div>

      {/* Right Area: 3D App & HUD */}
      <div className="flex-1 relative h-full">
        {/* 3D Scene Layer */}
        <div className="absolute inset-0 z-0">
          <SimulationScene />
        </div>

        {/* HUD Layer (Floating Controls) */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <ControlHUD />
        </div>
      </div>
    </div>
  );
};

export default App;
