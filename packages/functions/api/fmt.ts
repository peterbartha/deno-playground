import { ServerRequest } from "https://deno.land/std@0.93.0/http/server.ts";
import { handleDenoCommand } from "../controller/denoCommandController.ts";

export default function fmt(request: ServerRequest) {
  return handleDenoCommand("fmt", request);
}
