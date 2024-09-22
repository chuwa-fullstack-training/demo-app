import api from './base';

const BASE_URL = '/posts';

export const getPosts = async () => {
  try {
    const response = await api.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

export const getPostById = async (id: string) => {
  try {
    const response = await api.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching post by id:', error);
    throw error;
  }
};

export const likePost = async (postId: string) => {
  try {
    const response = await api.put(`${BASE_URL}/${postId}/like`);
    return response.data;
  } catch (error) {
    console.error('Error liking post:', error);
    throw error;
  }
};

export const createPost = async (postData: { text: string }) => {
  try {
    const response = await api.post(BASE_URL, postData);
    return response.data;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

export const deletePost = async (postId: string) => {
  try {
    await api.delete(`${BASE_URL}/${postId}`);
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
};