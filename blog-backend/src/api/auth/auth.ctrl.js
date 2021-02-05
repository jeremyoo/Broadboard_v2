import Joi from '@hapi/joi';
import User from '../../models/user';

/*
  POST api/auth/register
*/
export const register = async (ctx) => {
  // Request Body verification
  const schema = Joi.object().keys({
    username: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    nickname: Joi.string().alphanum().min(4).max(15).required(),
    password: Joi.string().required(),
    sentence: Joi.string().max(30),
  });
  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }
  const { username, nickname, password, sentence } = ctx.request.body;
  try {
    // check username & nickname
    const existsUser = await User.findByUsername(username);
    const existsNick = await User.findByNickname(nickname);
    if (existsUser || existsNick) {
      ctx.status = 409; // conflict
      return;
    }
    // create user
    const user = new User({
      username,
      nickname,
      sentence,
      follower_count: 0,
      following_count: 0,
      followers: [],
      followings: [],
    });
    await user.setPassword(password);
    await user.save();
    ctx.body = user.serialize();
    const token = user.generateToken();
    ctx.cookies.set('access_token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 1, // 1 day
      httpOnly: true,
    });
  } catch (e) {
    ctx.throw(500, e);
  }
};

/*
  POST api/auth/login
*/
export const login = async (ctx) => {
  const { username, password } = ctx.request.body;
  // error on no username || paswrod
  if (!username || !password) {
    ctx.status = 401; // Unauthorized
    return;
  }
  try {
    const user = await User.findByUsername(username);
    // error on no user existed
    if (!user) {
      ctx.status = 401; // Unauthorized
      return;
    }
    const valid = await user.checkPassword(password);
    // error on wrong password
    if (!valid) {
      ctx.status = 401; // Unauthorized
      return;
    }
    ctx.body = user.serialize();
    const token = user.generateToken();
    ctx.cookies.set('access_token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 1, // 1 day
      httpOnly: true,
    });
  } catch (e) {
    ctx.throw(500, e);
  }
};

/*
  GET /api/auth/check
*/
export const check = async (ctx) => {
  const { user } = ctx.state;
  if (!user) {
    ctx.status = 401; // Unauthorized
    return;
  }
  ctx.body = user
};

/*
  POST /api/auth/logout
*/
export const logout = async (ctx) => {
  ctx.cookies.set('access_token');
  ctx.status = 204; // No Content
};
