import express from 'express';
const authRoutes = express.Router();

// example routes
authRoutes.post('/login', (req, res) => {
  // your login logic here
  res.json({ message: 'Logged in' });
});

authRoutes.post('/logout', (req, res) => {
  // your logout logic here
  res.json({ message: 'Logged out' });
});

export default authRoutes;
