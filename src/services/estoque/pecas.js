import { api } from "@/plugins/axios";

class PecasService {

    async getPecas(){
        try{
            const response = await api.get('pecas');
            return response.data;
        }catch(error){
            console.error(error);
        }
    }

    async createPeca(data) {
        try {
            const response = await api.post('pecas', data);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    async updatePeca(id, data) {
        try {
            const response = await api.put(`pecas/${id}`, data);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    async deletePeca(id) {
        try {
            const response = await api.delete(`pecas/${id}`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
}

export default new PecasService();