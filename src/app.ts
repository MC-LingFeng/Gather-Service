import express from 'express';

const router = express.Router();
console.log(import.meta.url, __dirname);

const app = express();
app.set('path', __dirname);

export {
  router
};
export default app;
