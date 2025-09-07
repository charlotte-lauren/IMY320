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

app.get("/api/coins/search", async (req, res) => {
  console.log("Search query received:", req.query.query, "Limit:", req.query.limit);
  try {
    const search = (req.query.query || "").trim();

    if (!search) {
      return res.status(400).json({ success: false, message: "Query cannot be empty" });
    }

    const limit = parseInt(req.query.limit) || 20;

    // Sanitize search: allow letters, numbers, spaces, colons, dashes
    const sanitizedSearch = search.replace(/[^a-zA-Z0-9 :\-]/g, "");

    // Escape regex-special characters except allowed ones
    const escapedSearch = sanitizedSearch.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    const regex = new RegExp(escapedSearch, "i");

    const coins = await Coin.find({
      $or: [{ Name: regex }, { Country: regex }]
    }).limit(limit);

    res.json(coins);
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ success: false, message: "Failed to search coins" });
  }
});

// Get coin by ID
app.get("/api/coins/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const numericId = Number(id);
    if (isNaN(numericId)) {
      return res.status(400).json({ success: false, message: "Invalid coin ID" });
    }

    const coin = await Coin.findById(numericId);
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

app.get('/api/user/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('wishlist'); 
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    res.json({
      username: user.username,
      name: user.name,
      email: user.email,
      role: user.role,            // <-- add this line
      img: user.img || '',        
      wishlist: user.wishlist,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Remove from Wishlist
app.delete('/api/user/wishlist/:coinId', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.wishlist = user.wishlist.filter(id => id.toString() !== req.params.coinId);
    await user.save();
    res.json({ success: true, wishlist: user.wishlist });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to remove from wishlist' });
  }
});

// Remove from Cart
app.delete('/api/user/cart/:coinId', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    // Filter out the coinId to remove it
    user.cart = user.cart.filter(id => id.toString() !== req.params.coinId);
    await user.save();
    res.json({ success: true, cart: user.cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to remove from cart' });
  }
});

// Get user's cart with populated coins
app.get('/api/user/cart', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('cart'); // populate cart coins
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    res.json({
      username: user.username,
      img: user.img || '',
      cart: user.cart,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.delete('/api/user/cart', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.cart = []; // empty the cart
    await user.save();
    res.json({ success: true, cart: [] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to clear cart' });
  }
});

const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Admins only' });
  }
  next();
};

// Add a coin
app.post('/api/admin/coin', authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const { Name, Country, FaceValue, Currency, Link, IssuedOn } = req.body;
    if (!Name || !Country) return res.status(400).json({ success: false, message: 'Name and Country required' });

    const lastCoin = await Coin.findOne().sort({ _id: -1 });
    const newId = lastCoin ? lastCoin._id + 1 : 1;

    const coin = new Coin({ _id: newId, Name, Country, FaceValue, Currency, Link, "Issued on": IssuedOn ? Number(IssuedOn) : undefined });
    await coin.save();
    res.json({ success: true, coin });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to add coin' });
  }
});

// Request admin
app.post('/api/user/request-admin', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.role === 'admin') return res.status(400).json({ success: false, message: 'Already an admin' });
    if (user.pendingAdmin) return res.status(400).json({ success: false, message: 'Request already pending' });

    user.pendingAdmin = true;
    await user.save();
    res.json({ success: true, message: 'Admin request submitted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to submit admin request' });
  }
});

// Get pending admin requests
app.get('/api/admin/pending-requests', authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const pendingUsers = await User.find({ pendingAdmin: true });
    res.json({ success: true, pending: pendingUsers });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to fetch pending requests' });
  }
});

// Approve admin request
app.post('/api/admin/approve/:userId', authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user || !user.pendingAdmin) return res.status(404).json({ success: false, message: 'No pending request found' });

    user.role = 'admin';
    user.pendingAdmin = false;
    await user.save();
    res.json({ success: true, message: `${user.username} is now an admin` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to approve admin' });
  }
});

// Reject admin request
app.post('/api/admin/reject/:userId', authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user || !user.pendingAdmin) return res.status(404).json({ success: false, message: 'No pending request found' });

    user.pendingAdmin = false; // reset flag
    await user.save();
    res.json({ success: true, message: `Admin request for ${user.username} rejected` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to reject admin request' });
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
