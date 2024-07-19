import { reactive, computed } from "vue";
import { defineStore } from "pinia";
import { ServicosService } from "@/services";

export const useServicosStore = defineStore("servicos",
    () => {
        const state = reactive({
            servicos: [],
            loading: false,
            error: null
        });
        const isLoading = computed(() => state.loading);
    
        const getServicos = async () => {
            state.loading = true;
            try {
                state.servicos = await ServicosService.getServicos();
            } catch (error) {
                state.error = error;
            } finally {
                state.loading = false;
            }
        };

        const createServico = async (newServico) => {
            state.loading = true;
            try {
                state.servicos.push(await ServicosService.createServico(newServico));
            } catch (error) {
                state.error = error;
            } finally {
                state.loading = false;
            }
        };

        const updateServico = async (servico) => {
            state.loading = true;
            try {
                const index = state.servicos.findIndex((s) => s.id ===servico.id);
                state.servicos[index] = await ServicosService.updateCliente(servico);
            } catch (error) {
                state.error = error;
            } finally {
                state.loading = false;
            }
        };

        const deleteServico = async (id) => {
            state.loading = true;
            try {
                const index = state.servicos.findIndex((s) => s.id === id);
                state.servicos.splice(index, 1);
                await ServicosService.deleteCliente(id);
            } catch (error) {
                state.error = error;
            } finally {
                state.loading = false;
            }
        };

        return {
            state,
            isLoading,
            getServicos,
            createServico,
            updateServico,
            deleteServico
        };
    }
)