<script setup>
import { RouterView } from 'vue-router'
import AsideComp from './components/Aside/AsideComp.vue';
</script>

<template>
  <main>
    <div class="left">
      <AsideComp />
    </div>
    <div class="right">
      <div class="comp">
        <RouterView />
      </div>
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

.comp {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
