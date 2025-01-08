<script setup lang="ts">

import LootObject from "@/components/LootObject.vue";
import type { Loot } from '@/loot/types.ts'
import { ref } from 'vue'
import {
  legendarySkills, legendarySpells, legendarySupport, legendaryWeapons,
  rareSkills,
  rareSpells, rareSupport, rareWeapons,
  uncommonSkills,
  uncommonSpells,
  uncommonSupport,
  uncommonWeapons
} from '@/loot/parse-items.ts'
const currentItems = ref<Loot[]>([])
</script>

<template>
  <div class="selector-grid" >
    <button @click="() => {currentItems = uncommonSkills}">Uncommon Skills</button>
    <button @click="() => {currentItems = uncommonSpells}">Uncommon Spells</button>
    <button @click="() => {currentItems = uncommonSupport}">Uncommon Support Items</button>
    <button @click="() => {currentItems = uncommonWeapons}">Uncommon Weapons</button>
    <button @click="() => {currentItems = rareSkills}">Rare Skills</button>
    <button @click="() => {currentItems = rareSpells}">Rare Spells</button>
    <button @click="() => {currentItems = rareSupport}">Rare Support Items</button>
    <button @click="() => {currentItems = rareWeapons}">Rare Weapons</button>
    <button @click="() => {currentItems = legendarySkills}">Legendary Skills</button>
    <button @click="() => {currentItems = legendarySpells}">Legendary Spells</button>
    <button @click="() => {currentItems = legendarySupport}">Legendary Support Items</button>
    <button @click="() => {currentItems = legendaryWeapons}">Legendary Weapons</button>
  </div>
  <div class="all-loot">
    <div v-for="(item,i) in currentItems" :key="i">
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

.selector-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 2px;
  margin-bottom: 2rem;
}
</style>
