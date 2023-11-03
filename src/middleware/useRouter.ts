import themeRouter from '../interface/theme/index';
import { get as routeGet } from '../interface/routes/index';
import { login, register } from '../interface/login/index';
import authority from '../interface/authority/index';

import app from '../app';

const useRouter = () => {
  app.use('/gather', login);
  app.use('/gather', register);

  app.use('/gather', themeRouter);
  app.use('/gather', routeGet);

  app.use('/gather', authority);
};

export default useRouter;
