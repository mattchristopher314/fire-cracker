import { useEffect, useState } from "react";

export const useLocalStorage: <T>(
  initialState: T,
  key: string
) => [value: T, setValue: React.Dispatch<React.SetStateAction<T>>] = (
  initialState,
  key
) => {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
};
