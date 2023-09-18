import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  :root {
    &, &.light-mode { }

    &.dark-mode { }
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
    padding: 0;
    margin: 0;

    transition: background-color 0.3s ease-in-out;
  }

  html {
    font-size: 62.5%;
  }

  body {
    font-family: "Inter", sans-serif;
  }
`;

export default GlobalStyles;
