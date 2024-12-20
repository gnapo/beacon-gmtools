<script setup lang="ts">
import SettingsIcon from "@/components/icons/SettingsIcon.vue";
import {ref} from "vue";
import {settings} from "@/settings/settings.ts";


const settingsOpen = ref(false)
const toggleMenu = () => {
  settingsOpen.value = !settingsOpen.value
}


</script>

<template>
  <div class="options-menu" :class="{'opened': settingsOpen}">
    <div class="options">
      <span> <input type="checkbox" v-model="settings.gmView" class="pointer"> <label class="pointer" @click="settings.gmView = !settings.gmView">GM view</label></span>
    </div>
  </div>
  <div class="options-button">
    <SettingsIcon @click="toggleMenu"/>
  </div>


</template>

<style scoped>
.options-button {
  position: absolute;
  left: 2rem;
  top: 2rem;
  height: 44px;
  width: 44px;
}
.options-menu {
  position: absolute;
  left: 2.7rem;
  top: 2.7rem;
  width: 0;
  height: 0;
  background-color: #646570;
  border-radius: 3px;
  border: #7e7d7d 1px solid;
  overflow: hidden;

  box-shadow: 5px 5px 24px 1px rgba(0,0,0,0.27);

  transition: height 100ms ease-in-out, width 100ms ease-in-out;
  &.opened {
    left: 1.75rem;
    top: 1.75rem;
    width: 150px;
    height: 50px;
  }
}
.options {
  display: flex;
  flex-direction: column;
  padding-left: 3.4rem;
  padding-top: 0.8rem;
}
.pointer {
  cursor: pointer;
}
</style>
