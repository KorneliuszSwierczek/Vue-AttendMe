<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<template>
  <div class="app-container">
    <RouterView />
  </div>
</template>

<style scoped>
/* Ustawienie pełnej wysokości i szerokości dla kontenera */
html, body, #app {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  background-color: #f9f9f9; /* Jasny kolor tła */
}

.app-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background-color: #f9f9f9;
  margin: 0;
}
</style>
