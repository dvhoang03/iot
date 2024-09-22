const express = require('express');
const mysql = require('mysql2');

const conn = mysql.createConnection({
    host: 'localhost',
    port: 3307,
    user: 'root',
    password: "12345678",
    database: 'iot',
});
module.exports = conn ;
