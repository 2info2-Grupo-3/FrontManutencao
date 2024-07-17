<script setup>
import router from '@/router';
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const showLinkPecas = () =>{
    const pecasLinks = document.querySelector('.pecasLinks');
    pecasLinks.style.display = pecasLinks.style.display === 'none' ? 'block' : 'none';
    const setaAnimation = document.querySelector('.setaAnimation');
    setaAnimation.style.transform = setaAnimation.style.transform === 'rotate(0deg)' ? 'rotate(180deg)' : 'rotate(0deg)';
}
</script>

<template>
    <div class="linkButtons">
        <button><img src="../../../public/homeicon.svg" alt="">Home</button>
        <button><img src="../../../public/personicon.svg" alt="">Clientes</button>
        <button><img src="../../../public/orcamentoicon.svg" alt="">Orçamentos</button>
        <button><img src="../../../public/faturamentoicon.svg" alt="">Orçamentos</button>
        <button><img src="../../../public/servicosicon.svg" alt="">Serviços</button>
        <button @click="showLinkPecas"><img src="../../../public/pecasicon.svg" alt="">Peças<img src="../../../public/setaicon.svg" alt="" class="setaAnimation"></button>
        <div class="pecasLinks">
            <button><img src="../../../public/estoqueicon.svg" alt="">Estoque</button>
            <button><img src="../../../public/entradasicon.svg" alt="">Entradas</button>
            <button><img src="../../../public/saidasicon.svg" alt="">Saídas</button>
        </div>
    </div>
</template>

<style scoped>
.linkButtons {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.pecasLinks{
    display: none;
    transition: .5s ease-in-out;
}
.setaAnimation{
    transition: .5s ease-in-out;
}
button{
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
button:hover{
    background: #1a1a1a;
}
button img{
    width: 1.5rem;
    margin: 0 .5rem;
}
</style>