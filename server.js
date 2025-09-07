import express from 'express';
import mongoose from 'mongoose';
import path, { dirname, join } from 'path';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import axios from 'axios';
import * as cheerio from 'cheerio';
import User from './models/User.js';
import Coin from './models/Coin.js';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5173;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Token blacklist (in-memory store)
const blacklistedTokens = new Set();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, username: user.username, role: user.role },
    process.env.JWT_SECRET || 'your_jwt_secret',
    { expiresIn: '1h' }
  );
};

// Middleware to check if token is blacklisted
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) return res.status(401).json({ success: false, message: 'Token required' });

  if (blacklistedTokens.has(token)) {
    return res.status(403).json({ success: false, message: 'Token has been invalidated' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret', (err, user) => {
    if (err) return res.status(403).json({ success: false, message: 'Invalid token' });
    req.user = user;
    next();
  });
};

const authorizeRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ success: false, message: 'Forbidden: insufficient rights' });
    }
    next();
  };
};

// Register
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, password, name, email } = req.body;

    if (!username || !password || !email || !name) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields.' });
    }

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Username or email already taken.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Assign role: "user" by default
    const newUser = new User({ 
      username, 
      password: hashedPassword, 
      name, 
      email, 
      role: "user" 
    });

    await newUser.save();

    const token = generateToken(newUser);

    res.json({
      success: true,
      message: 'User registered successfully.',
      token,
      redirect: '/home',
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Please provide username and password.' });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = generateToken(user);

    res.json({
      success: true,
      message: 'Logged in successfully.',
      token,
      redirect: '/home',
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Logout (blacklist token)
app.post('/api/auth/logout', (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return res.status(400).json({ success: false, message: 'No token provided' });
  }

  blacklistedTokens.add(token); // Blacklist the token

  res.json({ success: true, message: 'Logged out and token invalidated' });
});

// Get coins with optional limit
app.get("/api/coins", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const coins = await Coin.find().limit(limit);
    res.json(coins);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to fetch coins" });
  }
});

app.get('/api/coins-with-images', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 6;
    const coins = await Coin.find().limit(limit);

    // For each coin, fetch image from its Link field
    const coinsWithImages = await Promise.all(
      coins.map(async (coin) => {
        if (coin.Link) {
          try {
            const response = await axios.get(coin.Link);
            const $ = cheerio.load(response.data);

            // Look for main image in the page HTML
            const imgUrl = $('img[itemprop="image"]').attr('src') 
                        || $('img').first().attr('src');

            return { ...coin.toObject(), img: imgUrl || null };
          } catch (err) {
            console.error('Failed to fetch coin image for', coin.Name, err);
            return { ...coin.toObject(), img: null };
          }
        }
        return { ...coin.toObject(), img: null };
      })
    );

    res.json(coinsWithImages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to fetch coins with images' });
  }
});

app.get('/api/coins/slug/:slug', async (req, res) => {
  const slug = req.params.slug;
  const coins = await Coin.find();
  const match = coins.find(c => slugify(c.Name) === slug);
  if (!match) return res.status(404).json({ error: "Not found" });
  res.json(match);
});

// Get coin by ID
app.get("/api/coins/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const coin = await Coin.findById(id);
    if (!coin) {
      return res.status(404).json({ success: false, message: "Coin not found" });
    }
    res.json(coin);
  } catch (err) {
    console.error("Error fetching coin by ID:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.post('/api/user/cart/:coinId', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user.cart.includes(req.params.coinId)) {
      user.cart.push(req.params.coinId);
      await user.save();
    }
    res.json({ success: true, cart: user.cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to add to cart' });
  }
});

// Add to Wishlist
app.post('/api/user/wishlist/:coinId', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user.wishlist.includes(req.params.coinId)) {
      user.wishlist.push(req.params.coinId);
      await user.save();
    }
    res.json({ success: true, wishlist: user.wishlist });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to add to wishlist' });
  }
});

// Serve React static build
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(join(__dirname, '..', 'IMY320', 'dist')));

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, '..', 'IMY320', 'dist', 'index.html'));
});

// Example protected route
app.get('/api/protected', authenticateToken, (req, res) => {
  res.json({ message: `Hello ${req.user.username}, this is protected data.` });
});

app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '..', 'IMY320', 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
