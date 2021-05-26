const fileNames = Deno.args;

const p = Deno.run({
  cmd: [
    'deno',
    'run',
    '--allow-read',
    'https://deno.land/std@0.95.0/examples/cat.ts',
    ...fileNames,
  ],
  stdout: 'piped',
  stderr: 'piped',
});

const { code } = await p.status();

// Reading the outputs closes their pipes
const rawOutput = await p.output();
const rawError = await p.stderrOutput();

if (code === 0) {
  await Deno.stdout.write(rawOutput);
  console.log(rawOutput);
} else {
  const errorString = new TextDecoder().decode(rawError);
  console.log(errorString);
}

Deno.exit(code);
