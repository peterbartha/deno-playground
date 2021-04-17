import { readAll } from "../deps.ts";

export async function decodeRequestBody(encodedBody: Deno.Reader) {
  const decoder = new TextDecoder();
  const bodyContents = await readAll(encodedBody);
  return JSON.parse(decoder.decode(bodyContents));
}
