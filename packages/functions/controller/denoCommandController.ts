import { ServerRequest } from "https://deno.land/std@0.93.0/http/server.ts";
import { decodeRequestBody } from "../services/decoder.ts";
import {
  executeCommand,
  SupportedDenoSubCommand,
} from "../services/denoService.ts";

export async function handleDenoCommand(
  commandType: SupportedDenoSubCommand,
  request: ServerRequest,
) {
  const { method, body: encodedBody, url } = request;
  if (method !== "POST") {
    return request.respond({
      status: 405,
      body: "Method not allowed.",
    });
  }

  try {
    const body = await decodeRequestBody(encodedBody);
    const { isSuccess, isKilled, stdout, stderr } = await executeCommand(
      commandType,
      body,
      url,
    );

    if (!isSuccess) {
      if (isKilled) {
        return request.respond({
          status: 504,
          body: "Executing the given Deno command is taking too long to load.",
        });
      }
      return request.respond({
        status: 500,
        body: new TextDecoder().decode(stderr),
      });
    }
    return request.respond({
      status: 200,
      body: new TextDecoder().decode(stdout),
    });
  } catch (e) {
    if (e instanceof SyntaxError) {
      return {
        status: 400,
        body: "Cannot process request body.",
      };
    }
    console.error(e);
    return {
      status: 500,
      body: "Internal server error.",
    };
  }
}
