import errorMessages from '../../config/error.messages'
import * as postService from '../services/post.services'

const postCtrl = {
  create: async (req, res, next) => {
    try {
      const post = req.body.post
      const { id } = req.user
      const data = await postService.createPost(post, id)
      res.status(200).json(data)
    } catch (err) {
      res.status(500).send(errorMessages.SERVER_ERROR)
    }
  },

  // get all artticles
  listAll: async (req, res, next) => {
    try {
      const { id } = req.user
      const data = await postService.listAll(id)
      res.status(200).json(data)
    } catch (err) {
      // next(err);  u can choose either this OR below for error handling
      // it will pass to the next middleware which we registered after all routes on the base page
      // error handling 1>>> custom middleware 2>>>> normal error response
      res.status(500).send(errorMessages.SERVER_ERROR)
    }
  },

  // update one article
  put: async (req, res, next) => {
    const postId = req.params.postId
    const { article } = req.body
    try {
      const data = await postService.updatePost(postId, article)
      res.status(200).json(data)
    } catch (err) {
      res.status(500).send(err.message)
    }
  },
  delete: async (req, res) => {
    const { postId } = req.params
    try {
      const data = await postService.deletePost(postId)
      res.status(200).json(data)
    } catch (err) {
      res.status(500).send(errorMessages.SERVER_ERROR)
    }
  },

  getPostByTitle: async (req, res, next) => {
    const { keyword } = req.query
    try {
      const data = await postService.getPostByTitle(keyword)
      res.status(200).send(data)
    } catch (err) {
      res.status(500).send(errorMessages.SERVER_ERROR)
    }
  },
  getPostByContentLength: async (req, res, next) => {
    const { min, max } = req.query
    try {
      const data = await postService.getPostByContentLength(min, max)
      res.status(200).send(data)
    } catch (err) {
      res.status(500).send(errorMessages.SERVER_ERROR)
    }
  },
  getTotalPostCountByUser: async (req, res, next) => {
    try {
      const { id } = req.user
      const data = await postService.getTotalPostCountByUser(id)
      res.status(200).json(data)
    } catch (err) {
      res.status(500).send(errorMessages.SERVER_ERROR)
    }
  },
}

export default postCtrl
