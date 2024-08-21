<script setup>
import { computed, onMounted, ref } from 'vue';
import { useClientesStore } from '@/stores/';
import dataClienteModal from '../modalComps/dataModal/dataClienteModal.vue';
import addModalCliente from '../modalComps/addModal/addModalCliente.vue';
const clientesStore = useClientesStore();
const inputSearch = ref('')

onMounted(() => {
  clientesStore.getClientes();
});
const clientes = computed(() => clientesStore.state.clientes);

function filteredList() {
  return clientes.value.filter((itemf) =>
    itemf.nome.toLowerCase().includes(inputSearch.value.toLowerCase())
  )
}

const isModalVisible = ref(false);
const selectedCliente = ref(null);
const openModalAdd = ref(false);

const openModal = (cliente) => {
  selectedCliente.value = (cliente);
  isModalVisible.value = true;
};

function formatarIdade(data) {
  const dataNasc = Number(data.slice(0, 4));
  const dataAtual = Number(new Date().getFullYear());
  const idade = dataAtual - dataNasc;
  return idade;
}

</script>

<template>
  <article>
    <div class="container-title">
      <h1>Gerenciamento de clientes</h1>
    </div>
    <div class="search-bar">
      <div class="inputSearch">
        <input type="text" v-model="inputSearch" placeholder="Pesquisar Cliente" />
        <img src="../../../public/searchicon.svg" alt="">
      </div>
      <button class="btn-adicionar" @click="openModalAdd = true">Adicionar cliente +</button>
    </div>
    <div v-if="openModalAdd" style="width: 90%;">
      <addModalCliente @close="openModalAdd = false" />
    </div>
    <div class="container">
      <div class="headertable">
        <h2>ID</h2>
        <h2>Nome</h2>
        <h2 class="cpf">CPF</h2>
        <h2>Idade</h2>
        <h2>Telefone</h2>
        <h2>Endereço</h2>
      </div>
      <div class="tablescrool">
        <div v-for="cliente in filteredList()" :key="cliente.id" class="bodytable" @click="openModal(cliente)">
          <div>
            <p>{{ cliente.id }}</p>
          </div>
          <div>
            <p>{{ cliente.nome }}</p>
          </div>
          <div>
            <p>{{ cliente.cpf }}</p>
          </div>
          <div>
            <p>{{ formatarIdade(cliente.data) }}</p>
          </div>
          <div>
            <p>{{ cliente.telefone }}</p>
          </div>
          <div>
            <p>{{ cliente.endereco }}</p>
          </div>
        </div>
        <div v-if="filteredList().length <= 0" class="notFound">
          <h3>Nenhum Cliente encontrado</h3>
        </div>
      </div>
    </div>
    <dataClienteModal :isVisible="isModalVisible" @close="isModalVisible = !isModalVisible">
      <div class="modalInfo">
        <div class="itemInfo">
          <p>ID: {{ selectedCliente?.id }}</p>
        </div>
        <div class="itemInfo"><label for="">Nome:</label><input type="text" v-model="selectedCliente.nome"></div>
        <div class="itemInfo"><label for="">CPF:</label><input type="text" v-model="selectedCliente.cpf"></div>
        <div class="itemInfo"><label for="">Data de Nascimento:</label><input type="date"
            v-model="selectedCliente.data"></div>
        <div class="itemInfo"><label for="">Telefone:</label><input type="text" v-model="selectedCliente.telefone">
        </div>
        <div class="itemInfo"><label for="">Endereço:</label><input type="text" v-model="selectedCliente.endereco">
        </div>
        <div class="itemInfo"><label for="">Cidade:</label><input type="text" v-model="selectedCliente.cidade"></div>
        <div class="itemInfo"><label for="">CEP:</label><input type="text" v-model="selectedCliente.cep"></div>
        <div class="itemInfo"><label for="">Email:</label><input type="text" v-model="selectedCliente.email"></div>
        <div class="itemInfo">
          <button @click="clientesStore.updateCliente(selectedCliente)">Atualizar</button>
          <button @click="clientesStore.deleteCliente(selectedCliente.id)">Excluir</button>
        </div>
      </div>
    </dataClienteModal>
  </article>
</template>

<style scoped>

html {
  background-color: #000000;
}


article {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  border-radius: .5rem;
  padding: 10px;
}

.container-title {
  font-size: 2em;
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
  width: 100%;
  height: 100%;
  margin: auto;
  border: 2px #333 solid;
}

.itemInfo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
  margin: 5px 0px;
}

.itemInfo>label {
  width: 30%;
}

.itemInfo>input {
  width: 60%;
  padding: .5rem;
  border-radius: 1rem;
  border: 2px solid #333;
}

.itemInfo>button {
  margin-top: .5rem;
  width: 100%;
  padding: .5rem;
  background-color: white;
  color: #55A603;
  border: none;
  border-radius: 1rem;
  cursor: pointer;
  transition: .3s;
}

.itemInfo>button:nth-child(2) {
  color: #FF0000;
}

.itemInfo>button:hover {
  background-color: #55A603;
  color: white;
}

.itemInfo>button:hover:nth-child(2) {
  background-color: #FF0000;
  color: white;
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
  margin: 2rem;
  width: 93%;
  border-radius: 0.5rem;
}

.headertable {
  position: sticky;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 3rem;
  background-color: #E3E3E3;
  padding: 0.5rem;
  border-radius: 5px;
  color: #919191;
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

.tablescrool {
  width: 100%;
  max-height: 30rem;
  overflow-y: scroll;
}

.container>.tablescrool::-webkit-scrollbar {
  display: none;
}

.bodytable {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  color: black;
  border-radius: 3px;
  background-color: white;
  margin-top: 1em;
  height: 3em;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.2);
}

.bodytable:-webkit-scrollbar {
  display: none;
}

.bodytable div {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2em;
}

.bodytable p {
  font-size: 16px;
  text-align: center;
}

.bodytable button {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  color: white;
  border: none;
  margin: 0.5rem;
  border-radius: .5rem;
  cursor: pointer;
}

.bodytable button img {
  width: 1.5rem;
  height: 1.5rem;
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

.inputSearch input:focus {
  outline: none;
}

.btn-adicionar {
  background-color: #5DB405;
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

.notFound {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  border-radius: 5px;
  padding: 1rem;
}

.cpf {
  margin-left: 8em;
}

</style>