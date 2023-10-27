import themeRouter from '../interface/theme/index.js'
import app from '../../app.js'

const useRouter = () => {
  app.use('/gather', themeRouter);
}

export default useRouter