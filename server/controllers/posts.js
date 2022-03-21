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

const updatePost = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const data = req.body;

  const post = await Post.findByIdAndUpdate(id, data, {
    new: true,
  });

  res.status(200).json({
    success: true,
    data: post,
  });
});

const deleteAll = asyncHandler(async (req, res, next) => {
  await Post.deleteMany();

  res.status(200).json({
    success: true,
    message: "Delete all",
  });
});

module.exports = { getAllPosts, addPost, updatePost, deleteAll };
