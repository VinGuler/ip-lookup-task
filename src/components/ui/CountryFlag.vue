<script setup lang="ts">
import { computed, defineProps } from 'vue';
const { countryCode } = defineProps<{ countryCode: string }>();
const countryFlagClass = computed(() => `em-flag-${countryCode.toLowerCase()}`);
</script>
<template>
  <span><i :class="`em ${countryFlagClass}`"></i></span>
</template>
