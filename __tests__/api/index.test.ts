import { expect, test } from 'vitest';
import { getCountryByIp } from '@/api';

test('request api', async () => {
  const result = await getCountryByIp('');
  expect(result).toBeTruthy();
});
