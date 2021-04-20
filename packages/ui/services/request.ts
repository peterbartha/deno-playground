import { SupportedDenoSubCommand } from '../../functions/interface';

const API_URL = `${
  window.location.origin.includes('localhost')
    ? 'http://localhost:3000'
    : 'https://deno-playground-api.vercel.app'
}/api`;

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
