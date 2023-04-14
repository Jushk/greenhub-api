const express = require("express");
const router = express.Router();
const authorizedToken = require("../middlewares/authorizedToken");
const authRoute = require("./auth");
const userRoute = require("./user");
const postRoute = require("./post");
const commentRoute = require("./comment");
const todoRoute = require("./todo");
router.use("/api/v1/auth", authRoute);

router.use(authorizedToken);
router.use("/api/v1/post", postRoute);
router.use("/api/v1/comment", commentRoute);
router.use("/api/v1", userRoute);
router.use("/api/v1/todo", todoRoute);

module.exports = router;
