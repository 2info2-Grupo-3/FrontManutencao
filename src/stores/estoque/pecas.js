import { reactive, computed } from "vue";
import { defineStore } from "pinia";
import { PecasService } from "../../service";

export const usePecasStore = defineStore("pecas",
    () => {
        const state = reactive({
            pecas: [],
            loading: false,
            error: null
        });
        const isLoading = computed(() => state.loading);
    
        const getPecas = async () => {
            state.loading = true;
            try {
                state.pecas = await PecasService.getPecas();
            } catch (error) {
                state.error = error;
            } finally {
                state.loading = false;
            }
        };

        const createPeca = async (newPeca) => {
            state.loading = true;
            try {
                state.pecas.push(await PecasService.createPeca(newPeca));
            } catch (error) {
                state.error = error;
            } finally {
                state.loading = false;
            }
        };

        const updatePeca = async (peca) => {
            state.loading = true;
            try {
                const index = state.pecas.findIndex((s) => s.id ===peca.id);
                state.pecas[index] = await PecasService.updatePeca(peca);
            } catch (error) {
                state.error = error;
            } finally {
                state.loading = false;
            }
        };

        const deletePeca = async (id) => {
            state.loading = true;
            try {
                const index = state.pecas.findIndex((s) => s.id === id);
                state.pecas.splice(index, 1);
                await PecasService.deletePeca(id);
            } catch (error) {
                state.error = error;
            } finally {
                state.loading = false;
            }
        };

        return {
            state,
            isLoading,
            getPecas,
            createPeca,
            updatePeca,
            deletePeca
        };
    }
)