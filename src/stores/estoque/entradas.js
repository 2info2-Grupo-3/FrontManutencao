import { reactive, computed } from "vue";
import { defineStore } from "pinia";
import { EntradasService } from "../../service";

export const useEntradasStore = defineStore("entradas",
    () => {
        const state = reactive({
            entradas: [],
            loading: false,
            error: null
        });
        const isLoading = computed(() => state.loading);
    
        const getEntradas = async () => {
            state.loading = true;
            try {
                state.entradas = await EntradasService.getEntradas();
            } catch (error) {
                state.error = error;
            } finally {
                state.loading = false;
            }
        };

        const createEntrada = async (newEntrada) => {
            state.loading = true;
            try {
                state.entradas.push(await EntradasService.createEntrada(newEntrada));
            } catch (error) {
                state.error = error;
            } finally {
                state.loading = false;
            }
        };

        const updateEntrada = async (entrada) => {
            state.loading = true;
            try {
                const index = state.entradas.findIndex((s) => s.id ===entrada.id);
                state.entradas[index] = await EntradasService.updateEntrada(entrada);
            } catch (error) {
                state.error = error;
            } finally {
                state.loading = false;
            }
        };

        const deleteEntrada = async (id) => {
            state.loading = true;
            try {
                const index = state.entradas.findIndex((s) => s.id === id);
                state.entradas.splice(index, 1);
                await EntradasService.deleteEntrada(id);
            } catch (error) {
                state.error = error;
            } finally {
                state.loading = false;
            }
        };

        return {
            state,
            isLoading,
            getEntradas,
            createEntrada,
            updateEntrada,
            deleteEntrada
        };
    }
)