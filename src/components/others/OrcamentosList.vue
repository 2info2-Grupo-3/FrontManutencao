<script setup>
import { onMounted, ref, computed } from 'vue'
import { useOrcamentosStore } from '@/stores/others/orcamentos.js'
// import { useClientesStore } from '@/stores/others/clientes.js';
// import { usePecasStore } from '@/stores/estoque/pecas';
// import { useServicosStore } from '@/stores/others/servicos.js';
// import dataOrcamentosModal from '../modalComps/dataModal/dataOrcamentosModal.vue'
const orcamentosStore = useOrcamentosStore()
const inputSearch = ref('')

onMounted(() => {
  orcamentosStore.getOrcamentos()
})
const orcamentos = computed(() => orcamentosStore.state.orcamentos)

const isModalVisible = ref(false);
const selectedOrcamento = ref(null);
// const openModalAdd = ref(false);

const openModal = (orcamento) => {
  selectedOrcamento.value = (orcamento);
  isModalVisible.value = true;
};

// function filteredList() {
//   return orcamentos.value.filter((itemf) =>
//     itemf.cliente.toLowerCase().includes(inputSearch.value.toLowerCase())
//   )
// }
</script>
<template>
  <article>
    <h2>Orcamentos</h2>
    <div class="inputSearch">
      <img src="../../../public/searchicon.svg" alt="" />
      <input type="text" v-model="inputSearch" placeholder="Pesquisar Cliente" />
    </div>
    <div class="container">
      <div class="headertable">
        <h2>ID</h2>
        <span></span>
        <h2>Cliente</h2>
        <span></span>
        <h2>Valor</h2>
        <span></span>
        <h2>Data</h2>
        <span></span>
        <h2>Detalhes</h2>
      </div>
      <div class="tableScroll">
        <div v-for="orcamento in orcamentos" :key="orcamento.id" class="bodytable">
          <div>
            <p>{{ orcamento.id }}</p>
          </div>
          <span></span>
          <div>
            <p>{{ orcamento.cliente }}</p>
          </div>
          <span></span>
          <div>
            <p>{{ orcamento.valor_total.replace(".", ",") }}</p>
          </div>
          <span></span>
          <div>
            <p>{{ orcamento.data }}</p>
          </div>
          <span></span>
          <div>
            <button @click="openModal(orcamento)">Detalhes</button>
          </div>
        </div>
      </div>
      <!-- <dataOrcamentosModal :isVisible="isModalVisible" @close="isModalVisible = !isModalVisible">
        <div class="modalInfo">
        <div class="itemInfo"><p>ID: {{ selectedOrcamento?.id }}</p></div>
        <div class="itemInfo"><label for="">Nome:</label><input type="text" v-model="selectedOrcamento.cliente"></div>
        <div class="itemInfo"><label for="">CPF:</label><input type="text" v-model="selectedOrcamento.cpf"></div>
        <div class="itemInfo"><label for="">Data de Nascimento:</label><input type="date" v-model="selectedOrcamento.data"></div>
        <div class="itemInfo"><label for="">Telefone:</label><input type="text" v-model="selectedOrcamento.telefone"></div>
        <div class="itemInfo"><label for="">Endereço:</label><input type="text" v-model="selectedOrcamento.endereco"></div>
        <div class="itemInfo"><label for="">Cidade:</label><input type="text" v-model="selectedOrcamento.cidade"></div>
        <div class="itemInfo"><label for="">CEP:</label><input type="text" v-model="selectedOrcamento.cep"></div>
        <div class="itemInfo"><label for="">Email:</label><input type="text" v-model="selectedOrcamento.email"></div>
        <div class="itemInfo">
        <button @click="clientesStore.updateCliente(selectedOrcamento)">Atualizar</button>
        <button @click="clientesStore.deleteCliente(selectedOrcamento.id)">Excluir</button>
      </div>
      </div>
      </dataOrcamentosModal> -->
    </div>
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
  grid-template-columns: 1fr 1px 1fr 1px 1fr 1px 1fr 1px 1fr 1px;
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
.tableScroll{
  width: 100%;
  max-height: 30rem;
  overflow-y: scroll;
}
.container > .tableScroll::-webkit-scrollbar{
  display: none;
}
.bodytable {
  display: grid;
  grid-template-columns: 1fr 1px 1fr 1px 1fr 1px 1fr 1px 1fr 1px;
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
.bodytable div button{
  background-color: #333;
  color: white;
  border: none;
  border-radius: 1rem;
  padding: .5rem;
  cursor: pointer;
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
}</style>
