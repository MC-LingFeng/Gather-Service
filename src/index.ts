import app from './app';

import useMiddleware from './middleware/index';

useMiddleware();

app.listen(8090);
