const asyncHandler = require("express-async-handler");
const { User } = require("../models/User");
const { Resume } = require("../models/Resume");
const ErrorResponse = require("../utils/errorResponse");
const generateToken = require("../config/generateToken");

const register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return next(new ErrorResponse("Please fill in all fields", 400));
  }

  const userExists = await User.findOne({ email: email });

  if (userExists) {
    return next(new ErrorResponse("User already exists", 400));
  }

  try {
    const user = await User.create({
      name,
      email,
      password,
    });

    await Resume.create({
      userId: user._id,
      contact: {},
      skills: [],
      experience: [],
      education: [],
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        token: generateToken(user._id),
      });
    }
  } catch (err) {
    next(new ErrorResponse(`${err.message}`, 500));
  }
});

const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorResponse("Please fill in all fields", 400));
  }

  const user = await User.findOne({ email: email });

  if (user && (await user.matchPasswords(password))) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      token: generateToken(user._id),
    });
  } else {
    return next(new ErrorResponse("Invalid email of password", 401));
  }
});

module.exports = { register, login };
