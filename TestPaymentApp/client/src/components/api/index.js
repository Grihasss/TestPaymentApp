import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

export const createPayment = (newPayment) => API.post('/payment', newPayment);
export const searchPayment = (searchQuery) => API.get(`/payment/search`, {params: {searchQuery}});