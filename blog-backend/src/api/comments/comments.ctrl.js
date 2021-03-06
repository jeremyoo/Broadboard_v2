import Joi from '@hapi/joi';
import Comment from '../../models/comment';
import Post from '../../models/post';
import mongoose from 'mongoose';

const { ObjectId } = mongoose.Types;

// get commentbyID function
export const getCommentById = async (ctx, next) => {
    const { id } = ctx.params;
    if (!ObjectId.isValid(id)) {
        ctx.status = 400; // bad request;
        return;
    }
    try {
        const comment = await Comment.findById(id);
        if (!comment) {
            ctx.status = 404; // Not found;
            return;
        };
        ctx.state.comment = comment;
        return next();
    } catch (e) {
        ctx.throw(500, e);
    }
}
// check own comment function
export const checkOwnComment = async (ctx, next) => {
    const { comment, user } = ctx.state;
    if (comment.user._id.toString() !== user._id) {
        ctx.status = 403;
        return;
    }
    return next();
}

/*
  POST /api/:id/comments
  {
    body: 'comment',
    user: {_id:'', username:''},
    post: {_id:''}
  }
*/
export const write = async (ctx) => {
    const schema = Joi.object().keys({
        body: Joi.string().required(),
    });
    const result = schema.validate(ctx.request.body);
    if (result.error) {
        ctx.status = 400 // bad request;
        ctx.body = result.error;
    }
    const { body } = ctx.request.body;
    const { id } = ctx.params;
    if (!ObjectId.isValid(id)) {
        ctx.status = 400; // bad request;
        return;
    }
    const post = await Post.findById(id);
    const comment = new Comment({
        body: body,
        user: ctx.state.user,
        post: post,
    });
    try {
        await comment.save();
        ctx.body = comment;
    } catch (e) {
        ctx.throw(500, e);
    }
};

/*
  GET /api/:id/comments
*/
export const list = async (ctx) => {
    const { id } = ctx.params
    if (!ObjectId.isValid(id)) {
        ctx.status = 400; // bad request;
        return;
    }
    try {
        const comments = await Comment.find({ post: { _id: ObjectId(id)} })
            .sort({ publishedDate: -1 })
            .lean() // JSON
            .exec();
        ctx.body = comments;
    } catch (e) {
        ctx.throw(500, e);
    }
};

/*
  GET /api/:id/comments/:id
*/
export const read = async (ctx) => {
    ctx.body = ctx.state.comment;
};

/*
  DELETE /api/comments/:id
*/
export const remove = async (ctx) => {
    const { id } = ctx.params;
    try {
        await Comment.findByIdAndDelete(id).exec();
        ctx.status = 204 // No content
    } catch (e) {
        ctx.throw(500, e);
    }
};

/*
  PATCH /api/:id/comments/:id
*/
export const update = async (ctx) => {
    const { id } = ctx.params;
    const schema = Joi.object().keys({
        body: Joi.string().required(),
    });
    const result = schema.validate(ctx.request.body);
    if (result.error) {
        ctx.status = 400; // bad request
        ctx.body = result.error;
        return;
    }
    ctx.request.body.updatedDate = Date.now();
    const nextData = {...ctx.request.body};
    try {
        const comment = await Comment.findByIdAndUpdate(id, nextData, {
            new: true,
        }).exec();
        if (!comment) {
            ctx.status = 404; // not found
            return;
        }
        ctx.body = comment;
    } catch (e) {
        ctx.throw(500, e);
    }
};
