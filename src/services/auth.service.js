const jwt = require('jsonwebtoken');
const { env } = require('../config/env'); // TODO: использовать env из конфига, а не process.env напрямую
// ❗️Пока без базы — фейковый пользователь
const fakeUser = {
  id: 1,
  email: 'test@gmail.com',
  password: '123456', // ⚠️ только для обучения
};

exports.login = async (email, password) => {
  // 1. Проверяем email
  if (email !== fakeUser.email) {
    throw new Error('Invalid email or password');
  }

  // 2. Проверяем пароль
  if (password !== fakeUser.password) {
    throw new Error('Invalid email or password');
  }

  // 3. Генерируем JWT
  const token = jwt.sign(
    {
      id: fakeUser.id,
      email: fakeUser.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  // 4. "Сохраняем" — возвращаем клиенту
  return token;
};
