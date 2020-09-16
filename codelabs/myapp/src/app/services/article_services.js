import errorMessages from '../../config/error.messages'
const ArticleModel = require('../database/models/article_model')
const UserModel = require('../database/models/user_model')

export function findAll({ limit = 50, offset = 0 } = {}) {
  return ArticleModel.find({})
}

export function findById(id) {
  return ArticleModel.findById(id).populate('user')
}

export function updatePost(postId, post) {
  return ArticleModel.findByIdAndUpdate(postId, post, { new: true })
}
export function deletePost(postId) {
  return ArticleModel.findByIdAndRemove(postId)
}
export function getPostByUser(userId, { limit = 50, offset = 0 } = {}) {
  return ArticleModel.find({ user: userId })
}
export async function createPost(post, userId) {
  const newPost = await ArticleModel.create(post)
  const id = newPost._id
  const user = await UserModel.findById(userId)
  if (!user) {
    throw new Error(errorMessages.USER_NOT_FOUND)
  }
  let postsArray = [...user.posts] || []
  postsArray.push(id)
  user.posts = [...postsArray]
  await user.save()
  newPost.user = userId
  return newPost.save()
}
