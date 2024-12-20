<script setup lang="ts">
defineProps<{
  tags: string;
}>()
</script>

<template>
  <span v-if="tags !== ''"> ✦ {{tags}} </span>
</template>

<style scoped>

</style>
