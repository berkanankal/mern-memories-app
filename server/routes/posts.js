const express = require("express");
const {
  getAllPosts,
  addPost,
  updatePost,
  deletePost,
  deleteAll,
} = require("../controllers/posts");
const {
  checkPostExists,
} = require("../middlewares/database/databaseErrorHelpers");

const router = express.Router();

router.get("/", getAllPosts);
router.post("/", addPost);
router.put("/:id", checkPostExists, updatePost);
router.delete("/:id", checkPostExists, deletePost);
router.delete("/", deleteAll);

module.exports = router;
