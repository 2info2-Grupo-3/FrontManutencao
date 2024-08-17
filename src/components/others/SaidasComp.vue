<script setup>
import { computed, onMounted, ref } from 'vue'
import { useSaidasStore } from '@/stores/'
import dataClienteModal from '../modalComps/dataModal/dataClienteModal.vue' // Modal para detalhes da saída
import addSaidaModal from '../modalComps/addModal/addSaidaModal.vue' // Modal para adicionar nova saída

const saidasStore = useSaidasStore()
const inputSearch = ref('')

onMounted(() => {
  saidasStore.getSaidas()
})

const saidas = computed(() => saidasStore.state.saidas)

function filteredList() {
  return saidas.value.filter((itemf) =>
    itemf.peca.toLowerCase().includes(inputSearch.value.toLowerCase())
  )
}

const isModalVisible = ref(false)
const selectedSaida = ref(null)
const openModalAdd = ref(false)

const openModal = (data) => {
  selectedSaida.value = data
  isModalVisible.value = true
}

const toggleAddModal = () => {
  openModalAdd.value = !openModalAdd.value
}
</script>

<template>
  <article>
    <h2>Saídas</h2>
    <div class="inputSearch">
      <input type="text" v-model="inputSearch" placeholder="Pesquisar saída" />
      <button @click="toggleAddModal">Adicionar +</button>
    </div>

    <addSaidaModal v-if="openModalAdd" @close="toggleAddModal" />

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
        <h3>Nenhuma Saída encontrada</h3>
      </div>
    </div>

    <dataClienteModal :isVisible="isModalVisible" @close="isModalVisible = !isModalVisible">
      <h3>Detalhes da Saida</h3>
      <div class="modalInfo">
        <p>ID: {{ selectedSaida.id }}</p>
        <p>Peça: <input type="text" v-model="selectedSaida.peca" /></p>
        <p>Data: <input type="text" v-model="selectedSaida.data" /></p>
        <p>Quantidade: <input type="text" v-model="selectedSaida.quantidade" /></p>
      </div>
      <div class="buttonsInfo">
        <button @click="saidasStore.updateSaida(selectedSaida)">Atualizar</button>
        <button @click="saidasStore.deleteSaida(selectedSaida.id)">Excluir</button>
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
  border-radius: 0.5rem;
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
  border-radius: 0.5rem;
}

.headertable {
  display: grid;
  grid-template-columns: 1fr 1px 1fr 1px 1fr 1px 1fr 1px;
  width: 100%;
  height: 2rem;
  background-color: #333333;
  color: white;
  padding: 0.5rem;
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
  padding: 0.5rem;
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
}

.inputSearch input {
  width: 100%;
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
