import { ServerRequest } from "https://deno.land/std@0.95.0/http/server.ts";
import { writeAll } from "https://deno.land/std@0.95.0/io/util.ts";

export default async (req: ServerRequest) => {
  const content = "console.log(`HELLLLO from Deno: ${Deno.version.deno}`);";
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const deno = Deno.run({
    cmd: ["deno", "run", "-"],
    stdin: "piped",
    stdout: "piped",
    stderr: "piped",
    env: {
      DENO_DIR: "/tmp/.deno",
    },
  });
  try {
    await writeAll(deno.stdin, encoder.encode(content));
    deno.stdin.close();

    const [status, stdout, stderr] = await Promise.all([
      deno.status(),
      deno.output(),
      deno.stderrOutput(),
    ]);

    if (status.success) {
      req.respond({ status: 200, body: decoder.decode(stdout) });
    } else {
      req.respond({ status: 500, body: decoder.decode(stderr) });
    }
  } catch (e) {
    req.respond({ status: 500, body: JSON.stringify(e) });
  } finally {
    deno.close();
  }
};
