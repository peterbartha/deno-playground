import parser from 'ansi-style-parser';

const EXPLICIT_STYLES: { [key in SegmentStyles]?: string } = {
  bold: 'font-weight: bolder;',
  dim: 'font-weight: lighter;',
  italic: 'font-style: italic;',
  underline: 'text-decoration: underline;',
  inverse: 'filter: invert(100%);',
  hidden: 'visibility: hidden;',
  strikethrough: 'text-decoration: line-through;',
};

type SegmentStyles =
  | 'bold'
  | 'dim'
  | 'italic'
  | 'underline'
  | 'inverse'
  | 'hidden'
  | 'strikethrough'
  | 'black'
  | 'red'
  | 'green'
  | 'yellow'
  | 'blue'
  | 'magenta'
  | 'cyan'
  | 'white'
  | 'gray'
  | 'lightRed'
  | 'lightGreen'
  | 'lightYellow'
  | 'lightBlue'
  | 'lightMagenta'
  | 'lightCyan'
  | 'lightWhite'
  | 'bgBlack'
  | 'bgRed'
  | 'bgGreen'
  | 'bgYellow'
  | 'bgBlue'
  | 'bgMagenta'
  | 'bgCyan'
  | 'bgWhite'
  | 'bgGray'
  | 'bgLightRed'
  | 'bgLightGreen'
  | 'bgLightYellow'
  | 'bgLightBlue'
  | 'bgLightMagenta'
  | 'bgLightCyan'
  | 'bgLightWhite';

type FormattedSegment = {
  styles: SegmentStyles[];
  text: string;
};

/**
 * Make more visible colors on a white background.
 * Note: this function cannot transform background colors.
 */
function transformColor(color: string): string {
  let result = color.toLowerCase();
  if (color.includes('light')) {
    result = color.replace(/light/, '');
  }
  // eslint-disable-next-line default-case
  switch (result) {
    case 'yellow':
      result = 'darkorange';
      break;

    case 'cyan':
      result = 'darkcyan';
      break;
  }
  return result;
}

function toCSS(style: SegmentStyles): string {
  return (
    EXPLICIT_STYLES[style] ||
    (style.slice(0, 2) === 'bg' &&
      `background-color: ${style.slice(2).toLowerCase()};`) ||
    `color: ${transformColor(style)};`
  );
}

function expand(str: string): string {
  // eslint-disable-next-line no-control-regex
  return str.replace(/\u001b\[([\d;]+)m/g, (_, p) =>
    p
      .split(';')
      .map((i: string) => `\u001b[${i}m`)
      .join('')
  );
}

export default function format(vt100FormattedString: string): string {
  const tag = 'span';
  return (parser(expand(vt100FormattedString)) as FormattedSegment[])
    .filter((segment) => segment.text.length)
    .map((segment) => {
      let html = segment.text;
      html = html.replace(/\r?\n/gm, '<br>');

      if (segment.styles.length) {
        html = `<${tag} style="${segment.styles
          .map(toCSS)
          .join('')}">${html}</${tag}>`;
      }

      return html;
    })
    .join('');
}
