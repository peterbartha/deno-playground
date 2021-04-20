import { SupportedDenoSubCommand } from '../../functions/interface';

const API_URL = 'https://deno-playground-api-peterbartha.vercel.app/api';

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
