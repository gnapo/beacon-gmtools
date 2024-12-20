<script setup lang="ts">

</script>

<template>
<span class="phase-number">
  <slot/>
</span>
</template>

<style scoped>
.phase-number {
  background-color: white;
  clip-path: polygon(0 20%, 50% 0, 100% 20%, 100% 80%, 50% 100%, 0% 80%);
  color: black;
  padding: 0 0.2rem;
  mix-blend-mode: lighten;
  font-weight: bold;
}
</style>
