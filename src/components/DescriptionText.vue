<script setup lang="ts">
import {computed} from "vue";
import {
  doReplacements, putLinebreaksOnLists,
  replaceAccuracy, replaceActionDescriptors,
  replaceBoldText, replaceCapitalRulesPhrases,
  replaceDifficulty, replacePhaseNumberInDescription, replacePills,
  replaceSummonStatblock
} from "@/util/textReplacement.ts";

const props = defineProps<{
  inputText: string
}>()

const modifiedText = computed(() => {
  return doReplacements(props.inputText,
    [putLinebreaksOnLists,
      replaceBoldText,
      replaceAccuracy,
      replaceDifficulty,
      replaceSummonStatblock,
      replacePills,
      replaceActionDescriptors,
      replacePhaseNumberInDescription,
      replaceCapitalRulesPhrases])
})
</script>

<template>
<span v-html="modifiedText" />
</template>

<style scoped>

</style>
