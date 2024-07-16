<script setup>
</script>

<template>
    <div>
        <ul>
            <li>
            <p>Peças</p>
            </li>
            <li>
                <p>Clientes</p>
            </li>
            <li>
                <p>Serviços</p>
            </li>
            <li>
                <p>Faturamento</p>
            </li>
            <li>
                <p>Estoque</p>
            </li>
        </ul>
    </div>
</template>

<style scoped>
ul{
    list-style: none;
    margin: auto;
    width: 100%;
}

li{
    padding: 0.5rem;
    cursor: pointer;
}

li:hover{
    background-color: #555555;
    transition: 0.5s ease-in-out;
}

li p{
    margin: 0px 20px;
}

</style>