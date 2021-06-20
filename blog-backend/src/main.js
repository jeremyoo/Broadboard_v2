require('dotenv').config();
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import serve from 'koa-static';
import path from 'path'
import send from 'koa-send';
import connect from './models';

import api from './api';
import jwtMiddleware from './lib/jwtMiddleware';

const { PORT } = process.env;

const app = new Koa();
const router = new Router();
connect();

// router setting
router.use('/api', api.routes());
app.use(bodyParser());
app.use(jwtMiddleware);
// apply router
app.use(router.routes()).use(router.allowedMethods());

const buildDirectory = path.resolve(__dirname, '../../blog-frontend/build');
app.use(serve(buildDirectory));
app.use(async ctx => {
  if (ctx.status === 404 && ctx.path.indexOf('/api') !== 0 ) {
    await send(ctx, 'index.html', { root: buildDirectory});
  }
})


const port = PORT || 4000;

app.listen(port, () => {
  console.log('listening to %d', port);
});
