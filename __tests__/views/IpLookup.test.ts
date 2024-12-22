import { shallowMount } from '@vue/test-utils';
import { expect, test } from 'vitest';
import IpLookup from '@/views/IpLookup.vue';

test('component should match snapshot', () => {
  const component = shallowMount(IpLookup);
  expect(component.html()).toMatchSnapshot();
});
