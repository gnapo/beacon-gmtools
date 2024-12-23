<script setup lang="ts">

import {settings} from "@/settings/settings.ts"
import type {ShopInfo, ShopItemsSelection} from "@/shops/types.ts";
import type {Loot, LootType, Rarity} from "@/loot/types.ts";
import {computed, ref} from "vue";
import {allItems, allItemsSorted, findLootById} from "@/loot/parse-items.ts";
import LootObject from "@/components/LootObject.vue";
import {getTechniqueSelection} from "@/shops/generate-shop-selection.ts";

const props = defineProps<{
  techniqueType: LootType
  shopInfo: ShopInfo
}>()
const model = defineModel<ShopItemsSelection>({required: true})

const techniqueToBeAdded = ref<Loot>(allItemsSorted.filter((i) => i.Type === props.techniqueType)[0])

const shopAvailable = computed(() => {
  return Array.from(model.value).some((i) => findLootById(i)?.Type === props.techniqueType)
})

const randomizeShop = () => {
  emptyShop()
  Array.from(getTechniqueSelection(allItems.filter((i) => i.Type === props.techniqueType))).forEach((i) => {
    model.value.add(i)
  })
}
const emptyShop = () => {
  Array.from(model.value).filter((i) => findLootById(i)!.Type === props.techniqueType).forEach((i) => {
    model.value.delete(i)
  })
}
const removeItemFromSet = (id: number): void => {
  model.value.delete(id)
}
const addItemToSet = (id: number): void => {
  model.value.add(id)
}

const getCostByRarity = (rarity: Rarity): string => {
  switch (rarity) {
    case 'uncommon':
      return 'Cost 1'
    case 'rare':
      return 'Cost 2'
    case 'legendary':
      return 'Cost 3'
  }
}

</script>

<template>
  <div class="tecnique-shop" v-if="shopAvailable || settings.gmControls">
    <div class="shop-titlebar">
    <span class="shop-name">
      {{ props.shopInfo.name }}
      <span class="shop-options" v-if="settings.gmControls">
        <button @click="randomizeShop"> Randomize shop</button>
        <button @click="emptyShop"> Empty shop</button>
        <select v-model="techniqueToBeAdded">
          <option v-for="(loot, i) in allItemsSorted.filter((i) => i.Type === props.techniqueType)" :key="i" :value=loot> {{loot.Name}} </option>
        </select>
        <button @click="addItemToSet(techniqueToBeAdded.id)" >Add</button>
      </span>
    </span>
    <span class="shop-desc">{{ props.shopInfo.description }}</span>
    </div>
    <div class="techinques-container" >
      <template v-for="id in Array.from(model)" :key="id">
        <div v-if="findLootById(id)?.Type === props.techniqueType" class="technique-item">
          <button v-if="settings.gmControls" @click="removeItemFromSet(id)">Remove {{props.techniqueType}}</button>
          <span class="technique-cost">{{ getCostByRarity(findLootById(id)!.Rarity) }} </span>
          <LootObject :item=findLootById(id)! :display-rarity=false :shaking=0 :snapping=0 />
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.tecnique-shop {
  max-width: 1382px;
}
.shop-titlebar {
  padding: 0.75rem 0.5rem;
  background-color: #242e62;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  color: white;
}
.shop-name {
  font-family: "Arvo", serif;
  font-weight: 400;
  font-style: normal;
  display: flex;
  gap: 0.8rem;
}
.shop-options {
  display: flex;
  gap: 0.8rem;
}

.shop-desc {
  font-family: "Literata", serif;
  font-optical-sizing: auto;
  font-weight: 500;
  font-style: normal;
  font-variant: small-caps;
}
.techinques-container {
  padding-top: 1rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
}
.technique-item {
  display: flex;
  flex-direction: column;

}
.technique-cost {
  font-size: 1.25rem;
  font-family: "Literata", serif;
  font-optical-sizing: auto;
  font-weight: 500;
  font-style: normal;
  font-variant: small-caps;
  text-align: center;
}
</style>
