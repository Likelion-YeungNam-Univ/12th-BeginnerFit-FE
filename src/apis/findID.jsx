import api from "./axios";

export const findId = async (name) => {
  const response = await api.post(`/auth/find-id?name=${name}`);
  return response.data;
};
