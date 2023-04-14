const model = require("../models");

const addComment = async (req, res) => {
  try {
    const postId = req.params.postId;
    const { author, content } = req.body;

    const comment = new model.Comment({
      author: author,
      content: content,
    });

    const post = await model.Post.findById(postId);
    post.comments.push(comment);
    await comment.save();
    await post.save();

    res.status(200).json({ message: "Comment added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  addComment,
};
