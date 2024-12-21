<script setup lang="ts">
import {computed} from "vue";

const props = defineProps<{actionText: string}>()

const transformedContent = computed(() => {
  return props.actionText.replace(/\((\d+)\)/g, (match, number) => {
    return `<span class="phase-number">${number}</span>`;
  });
});
</script>

<template>
<b v-html="transformedContent" />
</template>

<style scoped>

</style>
