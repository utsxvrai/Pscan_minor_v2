import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const signup = async (name, email, password) => {
  return axios.post(`${API_URL}/signup`, { name, email, password });
};

export const signin = async (email, password) => {
  return axios.post(`${API_URL}/signin`, { email, password });
};

export const predictPneumonia = async (imageFile) => {
  const formData = new FormData();
  formData.append('file', imageFile);
  
  return axios.post(`${API_URL}/predict/`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};