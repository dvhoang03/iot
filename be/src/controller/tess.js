// const express = require('express')
// const dashboard = require('../controller/dashboard')
// const mysql = require('mysql2')
// let router = express.Router()

// // Create the connection to database
// const connection = mysql.createConnection({
//     host: 'localhost',
//     port: 3307,
//     user: 'root',
//     password: "12345678",
//     database: 'iot',
// });

// const initRoute = (app) => {
//     router.get('/', (req, res) => {
//         // A simple SELECT query
//         connection.query(
//             'SELECT * FROM `action_history` WHERE `device` = ? AND `action` = ?', ['fan', 'on'],
//             (err, results, fields) => {
//                 console.log(JSON.stringify(results));
//                 res.json({ data: results });// results contains rows returned by server
//                 // console.log(fields); // fields contains extra meta data about results, if available
//             }
//         );
//     })


//     return app.use("/", router);
// }

// module.exports = initRoute;