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
    <div class="card-top skill-top" :class="{'passive-ability': item.Action === '', 'action': item.Action.includes('Action'), 'reaction': item.Action.includes('Reaction'), 'attack-action': item.Damage !== '' }" >
      <div class="flexrow-title" >
        <p class="item-name"> {{ item.Name }} </p> <ActionTypeLabel :action-text="item.Action" />
      </div>
      <div class="flexrow" >
        Skill ✦ {{item.MEM}} Memory &nbsp; <LootTags :tags=item.Tags />
        <WhitePill v-if="item['Range/reach'] !== ''">
          {{item["Range/reach"]}}
        </WhitePill>
        <WhitePill v-if="item.Damage !== ''">
          {{item.Damage}}
        </WhitePill>
      </div>
    </div>
    <div class="card-bot skill-bot" >
      {{ item.Desc }}
    </div>
  </div>
</template>

<style scoped>
.skill-top {
  background-color: #49aba8;
}

.skill-bot {
  background-color: #eaf2f1;
}</style>
