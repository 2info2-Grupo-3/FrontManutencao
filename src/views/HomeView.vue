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
        <!-- Ajuste para passar options como uma expressão avaliável -->
        <modalMain :options="modalOptions" />
      </div>
    </div>
  </main>
</template>

<script setup>
import AsideComp from '@/components/Aside/AsideComp.vue'
import Headercomp from '@/components/Header/HeaderComp.vue'
import modalMain from '@/components/ComponentsUtils/modalMain.vue'
import { useOrcamentosStore } from '@/stores'
import { onMounted } from 'vue'

const store = useOrcamentosStore()

// Defina suas options dentro do script setup
const modalOptions = {
  inputs: [
    { id: 1, type: 'text', value: '', label: 'Nome', prevent: 'minha bola' }
  ]
}

onMounted(async () => {
  await store.getOrcamentos()
  console.log(store.state.orcamentos)
})
</script>

<style scoped>
main {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 5fr;
}

.comp {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem;
}
</style>
