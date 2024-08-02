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
    <h2>Clientes</h2>
    <div class="inputSearch">
      <img src="../../../public/searchicon.svg" alt="">
      <input type="text" v-model="inputSearch" placeholder="Pesquisar Cliente" />
      <button @click="openModalAdd = true">Adicionar +</button>
    </div>
    <div v-if="openModalAdd" style="width: 90%;">
      <addModalCliente @close="openModalAdd = false"/>
    </div>
    <div class="container">
      <div class="headertable">
        <h2>ID</h2>
        <span></span>
        <h2>Nome</h2>
        <span></span>
        <h2>CPF</h2>
        <span></span>
        <h2>Idade</h2>
        <span></span>
        <h2>Telefone</h2>
        <span></span>
        <h2>Endereço</h2>
      </div>
      <div class="tablescrool">
      <div v-for="cliente in filteredList()" :key="cliente.id" class="bodytable" @click="openModal(cliente)">
        <div>
          <p>{{ cliente.id }}</p>
        </div><span></span>
        <div>
          <p>{{ cliente.nome }}</p>
        </div>
        <span></span>
        <div>
          <p>{{ cliente.cpf }}</p>
        </div><span></span>
        <div>
          <p>{{ formatarIdade(cliente.data) }}</p>
        </div><span></span>
        <div>
          <p>{{ cliente.telefone }}</p>
        </div><span></span>
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
        <div class="itemInfo"><p>ID: {{ selectedCliente?.id }}</p></div>
        <div class="itemInfo"><label for="">Nome:</label><input type="text" v-model="selectedCliente.nome"></div>
        <div class="itemInfo"><label for="">CPF:</label><input type="text" v-model="selectedCliente.cpf"></div>
        <div class="itemInfo"><label for="">Data de Nascimento:</label><input type="date" v-model="selectedCliente.data"></div>
        <div class="itemInfo"><label for="">Telefone:</label><input type="text" v-model="selectedCliente.telefone"></div>
        <div class="itemInfo"><label for="">Endereço:</label><input type="text" v-model="selectedCliente.endereco"></div>
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
  width: 90%;
  margin: auto;
  border: 2px #333 solid;
}
.itemInfo{
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
  margin: 5px 0px;
}
.itemInfo>label{
  width: 30%;
}
.itemInfo>input{
  width: 60%;
  padding: .5rem;
  border-radius: 1rem;
  border: 2px solid #333;
}
.itemInfo > button{
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
.itemInfo > button:nth-child(2){
  color: #FF0000;
}
.itemInfo > button:hover{
  background-color: #55A603;
  color: white;
}
.itemInfo > button:hover:nth-child(2){
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