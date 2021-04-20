import { handleDenoCommand } from "../controllers/denoCommandController.ts";
import { ServerRequest } from "../deps.ts";

export default function run(request: ServerRequest) {
  if (request.method === "OPTIONS") {
    request.respond({
      status: 200,
    });
    return;
  }
  return handleDenoCommand("run", request);
}
