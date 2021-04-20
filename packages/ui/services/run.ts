import { performRequest } from './request';

export default function run(source: string): Promise<string> {
  return performRequest('run', source);
}
