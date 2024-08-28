<script setup>
import { onMounted } from 'vue'


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
  <div class="container-home-view">
    <div class="header">
      <h1> Elvis Tech</h1>
      <img class="icon" src="/public/icon-elvis-blue.svg" alt="logo" />
    </div>
    <div class="container-links">
      <router-link to="/clientes" class="btn"><h2>Clientes</h2><img src="/public/client-icon-white.svg"></router-link>
      <router-link to="/orcamentos" class="btn"><h2>Orçamentos</h2><img src="/public/orcamentoicon.svg"></router-link>
      <router-link to="/servicos" class="btn"><h2>Serviços</h2><img src="/public/servicosicon.svg"></router-link>
      <router-link to="/pecas" class="btn"><h2>Estoques</h2><img src="/public/estoqueicon.svg"></router-link>
      <router-link to="/entradas" class="btn"><h2>Entradas</h2><img src="/public/entradasicon.svg"></router-link>
      <router-link to="/saidas" class="btn"><h2>saidas</h2><img src="/public/saidasicon.svg"></router-link>
    </div>
  </div>
</template>

<style scoped>
  .header{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color:  #0095FF;
  }

  h1 {
    font-size: 70px;
  }

  .container-home-view{
    position: absolute;
    background-image: url('/public/cliente-view.png');
    background-size: cover;
    width: 100%;
    height: 100%;
  }

	.logo{
	margin: 20px auto;
	width: 50%;
	display: flex;
	flex-direction: column;	
}

.icon{
  width: 250px;
  height: 250px;
}

.container-links{
  width: 60%;
  margin: auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr ;
  justify-content: space-evenly;
  align-items: center;
  height: 60%;
  justify-items: center;
}

a {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  width: 12em;
  height: 12em;
  color: white;
  background-color: #0095FF;
  text-decoration: none;
}

a img {
  width: 50%;
  height: 50%;
}
</style>
