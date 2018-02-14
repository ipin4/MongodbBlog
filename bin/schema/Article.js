import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  owner: String,
  created_at: Date,
  updated_at: Date
});

export default mongoose.model('Article', articleSchema);
