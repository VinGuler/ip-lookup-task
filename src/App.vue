<script setup lang="ts">
import IPLookup from '@/views/IpLookup.vue';
</script>

<template>
  <div>
    <a
      class="repo-link"
      href="https://github.com/VinGuler/ip-lookup-task"
      target="_blank"
      >Link to Repository</a
    >
    <IPLookup />
  </div>
</template>

<style lang="css" scoped>
.repo-link {
  position: absolute;
  top: 1rem;
  left: 1rem;
}
</style>

<style>
/* Package of flag icons */
@import url('https://emoji-css.afeld.me/emoji.css');
</style>
