import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: `${BASE_URL}/api`,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const authAPI = {
  register: (email, password) => api.post("/auth/register", { email, password }),
  login: (email, password) => api.post("/auth/login", { email, password }),
};

export const todosAPI = {
  getAll: () => api.get("/todos"),
  getOne: (id) => api.get(`/todos/${id}`),
  create: (todo) => api.post("/todos", todo),
  update: (id, todo) => api.put(`/todos/${id}`, todo),
  delete: (id) => api.delete(`/todos/${id}`),
};

export default api;