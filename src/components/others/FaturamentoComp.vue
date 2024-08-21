<script setup>
import { onMounted,computed , ref } from 'vue'
import { useOrcamentosStore } from '@/stores'
const orcamentosStore = useOrcamentosStore()
const orcamentos = computed(() => orcamentosStore.state.orcamentos);
const valorFaturamento = ref(0)

function cu() {
    console.log("asdasdasdasd")
   for (const orcamento of orcamentos.value) {
     console.log(orcamento)
     if (orcamento.status == 3) {
       valorFaturamento.value += Number(orcamento.valor_total)
     }
   }


}


onMounted(async () => {
  await orcamentosStore.getOrcamentos()
  console.log(orcamentosStore.state.orcamentos)
  console.log("ASDA")
    await  cu()
  console.log("foi")
})


</script>
<template>
  <div class="container" style="border:none">
    <div class="title"><h2>Faturamento atual</h2></div>
    <div class="body">
      <p>+ R$ {{ valorFaturamento.toFixed(2).replace(".", ",") }}</p>
    </div>
  </div>
</template>
<style scoped>
.container {
  width: 80%;
  height: 10rem;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  border-radius: .5rem;
}
.title{
  width: 100%;
  height: 2rem;
  text-align: center;
  margin: 0 0 1rem 0
}

p {
  font-size: 32px;
  text-align: center;
  color: #55A603;
}
</style>
