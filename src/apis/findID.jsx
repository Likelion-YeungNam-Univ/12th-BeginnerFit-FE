import api from "./axios";

export const findId = async (name) => {
    try {
        console.log({name: name});
        const response = await api.post(`/auth/find-id?name=${name}`);
        return response.data;
    } catch (error) {
        console.log(error.response ? error.response.data : error.message);
        throw error;
    }
};