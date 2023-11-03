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
