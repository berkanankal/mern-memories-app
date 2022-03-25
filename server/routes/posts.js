const express = require("express");
const {
  getAllPosts,
  addPost,
  updatePost,
  deletePost,
  likePost,
  deleteAll,
} = require("../controllers/posts");
const {
  checkPostExists,
} = require("../middlewares/database/databaseErrorHelpers");
const upload = require("../helpers/libraries/multer");

const router = express.Router();

router.get("/", getAllPosts);
router.post("/", upload.single("photo"), addPost);
router.put("/:id", [checkPostExists, upload.single("photo")], updatePost);
router.delete("/:id", checkPostExists, deletePost);
router.put("/:id/like", checkPostExists, likePost);
router.delete("/", deleteAll);

module.exports = router;
