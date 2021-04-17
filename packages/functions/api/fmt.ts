import { handleDenoCommand } from "../controller/denoCommandController.ts";
import { ServerRequest } from "../deps.ts";

export default function fmt(request: ServerRequest) {
  return handleDenoCommand("fmt", request);
}
