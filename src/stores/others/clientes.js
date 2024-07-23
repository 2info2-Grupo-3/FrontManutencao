import { reactive, computed } from "vue";
import { defineStore } from "pinia";
import { ClientesService } from "@/services";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

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
                toast.success('Cliente criado com sucesso!', {
                    position: 'top-right',
                   autoClose: 2000
                  });
                  window.location.reload();
            }
        };

        const updateCliente = async (cliente) => {
            state.loading = true;
            try {
              const index = state.clientes.findIndex((s) => s.id === cliente.id);
              state.clientes[index] = await ClientesService.updateCliente(cliente.id, cliente);
            } catch (error) {
              state.error = error;
            } finally {
              state.loading = false;
              toast.success('Cliente atualizado com sucesso!', {
                position: 'top-right',
               autoClose: 2000
              });
              window.location.reload();
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
                toast.success('Cliente deletado com sucesso!', {
                    position: 'top-right',
                   autoClose: 2000
                  });
                  window.location.reload();
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