import api from "@/plugins/axios";

class ClientesService {

    async getClientes(){
        try{
            const response = await api.get('clientes/');
            return response.data;
        }catch(error){
            console.error(error);
        }
    }

    async createCliente(data) {
        try {
            const response = await api.post('clientes/', data);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    async updateCliente(id, data) {
        try {
            const response = await api.put(`clientes/${id}/`, data);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    async deleteCliente(id) {
        try {
            const response = await api.delete(`clientes/${id}/`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
}

export default new ClientesService();