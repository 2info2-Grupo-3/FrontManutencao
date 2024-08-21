<script setup>

const showLinkPecas = () => {
    const pecasLinks = document.querySelector('.pecasLinks');
    pecasLinks.style.display = pecasLinks.style.display === 'none' ? 'block' : 'none';
    const setaAnimation = document.querySelector('.setaAnimation');
    setaAnimation.style.transform = setaAnimation.style.transform === 'rotate(0deg)' ? 'rotate(-180deg)' : 'rotate(0deg)';
}
</script>

<template>
    <div class="linkButtons">
        <button class="btn-aside"><img src="../../../homeicon.svg" alt="">Home</button>
        <button class="btn-aside"><img src="../../../personicon.svg" alt="">Clientes</button>
        <button class="btn-aside"><img src="../../../orcamentoicon.svg" alt="">Orçamentos</button>
        <button class="btn-aside"><img src="../../../faturamentoicon.svg" alt="">Orçamentos</button>
        <button class="btn-aside"><img src="../../../servicosicon.svg" alt="">Serviços</button>
        <button class="btn-aside" @click="showLinkPecas"><img src="../../../pecasicon.svg" alt="">Peças<img src="../../../setaicon.svg"
                alt="" class="setaAnimation"></button>
        <div class="pecasLinks">
            <button class="btn-pecas"><img src="../../../estoqueicon.svg" alt="">Estoque</button>
            <button class="btn-pecas"><img src="../../../entradasicon.svg" alt="">Entradas</button>
            <button class="btn-pecas"><img src="../../../saidasicon.svg" alt="">Saídas</button>
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

.pecasLinks {
    display: flex;
    align-items: center;
    justify-content: center;
    display: none;
    transition: 0.5s ease-in-out;
}

.btn-pecas {
    display: flex;
    align-items: center;
    justify-items: center;
    cursor: pointer;
    border: none;
    width: 120%;
    height: 3rem;
    background: transparent;
    color: white;
    font-size: 1.5em;
    transition: .3s ease-in-out;
    border-radius: 10px;
    margin-top: 0.5em;
}

.setaAnimation {
    transition: 0.5s ease-in-out;
}

.btn-aside {
    cursor: pointer;
    border: none;
    width: 80%;
    height: 3rem;
    background: transparent;
    display: flex;
    align-items: center;
    color: white;
    padding: 0.5rem;
    font-size: 1.5em;
    margin: 0.5em;
    transition: .3s ease-in-out;
    border-radius: 10px;
}

button:hover {
    background: #0175c7;
}

button img {
    width: 1.5rem;
    margin: 0.5rem;
}
</style>