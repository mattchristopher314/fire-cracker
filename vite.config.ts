import { Connect, defineConfig, ViteDevServer, PreviewServer } from "vite";
import react from "@vitejs/plugin-react";
import { IncomingMessage, ServerResponse } from "http";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: "rewrite-middleware",
      configureServer(serve: ViteDevServer) {
        serve.middlewares.use(
          (
            req: IncomingMessage,
            _res: ServerResponse<IncomingMessage>,
            next: Connect.NextFunction,
          ) => {
            if (req.url && req.url.startsWith("/app")) {
              req.url = "/app/";
            }
            next();
          },
        );
      },
      configurePreviewServer(serve: PreviewServer) {
        serve.middlewares.use(
          (
            req: IncomingMessage,
            _res: ServerResponse<IncomingMessage>,
            next: Connect.NextFunction,
          ) => {
            if (req.url && req.url.startsWith("/app")) {
              req.url = "/app/";
            }
            next();
          },
        );
      },
    },
  ],
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        app: "app/index.html",
      },
    },
  },
});
