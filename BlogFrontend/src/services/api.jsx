
import axios from 'axios';

const API_URL = 'https://localhost:7146/api/posts'; 

export const getPosts = (page, pageSize) => {
  return axios.get(`${API_URL}?page=${page}&pageSize=${pageSize}`);
};

export const getPost = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

export const createPost = (post) => {
  return axios.post(API_URL, post);
};

export const updatePostApi = (id, post) => {
  return axios.put(`${API_URL}/${id}`, post);
};

export const deletePost = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};