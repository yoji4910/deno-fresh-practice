import "https://deno.land/x/dotenv/load.ts";
import { createClient } from "microcms";

console.log(Deno.env.get("API_KEY"));
export const microcmsClient = createClient({
  serviceDomain: "icp-blog",
  apiKey: `${Deno.env.get("API_KEY")}`,
});
