<script setup lang="ts">
import { onBeforeUnmount, defineProps, ref } from 'vue';
const { timezone } = defineProps<{ timezone: string }>();

const countryTime = ref('');
const setCountryTime = () => {
  if (!timezone) {
    countryTime.value = '';
    return;
  }

  const date = new Date();
  const dateString = date.toLocaleString('en-UK', {
    timeZone: timezone,
  });
  const time = dateString.split(' ')[1];
  countryTime.value = time;
};

const timer = setInterval(() => {
  setCountryTime();
}, 1000);
onBeforeUnmount(() => {
  clearInterval(timer);
});
</script>
<template>
  <span>{{ countryTime }}</span>
</template>

<style scoped></style>
