import themeRouter from '../interface/theme/index.js'
import { get as routeGet } from '../interface/routes/index.js';

import app from '../../app.js'

const useRouter = () => {
  app.use('/gather', themeRouter);
  app.use('/gather', routeGet);
}

export default useRouter