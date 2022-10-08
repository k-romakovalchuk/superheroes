import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000',
});

export const client = {
  async get<T>(url: string) {
    const response = await instance.get<T>(url);

    return response.data;
  },

  async post<T>(url: string, data: FormData) {
    const response = await instance.post<T>(url, data);

    return response.data;
  },

  async put<T>(url: string, data: FormData) {
    const response = await instance.put<T>(url, data);

    return response.data;
  },

  async delete(url: string) {
    return instance.delete(url);
  },
};
