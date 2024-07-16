<script setup>
import AsideComp from '@/components/Aside/AsideComp.vue'
import Headercomp from '@/components/Header/HeaderComp.vue'
</script>

<template>
  <main>
    <div>
    <AsideComp/>
  </div>
  <div class="right">
  <div>
    <Headercomp/>
  </div>
  <div class="comp">
    AQUI VAI O CONTEÚDO
  </div>
</div>
  </main>
</template>

<style scoped>
main{
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 5fr;
}

.comp{
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem;
}
</style>