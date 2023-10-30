
import express from 'express'
import {select} from '../../../utils/connection/mysql.js';
import formatPath from './config/formatPath.js';

const router = express.Router();

const sql = 'SELECT * FROM routes_path';

router.route('/routes')
      .get(  (req, res,c) => {
        const valuse =  select(sql, function (err, rows) {
          if (!err) {
            const format = formatPath(rows)
            res.json({ data:format, code: 200, message: '成功！' })
          }
          else {
            res.json({ data:format, code: 100, message: '失败！' })
          }
       });
      });

export default router