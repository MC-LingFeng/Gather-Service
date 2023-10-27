
import express from 'express'
import {select} from '../../../utils/connection/mysql.js';

const router = express.Router();

const sql = 'SELECT * FROM gather_name'

router.route('/theme')
      .get(  (req, res,c) => {
        const valuse =  select(sql, function (err, rows) {
          if (!err) {
            res.json(rows)
          }
          else {
            console.log(err);
          }
       });
      });

export default router