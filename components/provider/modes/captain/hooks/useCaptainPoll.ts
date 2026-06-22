"use client";

import { useCallback, useEffect, useRef } from "react";

export function useCaptainPoll(callback: () => void | Promise<void>, intervalMs: number, enabled = true) {
  const saved = useRef(callback);
  saved.current = callback;

  const tick = useCallback(async () => {
    await saved.current();
  }, []);

  useEffect(() => {
    if (!enabled) return;
    tick();
    const id = setInterval(tick, intervalMs);
    return () => clearInterval(id);
  }, [tick, intervalMs, enabled]);
}

export function useCaptainClock(onTick: () => void, enabled = true) {
  useEffect(() => {
    if (!enabled) return;
    const id = setInterval(onTick, 1000);
    return () => clearInterval(id);
  }, [onTick, enabled]);
}
