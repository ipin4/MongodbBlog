import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  created_at: Date,
});

export default mongoose.model('User', userSchema);
