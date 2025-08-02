import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },  // hashed password
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
