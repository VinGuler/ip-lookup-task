<script setup lang="ts">
import { reactive } from 'vue';
import { type IpItem } from '@/types';
import { createId } from '@/utils';

import IpItemComponent from '@/components/IpItemComponent.vue';

const items = reactive<IpItem[]>([]);

const handleAddItem = () => {
  const newItem = {
    id: createId(items),
    ip: '',
    country: '',
  };
  items.push(newItem);
};

const handleUpdateItem = (newItem: IpItem) => {
  const index = items.findIndex((search) => search.id === newItem.id);
  items.splice(index, 1, newItem);
};

const handleRemoveItem = (id: string) => {
  const index = items.findIndex((search) => search.id === id);
  items.splice(index, 1);
};
</script>

<template>
  <div class="container">
    <h1 class="container__heading">IP Lookup</h1>
    <hr />

    <div class="container__add-item">
      <p>Enter 1 or more IP addresses and get their countries</p>
      <button :onclick="handleAddItem">+ Add</button>
      <hr />
    </div>

    <div class="container__items-container">
      <IpItemComponent
        v-for="item of items"
        :key="item.id"
        v-bind="item"
        @update="handleUpdateItem"
        @remove="handleRemoveItem"
      />
    </div>
  </div>
</template>

<style scoped>
.container {
  margin: auto;
  border: solid 2px white;
}

.container__heading {
  margin: 1rem;
}

.container__add-item {
  padding: 0.5rem 1rem 0 1rem;
}

.container__add-item > p {
  margin-bottom: 0.5rem;
}

.container__add-item > button {
  margin-bottom: 1rem;
}

.container__items-container {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>
