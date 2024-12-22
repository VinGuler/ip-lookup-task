import { expect, test } from 'vitest';
import { createId } from '@/utils';

test('returns a random id', () => {
  const result = createId([]);
  expect(result).toBeTruthy();
});
