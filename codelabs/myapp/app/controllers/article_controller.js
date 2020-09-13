import errorMessages from "../../config/error.messages";
import * as articleService from "../services/article_services";

const operations = {
  // get all artticles
  list: async (req, res, next) => {
    try {
      const data = await articleService.findAll();
      res.status(200).json(data);
    } catch (err) {
      // next(err);  u can choose either this OR below for error handling
      // error handling 1>>> custom middleware 2>>>> normal error response
      res.status(500).send(errorMessages.SERVER_ERROR);
    }
  },
  // get one article
  get: async (req, res, next) => {
    const postId = req.params.articleId;
    try {
      const data = await articleService.findById(postId);
      res.status(200).json(data);
    } catch (err) {
      // next(err);  u can choose either this OR below for error handling
      // error handling 1>>> custom middleware 2>>>> normal error response
      res.status(500).send(errorMessages.SERVER_ERROR);
    }
  },
  // update one article
  update: async (req, res, next) => {
    const postId = req.params.articleId;
    const post = req.body;
    post.id = postId;
    try {
      const data = await articleService.updatePost(post);
      res.status(200).json(data);
    } catch (err) {
      res.status(500).send(errorMessages.SERVER_ERROR);
    }
  },
  delete: async (req, res) => {
    const { articleId } = req.params;
    console.log("HI", articleId);
    try {
      const data = await articleService.deletePost(articleId);
      res.status(200).json(data);
    } catch (err) {
      res.status(500).send(errorMessages.SERVER_ERROR);
    }
  },
  // get a post by a user
  // /api/users/:userid/articles  GET
  getPostByUser: async (req, res, next) => {
    const { userId } = req.params;
    try {
      const data = await articleService.getPostByUser(userId, req.query);
      res.status(200).json(data);
    } catch (err) {
      res.status(500).send(errorMessages.SERVER_ERROR);
    }
  },
  // create a post by a user
  // /api/users/:userid/articles  POST
  create: async (req, res, next) => {
    try {
      const post = req.body;
      const { userId } = req.params;
      const data = await articleService.createPost(post, userId);
      res.status(200).json(data);
    } catch (err) {
      res.status(500).send(errorMessages.SERVER_ERROR);
    }
  },
};

export default operations;
