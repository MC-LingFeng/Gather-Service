// export { default as useArrToObj }from './useArrToObj'
import express from 'express';
import app from '../../app.js';

import useArrToObj from './useArrToObj.js';
import useRouter from './useRouter.js';

const useMiddleware = () => {
  const dirname = app.get('path')
  app.use(useArrToObj);
  app.use(express.static(dirname + '/public'));
  useRouter();
}

export { useArrToObj }

export default useMiddleware
