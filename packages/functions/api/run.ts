import { handleDenoCommand } from "../controller/denoCommandController.ts";
import { ServerRequest } from "../deps.ts";

export default function run(request: ServerRequest) {
  return handleDenoCommand("run", request);
}
