
import mysql from 'mysql'

const select =  (sql, callback) => {
  
  if (!sql) {
    return ;
  }
  // const mysql = require('mysql')
  const pool =  mysql.createPool({
    connectionLimit : 100,
    host: 'localhost',
    user: 'root',
    password: 'nishishabi1999',
    database: 'gather_data'
  })


  pool.getConnection((err, con) => {
    if (err) {
      return callback(err, con)
    } else if (con){
      con.query(sql,  (err, rows, fields) => {
        con.release();
            if (err) {
                return callback(err, null);
            }
            return callback(null, rows);
      })
    } else {
      return callback(true, "No Connection");
   }
  })
  
  // connection.end()
}

export  {
  select,
}
