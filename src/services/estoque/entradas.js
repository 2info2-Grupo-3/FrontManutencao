import { api } from "@/plugins/axios";

class EntradasService {

    async getEntradas(){
        try{
            const response = await api.get('entradas/');
            return response.data;
        }catch(error){
            console.error(error);
        }
    }

    async createEntrada(data) {
        try {
            const response = await api.post('entradas/', data);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    async updateEntrada(id, data) {
        try {
            const response = await api.put(`entradas/${id}/`, data);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    async deleteEntrada(id) {
        try {
            const response = await api.delete(`entradas/${id}/`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
}

export default new EntradasService();