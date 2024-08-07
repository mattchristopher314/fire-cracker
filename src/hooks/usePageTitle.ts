import { useEffect, useRef } from "react";

export function usePageTitle(
  title: string,
  prevailOnUnmount: boolean = false
): void {
  const prefixTitle: React.MutableRefObject<string> = useRef(document.title);

  useEffect(() => {
    document.title = `${prefixTitle.current}${
      title === "Dashboard" ? "" : ` | ${title}`
    }`;
  }, [title]);

  useEffect(() => {
    if (!prevailOnUnmount) document.title = prefixTitle.current;
  }, [prevailOnUnmount]);
}
