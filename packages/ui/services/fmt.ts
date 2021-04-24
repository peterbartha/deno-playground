import { performRequest } from './request';

export default function fmt(source: string): Promise<string> {
  return performRequest('fmt', source);
}
