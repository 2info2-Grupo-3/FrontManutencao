<script setup>
import { reactive } from 'vue';
import { useEntradasStore } from '@/stores/';
const entradasStore = useEntradasStore();

const entrada = reactive({
    peca: '',
    data: '',
    quantidade: ''
});


</script>

<template>
    <div class="modalAdd">
        <h2>Adicionar Entrada</h2>
        <form @submit.prevent>
            <div>
                <input type="text" placeholder="Nome" v-model="cliente.nome" />
                <input type="date" placeholder="CPF" maxlength="11" v-model="entrada.cpf" />
                <input type="text" placeholder="Data de Nascimento" v-model="entrada.data" />
            </div>
        </form>
        <button @click="entradasStore.createEntrada(entrada)">Adicionar</button>
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