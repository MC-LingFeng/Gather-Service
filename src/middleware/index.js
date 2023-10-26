// export { default as useArrToObj }from './useArrToObj'
import express from 'express';

import useArrToObj from './useArrToObj.js';

const useMiddleware = (app) => {
  const dirname = app.get('path')
  app.use(useArrToObj);
  app.use(express.static(dirname + '/public'));
}

export { useArrToObj }

export default useMiddleware
