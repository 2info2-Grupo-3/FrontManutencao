<script setup>
import { computed, onMounted, ref } from 'vue'
import { useEntradasStore } from '@/stores/'
import dataEntradaModal from '../modalComps/dataModal/dataEntradaModal.vue'
import addEntradaModal from '../modalComps/addModal/addEntradaModal.vue' // Modal para adicionar nova entrada

const entradasStore = useEntradasStore()
const inputSearch = ref('')

onMounted(() => {
  entradasStore.getEntradas()
})

const entradas = computed(() => entradasStore.state.entradas)

function filteredList() {
  return entradas.value.filter((itemf) =>
    itemf.peca.toLowerCase().includes(inputSearch.value.toLowerCase())
  )
}

const isModalVisible = ref(false)
const selectedEntrada = ref(null)
const openModalAdd = ref(false)

const openModal = (data) => {
  selectedEntrada.value = data
  isModalVisible.value = true
}
</script>

<template>
  <article>
    <div class="container-title">
      <h1>Gerenciamento de entradas</h1>
    </div>
    <div class="search-bar">
      <div class="inputSearch">
        <input type="text" v-model="inputSearch" placeholder="Pesquisar entrada" />
        <img src="../../../public/searchicon.svg" alt="" />
      </div>
      <button class="btn-adicionar" @click="openModalAdd = true">Adicionar entrada +</button>
    </div>
    <div v-if="openModalAdd" style="width: 90%">
      <addEntradaModal @close="openModalAdd = false" />
    </div>
    <div class="container">
      <div class="headertable">
        <h2>ID</h2>
        <span></span>
        <h2>Peça</h2>
        <span></span>
        <h2>Data</h2>
        <span></span>
        <h2>Quantidade</h2>
      </div>

      <div v-for="item in filteredList()" :key="item.id" class="bodytable" @click="openModal(item)">
        <div>
          <p>{{ item.id }}</p>
        </div>
        <span></span>
        <div>
          <p>{{ item.peca }}</p>
        </div>
        <span></span>
        <div>
          <p>{{ item.data }}</p>
        </div>
        <span></span>
        <div>
          <p>{{ item.quantidade }}</p>
        </div>
        <span></span>
      </div>

      <div v-if="filteredList().length <= 0" class="notFound">
        <h3>Nenhuma Entrada encontrada</h3>
      </div>
    </div>

    <dataEntradaModal :isVisible="isModalVisible" @close="isModalVisible = !isModalVisible">
      <div class="modalInfo">
        <p>ID: {{ selectedEntrada?.id }}</p>
        <p>Peça: <input type="text" v-model="selectedEntrada.peca" /></p>
        <p>Data: <input type="text" v-model="selectedEntrada.data" /></p>
        <p>Quantidade: <input type="text" v-model="selectedEntrada.quantidade" /></p>
      </div>
      <div class="buttonsInfo">
        <button @click="entradasStore.updateEntrada(selectedEntrada)">Atualizar</button>
        <button @click="entradasStore.deleteEntrada(selectedEntrada.id)">Excluir</button>
      </div>
    </dataEntradaModal>
  </article>
</template>

<style scoped>
article {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 0.5rem;
  height: 100%;
  background-image: url('public/fundo-pecas.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.container-title {
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  font-size: 2em;
}

.container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
  width: 93%;
  border-radius: 0.5rem;
}

.search-bar {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

.inputSearch {
  background-color: #E3E3E3;
  width: 70%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.2);
  border-radius: 0.5rem;
  padding: 0.5rem;
}

.inputSearch>img {
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 1em;
}

.inputSearch input {
  background-color: #E3E3E3;
  width: 100%;
  border: none;
  font-size: 1em;
  margin-left: 1em;
}

.btn-adicionar {
  background-color: #5db405;
  border: none;
  width: 20%;
  padding: 0.6rem;
  border-radius: 0.5rem;
  box-shadow: 0px 6px 10px 0px rgba(0, 0, 0, 0.2);
  color: white;
  transition: 0.5s ease-in-out;
}

.btn-adicionar:hover {
  background-color: #509c04;
  transition: 0.5s;
}

.headertable {
  position: sticky;
  display: grid;
  grid-template-columns: 1fr 1px 1fr 1px 1fr 1px 1fr 1px;
  width: 100%;
  height: 2rem;
  background-color: #e3e3e3;
  color: rgb(124, 124, 124);
  padding: 0.5rem;
  border-radius: 5px;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.2);
  align-items: center;
  margin-bottom: 2em;
}

.headertable h2 {
  font-size: 16px;
  text-align: center;
}

.headertable span {
  height: 100%;
  width: 1px;
}

.bodytable {
  margin: 0em 1em 1em 1em;
  display: grid;
  grid-template-columns: 1fr 1px 1fr 1px 1fr 1px 1fr 1px;
  width: 100%;
  color: black;
  padding: 0.5rem;
  border-bottom: 2px solid #ffffff;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  background-color: #ffffff;
}

.bodytable:-webkit-scrollbar {
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
  background-color: #ffffff;
}

.notFound {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  border-radius: 5px;
  padding: 1rem;
}

.buttonsInfo {
  display: flex;
  justify-content: space-evenly;
}

.buttonsInfo>button {
  margin-top: .5rem;
  width: 45%;
  padding: .5rem;
  background-color: #55A603;
  color: #ffffff;
  border: none;
  border-radius: 1rem;
  cursor: pointer;
  transition: 0.3s;
  display: flex;
  justify-content: center;
}

.buttonsInfo>button:nth-child(2) {  
  background-color: #FF0000; 
  color: #ffffff;
}

.buttonsInfo>button:hover {
  background-color: #ffffff;
  color: #55A603;
}

.buttonsInfo>button:hover:nth-child(2) {
  background-color: #ffffff;
  color: #FF0000;
}

.modalInfo p input {
  width: 100%;
  padding: .5rem;
  border-radius: 0.4rem;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.2);
  border: none;
}

.modalInfo {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  color: black;
}

.modalInfo > p {
  display: flex;
  width: 50%;
  justify-content: center;
  align-items: center;
  gap: 5px;
  margin: 5px 0px;
}
</style>
