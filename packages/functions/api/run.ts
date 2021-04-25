import { handleDenoCommand } from "../controllers/denoCommandController.ts";
import { ServerRequest } from "../deps.ts";

export default function run(request: ServerRequest) {
  return handleDenoCommand("run", request);
}
