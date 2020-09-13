const ArticleModel = require("../database/models/article_model");
const UserModel = require("../database/models/user_model");
import errorMessages from "../../config/error.messages";

export async function findAll({ limit = 50, offset = 0 } = {}) {
  return await ArticleModel.find({});
}

export async function findById(id) {
  return await ArticleModel.findById(id).populate("user");
}

export async function updatePost(post) {
  const { id, title, content } = post;
  return await ArticleModel.findByIdAndUpdate(id, {
    title: title,
    content: content,
  });
}
export async function deletePost(postId) {
  return await ArticleModel.findByIdAndRemove(postId);
}
export async function getPostByUser(userId, { limit = 50, offset = 0 } = {}) {
  return await ArticleModel.find({ user: userId });
}
export async function createPost(post, userId) {
  const newPost = await ArticleModel.create(post);
  const id = newPost._id;
  const user = await UserModel.findById(userId);
  if (!user) {
    throw new Error(errorMessages.USER_NOT_FOUND);
  }
  let postsArray = [...user.posts] || [];
  postsArray.push(id);
  user.posts = [...postsArray];
  await user.save();
  newPost.user = userId;
  return await newPost.save();
}
