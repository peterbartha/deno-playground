function wrapCodeblock(code: string, ext: string): string {
  return `\`\`\`${ext}\n${code}\n\`\`\`\n`;
}

export function makeMarkdownFrom(source: string, output: string): string {
  const outputSection = `<details><summary><b>Output</b></summary>

${wrapCodeblock(output, 'ts')}

</details>
`;

  return `
${wrapCodeblock(source, 'ts')}

${outputSection}

**Open in Deno Playground: [Link](${window.location.href})**`;
}

export function makeMarkdownUrl(): string {
  return `[Deno Playground Link](${window.location.href})`;
}

export function makeMarkdownUrlWithShortExample(source: string): string {
  const preview =
    source.length > 200
      ? `${source.substring(0, 200)}...`
      : source.substring(0, 200);
  const code = `\`\`\`ts\n${preview}\n\`\`\`\n`;
  return `${code}\n[Playground Link](${window.location.href})`;
}
