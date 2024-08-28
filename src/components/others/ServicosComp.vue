<script setup>
import { computed, onMounted, ref } from 'vue';
import { useServicosStore } from '@/stores/';
import dataClienteModal from '../modalComps/dataModal/dataClienteModal.vue';
import addServicoModal from '../modalComps/addModal/addServicoModal.vue';
const servicosStore = useServicosStore();
const inputSearch = ref('')

onMounted(() => {
  servicosStore.getServicos();
});
const servicos = computed(() => servicosStore.state.servicos);

function filteredList() {
  return servicos.value.filter((itemf) =>
    itemf.nome.toLowerCase().includes(inputSearch.value.toLowerCase())
  )
}
const isModalVisible = ref(false);
const selectedServico = ref(null);
const openModalAdd = ref(false);

const openModal = (data) => {
  selectedServico.value = (data);
  isModalVisible.value = true;
};

const formatarServico = (servico) => {
  if (servico.tempo == 1) {
    return `1 - Rápido`
  }
  else if (servico.tempo == 2) {
    return `2 - Intermediario`
  }

  else if (servico.tempo == 3) {
    return `3 - Demorado`
  }
};
</script>

<template>
  <article>
    <div class="container-title">
      <h1>Serviços</h1>
    </div>
    <div class="search-bar">
      <div class="inputSearch">
        <input type="text" v-model="inputSearch" placeholder="Pesquisar serviço" />
        <img src="../../../public/searchicon.svg" alt="">
      </div>
      <button class="btn-adicionar" @click="openModalAdd = true">Adicionar serviço</button>
    </div>
    <div v-if="openModalAdd" style="width: 90%;">
      <addServicoModal />
    </div>
    <div class="container">
      <div class="headertable">
        <h2>ID</h2>
        <span></span>
        <h2>Nome</h2>
        <span></span>
        <h2>Preço</h2>
        <span></span>
        <h2>Tempo</h2>
        <span></span>
      </div>
      <div v-for="item in filteredList()" :key="item.id" class="bodytable" @click="openModal(item)">
        <div>
          <p>{{ item.id }}</p>
        </div><span></span>
        <div>
          <p>{{ item.nome }}</p>
        </div>
        <span></span>
        <div>
          <p>R$ {{ item.preco }}</p>
        </div><span></span>
        <div>
          <p>{{ formatarServico(item) }}</p>
        </div><span></span>
      </div>
      <div v-if="filteredList().length <= 0" class="notFound">
        <h3>Nenhum Cliente encontrado</h3>
      </div>
    </div>

    <dataClienteModal :isVisible="isModalVisible" @close="isModalVisible = !isModalVisible">
      <div class="modalInfo">
        <div class="itemInfo">
          <p>ID: {{ selectedServico?.id }}</p>
        </div>
        <div class="itemInfo">
          <label>Nome:</label>
          <input type="text" v-model="selectedServico.nome">
        </div>
        <div class="itemInfo">
          <label>Preço:</label>
          <input type="text" v-model="selectedServico.preco">
        </div>
        <div class="itemInfo">
          <label>Tempo:</label>
          <input type="text" v-model="selectedServico.tempo">
        </div>
        <div class="itemInfo-btn">
          <button @click="servicosStore.updateServico(selectedServico)">Atualizar</button>
          <button @click="servicosStore.deleteServico(selectedServico.id)">Excluir</button>
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
  border-radius: .5rem;
  height: 100%;
  background-image: url('public/fundo-servico.png');
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

.modalInfo {
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #E9F5F9;
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

.container>.tablescrool::-webkit-scrollbar {
  display: none;
}

.headertable {
  position: sticky;
  display: grid;
  grid-template-columns: 1fr 1px 1fr 1px 1fr 1px 1fr 1px;
  width: 100%;
  height: 2rem;
  background-color: #E3E3E3;
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

.itemInfo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  justify-content: center;
  margin: 1em;
  color: black;
}

.itemInfo>label {
  width: 20%;
}

.itemInfo>input,
select,
div input {
  width: 60%;
  padding: .5rem;
  border-radius: 0.4rem;
  border: none;
}

.itemInfo>input {
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

.notFound {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  border-radius: 5px;
  padding: 1rem;
}
</style>