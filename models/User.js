import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  cart: [{ type: Number, ref: "Coin" }],
  wishlist: [{ type: Number, ref: "Coin" }],
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
