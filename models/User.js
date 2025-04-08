const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  walletAddress: { type: String, required: true, unique: true },
  bio: String,
  profilePic: String,
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
