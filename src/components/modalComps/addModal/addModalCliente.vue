<script setup>
import { reactive } from 'vue'
import { useClientesStore } from '@/stores/'
const clientesStore = useClientesStore()

const cliente = reactive({
  nome: '',
  cpf: '',
  data: '',
  telefone: '',
  endereco: '',
  email: '',
  cidade: '',
  cep: ''
})
</script>

<template>
  <div class="background">
  <div class="modalAdd">
    <div class="modalHeader">
    <h2>Adicionar Cliente</h2>
    <button @click="$emit('close')">X</button></div>
    <form @submit.prevent>
      <div>
        <label for="">Nome:</label><input type="text" placeholder="Nome" v-model="cliente.nome" />
      </div>
      <div>
        <label for="">CPF:</label
        ><input type="text" placeholder="CPF" maxlength="11" v-model="cliente.cpf" />
      </div>
      <div>
        <label for="">Data de Nascimento:</label
        ><input type="date" placeholder="Data de Nascimento" v-model="cliente.data" />
      </div>
      <div>
        <label for="">Telefone:</label
        ><input type="text" placeholder="Telefone" v-model="cliente.telefone" />
      </div>
      <div>
        <label for="">Endereço:</label
        ><input type="text" placeholder="Endereço" v-model="cliente.endereco" />
      </div>
      <div>
        <label for="">Email:</label
        ><input type="email" placeholder="Email" v-model="cliente.email" />
      </div>
      <div>
        <label for="">Cidade:</label
        ><input type="text" placeholder="Cidade" v-model="cliente.cidade" />
      </div>
      <div>
        <label for="">CEP:</label><input type="text" placeholder="CEP" v-model="cliente.cep" />
      </div>
    <button @click="clientesStore.createCliente(cliente)">Adicionar</button>
    </form>
  </div>
</div>
</template>

<style scoped>
.background{
  width: 100%;
  height: 100%;
  z-index: 9;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  
}
.modalAdd {
  background-color: #333333;
  padding: 1rem;
  color: white;
  align-items: center;
  top: 50%;
  left: 60%;
  transform: translate(-60%, -45%);
  width: 40%;
  position: absolute;
  z-index: 10;
  border-radius: 1rem;
}
.modalHeader{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    margin-bottom: 1rem;
}
.modalHeader> button{
    background-color: transparent;
    width: 5%;
    font-size: 20px;
    color: white;
    margin: 0;
    border-radius: 1rem;
    border: 2px solid #333;
    cursor: pointer;
    transition: .3s ease-in-out;
}
form {
  display: flex;
  flex-direction: column;
  gap: .5rem;
}

form > div {
  display: grid;
  grid-template-columns: 1fr 2fr;
  align-items: center;
  width: 90%;
  margin: .25rem auto;
}

input {
  width: 100%;
    padding: .5rem;
    border-radius: 1rem;
    border: 2px solid #333;
}
button{
    padding: .5rem;
    border-radius: 1rem;
    border: 2px solid #333;
    background-color: #fff;
    color: #55A603;
    cursor: pointer;
    transition: .3s ease-in-out;
    width: 30%;
    margin: 1rem auto;
}
form> button:hover{
    background-color: #55A603;
    color: #fff;
}
</style>
