<script setup lang="ts">
import {computed, ref} from "vue";
import type {LootType, Rarity} from "@/loot/types.ts";

defineProps<{
  currentRarity: Rarity
}>()

const emit = defineEmits<{
  (e: 'reroll', payload: {rerollType: LootType | ""; upgradeRarity: boolean}): void
}>()
const emitEvent = () => {
  emit('reroll', {rerollType: rerollType.value, upgradeRarity: upgradeRarity.value})
}

const open = ref(false)
const toggleOpen = () => {
  open.value = !open.value
}

const upgradeRarity = ref(false)
const rerollType = ref<LootType | "">("")

const cost = computed(() => {
  let costSum = (rerollType.value === '' ? 0 : 2) + (upgradeRarity.value === true ? 2 : 0)
  return costSum > 0 ? costSum : 1
})
const resetInputs = () => {
  upgradeRarity.value = false
  rerollType.value = ""
}
</script>

<template>
<button @click="toggleOpen" v-if="!open" class="open-button" >Reroll ⌄</button>
<div v-if="open" class="drawer" >
  <button @click="toggleOpen">Close ⌃</button>
  <div class="cost-display" >Residuum Cost: {{cost}}</div>
  <select name="typeSelect" v-model="rerollType">
    <option value="">specify loot type?</option>
    <option value="Spell">Spell</option>
    <option value="Skill">Skill</option>
    <option value="Weapon">Weapon</option>
    <option value="Support">Support Item</option>
  </select>
  <div class="checkbox-container">
    <input type="checkbox" id="rarity" v-model="upgradeRarity"/>
    <label for="rarity"> {{ currentRarity === 'legendary' ? "keep rarity?" : "upgrade rarity?" }} </label>
  </div>
  <button @click="() => {emitEvent();resetInputs();toggleOpen()}">Confirm Reroll</button>
</div>
</template>

<style scoped>
.open-button {
  width: 130px;
  height: 20px;
  margin-bottom: 32px;
}
button {
  border: none;
  border-radius: 3px;
  margin: 2px;
}
select {
  margin: 2px;
}
.checkbox-container {
  display: flex;
  justify-content: center;
}
.drawer {
  background-color: #646570;
  width: 450px;
  height: 54px;

  display: grid;
  gap: 4px;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-template-areas:
    ". cost-display cost-display"
    ". . .";
  border-radius: 3px;
  border: #7e7d7d 1px solid;

  box-shadow: 5px 5px 24px 1px rgba(0,0,0,0.27);
}
@media (max-width: 500px) {
  .drawer {
    width: 90vw;
  }
}
.cost-display {
  grid-area: cost-display;
  display: flex;
  justify-content: center;
}
</style>
