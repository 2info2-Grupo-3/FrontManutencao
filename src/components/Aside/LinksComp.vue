<script setup>
import router from '@/router';
import { ref } from 'vue'
import { useRoute } from 'vue-router'
</script>

<template>
    <div class="linkButtons">
        <button><img src="../../../public/personicon.svg" alt="">Clientes</button>
        <button><img src="../../../public/orcamentoicon.svg" alt="">Orçamentos</button>
        <button><img src="../../../public/faturamentoicon.svg" alt="">Orçamentos</button>
    </div>
</template>

<style scoped>
.linkButtons {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.linkButtons > button{
    border: none;
    width: 100%;
    height: 2rem;
    background: transparent;
    display: flex;
    align-items: center;
    color: white;
    padding: .5rem;
    font-size: 16px;
    margin: .5rem auto;
    transition: .3s ease-in-out;
}
.linkButtons > button:hover{
    background: #1a1a1a;
}
.linkButtons > button img{
    width: 1.5rem;
    margin: .5rem;
}
</style>