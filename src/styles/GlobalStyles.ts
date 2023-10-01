import { createGlobalStyle } from "styled-components";

export const breaks = {
  AppNavPoint: "(max-width: 58em)",
  AppMinNavPoint: "(max-width: 31em)",
};

const GlobalStyles = createGlobalStyle`
  :root {
    &, &.light-mode {
      /* Brand */
      --color-brand-hi: #22d3ee;
      --color-brand-lo: #2563eb;

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

      /* Cyan */
      --color-cyan-50: #ecfeff;
      --color-cyan-100: #cffafe;
      --color-cyan-200: #a5f3fc;
      --color-cyan-300: #67e8f9;
      --color-cyan-400: #22d3ee;
      --color-cyan-500: #06b6d4;
      --color-cyan-600: #0891b2;
      --color-cyan-700: #0e7490;
      --color-cyan-800: #155e75;
      --color-cyan-900: #164e63;
      --color-cyan-950: #083344;

      /* Blue */
      --color-blue-50: #eff6ff;
      --color-blue-100: #dbeafe;
      --color-blue-200: #bfdbfe;
      --color-blue-300: #93c5fd;
      --color-blue-400: #60a5fa;
      --color-blue-500: #3b82f6;
      --color-blue-600: #2563eb;
      --color-blue-700: #1d4ed8;
      --color-blue-800: #1e40af;
      --color-blue-900: #1e3a8a;
      --color-blue-950: #172554;

      /* Nav Background */
      --color-slate-0-trans: rgba(255, 255, 255, 0.9);
    }

    &.dark-mode { }

    --border-radius-tiny: 3px;
    --border-radius-sm: 5px;
    --border-radius-md: 7px;
    --border-radius-lg: 9px;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  *:disabled {
    cursor: not-allowed;
  }

  html {
    font-size: 62.5%;
  }

  body {
    line-height: 1;
    font-family: "Inter", sans-serif;
    font-weight: 400;
  }

  p {
    line-height: 1.6;
  }

  a {
    color:inherit;
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  button {
    cursor: pointer;
  }
`;

export default GlobalStyles;
