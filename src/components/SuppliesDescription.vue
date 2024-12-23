<script setup lang="ts">

import {computed} from "vue";
import {
  doReplacements,
  replaceAccuracyInSupplies,
  replaceActionDescriptors,
  replaceBoldTextInSupplies,
  replaceCapitalRulesPhrases,
  replaceDifficultyInSuppliey,
  replacePhaseNumberInSupplies,
  replacePillsinSupplies, replacePipeWithStar,
  replaceSummonStatblock
} from "@/util/textReplacement.ts";

const props = defineProps<{
  inputText: string
}>()

const modifiedText = computed(() => {
  return doReplacements(props.inputText,
    [replaceBoldTextInSupplies,
      replaceAccuracyInSupplies,
      replaceDifficultyInSuppliey,
      replaceActionDescriptors,
      replacePhaseNumberInSupplies,
      replaceCapitalRulesPhrases,
      replaceSummonStatblock,
      replacePillsinSupplies,
      replacePipeWithStar
    ])
})
</script>

<template>
  <span v-html="modifiedText"/>
</template>

<style scoped>

</style>
