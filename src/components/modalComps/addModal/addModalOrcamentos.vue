<script setup>
import { ref, reactive, onMounted, computed } from 'vue';
import { useOrcamentosStore, useClientesStore, useServicosStore, usePecasStore } from '@/stores/';
const orcamentosStore = useOrcamentosStore();
const clientesStore = useClientesStore();
const servicosStore = useServicosStore();
const pecasStore = usePecasStore();
const orcamento = reactive({
    cliente: null,
    status: 0,
    valor_total: 0,
    pecas_orcamento: [],
    servicos_orcamento: [],
});
onMounted(() => {
    orcamentosStore.getOrcamentos();
    servicosStore.getServicos();
    pecasStore.getPecas();
    clientesStore.getClientes();
});
const clientes = computed(() => clientesStore.state.clientes);
const servicos = computed(() => servicosStore.state.servicos);
const pecas = computed(() => pecasStore.state.pecas);
const pecaf = ref(null);
const quantidadePeca = ref(1);
const pecaAdd = () => {
    const pecaId = pecaf.value
    const quantidade = quantidadePeca.value
    const peca = {
        peca: pecaId,
        quantidade: quantidade
    }
    orcamento.pecas_orcamento.push(peca)
    atualizarValorTotal();
    pecaf.value = null
    quantidadePeca.value = 1
};
const servicof = ref(null);
const servicoAdd = () => {
    const servicoId = servicof.value
    const servico = {
        servico: servicoId,
        valor: servicos.value.find(servico => servico.id === servicoId).preco
    }
    orcamento.servicos_orcamento.push(servico)
    atualizarValorTotal();
    servicof.value = null
};
const atualizarValorTotal = () => {
    let total = 0;
    orcamento.pecas_orcamento.forEach(item => {
        const peca = pecas.value.find(p => p.id === item.peca);
        if (peca) {
            total += Number(peca.preco * item.quantidade);
        }
    });
    orcamento.servicos_orcamento.forEach(item => {
        total += Number(item.valor);
    });

    orcamento.valor_total = total;
};
const salvarOrcamento = () => {
    orcamentosStore.createOrcamento(orcamento)
};
</script>
<template>
    <div class="background">
        <div class="modalAdd">
            <div class="modalHeader">
                <h2>Adicionar Orçamento</h2>
                <button @click="$emit('close')">X</button>
            </div>
            <form @submit.prevent>
                <div>
                    <label for="">Cliente:</label>
                    <select v-model="orcamento.cliente">
                        <option v-for="cliente in clientes" :key="cliente.id" :value="cliente.id">{{ cliente.nome }}</option>
                    </select>
                </div>
                <div>
                    <label for="">Peças:</label>
                    <select v-model="pecaf">
                        <option v-for="peca in pecas" :key="peca.id" :value="peca.id">{{ peca.nome }}</option>
                    </select>
                    <div class="quantidade">
                        <label for="">Quantidade:</label>
                        <input type="number" v-model="quantidadePeca">
                        <button @click="pecaAdd">Add</button>
                    </div>
                </div>
                <div>
                <div class="quantidade">
                    <label for="">Serviços:</label>
                    <select v-model="servicof">
                        <option v-for="servico in servicos" :key="servico.id" :value="servico.id">{{ servico.nome }}</option>
                    </select>
                    <button @click="servicoAdd">Add</button>
                </div>
            </div>
            <div>
                <label for="">Status:</label>
                <select name="" id="" v-model="orcamento.status"><option :value=1>Draft</option><option :value=2>Em progresso</option><option :value=3>Finalizado</option></select></div>

                <button type="submit" @click="salvarOrcamento">Criar</button>
            </form>
        </div>
    </div>
</template>
<style scoped>
.background{
  width: 100%;
  height: 100%;
  z-index: 9;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
}
.modalAdd {
  background-color: #333333;
  padding: 1rem;
  color: white;
  align-items: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -45%);
  width: 40%;
  position: absolute;
  z-index: 10;
  border-radius: 1rem;
}
.modalHeader{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    margin-bottom: 1rem;
}
.modalHeader> button{
    background-color: transparent;
    width: 5%;
    font-size: 20px;
    color: white;
    margin: 0;
    border-radius: 1rem;
    border: 2px solid #333;
    cursor: pointer;
    transition: .3s ease-in-out;
}
label{
    width: 30%;
}
.quantidade{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;   
}
.quantidade > label{
    width: 30%;
}
.quantidade > button{
    width: 18%;
}
.quantidade > button:hover{
    background-color: #55A603;
    color: #fff;
}
.quantidade> select{
    width: 40%;
}
form > div> button{
    width: 30%;
    margin: 0;
}
form {
  display: flex;
  flex-direction: column;
  gap: .25rem;
}
form > div {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  width: 90%;
  margin: .25rem auto;
}
input {
    width: 40%;
    height: 2rem;
    padding: .5rem;
    border-radius: 1rem;
    border: 2px solid #333;
}
select{
    width: 60%;
    height: 2rem;
    border-radius: 1rem;
    border: 2px solid #333;
}
button{
    padding: .5rem;
    border-radius: 1rem;
    border: 2px solid #333;
    background-color: #fff;
    color: #55A603;
    cursor: pointer;
    transition: .3s ease-in-out;
    width: 30%;
    margin: 1rem auto;
}
form > button:hover{
    background-color: #55A603;
    color: #fff;
}
</style>