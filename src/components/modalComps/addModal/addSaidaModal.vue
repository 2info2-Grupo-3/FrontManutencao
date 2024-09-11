<script setup>
import { reactive, onMounted } from 'vue'
import { usePecasStore, useSaidasStore } from '@/stores/'
const pecasStore = usePecasStore()
const saidasStore = useSaidasStore()
onMounted(() => {
  pecasStore.getPecas()
})
const pecas = pecasStore.state.pecas
console.log(pecas)
const saida = reactive({
  data: '',
  quantidade: '',
  peca: Number()
})
</script>

<template>
  <div class="background">
    <div class="modalAdd">
      <div class="modalHeader">
        <div class="container-btn-close">
          <button class="btn-close" @click="$emit('close')">x</button>
        </div>
        <img class="icon-peca" src="../../../../public/icon-peca.png" alt="" />
        <h2>Adicionar Saida</h2>
      </div>
      <form @submit.prevent>
        <div><input type="date" placeholder="Data" v-model="saida.data" /></div>
        <div><input type="number" placeholder="Quantidade" v-model="saida.quantidade" /></div>
        <div>
          <select name="" id="" v-model="saida.peca">
            <option v-for="peca in pecas" :key="peca.id" :value="peca.id">{{ peca.nome }}</option>
          </select>
        </div>
      </form>
      <div class="container-btn-add">
        <button class="btn-add" @click="saidasStore.createSaida(saida)">Adicionar</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.background {
  width: 100%;
  height: 100%;
  z-index: 9;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

.modalAdd {
  padding: 1rem;
  color: rgb(0, 0, 0);
  align-items: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -45%);
  width: 40%;
  position: absolute;
  z-index: 10;
  border-radius: 1rem;
  background-image: url('public/fundo-modal.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.modalHeader {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  margin-bottom: 1rem;
  border: none;
}

.modalHeader h2 {
  padding: 0.5em;
}

.btn-close {
  background-color: transparent;
  width: 5%;
  font-size: 20px;
  color: rgb(0, 0, 0);
  margin: 0;
  border-radius: 1rem;
  border: none;
  cursor: pointer;
  transition: 0.3s ease-in-out;
}

form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

form > div {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60%;
  margin: 0.25rem auto;
}

input,
select {
  width: 100%;
  padding: 0.5rem;
  border-radius: 0.5rem;
  box-shadow: 0px 6px 10px 0px rgba(0, 0, 0, 0.2);
  border: none;
  font-size: 1em;
}
.icon-peca {
    width: 30%;
    height: 30%;
}
.btn-add {
  padding: 0.5rem;
  border-radius: 1rem;
  background-color: #55a603;
  color: #ffffff;
  cursor: pointer;
  transition: 0.3s ease-in-out;
  width: 30%;
  margin: 1rem auto;
  border: none;
}

.btn-add:hover {
  background-color: white;
  color: #55a603;
}

.container-btn-add {
  display: flex;
  justify-content: center;
}

form > button:hover {
  background-color: #55a603;
  color: #fff;
}

.container-btn-close {
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
}
.icon-peca {
    width: 30%;
    height: 30%;
}
</style>
