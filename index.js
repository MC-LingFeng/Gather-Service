import express from 'express';
import path from 'path'
import { fileURLToPath } from 'url';
import useMiddleware  from './src/middleware/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.set('path', __dirname)

useMiddleware(app)

app.get('/', function(req, res) {
  res.send('Hello World');
});
app.get('/hello', function(req, res) {
  res.send('Hello World');
});
app.route('/hello')
console.log();


app.listen(8090);