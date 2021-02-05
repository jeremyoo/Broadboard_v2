import mongoose, { Schema } from 'mongoose';

const PostSchema = new Schema({
  title: String,
  body: String,
  tags: [String],
  publishedDate: {
    type: Date,
    default: Date.now,
  },
  updatedDate: {
    type: Date,
  },
  user: {
    _id: mongoose.Types.ObjectId,
    username: String,
    nickname: String,
  },
  likes_count: Number,
  like_users: [String],
});

const Post = mongoose.model('Post', PostSchema);
export default Post;
