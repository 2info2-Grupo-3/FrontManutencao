<script setup>
import { reactive, onMounted } from 'vue';
import { usePecasStore, useEntradasStore } from '@/stores/';
const pecasStore = usePecasStore();
const entradasStore = useEntradasStore();
    onMounted(() => {
        pecasStore.getPecas();
    });
const pecas = pecasStore.state.pecas;
const entrada = reactive({
    data: '',
    quantidade: '',
    peca: Number,
    });


</script>

<template>
    <div class="modalAdd">
        <h2>Adicionar Entrada</h2>
        <form @submit.prevent>
            <div>
                <input type="date" placeholder="Data" v-model="entrada.data" />
                <input type="number" placeholder="Quantidade" v-model="entrada.quantidade" />
                <select name="" id="" v-model="entrada.peca">
                    <option v-for="peca in pecas" :key="peca.id" :value="peca.id">{{ peca.nome }}</option>
                </select>
            </div>
            <span></span>
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