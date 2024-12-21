<script setup lang="ts">
import type {Loot} from "@/loot/types.ts";
import LootTags from "@/components/LootTags.vue";
import WhitePill from "@/components/WhitePill.vue";
import ActionTypeLabel from "@/components/ActionTypeLabel.vue";

const props = defineProps<{
  item: Loot
}>()
</script>

<template>
  <div class="card-flexcol">
    <div class="card-top spell-top" :class="{'passive-ability': item.Action === '', 'action': item.Action.includes('Action'), 'reaction': item.Action.includes('Reaction'), 'attack-action': item.Damage !== '' }" >
      <div class="flexrow-title" >
        <p class="item-name"> {{ item.Name }} </p> <ActionTypeLabel :action-text="item.Action" />
      </div>
      <div class="flexrow" >
        Spell ✦ {{item.MEM}} Memory &nbsp; <LootTags :tags=item.Tags />
        <WhitePill v-if="item['Range/reach'] !== ''">
          {{item["Range/reach"]}}
        </WhitePill>
        <WhitePill v-if="item.Damage !== ''">
          {{item.Damage}}
        </WhitePill>
      </div>
    </div>
    <div class="card-bot spell-bot" >
      {{ item.Desc }}
    </div>
  </div>
</template>

<style scoped>
.spell-top {
  background-color: #5a7aab;
}

.spell-bot {
  background-color: #e9eaf2;

}
</style>
