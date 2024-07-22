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

const modalOptions = {
   prevent: 'minha bola',
  inputs: [
    { id: 1, type: 'text', value: '', label: 'Nome' },
    { id: 2, type: 'text', value: '', label: 'Email' },
    { id: 3, type: 'text', value: '', label: 'Telefone' },
    { id: 4, type: 'text', value: '', label: 'Cidade' },
    { id: 5, type: 'text', value: '', label: 'Estado' },
    { id: 6, type: 'text', value: '', label: 'País' },
    { id: 7, type: 'text', value: '', label: 'Assunto' },
    { id: 8, type: 'text', value: '', label: 'Mensagem' },
    
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
