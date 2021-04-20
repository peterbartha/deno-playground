import { handleDenoCommand } from "../controllers/denoCommandController.ts";
import { ServerRequest } from "../deps.ts";

export default function fmt(request: ServerRequest) {
  if (request.method === "OPTIONS") {
    request.respond({
      status: 200,
    });
    return;
  }
  return handleDenoCommand("fmt", request);
}
