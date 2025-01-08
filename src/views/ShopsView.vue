<script setup lang="ts">

import {allAlchemy, allBlacksmith, allEngineer, allGeneral, allLeatherworker, allTavern} from "@/shops/parse-shops.ts";
import {ref} from "vue";
import ShopTable from "@/components/ShopTable.vue";
import {
  alchemyShopInfo,
  blacksmithShopInfo, dojoShopInfo, engineerShopInfo,
  generalShopInfo, getInitialTechniqueSelection, getSelectionForAllSuppliesShops,
  leatherworkerShopInfo, magicShopInfo, tavernShopInfo, validSupplyIds, validTechniqueIds
} from "@/shops/generate-shop-selection.ts";
import {settings} from "@/settings/settings.ts";
import {useClipboard} from "@vueuse/core";
import TechniqueShop from "@/components/TechniqueShop.vue";
import {useRoute} from "vue-router";

const route = useRoute()

const currentSuppliesSelection = ref(getSelectionForAllSuppliesShops())
const currentTechniquesSelection = ref(getInitialTechniqueSelection())

const {copy} = useClipboard()

const rerollAll = () => {
  currentSuppliesSelection.value = getSelectionForAllSuppliesShops()
  currentTechniquesSelection.value = getInitialTechniqueSelection()
}
const clearAll = () => {
  currentSuppliesSelection.value = new Set([])
  currentTechniquesSelection.value = new Set([])
}

const copyToClipboardText = ref('Link these shops 📋')
const copyCurrentItemsToClipboard = () => {
  const supplies = Array.from(currentSuppliesSelection.value).join(',')
  const techniques = Array.from(currentTechniquesSelection.value).join(',')
  copy( window.location.origin + window.location.pathname+'?selection='+btoa(supplies+';'+techniques))
  copyToClipboardText.value = "copied to clipboard ✔️"
  setTimeout(() => {
    copyToClipboardText.value = 'Link these shops 📋'
  }, 2000)
}

const parseNumberList = (numbers: string):number[] => {
  if (numbers === '') {
    return []
  }
  return numbers.split(',').map(number => parseInt(number))
}

if (route.query.selection) {
  const params = atob(route.query.selection as string).split(';')
  const supplies = parseNumberList(params[0])
  const techniques = parseNumberList(params[1])
  if (validSupplyIds(supplies) && validTechniqueIds(techniques)) {
    currentSuppliesSelection.value = new Set(supplies)
    currentTechniquesSelection.value = new Set(techniques)
  }
}
</script>

<template>
  <div class="shopPageContainer">
    <div class="buttons" v-if="settings.gmControls">
      <button @click="rerollAll">Reroll all shops!</button>
      <button @click="clearAll">Clear all shops</button>
      <button @click="copyCurrentItemsToClipboard"> {{ copyToClipboardText }}</button>
    </div>
    <div class="suppliesShopsContainer">
      <ShopTable :selection="allGeneral" v-model="currentSuppliesSelection" :shop-info="generalShopInfo"/>
      <ShopTable :selection="allTavern" v-model="currentSuppliesSelection" :shop-info="tavernShopInfo"/>
      <ShopTable :selection="allBlacksmith" v-model="currentSuppliesSelection" :shop-info="blacksmithShopInfo"/>
      <ShopTable :selection="allEngineer" v-model="currentSuppliesSelection" :shop-info="engineerShopInfo"/>
      <ShopTable :selection="allAlchemy" v-model="currentSuppliesSelection" :shop-info="alchemyShopInfo"/>
      <ShopTable :selection="allLeatherworker" v-model="currentSuppliesSelection" :shop-info="leatherworkerShopInfo"/>
    </div>
    <div class="techniqueShopsContainer">
      <TechniqueShop :shop-info="magicShopInfo" technique-type="Spell" v-model="currentTechniquesSelection" />
      <TechniqueShop :shop-info="dojoShopInfo" technique-type="Skill" v-model="currentTechniquesSelection" />
    </div>
  </div>
</template>

<style scoped>
.shopPageContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  :deep(button) {
    border: none;
    border-radius: 3px;
    width: 140px;
  }
}

.suppliesShopsContainer {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.techniqueShopsContainer {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
