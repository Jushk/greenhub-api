const model = require("../models");
const newPost = async (req, res) => {
  try {
    const { author, title, content, picture } = req.body;
    // Create a new post document
    const post = new model.Post({
      author,
      title,
      content,
      picture,
    });

    await post.save();

    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
const getAllPosts = async (req, res) => {
  try {
    const posts = await model.Post.find()
      .populate("author", "name profilePicture")
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
const viewPost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await model.Post.findById(postId)
      .populate("author", "name")
      .populate({
        path: "comments",
        populate: {
          path: "author",
          select: "name",
        },
      });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const editPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { title, content } = req.body;
    // Find the post to be updated by ID
    const post = await model.Post.findById(postId);

    // Update the post's title and content
    post.title = title;
    post.content = content;

    // Save the updated post to the database
    await post.save();
    res.status(200).json({ message: "Edit success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Edit unsuccessful" });
  }
};
const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;

    await model.Comment.deleteMany({ postId });
    const deletedPost = await model.Post.findByIdAndDelete(postId);
    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Delete unsuccessful" });
  }
};
const myPost = async (req, res) => {
  try {
    const { authorId } = req.params;
    const posts = await model.Post.find({ author: authorId })
      .sort({
        createdAt: -1,
      })
      .populate("author", "profilePicture");
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
module.exports = {
  newPost,
  getAllPosts,
  viewPost,
  myPost,
  editPost,
  deletePost,
};
