import api from "@/services/api/axios";

export const request = async ({ url, method, data = {} }) => {
  const response = await api[method](`/${url}`, data);
  return response.data;
};
