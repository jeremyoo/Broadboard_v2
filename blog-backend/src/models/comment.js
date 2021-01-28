import mongoose, { Schema } from 'mongoose';

const CommentSchema = new Schema({
    comment: String,
});

const Comment = mongoose.model('Comment', CommentSchema);
export default Comment;


// const PostSchema = new Schema({
//     title: String,
//     body: String,
//     tags: [String],
//     publishedDate: {
//       type: Date,
//       default: Date.now,
//     },
//     user: {
//       _id: mongoose.Types.ObjectId,
//       username: String,
//     },
//   });