<script setup>
import { onMounted, ref, computed } from 'vue';
import { useOrcamentosStore, useClientesStore, usePecasStore, useServicosStore } from '@/stores/';
import dataOrcamentosModal from '../modalComps/dataModal/dataOrcamentosModal.vue';
import addModalOrcamentos from '@/components/modalComps/addModal/addModalOrcamentos.vue';
import FaturamentoComp from './FaturamentoComp.vue';
const orcamentosStore = useOrcamentosStore();
const pecasStore = usePecasStore();
const servicosStore = useServicosStore();
const clientesStore = useClientesStore();
const inputSearch = ref('');
const addModalVisible = ref(false);
onMounted(async () => {
  await orcamentosStore.getOrcamentos()
  await pecasStore.getPecas()
  await servicosStore.getServicos()
  await clientesStore.getClientes()
});
const orcamentos = computed(() => orcamentosStore.state.orcamentos);
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
      nome: pecas.value.find(p => p.id === item.peca.id)?.nome || '',
      quantidade: item.quantidade
    })),
    servicos_orcamento: orcamento.servicos_orcamento.map(servico => ({
      servico: servico.servico.id,
      nome: servicos.value.find(s => s.id === servico.servico.id)?.nome || '',
      valor: parseFloat(servico.valor).toFixed(2)
    }))
  };
  isModalVisible.value = true;
};
function getPosition(item, array) {
  return array.indexOf(item)
};
const pecaAdd = ref(null);
const quantidadePecaAdd = ref(1);
const servicoAdd = ref(null);
const quantidadeServicoAdd = ref(1);
const addPeca = () => {
  const pecaId = pecaAdd.value.id
  const quantidade = quantidadePecaAdd.value
  const peca = {
    peca: pecaId,
    quantidade: quantidade
  }
  selectedOrcamento.value.pecas_orcamento.push(peca)
  pecaAdd.value = null
  quantidadePecaAdd.value = 1
};
const addServico = () => {
  const servicoId = servicoAdd.value.id
  const servicoValor = servicoAdd.value.preco
  const servicoF = {
    servico: servicoId,
    valor: servicoValor,
  }
  selectedOrcamento.value.servicos_orcamento.push(servicoF)
  servicoAdd.value = null
  quantidadeServicoAdd.value = 1
};
</script>
<template>
  <article>
    <div class="container-title">
      <h1>Orçamentos</h1>
    </div>
    <div class="search-bar">
      <div class="inputSearch">
        <input type="text" v-model="inputSearch" placeholder="Pesquisar orçamento" />
        <img src="../../../public/searchicon.svg" alt="">
      </div>
      <button class="btn-adicionar" @click="openModalAdd = true">Adicionar orçamento +</button>
    </div>
    <div v-if="addModalVisible">
      <addModalOrcamentos @close="addModalVisible = false" />
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
            <p>{{ orcamento.nome_cliente }}</p>
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
          <div class="itemInfo">
            <label for="">CPF: </label>
            <!-- QUE ISSO ?? -->
            <input type="date" v-model="selectedOrcamento.data">
          </div>
          <div class="itemInfo">
            <label for="">Peças:</label>
            <div class="pecaInfo" v-for="peca in selectedOrcamento.pecas_orcamento" :key="peca.id">
              <p>{{ peca.nome }}</p>
              <input type="number" v-model="peca.quantidade">
              <button
                @click="selectedOrcamento.pecas_orcamento.splice(getPosition(peca, selectedOrcamento.pecas_orcamento), 1)">del
              </button>
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
            <div class="servicoInfo" v-for="servico in selectedOrcamento.servicos_orcamento" :key="servico.id">
              <p>{{ servico.nome }}</p>
              <button
                @click="selectedOrcamento.servicos_orcamento.splice(getPosition(servico, selectedOrcamento.servicos_orcamento), 1)">del</button>
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
          <div class="itemInfo-btn">
            <button @click="orcamentosStore.updateOrcamento(selectedOrcamento.id, selectedOrcamento)">Atualizar</button>
            <button @click="orcamentosStore.deleteOrcamento(selectedOrcamento.id)">Excluir</button>
          </div>
        </div>
      </dataOrcamentosModal>
    </div>
  </article>
  <FaturamentoComp />
</template>
<style scoped>

article {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: .5rem;
  height: 100%;
  background-image: url('public/fundo-orcamentos.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.container-title {
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  font-size: 2em;
}

.search-bar {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
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
  background-color: #E9F5F9;
}

.itemInfo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  justify-content: center;
  margin: 1em;
  color: black;
}

.itemInfo>label {
  width: 30%;
}

.itemInfo>input , select , div input {
  width: 60%;
  padding: .5rem;
  border-radius: 0.4rem;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.2);
  border: none;
}

.itemInfo-btn {
  display: flex;
  justify-content: space-evenly;
}

.itemInfo-btn>button {
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

.itemInfo-btn>button:nth-child(2) {  
  background-color: #FF0000; 
  color: #ffffff;
}

.itemInfo-btn>button:hover {
  background-color: #ffffff;
  color: #55A603;
}

.itemInfo-btn>button:hover:nth-child(2) {
  background-color: #ffffff;
  color: #FF0000;
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
  width: 93%;
  border-radius: 0.5rem;
}

.headertable {
  position: sticky;
  display: grid;
  grid-template-columns: 1fr 1px 1fr 1px 1fr 1px 1fr 1px 1fr 1px;
  width: 100%;
  height: 2rem;
  background-color: #E3E3E3;
  color: rgb(124, 124, 124);
  padding: 0.5rem;
  border-radius: 5px;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.2);
  align-items: center;
}

.headertable h2 {
  font-size: 16px;
  text-align: center;
}

.headertable span {
  height: 100%;
  width: 1px;
}

.tableScroll {
  margin-top: 2em;
  width: 105%;
  max-height: 20rem;
  overflow-y: scroll;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.container>.tableScroll::-webkit-scrollbar {
  display: none;
}

.bodytable {
  margin: 0em 1em 1em 1em;
  display: grid;
  grid-template-columns: 1fr 1px 1fr 1px 1fr 1px 1fr 1px 1fr 1px;
  width: 95%;
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


.bodytable div button {
  background-color: #509c04;
  color: white;
  border: none;
  border-radius: 0.5em;
  padding: .5rem;
  cursor: pointer;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.2);
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

.notFound {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  border-radius: 5px;
  padding: 1rem;
}
</style>