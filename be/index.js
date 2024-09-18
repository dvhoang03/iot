const express = require('express')
const app = express()
const port = 8080
const initRoute = require('./src/route/web')
const mysql = require('mysql2');


// Create the connection to database
// const connection = mysql.createConnection({
//     host: 'localhost',
//     port: 3307,
//     user: 'root',
//     password: "12345678",
//     database: 'iot',
// });

// A simple SELECT query
// connection.query(
//     'SELECT * FROM `table` WHERE `name` = "Page" AND `age` > 45',
//     function (err, results, fields) {
//       console.log(results); // results contains rows returned by server
//       console.log(fields); // fields contains extra meta data about results, if available
//     }
//   );

// Using placeholders
// connection.query(
//     `select * from data_sensor where id < 5 ;`,
//     (err, results) => {
//         if (err) throw err;
//         console.log("results: ", results);
//     }
// );

// init webroute : khoiwr tao route
initRoute(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})