<script setup>
import { onMounted } from 'vue'
import AsideComp from '@/components/Aside/AsideComp.vue'
import Headercomp from '@/components/Header/HeaderComp.vue'
// import ServicosComp from '@/components/others/ServicosComp.vue'
// import PecasList from '@/components/others/PecasList.vue'
// import ClientsList from '@/components/others/ClientsList.vue'

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

function cu(){
  alert('cu')
  window.open('https://www.youtube.com/watch?v=QSmScADQxPw')
}
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
    COMPONENTES ESTÃO COMENTADOS
    <button @click="cu">Cu  </button>
    <!-- <ServicosComp />
    <ClientsList/>
    <PecasList/> -->

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
  flex-direction: column;
}
</style>