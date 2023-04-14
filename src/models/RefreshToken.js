const { Schema, model } = require("mongoose");

const refreshTokenSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 604800 },
});

module.exports = model("RefreshToken", refreshTokenSchema);
