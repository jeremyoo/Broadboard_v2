import Post from '../../models/post';
import User from '../../models/user';
import mongoose from 'mongoose';
import Joi from '@hapi/joi';
import sanitizeHtml from 'sanitize-html';

const { ObjectId } = mongoose.Types;

const sanitizeOption = {
  allowedTags: [
    'h1',
    'h2',
    'br',
    'b',
    'i',
    'u',
    's',
    'p',
    'ul',
    'ol',
    'li',
    'strong',
    'em',
    'blockquote',
    'a',
    'img',
  ],
  allowedAttributes: {
    a: ['href', 'name', 'target'],
    img: ['src'],
    li: ['class'],
  },
  allowedSchemes: ['data', 'http', 'https'],
};

// get postbyID function
export const getPostById = async (ctx, next) => {
  const { id } = ctx.params;
  if (!ObjectId.isValid(id)) {
    ctx.status = 400; // Bad Request
    return;
  }
  try {
    const post = await Post.findById(id);
    if (!post) {
      ctx.status = 404; // Not Found
      return;
    }
    ctx.state.post = post;
    return next();
  } catch (e) {
    ctx.throw(500, e);
  }
};
// get own post function
export const checkOwnPost = (ctx, next) => {
  const { user, post } = ctx.state;
  if (post.user._id.toString() !== user._id) {
    ctx.status = 403;
    return;
  }
  return next();
};

/*
  POST /api/posts
  {
    title: 'title',
    body: 'post',
    tags: ['tag1', 'tag2']
  }
*/
export const write = async (ctx) => {
  const schema = Joi.object().keys({
    title: Joi.string().max(100).required(),
    banner: Joi.string(),
    body: Joi.string().required(),
    tags: Joi.array().items(Joi.string().max(20)).required(),
  });
  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400; // Bad Request
    ctx.body = result.error;
    return;
  }
  const { title, body, tags, banner } = ctx.request.body;
  const post = new Post({
    title,
    banner,
    body: sanitizeHtml(body, sanitizeOption),
    tags,
    user: ctx.state.user,
    likes_count: 0,
    like_users: [],
  });
  try {
    await post.save();
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};

// shorten body for postlists
const removeHtmlAndShortenProfile = body => {
  const filtered = sanitizeHtml(body, {
    allowedTags: [],
  });
  return filtered.length < 200 ? filtered : `${filtered.slice(0, 200)}...`;
}

// shorten body for postlists
const removeHtmlAndShortenList = body => {
  const filtered = sanitizeHtml(body, {
    allowedTags: [],
  });
  return filtered.length < 125 ? filtered : `${filtered.slice(0, 125)}...`;
}

// get posts 
const querySet = (query, page) => {
  return [
    { $match: query},
    { $lookup: {
      from: 'comments',
      localField: '_id',
      foreignField: 'post',
      as: 'comments'
    } },
    { $sort: { _id: -1 } },
    { $skip: (page - 1) * 12 },
    { $limit: 12 },
  ]
}

/*
  GET /api/posts?profile=&tag=&page=
*/
export const list = async (ctx) => {
  const page = parseInt(ctx.query.page || '1', 10);
  const query = ctx.query.tag && ctx.query.tag !== '' ? { tags: { $all: [`${ctx.query.tag}`] } } : {};
  // posts for infinite scrolling
  if (page < 1) { ctx.status = 400; return; }
  try {
    const posts = await Post.aggregate(querySet(query, page)).exec();
    const postCount = await Post.countDocuments(query).exec();
    ctx.set('Last-Page', Math.ceil(postCount / 12));
    return ctx.body = posts
      .map((post) => ({
        ...post,
        body: removeHtmlAndShortenList(post.body),
    }));
  } catch (e) {
    ctx.throw(500, e);
    }
};
/*
  GET /api/posts/profile?profile=&tag=&page=
*/
export const profile = async (ctx) => {
  const { profile, tag } = ctx.query;
  const query = tag ? {"user.nickname": profile, tags: tag} : {"user.nickname": profile};
  const page = parseInt(ctx.query.page || '1', 10);
  try {
    const allPost = await Post.find({"user.nickname": profile});
    // profile's taglist
    const result = (allPost !== []) ? await allPost.map((item) => {
      const temp = {};
      item.tags.forEach((item) => {
        temp[item] = (temp[item] || 0) + 1;
      });
      return temp
    }).reduce((prev, current) => {
      Object.keys(prev).forEach(key => {
        if (current[key]) {
          current[key] = (prev[key] || 0) + 1;
        } else {
          current[key] = (prev[key] || 0);
        }
      });
      return current;
    }): {};
    const taglist = result !== {} ? Object.entries(result) : [];
    // profile's posts
    const posts = await Post.aggregate(querySet(query, page)).exec();
    const shortenBodyPosts = posts.map((post) => ({
      ...post,
      body: removeHtmlAndShortenProfile(post.body),
    }));
    // profile's info
    const userInfo = await User.findOne({nickname: profile});
    ctx.set('Last-Page', Math.ceil(posts.length / 12));
    ctx.body = {
      posts: shortenBodyPosts,
      taglist: taglist,
      user: userInfo.serialize(),
    }
    return ctx.body;
  } catch (e) {
    ctx.throw(500, e);
  }
};



/*
  GET /api/posts/:id
*/
export const read = async (ctx) => {
  ctx.body = ctx.state.post;
};

/*
  DELETE /api/posts/:id
*/
export const remove = async (ctx) => {
  const { id } = ctx.params;
  try {
    await Post.findByIdAndRemove(id).exec();
    ctx.status = 204; // No Content
  } catch (e) {
    ctx.throw(500, e);
  }
};

/*
  PATCH /api/posts/:id
  {
    title: 'edit',
    body: 'edit content',
    tags: ['edit', 'tag']
  }
*/
export const update = async (ctx) => {
  const { id } = ctx.params;
  // similar to write, but no required()
  const schema = Joi.object().keys({
    title: Joi.string().max(100).required(),
    body: Joi.string(),
    tags: Joi.array().items(Joi.string()),
  });
  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400; // Bad Request
    ctx.body = result.error;
    return;
  }
  ctx.request.body.updatedDate = Date.now();
  const nextData = {...ctx.request.body};
  if (nextData.body) {
    nextData.body = sanitizeHtml(nextData.body, sanitizeOption);
  }
  try {
    const post = await Post.findByIdAndUpdate(id, nextData, {
      new: true,
    }).exec();
    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/*
  PATCH /api/posts/:id/like
*/
export const like = async (ctx) => {
  const { id } = ctx.params;
  const { userId } = ctx.request.body;
  try {
    const post = await Post.findById(id).exec();
    if (post.like_users.indexOf(userId) !== -1) {
      post.likes_count--;
      post.like_users = await post.like_users.filter((item) => item !== userId);
      post.save();
      ctx.body = post;
      return;
    };
    post.likes_count++;
    post.like_users = [...post.like_users, userId]
    post.save();
    ctx.body = post;
    return;
  } catch (e) {
    ctx.throw(500, e);
  }
};