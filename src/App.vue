<script setup lang="ts">
import NavBar from './components/NavBar.vue'
</script>

<template>
  <div id="app">
    <NavBar />
    <main>
      <router-view />
    </main>
  </div>
</template>

<style>
#app {
  min-height: 100vh;
  background: #f8fafc;
}

main {
  min-height: calc(100vh - 80px);
  padding-top: 0;
}
</style>
