<script setup lang="ts">
import {computed} from "vue";
import {doReplacements, replacePhaseNumberInTop} from "@/util/textReplacement.ts";

const props = defineProps<{actionText: string}>()

const transformedContent = computed(() => {
  return doReplacements(props.actionText, [replacePhaseNumberInTop])
});
</script>

<template>
<b v-html="transformedContent" class="literata-sc"/>
</template>

<style scoped>

</style>
