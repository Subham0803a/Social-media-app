const express = require("express");
const protectRoute = require("../middlewares/protectRoute.js");

const {
    createPost,
    getPost,
    deletePost,
    likeUnlikePost,
    replyToPost,
    getFeedPosts,

} = require("../controllers/postController.js");
 
const router = express.Router();


router.get("/:id", getPost);
router.get("/feed", protectRoute, getFeedPosts);
router.post("/create", protectRoute, createPost);
router.delete("/:id", protectRoute, deletePost);
router.post("/like/:id", protectRoute, likeUnlikePost);
router.post("/reply/:id", protectRoute, replyToPost);
 

module.exports = router;