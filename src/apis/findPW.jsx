import api from "./axios";

export const resetPassword = async (email, newPassword) => {
    try {
        const response = await api.post('/auth/find-password', {
            email,
            newPassword
        });
        return response.data;
    } catch (error) {
        console.error("Error resetting password:", error.response ? error.response.data : error.message);
        throw error;
    }
};
