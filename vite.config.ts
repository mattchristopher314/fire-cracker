import { Connect, defineConfig, ViteDevServer } from "vite";
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
            res: ServerResponse<IncomingMessage>,
            next: Connect.NextFunction
          ) => {
            console.log(req.url);
            if (req.url.startsWith("/app")) {
              req.url = "/app/";
            }
            next();
          }
        );
      },
      configurePreviewServer(serve: ViteDevServer) {
        serve.middlewares.use(
          (
            req: IncomingMessage,
            res: ServerResponse<IncomingMessage>,
            next: Connect.NextFunction
          ) => {
            console.log(req.url);
            if (req.url.startsWith("/app")) {
              req.url = "/app/";
            }
            next();
          }
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
