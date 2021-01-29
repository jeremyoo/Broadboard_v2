import mongoose, { Schema } from 'mongoose';

const CommentSchema = new Schema({
    comment: String,
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
    },
    post: {
        _id: mongoose.Types.ObjectId,
    }
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