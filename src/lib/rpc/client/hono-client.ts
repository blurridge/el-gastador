import { hc } from "hono/client";
import { AppType } from "@/app/api/[[...route]]/route";

const client = hc<AppType>(process.env.NEXT_PUBLIC_BASE_URL!)

export default client;
