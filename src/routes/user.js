const router = require("express").Router();
const controller = require("../controllers");

router.get("/users", controller.user.getAllUsers);
router.put("/update/:userId", controller.user.editUser);
router.get("/user/:username", controller.user.getUser);
router.delete("/delete/:userId", controller.user.deleteUser);
router.get("/search", controller.user.searchAll);

module.exports = router;
