const Post = require("../../models/Post");
const asyncHandler = require("express-async-handler");
const CustomError = require("../../helpers/error/CustomError");

const checkPostExists = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const post = await Post.findById(id);

  if (!post) {
    return next(new CustomError("Post not found", 404));
  }

  return next();
});

module.exports = { checkPostExists };
