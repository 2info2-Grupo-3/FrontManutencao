<script setup>
import { ref, computed, onMounted } from 'vue';
import { useClientesStore } from '@/stores/others/clientes.js';

const clientesStore = useClientesStore();
onMounted(() => {
  clientesStore.getClientes();
});
const clientes = computed(() => clientesStore.state.clientes);

const inputSearch = ref('');

const filteredClientes = computed(() => {
  const search = inputSearch.value.toLowerCase();
  return clientes.value.filter((cliente) =>
    cliente.nome.toLowerCase().includes(search)
  );
});
</script>

<template>
 <div class="container">
  <div class="inputsection">
    <img src="/public/searchicon.svg" alt="">
  <input
    v-model="inputSearch"
    type="text"
    placeholder="Pesquisar cliente"
    class="search" />
  </div>
  <div class="table">
    <div class="headertable">
      <h2>ID</h2>
      <span></span>
      <h2>Nome</h2>
      <span></span>
      <h2>CPF</h2>
      <span></span>
      <h2>Nasc.</h2>
      <span></span>
      <h2>Telefone</h2>
      <span></span>
      <h2>Endereço</h2>
      <span></span>
      <h2>Ações</h2>
    </div>
    <div v-for="cliente in filteredClientes" :key="cliente.id" class="bodytable">
      <div><p>{{ cliente.id }}</p></div><span></span> 
      <div><p>{{ cliente.nome }}</p></div><span></span>
      <div><p>{{ cliente.cpf }}</p></div><span></span>
      <div><p>{{ cliente.data }}</p></div><span></span>
      <div><p>{{ cliente.telefone }}</p></div><span></span>
      <div><p>{{ cliente.endereco }}</p></div><span></span>
      <div>
        <button><img src="../../../public/pencilicon.svg" alt=""></button>
        <button><img src="../../../public/binicon.svg" alt=""></button>
      </div>
      
    </div>
    <div class="noResults"  v-if="filteredClientes.length == 0">
        <h3>No results Found!!</h3>
      </div>
  </div>
</div>
</template>

<style scoped>
.container{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 100%;
}
.table {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
  /* min-width: 90%; */
  width: 90%;
  border: 2px #333 solid;
  border-radius: .5rem;
  margin: auto;
}
.headertable {
  display: grid;
  grid-template-columns: 1fr 1px 1fr 1px 1fr 1px 1fr 1px 1fr 1px 1fr 1px 1fr;
  /* min-width: 100%; */
  width: 100%;
  height: 2rem; 
  background-color: #333333;
  color: white;
  padding: .5rem;
}
.headertable h2 {
  font-size: 16px;
  text-align: center;
}
.headertable span {
  height: 100%;
  width: 1px;
  background-color: white;
}
.bodytable {
  display: grid;
  grid-template-columns: 1fr 1px 1fr 1px 1fr 1px 1fr 1px 1fr 1px 1fr 1px 1fr;
  /* min-width: 100%; */
  width: 100%;
  color: black;
  padding: .5rem;
  border-bottom: 2px solid #333;
}
.bodytable div {
  display: flex;
  justify-content: center;
  align-items: center;
}
.bodytable p {
  font-size: 14px;
  text-align: center;
}
.bodytable span {
  height: 100%;
  width: 1px;
  background-color: #333333;
}
.bodytable button {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  color: white;
  border: none;
  margin: 0 .5rem;
  border-radius: .5rem;
  cursor: pointer;
}
.bodytable button img {
  width: 1.5rem;
  height: 1.5rem;
}
.inputsection{
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 2rem;
  width: 60%;
  border: 2px solid #333;
  margin: 2rem auto;
  border-radius: 1rem;
}
.inputsection img {
  width: 1.5rem;
  height: 1.5rem;
  margin-left: 1rem;
  opacity: .5;
}
.search {
  width: 90%;
  height: 2rem;
  border: none;
  border-radius: 1rem;
  padding-left: 1rem;
  font-size: 16px;
}
.search:focus {
  outline: none;
}
.noResults{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3rem;
  width: 100%;
  border-radius: .5rem;
  margin-top: 2rem;
}
</style>
