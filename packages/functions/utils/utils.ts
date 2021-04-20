import { readAll } from "../deps.ts";

export async function decodeRequestBody(encodedBody: Deno.Reader) {
  const decoder = new TextDecoder();
  const bodyContents = await readAll(encodedBody);
  return decoder.decode(bodyContents);
}

export function sanitizeStderrOutput(error: string): string {
  return error.replace(/file:\/\/\/[a-z0-9\-\/]*\$deno/igm, "");
}
