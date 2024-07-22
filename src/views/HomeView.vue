<script setup>
import AsideComp from '@/components/Aside/AsideComp.vue'
import Headercomp from '@/components/Header/HeaderComp.vue'
import ClientsList from '@/components/others/ClientsList.vue'
import { useOrcamentosStore } from '@/stores'
import { useClientesStore } from '@/stores'
import { onMounted } from 'vue'
const storeOrcamentos = useOrcamentosStore()
const storeClientes = useClientesStore()
onMounted(async () => {
  await storeOrcamentos.getOrcamentos()
  console.log(storeOrcamentos.state.orcamentos)
  await storeClientes.getClientes()
  console.log(storeClientes.state.clientes)
})
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
    <ClientsList />
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