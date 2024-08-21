<script setup>
import { RouterLink } from 'vue-router';


const showLinkPecas = () =>{
    const pecasLinks = document.querySelector('.pecasLinks');
    pecasLinks.style.display = pecasLinks.style.display === 'none' ? 'block' : 'none';
    const setaAnimation = document.querySelector('.setaAnimation');
    setaAnimation.style.transform = setaAnimation.style.transform === 'rotate(0deg)' ? 'rotate(-180deg)' : 'rotate(0deg)';
}
</script>

<template>
    <div class="linkButtons">
        <RouterLink to="/"><img src="../../../homeicon.svg" alt="">Home</RouterLink>
        <RouterLink to="/clientes"><img src="../../../personicon.svg" alt="">Clientes</RouterLink>
        <RouterLink to="/orcamento"><img src="../../../orcamentoicon.svg" alt="">Orçamentos</RouterLink>
        <RouterLink to="/faturamento"><img src="../../../faturamentoicon.svg" alt="">Faturamento</RouterLink>
        <RouterLink to="/servicos"><img src="../../../servicosicon.svg" alt="">Serviços</RouterLink>
        <button @click="showLinkPecas"><img src="../../../pecasicon.svg" alt="">Peças<img src="../../../setaicon.svg" alt="" class="setaAnimation"></button>
        <div class="pecasLinks">
            <RouterLink to="/estoque"><img src="../../../estoqueicon.svg" alt="">Estoque</RouterLink>
            <RouterLink to="/entradas"><img src="../../../entradasicon.svg" alt="">Entradas</RouterLink>
            <RouterLink to="/saidas"><img src="../../../saidasicon.svg" alt="">Saídas</RouterLink>
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
button, a{
    cursor: pointer;
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
button:hover, a:hover{
    background: #1a1a1a;
}
button img, a img{
    width: 1.5rem;
    margin: 0 .5rem;
}
</style>