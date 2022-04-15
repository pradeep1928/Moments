import PostMessage from "../models/postModel.js";
import mongoose from "mongoose";

// Creating all Route functions

//get posts
export const getPosts = async (req, res) => {
  try {
    const postMessage = await PostMessage.find();
    res.status(200).json(postMessage);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// create new posts
export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage(post);

  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// updating existing post by id
export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;

  //checking if the id is valid or not. If not valid then throw the error.
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send(`No post with that id`);
  }
  const updatedPost = await PostMessage.findByIdAndUpdate(
    _id,
    { ...post, _id },
    { new: true }
  );

  res.json(updatedPost);
};

//Delete post by id
export const deletePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`No post with that id`);
  }
  await PostMessage.findByIdAndRemove(id);
  res.json({ message: "Post deleted successfully" });
};

// Liking the post
export const likePost = async (req, res) => {
  const { id } = req.params;
  if (!req.userId) return res.json({ message: "Unauthenticated" });

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`No post with that id`);
  }

  const post = await PostMessage.findById(id);

  // finding the index of the id from database and saving it in the variable
  const index = post.likes.findIndex((id) => id === String(req.userId));

  // If index does not exists then adding the user otherwise removing the user
  if (index === -1) {
    post.likes.push(req.userId);
  } else {
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }

  const updatePost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });

  res.json(updatePost);
};
