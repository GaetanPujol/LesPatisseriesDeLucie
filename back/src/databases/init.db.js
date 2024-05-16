import mysql from "mysql";

const pool = mysql.createPool({

  connectionLimit: 10000,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,

});


const query = (sql, values = []) => {

  return new Promise((resolve, reject) => {

    pool.query(sql, values, (error, result, fields) => {

      if (error) {

        console.error("Database error:", error);
        reject(error);

      } else {

        resolve(result);

      }
    });
  });
};

export default query;
