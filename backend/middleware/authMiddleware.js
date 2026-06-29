// Placeholder auth middleware
const protect = (req, res, next) => {
  const token = req.headers.authorization;

  if (token && token.startsWith('Bearer')) {
    try {
      // Decode and verify token logic here
      req.user = { id: 'mock-user-id' };
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };
