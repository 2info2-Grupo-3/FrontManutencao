import { reactive, computed } from "vue";
import { defineStore } from "pinia";
import { OrcamentosService } from "@/services";

export const useOrcamentosStore = defineStore("orcamentos",
    () => {
        const state = reactive({
            orcamentos: [],
            loading: false,
            error: null
        });
        const isLoading = computed(() => state.loading);
    
        const getOrcamentos = async () => {
            state.loading = true;
            try {
                state.orcamentos = await OrcamentosService.getOrcamentos();
                console.log(state.orcamentos)
            } catch (error) {
                state.error = error;
            } finally {
                state.loading = false;
            }
        };

        const createOrcamento = async (newOrcamento) => {
            state.loading = true;
            try {
                state.orcamentos.push(await OrcamentosService.createOrcamento(newOrcamento));
            } catch (error) {
                state.error = error;
            } finally {
                state.loading = false;
            }
        };

        const updateOrcamento = async (orcamento) => {
            state.loading = true;
            try {
                const index = state.orcamentos.findIndex((s) => s.id ===orcamento.id);
                state.orcamentos[index] = await OrcamentosService.updateOrcamento(orcamento);
            } catch (error) {
                state.error = error;
            } finally {
                state.loading = false;
            }
        };

        const deleteOrcamento = async (id) => {
            state.loading = true;
            try {
                const index = state.orcamentos.findIndex((s) => s.id === id);
                state.orcamentos.splice(index, 1);
                await OrcamentosService.deleteOrcamento(id);
            } catch (error) {
                state.error = error;
            } finally {
                state.loading = false;
            }
        };

        return {
            state,
            isLoading,
            getOrcamentos,
            createOrcamento,
            updateOrcamento,
            deleteOrcamento
        };
    }
)