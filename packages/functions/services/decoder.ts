import { readAll } from "https://deno.land/std@0.93.0/io/util.ts";

export async function decodeRequestBody(encodedBody: Deno.Reader) {
  const decoder = new TextDecoder();
  const bodyContents = await readAll(encodedBody);
  return JSON.parse(decoder.decode(bodyContents));
}
