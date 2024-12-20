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
  text-shadow: 0px 0px 20px #25CE40,
    1px 1px 0 #000,
    -1px 1px 0 #000,
    -1px -1px 0 #000,
    1px -1px 0 #000;
}
.rare {

  text-shadow: 0px 0px 20px #687eef,
  0px 0px 20px #687eef,
  1px 1px 0 #000,
  -1px 1px 0 #000,
  -1px -1px 0 #000,
  1px -1px 0 #000;
}
.legendary {

  text-shadow: 0px 0px 20px #e8811d,
  1px 1px 0 #000,
  -1px 1px 0 #000,
  -1px -1px 0 #000,
  1px -1px 0 #000;
}

.item-name {
  font-size: 1.1rem;
}

.card-flexcol {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  width: 450px;
}

.card-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  transition: transform 0.3s ease-in-out;
}
.flexrow {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.flexrow-title {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-bottom: 0.25rem;

  b {
    padding-right: 1.5rem;
  }
}

.card-top {
  color: white;
  padding-top: 0.25rem;
  padding-left: 0.25rem;
  padding-right: 0.25rem;
  padding-bottom: 0.45rem;
  width: 450px;

}

.card-bot {
  color: black;
  padding-left: 0.25rem;
  width: 450px;

}

.action {
  clip-path: polygon(0 0, 430px 0, 431px 6px, 433px 11px, 436px 14px, 439px 17px, 444px 19px, 100% 20px, 100% 100px, 0 100px);
}

.passive-ability {
  border-top-right-radius: 20px;
}

.reaction {
  clip-path: polygon(0 0, 429px 0, 429px 14px, 443px 14px, 443px 7px, 436px 7px, 436px 21px, 100% 21px, 100% 100px, 0 100px);
}

.attack-action {
  clip-path: polygon(0 0, 430px 0, 100% 20px, 100% 100%, 0 100%);
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
