const express = require('express');
const {getAllPosts, getPostsByCategory, createPost} = require('../controllers/postController');
const postRouter = express.Router();
postRouter.get('/posts', getAllPosts);
postRouter.get('/:id', getPostsByCategory);
postRouter.post('/post',createPost);

module.exports = postRouter;

