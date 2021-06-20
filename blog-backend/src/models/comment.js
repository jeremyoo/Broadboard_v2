import mongoose, { Schema } from 'mongoose';

const CommentSchema = new Schema({
    body: String,
    publishedDate: {
        type: Date,
        default: Date.now,
    },
    updatedDate: {
        type: Date,
    },
    user: {
        _id: mongoose.Types.ObjectId,
        nickname: String,
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: "Post",
        required: true,
    }
});

const Comment = mongoose.model('Comment', CommentSchema);
export default Comment;