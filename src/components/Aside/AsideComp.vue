<script setup>
import LinksComp from './LinksComp.vue';
</script>

<template>
    <aside>

        <div class="infos">    
        <h1>ELVIS TECH</h1>
        <LinksComp/>
        </div>

        <div class="logout">
            <button class="unLogged">
                <p>Logout</p>
            </button>
        </div>
    </aside>
</template>

<style scoped>
aside{
    background-color: #333333;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 100vh;
}

button.unLogged{
    background-color: #333333;
    color: white;
    padding: 0.5rem;
    cursor: pointer;
    border: 0;
    width: 100%;
    text-align: left;
}

button.unLogged p{
    margin: 0px 20px;
}

button.unLogged:hover{
    background-color: #555555;
    transition: 0.5s ease-in-out;
}

h1{
    margin: 0px 20px;
}

.infos{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
</style>