<script setup>
import { onMounted } from 'vue'
import AsideComp from '@/components/Aside/AsideComp.vue'
import Headercomp from '@/components/Header/HeaderComp.vue'
// import ServicosComp from '@/components/others/ServicosComp.vue'
// import PecasList from '@/components/others/PecasList.vue'
// import ClientsList from '@/components/others/ClientsList.vue'
// import OrcamentosList from '@/components/others/OrcamentosList.vue'


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
  <div></div>
</template>

<style scoped>

</style>