const client = require('../model/mqttConn');
const db = require('../model/db');
const MQTT_TOPIC = "datasensor";
var express = require('express');
var app = express();
var server = require('http').createServer(app);
// var io = require('socket.io')(server);
const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:3000",  // Địa chỉ frontend
        methods: ["GET", "POST"]
    }
});

// Khởi động server
server.listen(8080, () => {
    console.log('wedsocket is running on port 8080');
});

// Khi một client kết nối đến WebSocket
io.on('connection', (socket) => {
    console.log('Client connected');
});



console.log('Connected to MQTT broker');
client.subscribe(MQTT_TOPIC, (err) => {
    if (!err) {
        console.log(`Subscribed to topic: ${MQTT_TOPIC}`);
    } else {
        console.error('Subscription error:', err);
    }
});
client.subscribe("led/res", (err) => {
    if (!err) {
        console.log(`Subscribed to topic: led/res`);
    } else {
        console.error('Subscription error led/res:', err);
    }
});
client.subscribe("fan/res", (err) => {
    if (!err) {
        console.log(`Subscribed to topic: fan/res`);
    } else {
        console.error('Subscription error fan/res:', err);
    }
});
client.subscribe("ac/res", (err) => {
    if (!err) {
        console.log(`Subscribed to topic: ac/res`);
    } else {
        console.error('Subscription error ac/res:', err);
    }
});

client.on('message', (topic, message) => {
    console.log(`Received message from ${topic}: ${message.toString()}`);

    let data;
    try {
        // Parse the message into JSON
        data = JSON.parse(message.toString());
    } catch (error) {
        console.error('Error parsing JSON:', error);
        return; // Exit the function if JSON is invalid
    }

    if (topic === 'datasensor') {
        var query = 'INSERT INTO datasensor (light, humidity, temperature) VALUES (?, ?, ?)';
        var values = [data.light, data.humidity, data.temperature];

        db.query(query, values, (err, res) => {
            if (err) {
                console.error('Error executing query', err.stack);
            } else {
                console.log('Inserted data into database');

                var query = 'SELECT * FROM datasensor ORDER BY id DESC LIMIT 1';

                // Gửi dữ liệu tới frontend sau khi lưu thành công
                db.query(query, (err, result) => {
                    if (err) throw err;
                    io.emit('newSensorData', result);
                    console.log("emit success", result);
                });
            }
        });
    } 
    // else {
    //     const query = 'INSERT INTO actionhistory (device, action) VALUES (?, ?)';
    //     const values = [data.device, data.action];

    //     db.query(query, values, (err, res) => {
    //         if (err) {
    //             console.error('Error executing query', err.stack);
    //         } else {
    //             console.log('Inserted action data into database');

    //             // Gửi dữ liệu tới frontend sau khi lưu thành công
                
    //         }
    //     });
    // }
});


module.exports = client;
