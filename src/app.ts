import express from 'express';
import expressWs from 'express-ws';

const router = express.Router();

const app = express();
expressWs(app);
app.set('path', __dirname);

export {
  router
};
export default app;
