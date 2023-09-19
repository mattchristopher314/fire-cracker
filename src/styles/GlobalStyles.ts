import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  :root {
    &, &.light-mode {
      /* Slate */
      --color-slate-0: #ffffff;
      --color-slate-50: #f8fafc;
      --color-slate-100: #f1f5f9;
      --color-slate-200: #e2e8f0;
      --color-slate-300: #cbd5e1;
      --color-slate-400: #94a3b8;
      --color-slate-500: #64748b;
      --color-slate-600: #475569;
      --color-slate-700: #334155;
      --color-slate-800: #1e293b;
      --color-slate-900: #0f172a;
      --color-slate-950: #020617;

      /* Brand (Cyan) */
      --color-brand-50: #ecfeff;
      --color-brand-100: #cffafe;
      --color-brand-200: #a5f3fc;
      --color-brand-300: #67e8f9;
      --color-brand-400: #22d3ee;
      --color-brand-500: #06b6d4;
      --color-brand-600: #0891b2;
      --color-brand-700: #0e7490;
      --color-brand-800: #155e75;
      --color-brand-900: #164e63;
      --color-brand-950: #083344;
    }

    &.dark-mode { }
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  html {
    font-size: 62.5%;
  }

  body {
    font-family: "Inter", sans-serif;
  }

  a {
    color:inherit;
    text-decoration: none;
  }

  ul {
    list-style: none;
  }
`;

export default GlobalStyles;
