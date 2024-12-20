<script setup lang="ts">
import type {Loot} from "@/loot/types.ts";
import {allItemsSorted} from "@/loot/parse-items.ts";

const model = defineModel<Loot>({required: true})

</script>

<template>
<select v-model="model">
  <option v-for="(loot, i) in allItemsSorted" :key="i" :value=loot> {{loot.Name}} </option>
</select>
</template>

<style scoped>

</style>
