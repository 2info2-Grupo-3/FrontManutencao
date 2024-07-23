<script setup>
import { onMounted } from 'vue'
import AsideComp from '@/components/Aside/AsideComp.vue'
import Headercomp from '@/components/Header/HeaderComp.vue'
import ServicosComp from '@/components/others/ServicosComp.vue'
import PecasList from '@/components/others/PecasList.vue'
import ClientsList from '@/components/others/ClientsList.vue'

import { useOrcamentosStore, useClientesStore, usePecasStore, useServicosStore } from '@/stores'

const storeOrcamentos = useOrcamentosStore()
const storeClientes = useClientesStore()
const storePecas = usePecasStore()
const storeServicos = useServicosStore()

onMounted(async () => {
  await storeOrcamentos.getOrcamentos()
  console.log(storeOrcamentos.state.orcamentos)
  await storeClientes.getClientes()
  console.log(storeClientes.state.clientes)
  await storePecas.getPecas()
  console.log(storePecas.state.pecas)
  await storeServicos.getServicos()
  console.log(storeServicos.state.servicos)
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
    <ClientsList/>
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