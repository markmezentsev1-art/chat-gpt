export const getData = (req, res) => {
  const { name } = req.query;

  // Check: is the parameter present
  if (!name) {
    return res.status(400).json({ error: 'Name query parameter is required' });
  }

  // Check: minimum length
  if (name.length < 2) {
    return res
      .status(400)
      .json({ error: 'Name must be at least 2 characters long' });
  }

  // Check: only letters
  if (!/^[a-zA-Z]+$/.test(name)) {
    return res.status(400).json({ error: 'Name must contain only letters' });
  }

  // All good
  res.json({ message: `Hello, ${name}!` });
};
