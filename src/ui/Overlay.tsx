import styled, { css } from "styled-components";

import { NAV_TRANSITION_DURATION, breaks } from "../utils/constants";

export const Overlay = styled.div<{ $type?: string; $show?: boolean }>`
  position: fixed;
  left: 0;
  top: 0;
  width: 100dvw;
  height: 100dvh;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  z-index: 1;

  ${(props) =>
    props.$type === "modal" &&
    css`
      opacity: 0;
      z-index: 2;
      background-color: rgba(0, 0, 0, 0.15);

      animation: fade ${NAV_TRANSITION_DURATION}ms ease-in-out normal forwards;

      @keyframes fade {
        from {
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
        }

        to {
          opacity: 1;
          visibility: visible;
          pointer-events: all;
        }
      }

      @keyframes fadeOut {
        from {
          opacity: 1;
          visibility: visible;
          pointer-events: all;
        }

        to {
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
        }
      }

      ${props.$show &&
      css`
        animation: fadeOut ${NAV_TRANSITION_DURATION}ms ease-in-out normal
          forwards !important;
      `}
    `}

  ${(props) =>
    props.$type === "nav" &&
    css`
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
      background-color: rgba(0, 0, 0, 0.01);

      &.should-transition-nav {
        transition: transform ${NAV_TRANSITION_DURATION}ms ease-in-out,
          opacity ${NAV_TRANSITION_DURATION}ms ease-in-out,
          visibility ${NAV_TRANSITION_DURATION}ms ease-in-out !important;
      }

      @media ${breaks.AppNavPoint} {
        opacity: ${props.$show ? 1 : 0};
        visibility: ${props.$show ? "visible" : "hidden"};
        pointer-events: ${props.$show ? "auto" : "none"};
      }

      @media ${breaks.AppFullWidthNavPoint} {
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
      }
    `}
`;

Overlay.defaultProps = {
  $type: "nav",
  $show: false,
};
