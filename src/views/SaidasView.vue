<script setup>
import Saidascomp from '@/components/others/SaidasComp.vue'
</script>
<template>
    <Saidascomp/>
</template>

<style scoped>

main{
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 5fr;
}

.comp{
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem;
  flex-direction: column;
}
</style>