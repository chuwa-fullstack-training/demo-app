import axios from "axios";

const BASE_URL = 'http://localhost:3000/api/posts';

export const getPosts = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(BASE_URL, {
      headers: {
        Authorization: token
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
}

export const getPostById = async (id: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching post by id:', error);
    throw error;
  }
}

// export const createPost = async (postData: any) => {
//   try {
//     const response = await axios.post(BASE_URL, postData);
//     return response.data;
//   } catch (error) {
//     console.error('Error creating post:', error);
//     throw error;
//   }
// }