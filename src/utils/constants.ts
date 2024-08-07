const baseUrls = {
  "local-development": "http://localhost:5173",
  development: "https://firecrackerdev.matthewlukechristopher.com",
  production: "https://firecracker.matthewlukechristopher.com",
};

function isValidMode(key: string): key is keyof typeof baseUrls {
  return key in baseUrls;
}

const mode = import.meta.env.MODE;
export const BASE_URL = isValidMode(mode)
  ? baseUrls[mode]
  : baseUrls["development"];

export const NAV_TRANSITION_DURATION = 300;

export const breaks = {
  AppWideStackPoint: "(max-width: 75em)",
  AppNavPoint: "(max-width: 58em)",
  AppFullWidthNavPoint: "(max-width: 39em)",
  AppMinNavPoint: "(max-width: 31em)",
  AppCompactPoint: "(max-width: 20em)",
};

export const AVATAR_FILE_SIZE_LIMIT = 1 * 1000 * 1000;

export const APP_TITLE = "FIRECracker";
