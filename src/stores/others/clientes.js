import { reactive, computed } from "vue";
import { defineStore } from "pinia";
import { ClientesService } from "@/services";

export const useClientesStore = defineStore("clientes",
    () => {
        const state = reactive({
            clientes: [],
            loading: false,
            error: null
        });
        const isLoading = computed(() => state.loading);
    
        const getClientes = async () => {
            state.loading = true;
            try {
                state.clientes = await ClientesService.getClientes();
            } catch (error) {
                state.error = error;
            } finally {
                state.loading = false;
            }
        };

        const createCliente = async (newCliente) => {
            state.loading = true;
            try {
                state.clientes.push(await ClientesService.createCliente(newCliente));
            } catch (error) {
                state.error = error;
            } finally {
                state.loading = false;
            }
        };

        const updateCliente = async (cliente) => {
            state.loading = true;
            try {
                const index = state.clientes.findIndex((s) => s.id ===cliente.id);
                state.clientes[index] = await ClientesService.updateCliente(cliente);
            } catch (error) {
                state.error = error;
            } finally {
                state.loading = false;
            }
        };

        const deleteCliente = async (id) => {
            state.loading = true;
            try {
                const index = state.clientes.findIndex((s) => s.id === id);
                state.clientes.splice(index, 1);
                await ClientesService.deleteCliente(id);
            } catch (error) {
                state.error = error;
            } finally {
                state.loading = false;
            }
        };

        return {
            state,
            isLoading,
            getClientes,
            createCliente,
            updateCliente,
            deleteCliente
        };
    }
)