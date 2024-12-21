<script setup lang="ts">
import type {Loot} from "@/loot/types.ts";
import LootTags from "@/components/LootTags.vue";
import WhitePill from "@/components/WhitePill.vue";
import ActionTypeLabel from "@/components/ActionTypeLabel.vue";
import DescriptionText from "@/components/DescriptionText.vue";

const props = defineProps<{
  item: Loot
}>()
</script>

<template>
  <div class="card-flexcol">
    <div class="card-top skill-top" :class="{'passive-ability': item.actionType === 'passive', 'action': item.actionType === 'action', 'reaction': item.actionType === 'reaction', 'attack-action': item.actionType === 'attack' }" >
      <div class="flexrow-title" >
        <p class="item-name"> {{ item.Name }} </p> <ActionTypeLabel :action-text="item.Action" />
      </div>
      <div class="flexrow literata-sc" >
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
      <DescriptionText :input-text="item.Desc"/>
    </div>
  </div>
</template>

<style scoped>
.skill-top {
  background-color: #49aba8;
}

.skill-bot {
  background-color: #eaf2f1;
  :deep(.colored-pill), :deep(.phase-number-descr) {
    background-color: #49aba8;
  }
  :deep(.colored-text) {
    color: #49aba8;
  }
}</style>
