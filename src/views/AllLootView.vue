<script setup lang="ts">

import LootObject from "@/components/LootObject.vue";
import {allItemsSorted} from "@/loot/parse-items.ts";
</script>

<template>
  <div class="all-loot">
    <div v-for="(item,i) in allItemsSorted" :key="i">
      <LootObject :item="item" :display-rarity=false :shaking=0 :snapping=0 />
    </div>
  </div>
</template>

<style>
.all-loot {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}

</style>
