<script setup>
import LinksComp from './LinksComp.vue';
</script>

<template>
    <aside>
        <div class="title"><img src="../../../logo.svg" alt=""><h1>ELVIS TECH</h1></div>
        <LinksComp/>
    </aside>
</template>

<style scoped>

aside{
    background-color: #0095FF;
    color: white;
    display: flex;
    flex-direction: column;
    height: 100vh;
}

.title{
    margin: 1.5rem;
    display: flex;
    align-items: center;
    flex-direction: column-reverse;
    justify-content: center;
}

.title img{
    margin-top: 1em;
    width: 10rem;
    height: 10rem;
}
</style>