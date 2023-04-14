const router = require("express").Router();
const controller = require("../controllers");

router.post("/add", controller.todo.addTodo);
router.delete("/delete", controller.todo.deleteTodo);
router.get("/get", controller.todo.getTodo);

module.exports = router;
