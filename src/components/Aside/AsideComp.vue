<script setup>
import LinksComp from './LinksComp.vue';
</script>

<template>
    <aside>
        <div class="title"><img src="../../../public/logo.svg" alt=""><h1>ELVIS TECH</h1></div>  
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
    margin-top: 2rem;
    margin-bottom: 50%;
}
.title img{
    width: 2rem;
    height: 2rem;
    margin-left: 7%;
}
.title h1{
    font-size: 26px;
    margin-left: 1rem;
    color: #55A603;
}
</style>