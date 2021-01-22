import Joi from '@hapi/joi';
import User from '../../models/user';

/*
  POST api/auth/register
    {
      username: 'velopert',
      password: 'mypass123'
    }
*/
export const register = async (ctx) => {
  // Request Body verification
  const schema = Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(20).required(),
    password: Joi.string().required(),
  });
  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }
  const { username, password } = ctx.request.body;
  try {
    // check username
    const exists = await User.findByUsername(username);
    if (exists) {
      ctx.status = 409; // conflict
      return;
    }
    // create user
    const user = new User({
      username,
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
    {
      username: 'velopert',
      password: 'mypass123'
    }
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
  ctx.body = user;
};

/*
  POST /api/auth/logout
*/
export const logout = async (ctx) => {
  ctx.cookies.set('access_token');
  ctx.status = 204; // No Content
};
