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
    background-color: #333333;
    color: white;
    display: flex;
    flex-direction: column;
    height: 100vh;
}
.title{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 2rem;
    margin-bottom: 50%;
}
.title img{
    width: 2rem;
    height: 2rem;
}
.title h1{
    font-size: 26px;
    margin-left: 1rem;
}
</style>