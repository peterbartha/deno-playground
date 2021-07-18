declare module 'ansi-style-parser';
declare module 'react-split';

declare module '*.svg' {
  const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}
