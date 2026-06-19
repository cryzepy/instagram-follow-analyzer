import { useState, useCallback } from "react";

export function useLocalStorage<T>(key: string, initial: T, storageKey: string): [T, (v: T | ((prev: T) => T)) => void] {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(`${storageKey}:${key}`);
      return stored !== null ? (JSON.parse(stored) as T) : initial;
    } catch {
      return initial;
    }
  });

  const setStored = useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const resolved = typeof next === "function" ? (next as (prev: T) => T)(prev) : next;
        try {
          localStorage.setItem(`${storageKey}:${key}`, JSON.stringify(resolved));
        } catch { /* quota exceeded — silent fail */ }
        return resolved;
      });
    },
    [key, storageKey],
  );

  return [value, setStored];
}
