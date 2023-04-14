const router = require("express").Router();
const controller = require("../controllers");

router.post("/register", controller.auth.register);
router.post("/login", controller.auth.login);
router.get("/logout", controller.auth.logout);
router.get("/refresh", controller.auth.refresh);
module.exports = router;
