import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

const app = express();
app.set('path', __dirname);

export {
  __dirname,
  router
};
export default app;
