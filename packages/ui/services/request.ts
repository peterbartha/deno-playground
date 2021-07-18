import { SupportedDenoSubCommand } from '../../functions/interface';

const { API_URL } = process.env;

export type SupportedRequestPath = SupportedDenoSubCommand | string;

export function performRequest(
  path: SupportedRequestPath,
  body: string,
  queryParams?: URLSearchParams
): Promise<string> {
  const params = queryParams ? `?${queryParams.toString()}` : '';
  const headers = new Headers();
  headers.append('Content-Type', 'application/javascript');
  return fetch(`${API_URL}/${path}${params}`, {
    headers: {
      'Content-Type': 'application/javascript',
    },
    method: 'POST',
    body,
  }).then((res) => res.text());
}

export type ExampleId =
  | 'default'
  | 'hello-world'
  | 'remote-import'
  | 'fetch-data'
  | 'subprocesses';

export function getExampleSourceCode(exampleId: ExampleId): Promise<string> {
  const { origin } = window.location;
  return fetch(
    `${
      origin.includes('localhost') ? '' : '/deno-playground'
    }/examples/${exampleId}.ts`
  ).then((res) => res.text());
}
