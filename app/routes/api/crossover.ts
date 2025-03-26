import type { Route } from "./+types/crossover";

export async function clientLoader(_: Route.LoaderArgs) {
  return new Response({
    status: 200,
    statusText: "Test",
  });
}
