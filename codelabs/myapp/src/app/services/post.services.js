import Auth from '../models/auth.model'
import Post from '../models/post.model'
import Profile from '../models/profile.model'

export async function createPost(post, userId) {
  const { profile } = await Auth.findById(userId)
  const newPost = await Post.create({ ...post, profile: profile })
  const id = newPost._id
  const w = await Profile.findByIdAndUpdate(
    profile,
    {
      $push: { posts: id },
    },
    { new: true }
  ).exec()
  return newPost

  // const user = await User.findById(userId)
  // if (!user) {
  //   throw new Error(errorMessages.USER_NOT_FOUND)
  // }
  // let postsArray = [...user.posts] || []
  // postsArray.push(id)
  // user.posts = [...postsArray]
  // await user.save()
  // newPost.user = userId
  // return newPost.save()
}

export async function listAll(id) {
  const { profile } = await Auth.findById(id)
  return Post.find({ profile: profile }).exec()
}

export function updatePost(postId, post) {
  return Post.findByIdAndUpdate(postId, post, { new: true }).exec()
}
export async function deletePost(postId) {
  const post = await Post.findByIdAndRemove(postId)
  const w = await Profile.findByIdAndUpdate(
    post.profile,
    {
      $pull: { posts: postId },
    },
    { new: true }
  ).exec()
  return post
}

export function getPostByTitle(keyword) {
  return Post.find({ title: { $regex: keyword, $options: 'i' } })
}

export function getPostByContentLength(min, max) {
  return Post.find({
    contentLength: {
      $gt: min,
      $lt: max,
      // $or :[9,15,25]
    },
  })
}


export async function getTotalPostCountByUser(id) {
  const { profile } = await Auth.findById(id)
  const info = await Profile.findById(profile)
  return info.totalPostCount
}
