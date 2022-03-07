const Post = require("../models/Post");
const asyncHandler = require("express-async-handler");

const getAllPosts = asyncHandler(async (req, res, next) => {
  const posts = await Post.find();

  res.status(200).json({
    success: true,
    data: posts,
  });
});

const addPost = asyncHandler(async (req, res, next) => {
  const data = req.body;

  const post = await Post.create(data);

  res.status(201).json({
    success: true,
    data: post,
  });
});

module.exports = { getAllPosts, addPost };
