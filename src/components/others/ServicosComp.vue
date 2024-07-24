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
    <h2>Serviços</h2>
    <div class="inputSearch">
      <input type="text" v-model="inputSearch" placeholder="Pesquisar Serviço" />
      <button @click="openModalAdd = !openModalAdd">Adicionar +</button>
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
      <h3>Detalhes do Servico</h3>
      <div class="modalInfo">
        <p>ID: {{ selectedServico?.id }}</p>
        <p>Nome:<input type="text" v-model="selectedServico.nome"></p>
        <p>Nome:<input type="text" v-model="selectedServico.preco"></p>
        <p>Nome:<input type="text" v-model="selectedServico.tempo"></p>
      </div>
      <div class="buttonsInfo">
        <button @click="servicosStore.updateServico(selectedServico)">Atualizar</button>
        <button @click="servicosStore.deleteServico(selectedServico.id)">Excluir</button>
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
  border: 2px #333 solid;
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
  height: 50px;
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
</style>