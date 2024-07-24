import { reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import { ServicosService } from '@/services'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export const useServicosStore = defineStore('servicos', () => {
  const state = reactive({
    servicos: [],
    loading: false,
    error: null
  })
  const isLoading = computed(() => state.loading)

  const getServicos = async () => {
    state.loading = true
    try {
      state.servicos = await ServicosService.getServicos()
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
    }
  }

  const createServico = async (newServico) => {
    state.loading = true
    try {
      state.servicos.push(await ServicosService.createServico(newServico))
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
    }
  }

  const updateServico = async (servico) => {
    console.log(servico)
    state.loading = true
    try {
      const index = state.servicos.findIndex((s) => s.id === servico.id)
      state.servicos[index] = await ServicosService.updateServico(servico.id, servico)
    } catch (error) {
      console.log(error)
      state.error = error
    } finally {
      state.loading = false
      toast.success('Serviço atualizado com sucesso!', {
        position: 'top-right',
        autoClose: 2000
      })
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    }
  }

  const deleteServico = async (id) => {
    state.loading = true
    try {
      const index = state.servicos.findIndex((s) => s.id === id)
      state.servicos.splice(index, 1)
      await ServicosService.deleteServico(id)
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
    }
  }

  return {
    state,
    isLoading,
    getServicos,
    createServico,
    updateServico,
    deleteServico
  }
})
