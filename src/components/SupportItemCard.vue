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
    <div class="card-top support-top" :class="{'passive-ability': item.actionType === 'passive', 'action': item.actionType === 'action', 'reaction': item.actionType === 'reaction', 'attack-action': item.actionType === 'attack' }" >
      <div class="flexrow-title" >
        <p class="item-name"> {{ item.Name }} </p> <ActionTypeLabel :action-text="item.Action" />
      </div>
      <div class="flexrow literata-sc" >
        Support Item ✦ {{item.Size}} &nbsp; <LootTags :tags=item.Tags />
        <WhitePill v-if="item['Range/reach'] !== ''">
          {{item["Range/reach"]}}
        </WhitePill>
      </div>
    </div>
    <div class="card-bot support-bot" >
      <DescriptionText :input-text="item.Desc"/>
    </div>
  </div>


</template>

<style scoped>

.support-top {
  background-color: #984a22;
}

.support-bot {
  background-color: #ede1d8;
  :deep(.colored-pill), :deep(.phase-number-descr) {
    background-color: #984a22;
  }
  :deep(.colored-text) {
    color: #984a22;
  }

}
</style>
