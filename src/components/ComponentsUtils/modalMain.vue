<script setup>
import { defineProps } from 'vue';

defineProps({
  options: Object,
});
</script>

<template>
  <div class="modal">
    <form @submit.prevent="options.prevent(option.value)">
      <div v-for="option in options.inputs" :key="option.id">
        <input :type="option.type" v-model="option.value">
        <label>{{ option.label }}</label>
        <button type="submit">Enviar</button>
      </div>
    </form>
  </div>
</template>
