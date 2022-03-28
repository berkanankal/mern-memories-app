const Post = require("../models/Post");
const asyncHandler = require("express-async-handler");
const fs = require("fs");
const path = require("path");

const getAllPosts = asyncHandler(async (req, res, next) => {
  const posts = await Post.find();

  res.status(200).json({
    success: true,
    data: posts,
  });
});

const addPost = asyncHandler(async (req, res, next) => {
  const data = req.body;

  if (req.file) {
    data.photo = req.file.filename;
  }

  const post = await Post.create(data);

  res.status(201).json({
    success: true,
    data: post,
  });
});

const updatePost = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const data = req.body;

  if (req.file) {
    data.photo = req.file.filename;
    const oldPhoto = await Post.findById(id);
    if (oldPhoto.photo !== "default.png") {
      const rootDir = path.dirname(require.main.filename);
      fs.unlinkSync(path.join(rootDir, "/public/uploads", oldPhoto.photo));
    }
  }

  const post = await Post.findByIdAndUpdate(id, data, {
    new: true,
  });

  res.status(200).json({
    success: true,
    data: post,
  });
});

const deletePost = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const post = await Post.findByIdAndDelete(id);

  return res.status(200).json({
    success: true,
    data: post,
  });
});

const likePost = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const post = await Post.findById(id);

  post.likeCount += 1;
  post.save();

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

module.exports = {
  getAllPosts,
  addPost,
  updatePost,
  deletePost,
  likePost,
  deleteAll,
};
