const express = require("express");
const { getAllPosts, addPost, deleteAll } = require("../controllers/posts");

const router = express.Router();

router.get("/", getAllPosts);
router.post("/", addPost);
router.delete("/", deleteAll);

module.exports = router;
