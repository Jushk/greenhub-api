const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    course: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
    },
    tags: {
      type: [String],
    },
    profilePicture: {
      type: String,
    },
    refreshToken: {
      type: Schema.Types.ObjectId,
      ref: "RefreshToken",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", userSchema);
