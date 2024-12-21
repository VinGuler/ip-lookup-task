import type { IpItem } from '@/types';

export const createId = (items: IpItem[]) => {
  const existing = new Set(items.map((item) => item.id));
  const generate = () => {
    const rand1 = Math.floor(Math.random() * 10 * 4);
    const rand2 = Math.floor(Math.random() * 10 * 4);
    return rand1.toString() + '-' + rand2.toString();
  };

  let suggestion = generate();
  while (existing.has(suggestion)) {
    suggestion = generate();
  }
  return suggestion;
};
