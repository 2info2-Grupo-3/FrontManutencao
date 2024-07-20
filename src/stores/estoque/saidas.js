import { reactive, computed } from "vue";
import { defineStore } from "pinia";
import { SaidasService } from "@/services";

export const useSaidasStore = defineStore("saidas",
    () => {
        const state = reactive({
            saidas: [],
            loading: false,
            error: null
        });
        const isLoading = computed(() => state.loading);
    
        const getSaidas = async () => {
            state.loading = true;
            try {
                state.saidas = await SaidasService.getSaidas();
            } catch (error) {
                state.error = error;
            } finally {
                state.loading = false;
            }
        };

        const createSaida = async (newSaida) => {
            state.loading = true;
            try {
                state.saidas.push(await SaidasService.createSaida(newSaida));
            } catch (error) {
                state.error = error;
            } finally {
                state.loading = false;
            }
        };

        const updateSaida = async (saida) => {
            state.loading = true;
            try {
                const index = state.saidas.findIndex((s) => s.id ===saida.id);
                state.saidas[index] = await SaidasService.updateSaida(saida);
            } catch (error) {
                state.error = error;
            } finally {
                state.loading = false;
            }
        };

        const deleteSaida = async (id) => {
            state.loading = true;
            try {
                const index = state.saidas.findIndex((s) => s.id === id);
                state.saidas.splice(index, 1);
                await SaidasService.deleteSaida(id);
            } catch (error) {
                state.error = error;
            } finally {
                state.loading = false;
            }
        };

        return {
            state,
            isLoading,
            getSaidas,
            createSaida,
            updateSaida,
            deleteSaida
        };
    }
)