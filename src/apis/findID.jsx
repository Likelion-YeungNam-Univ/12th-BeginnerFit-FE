import api from "./axios";

export const findId = async (name) => {
    try {
        const response = await api.post('/auth/find-id', { name });
        return response.data;
    } catch (error) {
        console.log(error.response ? error.response.data : error.message);
        throw error;
    }
};