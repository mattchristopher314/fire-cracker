import { createGlobalStyle } from "styled-components";
import { breaks } from "../utils/constants";

const GlobalStyles = createGlobalStyle`
  :root {
    &, &.light-mode {
      & * {
        transition: background-color 0.2s ease-in-out, border-color 0.2s ease-in-out;
      }

      /* Brand */
      --color-brand-hi: #22d3ee;
      --color-brand-lo: #2563eb;
      --color-brand-lo-hover: #1d4ed8;

      /* Error */
      --color-error-super-soft: #fee2e2;
      --color-error-soft: #fca5a5;
      --color-error-harsh: #e74c3c;
      --color-error-harsh-hover: #c0392b;

      /* Slate */
      --color-slate-0: #ffffff;
      --color-slate-50: #f8fafc;
      --color-slate-100: #f1f5f9;
      --color-slate-200: #e2e8f0;
      --color-slate-300: #cbd5e1;
      --color-slate-400: #94a3b8;
      --color-slate-400-hover: #a5b2c4;
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

      /* Yellow */
      --color-yellow-50: #fefce8;
      --color-yellow-100: #fef9c3;
      --color-yellow-200: #fef08a;
      --color-yellow-300: #fde047;
      --color-yellow-400: #facc15;
      --color-yellow-500: #eab308;
      --color-yellow-600: #ca8a04;
      --color-yellow-700: #a16207;
      --color-yellow-800: #854d0e;
      --color-yellow-900: #713f12;
      --color-yellow-950: #422006;

      /* Lime */
      --color-lime-50: #f7fee7;
      --color-lime-100: #ecfccb;
      --color-lime-200: #d9f99d;
      --color-lime-300: #bef264;
      --color-lime-400: #a3e635;
      --color-lime-500: #84cc16;
      --color-lime-600: #65a30d;
      --color-lime-700: #4d7c0f;
      --color-lime-800: #3f6212;
      --color-lime-900: #365314;
      --color-lime-950: #1a2e05;

      /* Green */
      --color-green-50: #f0fdf4;
      --color-green-100: #dcfce7;
      --color-green-200: #bbf7d0;
      --color-green-300: #86efac;
      --color-green-400: #4ade80;
      --color-green-500: #22c55e;
      --color-green-600: #16a34a;
      --color-green-700: #15803d;
      --color-green-800: #166534;
      --color-green-900: #14532d;
      --color-green-950: #052e16;

      /* Nav Background */
      --color-slate-0-trans: rgba(255, 255, 255, 0.9);
    }

    &.dark-mode { 
      /* Slate */
      --color-slate-0: #020617;
      --color-slate-50: #0f172a;
      --color-slate-100: #1e293b;
      --color-slate-200: #334155;
      --color-slate-300: #475569;
      --color-slate-400: #64748b;
      --color-slate-400-hover: #758091;
      --color-slate-500: #94a3b8;
      --color-slate-600: #cbd5e1;
      --color-slate-700: #e2e8f0;
      --color-slate-800: #f1f5f9;
      --color-slate-900: #f8fafc;
      --color-slate-950: #ffffff;

      /* Cyan */
      --color-cyan-50: #083344;
      --color-cyan-100: #164e63;
      --color-cyan-200: #155e75;
      --color-cyan-300: #0e7490;
      --color-cyan-400: #0891b2;
      --color-cyan-500: #06b6d4;
      --color-cyan-600: #22d3ee;
      --color-cyan-700: #67e8f9;
      --color-cyan-800: #a5f3fc;
      --color-cyan-900: #cffafe;
      --color-cyan-950: #ecfeff;

      /* Blue */
      --color-blue-50: #172554;
      --color-blue-100: #1e3a8a;
      --color-blue-200: #1e40af;
      --color-blue-300: #1d4ed8;
      --color-blue-400: #2563eb;
      --color-blue-500: #3b82f6;
      --color-blue-600: #60a5fa;
      --color-blue-700: #93c5fd;
      --color-blue-800: #bfdbfe;
      --color-blue-900: #dbeafe;
      --color-blue-950: #eff6ff;

      /* Yellow */
      --color-yellow-50: #422006;
      --color-yellow-100: #713f12;
      --color-yellow-200: #854d0e;
      --color-yellow-300: #a16207;
      --color-yellow-400: #ca8a04;
      --color-yellow-500: #eab308;
      --color-yellow-600: #facc15;
      --color-yellow-700: #fde047;
      --color-yellow-800: #fef08a;
      --color-yellow-900: #fef9c3;
      --color-yellow-950: #fefce8;

      /* Lime */
      --color-lime-50: #1a2e05;
      --color-lime-100: #365314;
      --color-lime-200: #3f6212;
      --color-lime-300: #4d7c0f;
      --color-lime-400: #65a30d;
      --color-lime-500: #84cc16;
      --color-lime-600: #a3e635;
      --color-lime-700: #bef264;
      --color-lime-800: #d9f99d;
      --color-lime-900: #ecfccb;
      --color-lime-950: #f7fee7;

      /* Green */
      --color-green-50: #052e16;
      --color-green-100: #14532d;
      --color-green-200: #166534;
      --color-green-300: #15803d;
      --color-green-400: #16a34a;
      --color-green-500: #22c55e;
      --color-green-600: #4ade80;
      --color-green-700: #86efac;
      --color-green-800: #bbf7d0;
      --color-green-900: #dcfce7;
      --color-green-950: #f0fdf4;

      /* Nav Background */
      --color-slate-0-trans: rgba(0, 0, 0, 0.1);
    }

    --border-radius-tiny: 3px;
    --border-radius-sm: 5px;
    --border-radius-md: 7px;
    --border-radius-lg: 9px;

    --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.1);
    --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.3);
    --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.4);
    --shadow-avatar: 0px 2px 4px rgba(0, 0, 0, 0.2);

    @media ${breaks.AppNavPoint} {
      font-size: 56.25%;
    }
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

  input,
  button,
  textarea,
  select {
    font: inherit;
    color: inherit;
  }

  button {
    cursor: pointer;
  }

  select:disabled,
  input:disabled {
    background-color: var(--color-slate-200) !important;
    color: var(--color-slate-500) !important;
  }

  input:focus,
  button:focus,
  textarea:focus,
  select:focus {
    outline: 2px solid var(--color-brand-lo);
    outline-offset: -1px;
  }

  .toaster-container > div > div:hover  {
    background-color: rgba(255, 255, 255, 1) !important;
  }
`;

export default GlobalStyles;
