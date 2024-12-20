<script setup lang="ts">
import type {Loot} from "@/loot/types.ts";
import LootTags from "@/components/LootTags.vue";
import WhitePill from "@/components/WhitePill.vue";


const props = defineProps<{
  item: Loot
}>()
</script>

<template>
  <div class="card-flexcol">
    <div class="card-top support-top" :class="{'passive-ability': item.Action === '', 'action': item.Action.includes('Action'), 'reaction': item.Action.includes('Reaction') }" >
      <div class="flexrow-title" >
        <p class="item-name"> {{ item.Name }} </p> <b>{{item.Action}} </b>
      </div>
      <div class="flexrow" >
        Support Item ✦ {{item.Size}} &nbsp; <LootTags :tags=item.Tags />
        <WhitePill v-if="item['Range/reach'] !== ''">
          {{item["Range/reach"]}}
        </WhitePill>
      </div>
    </div>
    <div class="card-bot support-bot" >
      {{ item.Desc }}
    </div>
  </div>


</template>

<style scoped>

.support-top {
  background-color: #984a22;
}

.support-bot {
  background-color: #ede1d8;
}
</style>
