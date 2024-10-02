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
        <div class="container-btn-close">
          <button class="btn-close" @click="$emit('close')">x</button>
        </div>
        <img src="../../../../public/clienticon.svg" alt="">
        <h2>Adicionar Cliente</h2>
      </div>
      <form @submit.prevent>
        <div>
          <input type="text" placeholder="Nome" v-model="cliente.nome" />
        </div>
        <div>
          <input type="text" placeholder="CPF" maxlength="11" v-model="cliente.cpf" />
        </div>
        <div>
          <input type="date" placeholder="Data de Nascimento" v-model="cliente.data" />
        </div>
        <div>
          <input type="text" placeholder="Telefone" v-model="cliente.telefone" />
        </div>
        <div>
          <input type="text" placeholder="Endereço" v-model="cliente.endereco" />
        </div>
        <div>
          <input type="email" placeholder="Email" v-model="cliente.email" />
        </div>
        <div>
          <input type="text" placeholder="Cidade" v-model="cliente.cidade" />
        </div>
        <div>
          <input type="text" placeholder="CEP" v-model="cliente.cep" />
        </div>
      </form>
      <div class="container-btn-add">
        <button class="btn-add" @click="clientesStore.createCliente(cliente)">Adicionar</button>
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
  transition: .3s ease-in-out;
}

form {
  display: flex;
  flex-direction: column;
  gap: .5rem;
  overflow: scroll;
  max-height: 40vh
}

form>div {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60%;
  margin: 0.25rem auto;
}

input {
  width: 100%;
  padding: 0.5rem;
  border-radius: 0.5rem;
  box-shadow: 0px 6px 10px 0px rgba(0, 0, 0, 0.2);
  border: none;
  font-size: 1em;
}

.btn-add {
  padding: 0.5rem;
  border-radius: 1rem;
  background-color: #55A603;
  color: #ffffff;
  cursor: pointer;
  transition: 0.3s ease-in-out;
  width: 30%;
  margin: 1rem auto;
  border: none;
}

.btn-add:hover {
  background-color: white;
  color: #55A603;
}

.container-btn-add{
  display: flex;
  justify-content: center;
}

form>button:hover {
  background-color: #55A603;
  color: #fff;
}

.container-btn-close {
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
}

::-webkit-scrollbar{
  width: 0;
  height: 0;
}
</style>