
import mysql from 'mysql2';

const select = (sql: string) => {
  if (!sql) {
    return new Promise((resolve, reject) => {
      reject('sql语句为空');
    });
  }

  const pool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: 'nishishabi1999',
    database: 'gather_data'
  });

  return new Promise<any>((resolve, reject) => {
    pool.getConnection((err, con) => {
      if (err) {
        reject(err);
      } else if (con) {
        con.query(sql, (err, rows, fields) => {
          con.release();
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        });
      } else {
        reject('No Connection');
      }
    });
  });
};

export default select;
