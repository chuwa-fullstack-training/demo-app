import api from './base';

const API_URL = '/auth'; // Adjust this to your backend URL

export const login = async ({ email, password }: { email: string; password: string }) => {
  const response = await api.post(`${API_URL}/login`, { email, password });
  return response.data;
};

export const signup = async ({ name, email, password }: { name: string; email: string; password: string }) => {
  const response = await api.post(`${API_URL}/register`, { name, email, password, isAdmin: false });
  return response.data;
};

// export const logout = async () => {
//   try {
//     const response = await axios.post(`${API_URL}/logout`);
//     return response.data;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };
