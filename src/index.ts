import app from './app';

import useMiddleware from './middleware/index';

useMiddleware();

app.listen(8090, '127.0.0.1');
