import themeRouter from '../interface/theme/index';
import { get as routeGet } from '../interface/routes/index';
import { login, register, loginout } from '../interface/login/index';
import authority from '../interface/authority/index';
import openai from '../interface/openai/index';

import app from '../app';

const useRouter = () => {
  app.use('/gather', login);
  app.use('/gather', register);
  app.use('/gather', loginout);

  app.use('/gather', themeRouter);
  app.use('/gather', routeGet);

  app.use('/gather', authority);
  app.use('/gather', openai);
};

export default useRouter;
