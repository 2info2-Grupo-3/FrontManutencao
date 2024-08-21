<script setup>
import { onMounted } from 'vue'
import AsideComp from '@/components/Aside/AsideComp.vue'
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

  await storeClientes.getClientes()

  await storePecas.getPecas()

  await storeServicos.getServicos()

})

</script>

<template>
  <main>
    <div class="side-bar">
      <AsideComp />
    </div>
    <div class="right">
      <div class="comp">
        <!-- <ServicosComp /> -->
        <ClientsList />
        <!-- <PecasList /> -->
      </div>
    </div>
  </main>
</template>

<style scoped>

main{
  display: flex;
  height: 100%;
}

.side-bar {
  width: 20%;
}

.right {
  width: 80%;
}

.comp {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>