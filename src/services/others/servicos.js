import { api } from "@/plugins/axios";

class ServicosService {

    async getServicos(){
        try{
            const response = await api.get('servicos/');
            return response.data;
        }catch(error){
            console.error(error);
        }
    }

    async createServico(data) {
        try {
            const response = await api.post('servicos/', data);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    async updateServico(id, data) {
        try {
            const response = await api.put(`servicos/${id}/`, data);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    async deleteServico(id) {
        try {
            const response = await api.delete(`servicos/${id}/`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
}

export default new ServicosService();