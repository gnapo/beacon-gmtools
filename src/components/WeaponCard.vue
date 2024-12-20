<script setup lang="ts">

import PhaseNumber from "@/components/PhaseNumber.vue";
import type {Loot} from "@/loot/types.ts";
import {computed} from "vue";
import LootTags from "@/components/LootTags.vue";
import WhitePill from "@/components/WhitePill.vue";

const props = defineProps<{
  item: Loot
}>()
const phaseNumber = computed(() => {
  return props.item.Action.charAt(1)
})
const phaseText = computed(() => {
  return props.item.Action.substring(4)
})
const weaponType = computed(() => {
  if (props.item["Range/reach"].includes("Range") || props.item["Range/reach"].includes("Line")) {
    return 'Ranged'
  }
  return 'Melee'
})
</script>

<template>
  <div class="card-flexcol">
    <div class="card-top weapon-top attack-action" >
      <div class="flexrow-title" >
        <p class="item-name"> {{ item.Name }} </p> <b><PhaseNumber>{{phaseNumber}}</PhaseNumber>
        {{ phaseText }} </b>
      </div>
      <div class="flexrow" >
        {{ weaponType }} Weapon ✦ {{item.Size}} {{item.Type2}} &nbsp; <LootTags :tags=item.Tags />
        <WhitePill>
          {{item["Range/reach"]}}
        </WhitePill>
        <WhitePill>
          {{item.Damage}}
        </WhitePill>
      </div>
    </div>
    <div class="card-bot weapon-bot" >
      {{ item.Desc }}
    </div>
  </div>
</template>

<style scoped>


.weapon-top {
  background-color: #232d62;
}

.weapon-bot {
  background-color: #dbd9e2;

}
</style>
