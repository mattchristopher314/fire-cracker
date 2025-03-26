import {
  type RouteConfig,
  index,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  route("api/crossover", "routes/api/crossover.ts"),
  ...prefix("app", [index("routes/home.tsx")]),
] satisfies RouteConfig;
