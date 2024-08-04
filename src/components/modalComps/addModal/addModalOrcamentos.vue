<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useOrcamentosStore } from '@/stores/others/orcamentos.js';
import { useClientesStore } from '@/stores/others/clientes.js';
import { useServicosStore } from '@/stores/others/servicos.js';
import { usePecasStore } from '@/stores/estoque/pecas.js';
const orcamentosStore = useOrcamentosStore()
const clientesStore = useClientesStore()
const servicosStore = useServicosStore()
const pecasStore = usePecasStore()

onMounted(() => {
  orcamentosStore.getOrcamentos();
  servicosStore.getServicos();
  pecasStore.getPecas();
  clientesStore.getClientes();
});
const clientes = computed(() => clientesStore.state.clientes);
const servicos = computed(() => servicosStore.state.servicos);
const pecas = computed(() => pecasStore.state.pecas);

const pecaf = ref('')

const pecaAdd = () =>{
    const pecaAdd = pecaf.value
    orcamento.pecas_orcamento.push(pecaAdd)
    pecaf.value = '' 
}
const orcamento = reactive({
    cliente: '',
    data: '',
    valor_total: '',
    pecas_orcamento: [{}],
    servico: [{}],
})
</script>
<template>
    <div class="background">
        <div class="modalAdd">
            <div class="modalHeader"><h2>Adicionar Orçamento</h2>
                <button @click="$emit('close')">X</button></div>
        </div>
        <form @submit.prevent>
            <div><label for="">Cliente:</label><select name="" id="">
                <option v-for="cliente in clientes" :key="cliente.id" :value="orcamento.cliente">{{ cliente.nome }}</option>
            </select></div>
            <div>
                <label for="">Data:</label><input type="date" name="" id="" :value="orcamento.data">
            </div>
            <div><label for="">Peças:</label><select name="" id=""><option v-for="peca in pecas" :key="peca.id" :value="pecaf">{{ peca.nome }}</option></select>
            </div>
            <div></div>
        </form>
    </div>
</template>
<style scoped></style>