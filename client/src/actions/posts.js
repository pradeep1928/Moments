import * as api from "../api";
import { CREATE, FETCH_ALL, UPDATE, DELETE } from "../constants/actionTypes";

// Action creators
//get posts
export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();

    // fetching posts using dispatch method of redux
    // FETCH_ALL is the action which will fetch all the posts
    // payload contains the data which we have to fetch, here the data is posts.
    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error);
  }
};

//create posts action
export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);

    // creating new posts using dispatch method of redux
    // CREATE action creates the new post
    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

//update post action
export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

//delete post action
export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error.message);
  }
};

//like the post
export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
