<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])
const closeModal = () => {
  emit('close')
}
</script>

<template>
  <div class="modal" v-if="props.isVisible">
    <div>
      <slot class="teste"></slot>
    </div>
    <div>
      <button class="close-button" @click="closeModal">X</button>
    </div>
  </div>
</template>

<style scoped>
.modal {
  background-color: #333333;
  padding: 1rem;
  color: white;
  display: grid;
  grid-template-columns: 45fr 1fr;
  position: absolute;
  margin: auto;
  border-radius: 1rem;
  z-index: 10;
  width: 30%;
  gap: 20px;
}

.close-button {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: white;
}

div > slot {
  display: flex;
  flex-direction: column;
  width: 100%;
}
</style>
