
import express from 'express'
import formatPath from './config/formatPath.js';
import connection from '../../../utils/connection/index.js'

const router = express.Router();

const sql = 'SELECT * FROM routes_path';

router.route('/routes')
      .get(  (req, res,c) => {
        connection(sql).then((rows) => {
          const format = formatPath(rows)
          res.json({ data:format, code: 200, message: '成功！' })
        })
        .catch((err) => {
          console.log(err, '/routes');
          res.json({ data: null, code: 100, message: '失败！' })
        })
      });

export default router