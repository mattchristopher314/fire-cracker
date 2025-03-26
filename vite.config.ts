import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import type { IncomingMessage, ServerResponse } from "http";
import {
  Connect,
  defineConfig,
  type PreviewServer,
  type ViteDevServer,
} from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const rewriteMiddleware = () => ({
  name: "rewrite-middleware",
  configureServer(server: ViteDevServer) {
    server.middlewares.use(
      (
        req: IncomingMessage,
        _res: ServerResponse<IncomingMessage>,
        next: Connect.NextFunction
      ) => {
        if (req.url && req.url.startsWith("/app")) {
          req.url = "/app/";
        }

        next();
      }
    );
  },
});

const rewriteMiddlewarePreview = () => ({
  name: "rewrite-middleware-preview",
  configurePreviewServer(server: PreviewServer) {
    return () => {
      server.middlewares.use(
        (
          req: IncomingMessage,
          _res: ServerResponse<IncomingMessage>,
          next: Connect.NextFunction
        ) => {
          if (req.url && req.url.startsWith("/app")) {
            req.url = "/app/";
          }

          next();
        }
      );
    };
  },
});

export default defineConfig({
  plugins: [
    tailwindcss(),
    reactRouter(),
    tsconfigPaths(),
    // rewriteMiddleware(),
    // rewriteMiddlewarePreview(),
  ],
});
