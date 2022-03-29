import axios from 'axios';

// backend url for connection
const url = 'http://localhost:5000/posts';

// Here using url we are doing actions on backend data.
export const fetchPosts = () => axios.get(url);
export const createPost = (newPost) => axios.post(url, newPost);
export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost)
export const deletePost = (id) => axios.delete(`${url}/${id}`);
export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);