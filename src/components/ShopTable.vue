<script setup lang="ts">

import type {ShopInfo, ShopItem, ShopItemsSelection} from "@/shops/types.ts";
import {settings} from "@/settings/settings.ts";
import CheckmarkEmpty from "@/components/icons/CheckmarkEmpty.vue";
import CheckmarkChecked from "@/components/icons/CheckmarkChecked.vue";
import {shopItemsByShopType} from "@/shops/parse-shops.ts";
import {getShopSelection} from "@/shops/generate-shop-selection.ts";
import {computed} from "vue";
import SuppliesDescription from "@/components/SuppliesDescription.vue";

const props = defineProps<{
  selection: ShopItem[]
  shopInfo: ShopInfo
}>()

const model = defineModel<ShopItemsSelection>({required: true})

const shopAvailable = computed(() => {
  return props.selection.some((i) => {return model.value.has(i.id)})
})



const toggleItemInSet = (id: number): void => {
  if (!settings.value.gmControls) {
    return
  }
  if (model.value.has(id)) {
    model.value.delete(id)
  } else {
    model.value.add(id)
  }
}

const emptyShop = () => {
  for (const item of shopItemsByShopType.get(props.shopInfo.type) ?? []) {
    model.value.delete(item.id)
  }
}

const randomizeShop = () => {
  emptyShop()
  for (const item of getShopSelection(shopItemsByShopType.get(props.shopInfo.type) ?? [])) {
    model.value.add(item)
  }
}

</script>

<template>
  <div class="shop" v-if="shopAvailable || settings.gmControls">
    <div class="shop-titlebar">
      <span class="shop-name">
        {{ props.shopInfo.name }}
        <span class="shop-options" v-if="settings.gmControls">
          <button @click="randomizeShop"> Randomize shop</button>
          <button @click="emptyShop"> Empty shop</button>
        </span>
      </span>
      <span class="shop-desc">{{ props.shopInfo.description }}</span>
    </div>
    <div class="shop-table">
      <div class="first-row"/>
      <div class="first-row"> SUPPLY</div>
      <div class="first-row"> COST</div>
      <div class="first-row"> EFFECT</div>
      <template v-for="(item, i) in props.selection" :key="i">
        <template v-if="model.has(item.id) || settings.gmControls">
          <div class="shopitem-controlls" :class="{'pointer': settings.gmControls}" v-if="settings.gmControls" @click="toggleItemInSet(item.id)">
            <CheckmarkChecked v-if=model.has(item.id) />
            <CheckmarkEmpty v-else />
          </div>
          <div v-else />
          <div class="shopitem-name" :class="{'pointer': settings.gmControls}" @click="toggleItemInSet(item.id)">{{ item.Name }}</div>
          <div class="shopitem-cost" :class="{'pointer': settings.gmControls}" @click="toggleItemInSet(item.id)"> {{ item.Cost }}</div>
          <div class="shopitem-effect" :class="{'pointer': settings.gmControls}" @click="toggleItemInSet(item.id)"> <SuppliesDescription :input-text="item.Effect" /></div>
        </template>
      </template>
    </div>
  </div>
</template>

<style scoped>

.shop-titlebar {
  padding: 0.75rem 0.5rem;
  background-color: #242e62;
  display: flex;
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

.shop-table {
  display: grid;
  grid-template-columns: 20px 1fr 55px 4fr;
  grid-column-gap: 0;
  grid-row-gap: 0;
}

.first-row {
  background-color: #242e62;
  font-family: "Arvo", serif;
  font-weight: 400;
  font-style: normal;
  color: white;
}

.shopitem-controlls {
  padding-top: 0.25rem;

}
.shopitem-name {
  font-family: "Arvo", serif;
  font-weight: 400;
  font-style: normal;
  border-left: 4px solid #242e62;
  padding-left: 0.25rem;
  padding-top: 0.25rem;

  background-color: white;
  color: #242e62;
}

.shopitem-cost {
  font-family: "Literata", serif;
  font-optical-sizing: auto;
  font-weight: 500;
  font-style: normal;
  font-variant: small-caps;
  padding-top: 0.25rem;

  background-color: white;
  color: black;
}
.shopitem-effect {
  padding-top: 0.25rem;

  background-color: white;
  color: black;
}

.pointer {
  cursor: pointer;
}

:deep(.supplies-pill) {
  background-color: black;
  color: white;
  padding: 0 0.5rem;
  border-radius: 100px;
}
</style>
