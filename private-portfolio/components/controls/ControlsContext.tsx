'use client';

import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';

type MagnetTarget = { x: number; y: number } | null;

type ControlsState = {
  motionEnabled: boolean;
  setMotionEnabled: (v: boolean) => void;
  constellations: boolean;
  setConstellations: (v: boolean) => void;
  audioEnabled: boolean;
  setAudioEnabled: (v: boolean) => void;
  orbitView: boolean;
  setOrbitView: (v: boolean) => void;
  triggerMeteorBurst: () => void;
  onMeteorBurst: (cb: () => void) => () => void;
  magnetTarget: MagnetTarget;
  setMagnetTarget: (t: MagnetTarget) => void;
};

const ControlsContext = createContext<ControlsState | null>(null);

export function ControlsProvider({ children }: { children: React.ReactNode }) {
  const [motionEnabled, setMotionEnabled] = useState<boolean>(true);
  const [constellations, setConstellations] = useState<boolean>(false);
  const [audioEnabled, setAudioEnabled] = useState<boolean>(false);
  const [orbitView, setOrbitView] = useState<boolean>(false);
  const [magnetTarget, setMagnetTarget] = useState<MagnetTarget>(null);

  const burstListeners = useRef(new Set<() => void>());
  const triggerMeteorBurst = useCallback(() => {
    burstListeners.current.forEach((cb) => {
      try { cb(); } catch {}
    });
  }, []);
  const onMeteorBurst = useCallback((cb: () => void) => {
    burstListeners.current.add(cb);
    return () => burstListeners.current.delete(cb);
  }, []);

  const value = useMemo<ControlsState>(() => ({
    motionEnabled,
    setMotionEnabled,
    constellations,
    setConstellations,
    audioEnabled,
    setAudioEnabled,
    orbitView,
    setOrbitView,
    triggerMeteorBurst,
    onMeteorBurst,
    magnetTarget,
    setMagnetTarget,
  }), [motionEnabled, constellations, audioEnabled, orbitView, triggerMeteorBurst, onMeteorBurst, magnetTarget]);

  return <ControlsContext.Provider value={value}>{children}</ControlsContext.Provider>;
}

export function useControls() {
  const ctx = useContext(ControlsContext);
  if (!ctx) throw new Error('useControls must be used within ControlsProvider');
  return ctx;
}

// Respect user prefers-reduced-motion by default
// We attach this at module usage time via a small effect hook consumer.
export function MotionDefaults() {
  const { setMotionEnabled } = useControls();
  React.useEffect(() => {
    const q = window.matchMedia('(prefers-reduced-motion: reduce)');
    setMotionEnabled(!q.matches);
  }, [setMotionEnabled]);
  return null;
}


