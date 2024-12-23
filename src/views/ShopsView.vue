<script setup lang="ts">

import {allAlchemy, allBlacksmith, allEngineer, allGeneral, allLeatherworker, allTavern} from "@/shops/parse-shops.ts";
import {ref} from "vue";
import ShopTable from "@/components/ShopTable.vue";
import {
  alchemyShopInfo,
  blacksmithShopInfo, dojoShopInfo, engineerShopInfo,
  generalShopInfo, getInitialTechniqueSelection, getSelectionForAllSuppliesShops,
  leatherworkerShopInfo, magicShopInfo, tavernShopInfo
} from "@/shops/generate-shop-selection.ts";
import {settings} from "@/settings/settings.ts";
import {useClipboard} from "@vueuse/core";
import TechniqueShop from "@/components/TechniqueShop.vue";

const currentSuppliesSelection = ref(getSelectionForAllSuppliesShops())
const currentTechniquesSelection = ref(getInitialTechniqueSelection())


const {copy} = useClipboard()

const rerollAll = () => {
  currentSuppliesSelection.value = getSelectionForAllSuppliesShops()
  console.log(Array.from(currentSuppliesSelection.value).join(','))
}

const copyToClipboardText = ref('Link these shops 📋')
const copyCurrentItemsToClipboard = () => {
  console.log('not implemented yet ¯\\_(ツ)_/¯')
  copyToClipboardText.value = "not implemented yet ¯\\_(ツ)_/¯"
  setTimeout(() => {
    copyToClipboardText.value = 'Link these shops 📋'
  }, 2000)
}
</script>

<template>
  <div class="shopPageContainer">
    <div class="buttons" v-if="settings.gmControls">
      <button @click="rerollAll">Reroll all shops!</button>
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
