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
import LootSelector from "@/components/LootSelector.vue";
import {settings} from "@/settings/settings.ts";
import {useRoute} from "vue-router";
import {useClipboard} from "@vueuse/core";
import {findLootById, idsAreValid} from "@/loot/parse-items.ts";

const lootCrates = ref(getLootCrates())
const animations = ref(true)

const route = useRoute()

const { copy } = useClipboard()
const shaking = ref([0,0,0])
const snapping = ref([0,0,0])

function getDefaultRandomSource(slot: 1 | 2 | 3): () => Loot  {
  switch (slot) {
    case 1:
      return getLootCrateSlot1
    case 2:
      return getLootCrateSlot2
    case 3:
      return getLootCrateSlot3
  }
}

async function rerollSlot(slot: 1 | 2 | 3, randomSource?: () => Loot, forcedLoot?: Loot ) {
  const spinDuration = 1500 + slot * 500 - ((forcedLoot === undefined) ? 0 : 100)
  const source = randomSource ?? getDefaultRandomSource(slot)
  if (settings.value.animations) {
    shaking.value[slot-1] += 1
    setTimeout(() => snapping.value[slot-1] += 1, spinDuration)
    if (forcedLoot !== undefined) {
      setTimeout(() => {lootCrates.value[slot-1] = forcedLoot}, spinDuration + 100)
    }
    await callWithVaryingFrequency(() => {lootCrates.value[slot-1] = source()}, spinDuration)
  } else {
    if (forcedLoot !== undefined) {
      lootCrates.value[slot-1] = forcedLoot
    } else {
      lootCrates.value[slot-1] = source()
    }
  }
}

const determineRarity = (currentRarity: Rarity, upgradeRarity: boolean, slot: 1 | 2 | 3): Rarity => {
  if (upgradeRarity) {
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
  rerollSlot(1,() => {return getLootOfType(payload.rerollType !== "" ? payload.rerollType : getType(), determineRarity(currentRarity, payload.upgradeRarity, 1))})
}

const handleReroll2 = (payload: {rerollType: LootType | "", upgradeRarity: boolean}) => {
  let currentRarity = lootCrates.value[1].Rarity;
  rerollSlot(2,() => {return getLootOfType(payload.rerollType !== "" ? payload.rerollType : getType(), determineRarity(currentRarity, payload.upgradeRarity, 2))})
}

const handleReroll3 = (payload: {rerollType: LootType | "", upgradeRarity: boolean}) => {
  let currentRarity = lootCrates.value[2].Rarity;
  rerollSlot(3,() => {return getLootOfType(payload.rerollType !== "" ? payload.rerollType : getType(), determineRarity(currentRarity, payload.upgradeRarity, 3))})
}


const rerollAll = async () => {
  await Promise.all([
    rerollSlot(1),
    rerollSlot(2),
    rerollSlot(3)
  ])
}


const copyToClipboardText = ref('Link these boxes 📋')
const copyCurrentItemsToClipboard = () => {
  copy(  window.location.origin + window.location.pathname+'?items='+btoa(lootCrates.value.map(x => x.id).join(',')))
  copyToClipboardText.value = "copied to clipboard ✔️"
  setTimeout(() => {copyToClipboardText.value = 'Link these boxes 📋'}, 2000)
}
if (route.query.items) {
  const items = atob(route.query.items as string).split(',').map(i => parseInt(i))
  if (idsAreValid(items)) {
    rerollSlot(1, undefined, findLootById(items[0]))
    rerollSlot(2, undefined, findLootById(items[1]))
    rerollSlot(3, undefined, findLootById(items[2]))
  } else {
    rerollAll()
  }
} else {
  rerollAll();
}
</script>

<template>
<div class="container">
  <div class="buttons">
    <button @click="rerollAll">Reroll all!</button>
    <button @click="copyCurrentItemsToClipboard" v-if="settings.gmControls"> {{copyToClipboardText}} </button>
  </div>
  <div class="item-grid" :class="{'show-gm': settings.gmControls}">
    <LootSelector v-model=lootCrates[0] v-if="settings.gmControls" class="item1"/>
    <LootSelector v-model=lootCrates[1] v-if="settings.gmControls" class="item2"/>
    <LootSelector v-model=lootCrates[2] v-if="settings.gmControls" class="item3"/>
    <RerollOptions @reroll="handleReroll1" :current-rarity=lootCrates[0].Rarity class="item4"/>
    <RerollOptions @reroll="handleReroll2" :current-rarity=lootCrates[1].Rarity class="item5"/>
    <RerollOptions @reroll="handleReroll3" :current-rarity=lootCrates[2].Rarity class="item6"/>
    <LootObject :item=lootCrates[0] :display-rarity=true :shaking=shaking[0] :snapping=snapping[0] class="item7"/>
    <LootObject :item=lootCrates[1] :display-rarity=true :shaking=shaking[1] :snapping=snapping[1] class="item8"/>
    <LootObject :item=lootCrates[2] :display-rarity=true :shaking=shaking[2] :snapping=snapping[2] class="item9"/>
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
  grid-template-areas:
                "item1 item2 item3"
                "item4 item5 item6"
                "item7 item8 item9";
  gap: 2px 2rem;
}

.item1 { grid-area: item1; }
.item2 { grid-area: item2; }
.item3 { grid-area: item3; }
.item4 { grid-area: item4; }
.item5 { grid-area: item5; }
.item6 { grid-area: item6; }
.item7 { grid-area: item7; }
.item8 { grid-area: item8; }
.item9 { grid-area: item9; }



@media (max-width: 1400px) {
  .item-grid.show-gm {
    grid-template-areas:
                    "item1"
                    "item4"
                    "item7"
                    "item2"
                    "item5"
                    "item8"
                    "item3"
                    "item6"
                    "item9";
    grid-template-columns: 1fr;
  }
  .item-grid {
    grid-template-areas:
                    "item4"
                    "item7"
                    "item5"
                    "item8"
                    "item6"
                    "item9";
    grid-template-columns: 1fr;
  }
  .item7, .item8 {
    margin-bottom: 4rem;
  }
}
</style>
