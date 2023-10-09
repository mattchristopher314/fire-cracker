import { RefObject, useEffect, useRef } from "react";

export const useClickOut = (
  handler: () => void,
  listenOnCapture: boolean = true
): RefObject<HTMLElement> => {
  const ref = useRef<HTMLElement>(null);

  useEffect((): (() => void) => {
    const handleClick = (e: MouseEvent): void => {
      if (ref.current && !ref.current.contains(e.target as HTMLElement))
        handler();
    };

    document.addEventListener("click", handleClick, listenOnCapture);

    return () =>
      document.removeEventListener("click", handleClick, listenOnCapture);
  }, [handler, listenOnCapture]);

  return ref;
};
