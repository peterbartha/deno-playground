import { writeAll } from "../deps.ts";
import { SupportedDenoSubCommand } from "../interface.ts";

// Vercel timeout is 10 seconds for hobby tier:
// https://vercel.com/docs/platform/limits
const PROCESS_TIMEOUT = 10000;

export function executeCommand(
  commandType: SupportedDenoSubCommand,
  body: string,
  url: string,
): Promise<{
  isSuccess: boolean;
  isKilled: boolean;
  out: string;
  error: string;
}> {
  const command = new Set(["deno", commandType]);

  const [_, search] = url.split("?");
  const queryParams = new URLSearchParams(search || "");
  if (queryParams.has("unstable")) {
    command.add("--unstable");
  }

  command.add("-");

  return execute(Array.from(command), body);
}

async function execute(
  cmd: string[],
  source: string,
): Promise<{
  isSuccess: boolean;
  isKilled: boolean;
  out: string;
  error: string;
}> {
  let isKilled = false;
  // https://deno.land/manual@main/examples/subprocess
  const deno = Deno.run({
    cmd,
    env: {
      DENO_DIR: "/tmp/.deno",
    },
    stdin: "piped",
    stdout: "piped",
    stderr: "piped",
  });

  try {
    await writeAll(deno.stdin, new TextEncoder().encode(source));
    deno.stdin.close();

    const timer = setTimeout(() => {
      isKilled = true;
      deno.kill(Deno.Signal.SIGKILL);
    }, PROCESS_TIMEOUT);

    const [status, stdout, stderr] = await Promise.all([
      deno.status(),
      deno.output(),
      deno.stderrOutput(),
    ]);

    clearTimeout(timer);

    const decoder = new TextDecoder();
    return {
      isSuccess: status.success,
      isKilled,
      out: decoder.decode(stdout),
      error: decoder.decode(stderr),
    };
  } finally {
    deno.close();
  }
}
