<script setup>
import { reactive, onMounted } from 'vue';
import { usePecasStore, useSaidasStore } from '@/stores/';
const pecasStore = usePecasStore();
const saidasStore = useSaidasStore();
    onMounted(() => {
        pecasStore.getPecas();
    });
const pecas = pecasStore.state.pecas;
console.log(pecas)
const saida = reactive({
    data: '',
    quantidade: '',
    peca: Number(),
    });


</script>

<template>
    <div class="modalAdd">
        <h2>Adicionar Saida</h2>
        <form @submit.prevent>
            <div>
                <input type="date" placeholder="Data" v-model="saida.data" />
                <input type="number" placeholder="Quantidade" v-model="saida.quantidade" />
                <select name="" id="" v-model="saida.peca">
                    <option v-for="peca in pecas" :key="peca.id" :value="peca.id">{{ peca.nome }}</option>
                </select>
            </div>
            <span></span>
        </form>
        <button @click="saidasStore.createSaida(saida)">Adicionar</button>
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