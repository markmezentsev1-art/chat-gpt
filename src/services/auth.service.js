const jwt = require('jsonwebtoken');
const { env } = require('../config/env'); // ✅ берем переменные из нашего валидатора, а не напрямую из process.env

// ❗️Пока без базы — фейковый пользователь
const fakeUser = {
  id: 1,
  email: 'test@gmail.com',
  password: '123456', // ⚠️ только для обучения
};

exports.login = async (email, password) => {
  // 1️⃣ Проверяем email
  if (email !== fakeUser.email) {
    // Если email не совпадает — бросаем ошибку
    throw new Error('Invalid email or password');
  }

  // 2️⃣ Проверяем пароль
  if (password !== fakeUser.password) {
    // Если пароль не совпадает — бросаем ошибку
    throw new Error('Invalid email or password');
  }

  // 3️⃣ Генерируем JWT с данными пользователя
  const token = jwt.sign(
    {
      id: fakeUser.id,
      email: fakeUser.email,
    },
    env.JWT_SECRET, // ✅ используем конфиг вместо process.env
    { expiresIn: '15d' } // токен действителен 1 час
  );

  // 4️⃣ Возвращаем токен клиенту
  return token;
};
