
import mysql from 'mysql'

const select =  (sql, callback) => {
  
  if (!sql) {
    return ;
  }

  const pool =  mysql.createPool({
    connectionLimit : 100,
    host: 'localhost',
    user: 'root',
    password: 'nishishabi1999',
    database: 'gather_data'
  })

  return new Promise((resolve, reject) => {
    pool.getConnection((err, con) => {
      if (err) {
        reject(err)
      } else if (con){
        con.query(sql,  (err, rows, fields) => {
          con.release();
          if (err) {
            reject(err)
          }else {
            resolve(rows)
          }
        })
      } else {
         reject("No Connection");
      }
    })
  })
}

export default select