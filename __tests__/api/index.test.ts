import { expect, test } from 'vitest';
import { getCountryByIp } from '@/api/index';

test('request api', async () => {
  const result = await getCountryByIp('');
  expect(result).toBeTruthy();
});
