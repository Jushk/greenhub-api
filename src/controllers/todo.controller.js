const model = require("../models");

const addTodo = async (req, res) => {
  try {
    const { userId, todo } = req.body;
    console.log(userId, todo);
    const todos = await model.Todo.create({ author: userId, todo });
    console.log(todos);
    res.status(201).json();
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const deleteTodo = async (req, res) => {
  try {
    const { id } = req.query;
    console.log(id);
    await model.Todo.findByIdAndDelete(id);

    res.status(200).json();
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getTodo = async (req, res) => {
  try {
    const { userId } = req.query;
    const todos = await model.Todo.find({ author: userId }).sort({
      createdAt: -1,
    });
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { addTodo, deleteTodo, getTodo };
