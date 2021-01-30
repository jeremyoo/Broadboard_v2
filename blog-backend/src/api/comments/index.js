import Router from 'koa-router';
import * as commentsCtrl from './comments.ctrl';
import checkLoggedIn from '../../lib/checkLoggedIn'

const comments = new Router();

comments.get('/', commentsCtrl.list);
comments.post('/', checkLoggedIn, commentsCtrl.write);

const comment = new Router();

comment.get('/', checkLoggedIn, commentsCtrl.checkOwnComment, commentsCtrl.read);
comment.patch('/', checkLoggedIn, commentsCtrl.checkOwnComment, commentsCtrl.update)
comment.delete('/', checkLoggedIn, commentsCtrl.checkOwnComment, commentsCtrl.remove);

comments.use('/:id', commentsCtrl.getCommentById, comment.routes()); 

export default comments;