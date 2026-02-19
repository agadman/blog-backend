const User = require('../models/user.model');
const Jwt = require('@hapi/jwt');
const bcrypt = require('bcrypt');
require('dotenv').config();

// Registrera ny user
exports.registerUser = async (request, h) => {
  try {
    const { username, email, password } = request.payload;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return h.response({ message: 'Email already in use' }).code(400);
    }

    const user = new User({ username, email, password });
    const savedUser = await user.save();

    return h.response({
      id: savedUser._id,
      username: savedUser.username,
      email: savedUser.email,
      createdAt: savedUser.createdAt
    }).code(201);

  } catch (error) {
    console.error(error);
    return h.response({ message: error.message }).code(500);
  }
};

// Login
exports.loginUser = async (request, h) => {
  const { email, password } = request.payload;

  try {
    const user = await User.findOne({ email }).select('+password'); 
    if (!user) return h.response({ message: 'Invalid email or password' }).code(401);

    const correctPassword = await bcrypt.compare(password, user.password);
    if (!correctPassword) return h.response({ message: 'Invalid email or password' }).code(401);

const token = generateToken(user);

request.cookieAuth.set({
  id: user._id.toString(),
  username: user.username,
  email: user.email
});

return h.response({
  user: { id: user._id, username: user.username, email: user.email }
});

  } catch (error) {
    console.error(error);
    return h.response({ message: error.message }).code(500);
  }
};

// Uppdatera egen user
exports.updateUser = async (request, h) => {
  try {
    const userId = request.auth.credentials.id;
    const updates = request.payload;

    // Om lösenord ska uppdateras, hash det
    if (updates.password) {
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(updates.password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true,
      select: '-password'
    });

    return h.response(updatedUser).code(200);
  } catch (error) {
    console.error(error);
    return h.response({ message: error.message }).code(500);
  }
};

// Ta bort egen user
exports.deleteUser = async (request, h) => {
  try {
    const userId = request.auth.credentials.id;

    await User.findByIdAndDelete(userId);

    return h.response({ message: 'User deleted' }).code(200);
  } catch (error) {
    console.error(error);
    return h.response({ message: error.message }).code(500);
  }
};

// Skapa JWT
const generateToken = (user) => {
  return Jwt.token.generate(
    {
      user: {
        id: user._id.toString(),
        email: user.email,
        username: user.username
      }
    },
    { key: process.env.JWT_SECRET, algorithm: 'HS256' },
    { ttlSec: 24 * 60 * 60 }
  );
};