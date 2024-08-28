<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import AsideComp from './components/Aside/AsideComp.vue';

const route = useRoute();

// Computa se a página atual é a Home
const isHomePage = computed(() => route.path === '/');
</script>

<template>
  <main>
    <div class="left" v-if="!isHomePage">
      <AsideComp />
    </div>
    <div class="right">
      <RouterView />
    </div>
  </main>
</template>

<style scoped>
main {
  width: 100%;
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 5fr;
}
</style>
