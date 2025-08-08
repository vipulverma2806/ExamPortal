import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const fetchCategories = () => axios.get(`${API_URL}/categories`);
export const findOrCreateCategory = (categoryName) => axios.post(`${API_URL}/categories/findOrCreate`, { name: categoryName });
export const addQuestion = (questionData) => axios.post(`${API_URL}/questions`, questionData);
