export type SupportedDenoSubCommand = "run" | "fmt" | "lint";

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
  stdout: BufferSource;
  stderr: BufferSource;
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
  stdout: BufferSource;
  stderr: BufferSource;
}> {
  // https://deno.land/manual@main/examples/subprocess
  const process = Deno.run({
    cmd,
    stdin: "piped",
    stdout: "piped",
    stderr: "piped",
  });

  const encoder = new TextEncoder();
  await process.stdin.write(encoder.encode(source));
  process.stdin.close();

  let isKilled = false;
  const timer = setTimeout(() => {
    isKilled = true;
    process.kill(Deno.Signal.SIGKILL);
  }, PROCESS_TIMEOUT);

  const [status, stdout, stderr] = await Promise.all([
    process.status(),
    process.output(),
    process.stderrOutput(),
  ]);

  clearTimeout(timer);
  process.close();

  return {
    isSuccess: status.success,
    isKilled,
    stdout,
    stderr,
  };
}
