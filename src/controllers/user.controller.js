const model = require("../models");
const bcrypt = require("bcrypt");
const getAllUsers = async (req, res) => {
  try {
    const users = await model.User.find();
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error", error: err });
  }
};

const getUser = async (req, res) => {
  const username = req.params.username;
  try {
    const user = await model.User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const editUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const respo = await model.User.findByIdAndUpdate(
      userId,
      {
        name: req.body.name,
        username: req.body.username,
        course: req.body.course,
        tags: req.body.tags,
        bio: req.body.bio,
        profilePicture: req.body.profilePicture,
      },
      { new: true }
    );
    console.log(respo);
    res.status(200).json({ message: "Updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { password } = req.body;
    const user = await model.User.findById(userId);
    if (!user) {
      return res.status(401).json({ message: "User not found :<" });
    }
    const isPasswordMatch = await verifyPassword(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Wrong password" });
    }
    await model.Post.deleteMany({ author: userId });
    await model.Comment.deleteMany({ author: userId });
    await model.User.findByIdAndDelete(userId);

    return res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error", error: err });
  }
};

const searchAll = async (req, res) => {
  try {
    const searchValue = req.query.query;
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const posts = await model.Post.find({
      $or: [
        { title: { $regex: searchValue, $options: "i" } },
        { content: { $regex: searchValue, $options: "i" } },
      ],
    })
      .populate("author", "name")
      .limit(limit);

    const users = await model.User.find({
      $or: [
        { name: { $regex: searchValue, $options: "i" } },
        { username: { $regex: searchValue, $options: "i" } },
      ],
    }).limit(limit);
    const searchResults = [
      ...posts.map((post) => ({ ...post.toObject(), type: "post" })),
      ...users.map((user) => ({ ...user.toObject(), type: "user" })),
    ];
    res.json(searchResults);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", error: error });
  }
};
const verifyPassword = async (password, userPassword) => {
  return bcrypt.compare(password, userPassword);
};

module.exports = {
  getAllUsers,
  getUser,
  editUser,
  deleteUser,
  searchAll,
};
