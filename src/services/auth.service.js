import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { env } from '../config/env.js'; // ✅ take variables from our validator, not directly from process.env
import * as userRepository from '../repositories/user.repository.js';
// ❗️For now, no database — fake user
export const register = async (email, password) => {
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

export const login = async (email, password) => {
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
