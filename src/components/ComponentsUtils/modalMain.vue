<script setup>
import { defineProps } from 'vue';

defineProps({
  options: Object,
});
const handleSubmit = (option) => {
  console.log('Submit do formulário:', option);
};
</script>

<template>
  <div class="modal">
    <form @submit.prevent>
      <div v-for="option in options.inputs" :key="option.id">
        <input :type="option.type" v-model="option.value">
        <label>{{ option.label }}</label>
        <button type="submit" @click="handleSubmit(option)">Enviar</button>
      </div>
    </form>
  </div>
</template>
