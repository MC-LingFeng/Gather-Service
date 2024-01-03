import express from 'express';

const router = express.Router();

const app = express();
app.set('path', __dirname);

export {
  router
};
export default app;
