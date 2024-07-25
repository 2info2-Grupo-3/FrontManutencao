<script setup>
import { computed, onMounted, ref } from 'vue';
import { useEntradasStore } from '@/stores/';
import dataClienteModal from '../modalComps/dataModal/dataClienteModal.vue';
import addModalEntrtada from '../modalComps/addModal/addModalEntrada.vue';
const entradasStore = useEntradasStore();
const inputSearch = ref('')

onMounted(() => {
  entradasStore.getEntradas();
});
const entradas = computed(() => entradasStore.state.entradas);

function filteredList() {
  return entradas.value.filter((itemf) =>
    itemf.peca.includes(inputSearch.value)
  )
}

const isModalVisible = ref(false);
const selectedEntrada = ref(null);
const openModalAdd = ref(false);

const openModal = (cliente) => {
  selectedEntrada.value = (cliente);
  isModalVisible.value = true;
};

</script>

<template>
  <article>
    <h2>Clientes</h2>
    <div class="inputSearch">
      <img src="../../../public/searchicon.svg" alt="">
      <input type="text" v-model="inputSearch" placeholder="Pesquisar Cliente" />
      <button @click="openModalAdd = !openModalAdd">Adicionar +</button>
    </div>
    <div v-if="openModalAdd" style="width: 90%;">
      <addModalEntrtada />
    </div>
    <div class="container">
      <div class="headertable">
        <h2>ID</h2>
        <span></span>
        <h2>Peca</h2>
        <span></span>
        <h2>Data</h2>
        <span></span>
        <h2>Quantidade</h2>
      </div>
      <div class="tablescrool">
      <div v-for="entrada in filteredList()" :key="entrada.id" class="bodytable" @click="openModal(entrada)">
        <div>
          <p>{{ entrada.id }}</p>
        </div><span></span>
        <div>
          <p>{{ entrada.peca }}</p>
        </div>
        <span></span>
        <div>
          <p>{{ entrada.data }}</p>
        </div><span></span>
        <div>
          <p>{{ entrada.quantidade }}</p>
        </div><span></span>
      </div>
      <div v-if="filteredList().length <= 0" class="notFound">
        <h3>Nenhuma entrada encontrada</h3>
      </div>
    </div>
    </div>

    <dataClienteModal :isVisible="isModalVisible" @close="isModalVisible = !isModalVisible">
      <h3>Detalhes da Entrada</h3>
      <div class="modalInfo">
        <p>ID: {{ selectedEntrada?.id }}</p>
        <p>Peca:<input type="text" v-model="selectedEntrada.peca"></p>
        <p>Data:<input type="date" v-model="selectedEntrada.data"></p>
        <p>Quantidade:<input type="number" v-model="selectedEntrada.quantidade"></p>
        
      </div>
      <div class="buttonsInfo">
        <button @click="entradasStore.updateEntrada(selectedEntrada)">Atualizar</button>
        <button @click="entradasStore.deleteEntrada(selectedEntrada.id)">Excluir</button>
      </div>
    </dataClienteModal>
  </article>
</template>

<style scoped>
article {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  border-radius: .5rem;
  padding: 10px;
}
.buttonsInfo {
  display: flex;
  justify-content: center;
  gap: 10px;
  position: absolute;
  padding: 1rem 0rem;
}

.buttonsInfo button {
  padding: 10px;
  background-color: #fff;
  color: #333;
  border-radius: .5rem;
  cursor: pointer;
  width: 100px;
  margin: 0 10px;
  font-size: 16px;
  font-weight: bold;
  transition: .3s;
}

.modalInfo {
  display: flex;
  flex-direction: column;
  width: 70%;
  border: 2px #333 solid;
}

.modalInfo>p {
  display: flex;
  justify-content: space-between;
  width: 60%;
  align-items: center;
  gap: 5px;
  margin: 5px 0px;
}

.container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
  width: 90%;
  border: 2px #333 solid;
  border-radius: .5rem;
}
.headertable {
  position: sticky;
  display: grid;
  grid-template-columns: 1fr 1px 1fr 1px 1fr 1px 1fr 1px 1fr 1px 1fr 1px;
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
.tablescrool{
  width: 100%;
  max-height: 30rem;
  overflow-y: scroll;
}
.container > .tablescrool::-webkit-scrollbar{
  display: none;
}
.bodytable {
  display: grid;
  grid-template-columns: 1fr 1px 1fr 1px 1fr 1px 1fr 1px 1fr 1px 1fr 1px;
  width: 100%;
  color: black;
  padding: .5rem;
  border-bottom: 2px solid #333;
}
.bodytable:-webkit-scrollbar{
  display: none;
}

.bodytable div {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
}
.bodytable p {
  font-size: 16px;
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

.inputSearch {
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 2px solid #333;
  border-radius: 1.5rem;
  padding: .5rem;
}
.inputSearch > img{
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 1rem;
}

.inputSearch input {
  width: 85%;
  border: none
}
.inputSearch input:focus {
  outline: none;
}
.inputSearch > button{
  width: 15%;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 1rem;
  height: 1.5rem;
}
.notFound {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  border-radius: 5px;
  padding: 1rem;
}
</style>