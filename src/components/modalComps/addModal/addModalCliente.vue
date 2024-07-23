<script setup>
import { reactive } from 'vue';
import { useClientesStore } from '@/stores/';
const clientesStore = useClientesStore();

const cliente = reactive({
    nome: '',
    cpf: '',
    data: '',
    telefone: '',
    endereco: '',
    email: '',
    cidade: '',
    cep: ''
});
</script>

<template>
    <div class="modalAdd">
        <h2>Adicionar Cliente</h2>
        <form @submit.prevent>
            <div>
                <input type="text" placeholder="Nome" v-model="cliente.nome" />
                <input type="text" placeholder="CPF" maxlength="11" v-model="cliente.cpf" />
                <input type="date" placeholder="Data de Nascimento" v-model="cliente.data" />
                <input type="text" placeholder="Telefone" v-model="cliente.telefone" />
            </div>
            <span></span>
            <div>
                <input type="text" placeholder="Endereço" v-model="cliente.endereco" />
                <input type="email" placeholder="Email" v-model="cliente.email" />
                <input type="text" placeholder="Cidade" v-model="cliente.cidade" />
                <input type="text" placeholder="CEP" v-model="cliente.cep" />
            </div>
        </form>
        <button @click="clientesStore.createCliente(cliente)">Adicionar</button>
    </div>
</template>

<style scoped>
.modalAdd {
    background-color: #333333;
    padding: 1rem;
    height: 150px;
    color: white;
    margin: auto;
    width: 100%;
}

form {
    display: grid;
    grid-template-columns: 1fr 0.1fr 1fr;
}

form > div {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5px;
}

input {
    width: 100%;
}
</style>