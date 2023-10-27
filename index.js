import app, { router,__dirname } from './app.js';

import useMiddleware  from './src/middleware/index.js';

useMiddleware()

app.listen(8090);