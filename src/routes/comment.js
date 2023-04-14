const router = require("express").Router();
const controller = require("../controllers");

router.post("/addComment/:postId", controller.comment.addComment);

module.exports = router;
