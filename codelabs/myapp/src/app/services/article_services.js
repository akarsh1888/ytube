import errorMessages from '../../config/error.messages'
import Article from '../models/article_model'
import User from '../models/user_model'

export function findAll({ limit = 50, offset = 0 } = {}) {
  return Article.find({}).exec()
}

export function findById(id) {
  return Article.findById(id).populate('user')
}

export function updatePost(postId, post) {
  return Article.findByIdAndUpdate(postId, post, { new: true })
}
export function deletePost(postId) {
  return Article.findByIdAndRemove(postId)
}
export function getPostByUser(userId, { limit = 50, offset = 0 } = {}) {
  return Article.find({ user: userId })
}
export async function createPost(post, userId) {
  const newPost = await Article.create(post)
  const id = newPost._id
  const user = await User.findById(userId)
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
