<script setup>
import { reactive } from 'vue';
import { usePecasStore } from '@/stores/';
const pecasStore = usePecasStore();

const peca = reactive({
    nome: '',
    preco: '',
    quantidade: 0
});
</script>
<template>
    <div class="background">
        <div class="modalAdd">
            <div class="modalHeader">
                <h2>Adicionar Peça</h2>
                <button @click="$emit('close')">X</button>
            </div>
            <form @submit.prevent>
                <div>
                    <label for="">Nome:</label><input type="text" placeholder="Nome" v-model="peca.nome" />
                </div>
                <div>
                    <label for="">Preço:</label><input type="text" placeholder="Preço" v-model="peca.preco" />
                </div>
                <div>
                    <label for="">Quantidade:</label><input type="number" placeholder="Quantidade" v-model="peca.quantidade" />
                </div>
                <button @click="pecasStore.createPeca(peca)">Adicionar</button>
            </form>
        </div>
    </div>
</template>
<style scoped>
    .background {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .modalAdd {
        width: 30%;
        background-color: white;
        border-radius: 10px;
        padding: 10px;
    }

    .modalHeader {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .modalHeader button {
        background-color: transparent;
        border: none;
        cursor: pointer;
    }

    .modalHeader button:hover {
        color: red;
    }

    form {
        display: flex;
        flex-direction: column;
    }

    form div {
        margin: 10px 0;
    }

    form div label {
        font-weight: bold;
    }

    form div input {
        padding: 5px;
        border-radius: 5px;
        border: 1px solid #ccc;
    }

    form button {
        padding: 5px;
        border-radius: 5px;
        border: none;
        background-color: #007bff;
        color: white;
        cursor: pointer;
    }

    form button:hover {
        background-color: #0056b3;
    }
</style>