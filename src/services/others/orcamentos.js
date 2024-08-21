import api from "@/plugins/axios";

class OrcamentosService {

    async getOrcamentos(){
        try{
            const response = await api.get('orcamentos/');
            return response.data;
        }catch(error){
            console.error(error);
        }
    }

    async createOrcamentos(data) {
        try {
            console.log(data);
            const response = await api.post('orcamentos/', data);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    async updateOrcamentos(id, data) {
        try {
            const response = await api.put(`orcamentos/${id}/`, data);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    async deleteOrcamentos(id) {
        try {
            const response = await api.delete(`orcamentos/${id}/`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
}

export default new OrcamentosService();