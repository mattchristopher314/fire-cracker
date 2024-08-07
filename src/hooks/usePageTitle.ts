import { useEffect, useRef } from "react";
import { APP_TITLE } from "../utils/constants";

export function usePageTitle(
  title: string,
  prevailOnUnmount: boolean = false
): void {
  const prefixTitle: React.MutableRefObject<string> = useRef(APP_TITLE);

  console.log(prefixTitle, title, prevailOnUnmount);

  useEffect(() => {
    document.title = `${prefixTitle.current}${
      title === "Dashboard" ? "" : ` | ${title}`
    }`;
  }, [title]);

  useEffect(() => {
    if (!prevailOnUnmount) document.title = prefixTitle.current;
  }, [prevailOnUnmount]);
}
