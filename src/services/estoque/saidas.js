import { api } from "@/plugins/axios";

class SaidasService {

    async getSaidas(){
        try{
            const response = await api.get('saidas/');
            return response.data;
        }catch(error){
            console.error(error);
        }
    }

    async createSaida(data) {
        try {
            const response = await api.post('saidas/', data);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    async updateSaida(id, data) {
        try {
            const response = await api.put(`saidas/${id}/`, data);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    async deleteSaida(id) {
        try {
            const response = await api.delete(`saidas/${id}/`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
}

export default new SaidasService();