require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const model = require("../models");
const { generateAccessToken, generateRefreshToken } = require("../tokens");

const register = async (req, res) => {
  try {
    const { name, username, password, course } = req.body;
    const existingUser = await model.User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username taken" });
    }
    const hashPassword = await encryptPassword(password);
    const newUser = new model.User({
      name,
      username,
      password: hashPassword,
      course,
    });

    const saveUser = await newUser.save();
    const accessToken = generateAccessToken(newUser._id);
    const refreshToken = generateRefreshToken(newUser._id);

    const newRefreshToken = new model.RefreshToken({
      userId: saveUser._id,
      token: refreshToken,
    });
    saveUser.refreshToken = newRefreshToken._id;

    await newRefreshToken.save();
    await saveUser.save();

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 7000,
    });
    res.status(200).json({
      accessToken: accessToken,
      user: saveUser,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error", error: err });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await model.User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    const isPasswordMatch = await verifyPassword(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);
    const existingRefreshToken = await model.RefreshToken.findOne({
      userId: user._id,
    });

    if (existingRefreshToken) {
      await model.RefreshToken.deleteOne({ _id: existingRefreshToken._id });
    }

    const newRefreshToken = new model.RefreshToken({
      userId: user._id,
      token: refreshToken,
    });
    user.refreshToken = newRefreshToken._id;

    await newRefreshToken.save();
    await user.save();

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 7000,
    });

    res.status(200).json({
      accessToken: accessToken,
      user: user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error", error: err });
  }
};

const logout = async (req, res) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.status(401);
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    const userId = req.query.userId;
    const existingRefreshToken = await model.RefreshToken.findOne({ userId });
    if (!existingRefreshToken) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }
    await model.RefreshToken.deleteOne({ _id: existingRefreshToken._id });
    const user = await model.User.findById(userId);
    user.refreshToken = null;
    await user.save();
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const refresh = async (req, res) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.status(401);
    const refreshToken = cookies.jwt;

    const existingRefreshToken = await model.RefreshToken.findOne({
      token: refreshToken,
    });
    if (!existingRefreshToken) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err) return res.status(401).json({ message: "Unauthorized" });
        const accessToken = generateAccessToken(decoded.userId);
        res.status(200).json({ accessToken: accessToken });
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error", error: err });
  }
};

const encryptPassword = async (password) => {
  return bcrypt.hash(password, 10);
};

const verifyPassword = async (password, userPassword) => {
  return bcrypt.compare(password, userPassword);
};

module.exports = {
  register,
  login,
  logout,
  refresh,
};
