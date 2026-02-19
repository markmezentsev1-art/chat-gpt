const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { env } = require('../config/env'); // ✅ take variables from our validator, not directly from process.env
const userRepository = require('../repositories/user.repository');
// ❗️For now, no database — fake user
exports.register = async (email, password) => {
  const existingUser = await userRepository.findByEmail(email);

  if (existingUser) {
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  return userRepository.createUser({
    email,
    password: hashedPassword,
  });
};

exports.login = async (email, password) => {
  const user = await userRepository.findByEmail(email);

  if (!user) {
    throw new Error('Invalid email or password');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error('Invalid email or password');
  }

  const token = jwt.sign({ id: user.id, email: user.email }, env.JWT_SECRET, {
    expiresIn: '15d',
  });

  return token;
};
