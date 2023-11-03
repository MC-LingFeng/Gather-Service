
import express from 'express';
import formatPath from './config/formatPath';
import connection from '@/utils/connection/index';
import utils from '@/utils/index';
import { RouteAndUser } from './type';

const router = express.Router();

router.route('/routes')
  .get((req, res) => {
    const route_default_name = utils.isHave(req.headers.tokenname) ? 'default' : req.headers.tokenname;
    const sql = `SELECT routes_path.*, user.grade FROM routes_path, user WHERE username="${route_default_name}"`;
    connection(sql).then((rows: Array<RouteAndUser>) => {
      const accessValues = rows.filter((item) => item.user <= item.grade);
      const format = formatPath(accessValues);

      res.json({ data: format, code: 200, message: '成功！' });
    })
      .catch((err) => {
        console.log(err, '/routes');
        res.json({ data: null, code: 100, message: '失败！' });
      });
  });

export default router;
