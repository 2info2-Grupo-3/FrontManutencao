<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    isVisible: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(['close']);
const closeModal = () => {
    emit('close');
};
</script>

<template>
    <div class="background" v-if="props.isVisible">
        <div class="modal">
            <div class="modalHeader">
                <h2>Detalhes do Cliente</h2>
            <button class="close-button" @click="closeModal">x</button>
        </div>
        <div>
            <slot class="teste"></slot>
        </div>
        </div>
    </div>
</template>


<style scoped>
.background{
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9;
}
.modal {
    background-color: #ffffff;
    padding: 1rem;
    color: rgb(255, 255, 255);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -45%);
    display: flex;
    flex-direction: column;
    position: absolute;
    margin: auto;
    z-index: 10;
    width: 50%;
    gap: 20px;
    border-radius: 1rem;
}
.modalHeader{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    padding: 1rem;
    color: #000000;
}
.close-button {
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    color: #000000;
}

</style>