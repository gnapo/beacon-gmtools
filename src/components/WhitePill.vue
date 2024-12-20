<script setup lang="ts">

</script>

<template>
<span class="white-pill"> <slot /> </span>
</template>

<style scoped>
.white-pill {
  background-color: white;
  color: black;
  padding: 0 0.5rem;
  mix-blend-mode: lighten;
  margin-left: 0.25rem;
  border-radius: 100px;
}
</style>
