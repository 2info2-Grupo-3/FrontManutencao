<script setup>
import { computed, onMounted, ref } from 'vue';
import { usePecasStore } from '@/stores/';
import addPecaModal from '../modalComps/addModal/addPecaModal.vue';
import dataPecaModal from '../modalComps/dataModal/dataPecaModal.vue';
const pecasStore = usePecasStore();
const inputSearch = ref('')


onMounted(() => {
  pecasStore.getPecas();
});
const pecas = computed(() => pecasStore.state.pecas);

function filteredList() {
  return pecas.value.filter((itemf) =>
    itemf.nome.toLowerCase().includes(inputSearch.value.toLowerCase())
  )
}
const isModalVisible = ref(false);
const selectedPeca = ref(null);
const openModalAdd = ref(false);

const openModal = (peca) => {
  selectedPeca.value = (peca);
  isModalVisible.value = true;
};
</script>

<template>
  <article>
    <h2>Peças</h2>
  <div class="inputSearch">
    <input type="text" v-model="inputSearch" placeholder="Pesquisar peça" />
    <button @click="openModalAdd = true">Adicionar +</button>
</div>
<div v-if="openModalAdd" style="width: 90%;">
<addPecaModal @close="openModalAdd = false"/></div>
  <div class="container">
    <div class="headertable">
      <h2>ID</h2>
      <span></span>
      <h2>Nome</h2>
      <span></span>
      <h2>Preço</h2>
      <span></span>
      <h2>Quantidade</h2>
    </div>
    <div class="tableScroll">
      <div v-for="peca in filteredList()" :key="peca.id" class="bodytable" @click="openModal(peca)">
      <div><p>{{ peca.id }}</p></div><span></span>
      <div><p>{{ peca.nome }}</p></div><span></span>
      <div><p>R${{ peca.preco }}</p></div><span></span>
      <div><p>{{ peca.quantidade }}</p></div><span></span>
      </div>
      <div v-if="filteredList().length <= 0" class="notFound">
      <h3>Nenhuma Peça encontrada</h3>
    </div>
  </div>
  </div>
  <dataPecaModal :isVisible="isModalVisible" @close="isModalVisible = !isModalVisible">
    <div class="modalInfo">
      <div class="itemInfo">
        <p>ID: {{ selectedPeca.id }}</p>
      </div>
      <div class="itemInfo">
        <label for="">Nome:</label>
        <input type="text" v-model="selectedPeca.nome">
      </div>
      <div class="itemInfo">
        <label for="">Preço:</label>
        <input type="text" v-model="selectedPeca.preco">
      </div>
      <div class="itemInfo">
        <label for="">Quantidade:</label>
        <input type="text" v-model="selectedPeca.quantidade">
    </div>
    <button @click="pecasStore.updatePeca(selectedPeca)">Atualizar</button>
    <button @click="pecasStore.deletePeca(selectedPeca.id)">Excluir</button>
  </div>
  </dataPecaModal>
</article>
</template>

<style scoped>
article{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 90%;
    border-radius: .5rem;
    padding: 10px;
}

.container{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 2rem;
    width: 90%;
    border: 2px #333 solid;
    border-radius: .5rem;
}
.headertable{
    display: grid;
    grid-template-columns: 1fr 1px 1fr 1px 1fr 1px 1fr 1px;
    width: 100%;
    height: 2rem; 
    background-color: #333333;
    color: white;
    padding: .5rem;
}
.headertable h2{
    font-size: 16px;
    text-align: center;
}
.headertable span{
    height: 100%;
    width: 1px;
    background-color: white;
}
.bodytable{
    display: grid;
    grid-template-columns: 1fr 1px 1fr 1px 1fr 1px 1fr 1px;
    width: 100%;
    color: black;
    padding: .5rem;
    border-bottom: 2px solid #333;
}
.bodytable div{
    display: flex;
    justify-content: center;
    align-items: center;
}
.tableScroll{
    width: 100%;
    overflow-y: scroll;
    max-height: 20rem;
}
.tableScroll::-webkit-scrollbar{
  display: none
}

.bodytable p{
    font-size: 14px;
    text-align: center;
}
.bodytable span{
    height: 100%;
    width: 1px;
    background-color: #333333;
}
.bodytable button{
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
.bodytable button img{
    width: 1.5rem;
    height: 1.5rem;
}

.inputSearch{
    padding: 10px;
    width: 50%;
}

.inputSearch input{
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #333;
}

.notFound{
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    border-radius: 5px;
    padding: 1rem;
}
</style>