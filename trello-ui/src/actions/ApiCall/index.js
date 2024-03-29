import axios from 'axios';
import { API_ROUTE } from '~/utilities/constants';

export const fetchBoardDetail = async (id) => {
    const request = await axios.get(`${API_ROUTE}/v1/boards/${id}`);
    return request.data;
};

export const updateBoard = async (id, data) => {
    const request = await axios.put(`${API_ROUTE}/v1/boards/${id}`, data);
    return request.data;
};

export const createNewColumn = async (data) => {
    const request = await axios.post(`${API_ROUTE}/v1/columns`, data);
    return request.data;
};

export const updateColumn = async (id, data) => {
    const request = await axios.put(`${API_ROUTE}/v1/columns/${id}`, data);
    return request.data;
};

export const createNewCard = async (data) => {
    const request = await axios.post(`${API_ROUTE}/v1/cards`, data);
    return request.data;
};

export const updateCard = async (id, data) => {
    const request = await axios.put(`${API_ROUTE}/v1/cards/${id}`, data);
    return request.data;
};
