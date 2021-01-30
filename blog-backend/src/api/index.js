import Router from 'koa-router';
import posts from './posts';
import auth from './auth';
import comments from './comments';

const api = new Router();

api.use('/posts', posts.routes()); 
api.use('/auth', auth.routes());
api.use('/comments', comments.routes());

export default api;
