<script setup>
import { onMounted, ref, computed } from 'vue'
import { useOrcamentosStore } from '@/stores/others/orcamentos.js'
import { useClientesStore } from '@/stores/others/clientes.js';
import { usePecasStore } from '@/stores/estoque/pecas';
import { useServicosStore } from '@/stores/others/servicos.js';
import dataOrcamentosModal from '../modalComps/dataModal/dataOrcamentosModal.vue'
import addModalOrcamentos from '@/components/modalComps/addModal/addModalOrcamentos.vue';
const orcamentosStore = useOrcamentosStore()
const pecasStore = usePecasStore()
const servicosStore = useServicosStore()
const clientesStore = useClientesStore()
const inputSearch = ref('')

const addModalVisible = ref(false)
onMounted(async() => {
  await orcamentosStore.getOrcamentos()
  await pecasStore.getPecas()
  await servicosStore.getServicos()
  await clientesStore.getClientes()
})
const orcamentos = computed(() => orcamentosStore.state.orcamentos)
const servicos = computed(() => servicosStore.state.servicos);
const pecas = computed(() => pecasStore.state.pecas);


const isModalVisible = ref(false);
const selectedOrcamento = ref(null);

const openModal = (orcamento) => {
  selectedOrcamento.value = {
    id: orcamento.id,
    cliente: orcamento.cliente,
    data: orcamento.data,
    valor_total: parseFloat(orcamento.valor_total).toFixed(2),
    pecas_orcamento: orcamento.pecas_orcamento.map(item => ({
      peca: item.peca.id,
      quantidade: item.quantidade
    })),
    servicos_orcamento: orcamento.servicos_orcamento.map(servico => ({
      servico: servico.servico.id,
      valor: parseFloat(servico.valor).toFixed(2)
    }))
  };
  
  // You can also handle any other actions you need to take when the modal is opened here
  console.log(selectedOrcamento);
  isModalVisible.value = true; // Assuming this controls the modal visibility
};


// function filteredList() {
//   return orcamentos.value.filter((itemf) =>
//     itemf.cliente.toLowerCase().includes(inputSearch.value.toLowerCase())
//   )
// }
function getPosition(item, array) {
  return array.indexOf(item)
}
const pecaAdd = ref(null);
const quantidadePecaAdd = ref(1);
const servicoAdd = ref(null);
const quantidadeServicoAdd = ref(1);
const addPeca = () =>{
  const pecaId = pecaAdd.value.id
  const quantidade = quantidadePecaAdd.value
  const peca = {
    peca: pecaId,
    quantidade: quantidade
  }
  selectedOrcamento.value.pecas_orcamento.push(peca)
  console.log(selectedOrcamento.value)
  pecaAdd.value = null
  quantidadePecaAdd.value = 1
}
const addServico = () =>{
  console.log(servicoAdd);
  const servicoId = servicoAdd.value.id
  const servico = {
    servico: servicoId,
    valor: servicoAdd.value.valor,
  }
  console.log(servico.value)
  selectedOrcamento.value.servicos_orcamento.push(servico)
  console.log(selectedOrcamento.value)
  servicoAdd.value = null
  quantidadeServicoAdd.value = 1
}
</script>
<template>
  <article>
    <h2>Orcamentos</h2>
    <div class="inputSearch">
      <img src="../../../public/searchicon.svg" alt="" />
      <input type="text" v-model="inputSearch" placeholder="Pesquisar Cliente" />
      <button @click="addModalVisible = true">Adicionar +</button>
    </div>
    <div v-if="addModalVisible">
        <addModalOrcamentos @close="addModalVisible = false"/>
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
            <p>{{ orcamento.valor_total }}</p>
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
    
      <dataOrcamentosModal :isVisible="isModalVisible" @close="isModalVisible = !isModalVisible">
        <div class="modalInfo">
        <div class="itemInfo">
          <p>ID: {{ selectedOrcamento?.id }}</p>
        </div>
        <div class="itemInfo">
          <label for="">Cliente:</label>
          <p>{{ selectedOrcamento.cliente }}</p>
        </div>
        <input type="text" v-model="selectedOrcamento.cliente_id" disabled>

        <div class="itemInfo">
          <label for="">CPF:</label>
          <input type="date" v-model="selectedOrcamento.data">
        </div>
        <div class="itemInfo">
          <label for="">Peças:</label>
          <div class="pecaInfo" v-for="peca in selectedOrcamento.pecas_orcamento" :key="peca.peca.id">
          <p>{{ peca.peca.nome }}</p>
          <input type="number" v-model="peca.quantidade">
          <button @click="selectedOrcamento.pecas_orcamento.splice(getPosition(peca, selectedOrcamento.pecas_orcamento), 1)">del</button>
          </div>
      </div>
        <div class="itemInfo">
          <label for="">Adicionar peça:</label>
          <select name="" id="" v-model="pecaAdd">
            <option :value="peca" v-for="peca in pecas" :key="peca.id">{{ peca.nome }}</option>
          </select>
          <button @click="addPeca">add</button>
        </div>
        <div class="itemInfo">
          <label for="">Serviços:</label>
          <div class="servicoInfo" v-for="servico in selectedOrcamento.servicos_orcamento" :key="servico.servico.id">
            <p>{{ servico.servico.nome }}</p>
            <button @click="selectedOrcamento.servicos_orcamento.splice(getPosition(servico, selectedOrcamento.servicos_orcamento), 1)">del</button>
          </div>
        </div>
        <div class="itemInfo">
        <label for="">Adicionar serviço:</label>
        <select name="" id="" v-model="servicoAdd">
          <option :value="servico" v-for="servico in servicos" :key="servico.id">{{ servico.nome }}</option>
        </select>  
        <button @click="addServico">add</button>
        </div>
        <div class="itemInfo">
          <label for="">Valor total</label>
          <input type="number" v-model="selectedOrcamento.valor_total">
        </div>
        <div class="itemInfo">
        <button @click="orcamentosStore.updateOrcamento(selectedOrcamento.id, selectedOrcamento)">Atualizar</button>
        <button @click="orcamentosStore.deleteOrcamento(selectedOrcamento.id)">Excluir</button>
      </div>
      </div>
      </dataOrcamentosModal>
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
  max-height: 45vh;
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
