<script setup>
import { computed, onMounted, ref } from 'vue';
import { useEntradasStore } from '@/stores/';
import dataClienteModal from '../modalComps/dataModal/dataClienteModal.vue'; // Modal para detalhes da entrada
import addEntradaModal from '../modalComps/addModal/addEntradaModal.vue'; // Modal para adicionar nova entrada

const entradasStore = useEntradasStore();
const inputSearch = ref('');

onMounted(() => {
  entradasStore.getEntradas();
});

const entradas = computed(() => entradasStore.state.entradas);

function filteredList() {
  return entradas.value.filter((itemf) =>
    itemf.peca.toLowerCase().includes(inputSearch.value.toLowerCase())
  );
}

const isModalVisible = ref(false);
const selectedEntrada = ref(null);
const openModalAdd = ref(false);

const openModal = (data) => {
  selectedEntrada.value = data;
  isModalVisible.value = true;
};

</script>

<template>
  <article>
    <h2>Entradas</h2>
    <div class="inputSearch">
      <input type="text" v-model="inputSearch" placeholder="Pesquisar entrada" />
      <button @click="openModalAdd = !openModalAdd">Adicionar +</button>
    </div>
    
    <div v-if="openModalAdd" style="width: 90%;">
      <addEntradaModal />
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
        <div><p>{{ item.id }}</p></div><span></span>
        <div><p>{{ item.peca }}</p></div><span></span>
        <div><p>{{ item.data }}</p></div><span></span>
        <div><p>{{ item.quantidade }}</p></div><span></span>
      </div>

      <div v-if="filteredList().length <= 0" class="notFound">
        <h3>Nenhuma Entrada encontrada</h3>
      </div>
    </div>

    <dataClienteModal :isVisible="isModalVisible" @close="isModalVisible = !isModalVisible">
      <h3>Detalhes da Entrada</h3>
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
    </dataClienteModal>
  </article>
</template>

<style scoped>
article {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 90%;
  border: 2px #333 solid;
  border-radius: .5rem;
  padding: 10px;
}

.container {
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
  display: grid;
  grid-template-columns: 1fr 1px 1fr 1px 1fr 1px 1fr 1px;
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
  grid-template-columns: 1fr 1px 1fr 1px 1fr 1px 1fr 1px;
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

.inputSearch {
  padding: 10px;
  width: 50%;
  display: flex;
  justify-content: space-between;
}

.inputSearch input {
  width: 95%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #333;
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
</style>
