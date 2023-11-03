import app, { router, __dirname } from './app';

import useMiddleware from './src/middleware/index';

useMiddleware();

app.listen(8090);
