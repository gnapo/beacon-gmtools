<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import OptionsMenu from "@/components/OptionsMenu.vue";
</script>

<template>
  <header>
    <span class="title">Beacon GM Tools</span>

      <nav>
        <RouterLink to="/loot">Loot Crates</RouterLink>
        <RouterLink to="/shops">Available Shops</RouterLink>
      </nav>
  </header>

  <OptionsMenu />
  <RouterView />
</template>

<style scoped>

.title {
  font-size: 2rem;
  font-weight: bold;
}
header {
  line-height: 1.5;
}


nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}


nav a {
  color: floralwhite;
  display: inline-block;
  padding: 0 1rem;
}

nav a:first-of-type {
  border: 0;
}

  header {
    display: flex;
    place-items: center;
    flex-direction: column;
  }

  nav {
    display: flex;
    flex-direction: row;
    text-align: left;
    place-content: center;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }

</style>
