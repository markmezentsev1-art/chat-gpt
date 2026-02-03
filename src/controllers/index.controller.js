exports.getData = (req, res) => {
  const { name } = req.query;

  // Проверка: есть ли параметр
  if (!name) {
    return res.status(400).json({ error: 'Name query parameter is required' });
  }

  // Проверка: минимальная длина
  if (name.length < 2) {
    return res.status(400).json({ error: 'Name must be at least 2 characters long' });
  }

  // Проверка: только буквы
  if (!/^[a-zA-Z]+$/.test(name)) {
    return res.status(400).json({ error: 'Name must contain only letters' });
  }

  // Всё ок
  res.json({ message: `Hello, ${name}!` });
};

