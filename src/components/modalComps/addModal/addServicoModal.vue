<script setup>
import { reactive } from 'vue';
import { useServicosStore } from '@/stores/';
const servicosStore = useServicosStore();

const servico = reactive({
    nome: '',
    preco: '',
    tempo: '',
    });
</script>

<template>
    <div class="modalAdd">
        <h2>Adicionar Serviço</h2>
        <form @submit.prevent>
            <div>
                <input type="text" placeholder="Nome" v-model="servico.nome" />
                <input type="number" placeholder="Preço" v-model="servico.preco" />

                <select name="" id="" v-model="servico.tempo">
                    <option value=1>Rápido</option>
                    <option value=2>Intermediario</option>
                    <option value=3>Demorado</option>
                </select>

            </div>
            <span></span>
        </form>
        <button @click="servicosStore.createServico(servico)">Adicionar</button>
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