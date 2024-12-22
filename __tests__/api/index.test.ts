import { beforeAll, expect, test, vi } from 'vitest';
import createFetchMock, { type FetchMock } from 'vitest-fetch-mock';
import { getCountryByIp } from '@/api';

let fetchMocker: FetchMock;

beforeAll(() => {
  fetchMocker = createFetchMock(vi);
  fetchMocker.enableMocks();
});

test('request api should return empty properties', async () => {
  fetchMocker.doMock('{}');
  const result = await getCountryByIp('');
  expect(result.countryCode).toBeFalsy();
  expect(result.timezone).toBeFalsy();
});

test('request api should return properties', async () => {
  fetchMocker.doMock('{ "country": "IL", "timezone": "Jerusalem/Israel" }');
  const result = await getCountryByIp('');
  expect(result.countryCode).toBe('IL');
  expect(result.timezone).toBe('Jerusalem/Israel');
});
