const router = require("express").Router();
const controller = require("../controllers");

router.post("/newPost", controller.post.newPost);
router.get("/getPost", controller.post.getAllPosts);
router.get("/view/:postId", controller.post.viewPost);
router.get("/my/:authorId", controller.post.myPost);
router.put("/edit-post/:postId", controller.post.editPost);
router.delete("/delete-post/:postId", controller.post.deletePost);

module.exports = router;
