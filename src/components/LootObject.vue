<script setup lang="ts">
import type {Loot} from "@/loot/types.ts";
import WeaponCard from "@/components/WeaponCard.vue";
import SupportItemCard from "@/components/SupportItemCard.vue";
import SpellCard from "@/components/SpellCard.vue";
import SkillCard from "@/components/SkillCard.vue";
import {computed, ref, watch} from "vue";

const props = defineProps<{
  item: Loot
  displayRarity: boolean
  shaking: number
  snapping: number
}>()
const rarityText = computed(() => {
  switch (props.item.Rarity) {
    case "legendary": return "Legendary!"
    case "rare": return "Rare"
    case "uncommon": return "Uncommon"
  }
})

watch(() => props.shaking, () => {
  shaking.value = true
  setTimeout(() => {
    shaking.value = false
  }, 500)
})
watch(() => props.snapping, () => {
  snapping.value = true
  setTimeout(() => {
    snapping.value = false
  }, 200)
})
const shaking = ref(false)
const snapping = ref(false)
</script>

<template>
  <div class="card-container">
    <div class="rarity-text" v-if="displayRarity" :class="{'uncommon': item.Rarity==='uncommon', 'rare': item.Rarity==='rare', 'legendary': item.Rarity==='legendary', 'shake': shaking}"> {{rarityText}} </div>
    <div :class="{'snap': snapping}" >
    <WeaponCard v-if="item.Type === 'Weapon'" :item=item />
    <SupportItemCard v-if="item.Type === 'Support'" :item=item />
    <SpellCard v-if="item.Type === 'Spell'" :item=item />
    <SkillCard v-if="item.Type === 'Skill'" :item=item />
    </div>
  </div>
</template>

<style>

.rarity-text {
  font-size: 1.7rem;
  font-weight: bold;
  color: white;
}
.uncommon {
  text-shadow: 0 0 20px #25CE40,
    1px 1px 0 #000,
    -1px 1px 0 #000,
    -1px -1px 0 #000,
    1px -1px 0 #000;
}
.rare {

  text-shadow: 0 0 20px #687eef,
  0 0 20px #687eef,
  1px 1px 0 #000,
  -1px 1px 0 #000,
  -1px -1px 0 #000,
  1px -1px 0 #000;
}
.legendary {

  text-shadow: 0 0 20px #e8811d,
  1px 1px 0 #000,
  -1px 1px 0 #000,
  -1px -1px 0 #000,
  1px -1px 0 #000;
}


.card-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  transition: transform 0.3s ease-in-out;
}

.shake {
  animation: shake 0.5s linear;
}

@keyframes shake {
  0% { transform: translate(1px, 1px) rotate(0deg); }
  10% { transform: translate(-1px, -2px) rotate(-2deg); }
  20% { transform: translate(-3px, 0px) rotate(1deg); }
  30% { transform: translate(3px, 2px) rotate(0deg); }
  40% { transform: translate(1px, -1px) rotate(1deg); }
  50% { transform: translate(-1px, 2px) rotate(-2deg); }
  60% { transform: translate(-3px, 1px) rotate(0deg); }
  70% { transform: translate(3px, 1px) rotate(-1deg); }
  80% { transform: translate(-1px, -1px) rotate(1deg); }
  90% { transform: translate(1px, 2px) rotate(0deg); }
  100% { transform: translate(1px, -2px) rotate(-1deg); }
}
.snap {
  animation: snap 0.2s ease-in-out; /* Adjust duration as needed */
}

@keyframes snap {
  0% { transform: translateY(0); }
  50% { transform: translateY(5px); } /* Adjust the distance as needed */
  100% { transform: translateY(0); }
}
</style>
