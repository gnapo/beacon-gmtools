<script setup lang="ts">
import LootObject from "@/components/LootObject.vue";
import {ref} from "vue";
import {
  getLootCrates,
  getLootCrateSlot1,
  getLootCrateSlot2,
  getLootCrateSlot3,
  getLootOfType,
  getRaritySlot1,
  getRaritySlot2,
  getRaritySlot3,
  getType
} from "@/loot/generate-loot.ts";
import RerollOptions from "@/components/RerollOptions.vue";
import type {Loot, LootType, Rarity} from "@/loot/types.ts";
import {callWithVaryingFrequency} from "@/util/intervalUtil.ts";

const lootCrates = ref(getLootCrates())

const animations = ref(true)

const shaking = ref([0,0,0])
const snapping = ref([0,0,0])

async function rerollSlot1(randomSource: () => Loot = getLootCrateSlot1) {
  if (animations.value) {
    shaking.value[0] += 1
    setTimeout(() => {snapping.value[0] += 1}, 2000)
    await callWithVaryingFrequency(() => {lootCrates.value[0] = randomSource()}, 2000)
  } else {
    lootCrates.value[0] = randomSource()
  }
}

async function rerollSlot2(randomSource: () => Loot = getLootCrateSlot2) {
  if (animations.value) {
  shaking.value[1] += 1
  setTimeout(() => {snapping.value[1] += 1}, 2500)
  await callWithVaryingFrequency(() => {lootCrates.value[1] = randomSource()}, 2500)
  } else {
    lootCrates.value[1] = randomSource()
  }
}
async function rerollSlot3(randomSource: () => Loot = getLootCrateSlot3) {
  if (animations.value) {
  shaking.value[2] += 1
  setTimeout(() => {snapping.value[2] += 1}, 3000)
  await callWithVaryingFrequency(() => {lootCrates.value[2] = randomSource()}, 3000)
  } else {
    lootCrates.value[2] = randomSource()
  }
}

const determineRarity = (currentRarity: Rarity, upgradeRarity: boolean, slot: 1 | 2 | 3): Rarity => {
  if (upgradeRarity) {
    console.log('currentRarity: ',currentRarity)
    switch (currentRarity) {
      case "uncommon":
        return "rare"
      default:
        return "legendary"
    }
  }
  switch (slot) {
    case 1:
      return getRaritySlot1()
    case 2:
      return getRaritySlot2()
    case 3:
      return getRaritySlot3()
  }
}

const handleReroll1 = (payload: {rerollType: LootType | "", upgradeRarity: boolean}) => {
  let currentRarity = lootCrates.value[0].Rarity;
  rerollSlot1(() => {return getLootOfType(payload.rerollType !== "" ? payload.rerollType : getType(), determineRarity(currentRarity, payload.upgradeRarity, 1))})
}

const handleReroll2 = (payload: {rerollType: LootType | "", upgradeRarity: boolean}) => {
  let currentRarity = lootCrates.value[1].Rarity;
  rerollSlot2(() => {return getLootOfType(payload.rerollType !== "" ? payload.rerollType : getType(), determineRarity(currentRarity, payload.upgradeRarity, 2))})
}

const handleReroll3 = (payload: {rerollType: LootType | "", upgradeRarity: boolean}) => {
  let currentRarity = lootCrates.value[2].Rarity;
  rerollSlot3(() => {return getLootOfType(payload.rerollType !== "" ? payload.rerollType : getType(), determineRarity(currentRarity, payload.upgradeRarity, 3))})
}


const rerollAll = async () => {
  rerollSlot1()
  rerollSlot2()
  rerollSlot3()
}

rerollAll();
</script>

<template>
<div class="container">
  <button @click="rerollAll">Reroll all!</button>
  <div class="item-grid">
    <RerollOptions @reroll="handleReroll1" :current-rarity=lootCrates[0].Rarity />
    <RerollOptions @reroll="handleReroll2" :current-rarity=lootCrates[1].Rarity />
    <RerollOptions @reroll="handleReroll3" :current-rarity=lootCrates[2].Rarity />
    <LootObject :item=lootCrates[0] :display-rarity=true :shaking=shaking[0] :snapping=snapping[0] />
    <LootObject :item=lootCrates[1] :display-rarity=true :shaking=shaking[1] :snapping=snapping[1] />
    <LootObject :item=lootCrates[2] :display-rarity=true :shaking=shaking[2] :snapping=snapping[2] />
  </div>
</div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  button {
    border: none;
    border-radius: 3px;
    width: 130px;
  }
}
.item-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 2px 2rem;
}
</style>
