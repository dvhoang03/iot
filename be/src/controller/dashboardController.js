var express = require('express');
const client = require('../model/mqttConn');
const db = require('../model/db'); // Đảm bảo bạn đã import đúng model database
const { json } = require('body-parser');

let controll = (req, res) => {

    var topic = req.body.device;
    var message = req.body.action;
    console.log("data tu frontend", req.body);

    // Publish MQTT message to request the device action
    client.publish(`${topic}/req`, message, (err) => {
        if (err) {
            return res.status(500).json({ device: topic, action: (message === 'off' ? 'on' : 'off'), error: 'Failed to send MQTT message' });
        }
    });

    // Lắng nghe phản hồi từ MQTT
    client.once('message', (responseTopic, mqttMessage) => {

        // Kiểm tra nếu phản hồi là từ thiết bị đang điều khiển
        if (responseTopic === `${topic}/res`) {
            console.log(`Received message from ${responseTopic}: ${mqttMessage.toString()}`);

            let data;
            data = JSON.parse(mqttMessage.toString());

            const query = 'INSERT INTO actionhistory (device, action) VALUES (?, ?)';
            const values = [topic, data.action];

            // Lưu phản hồi vào cơ sở dữ liệu
            db.query(query, values, (err, dbRes) => {
                if (err) {
                    console.error('Error executing query', err.stack);
                    return res.status(500).json({ device: topic, action: message, error: 'Failed to save action to database' });
                } else {
                    console.log('Inserted action data into database');

                    // Kiểm tra phản hồi và trả về kết quả cho frontend
                    if (data.action === message) {
                        return res.status(200).json({ device: topic, action: message });
                    } else {
                        return res.status(200).json({ device: topic, action: (message === 'off' ? 'on' : 'off') });
                    }
                }
            });
        }
    });
};

let getwarn = (req, res) => {
    const query1 = 'SELECT COUNT(*) AS total FROM datasensor WHERE dust > 800;';

    db.query(query1, (err, totalOnResult) => {
        if (err) {
            console.error('Error executing query', err.stack);
            return res.status(500).json({ error: 'Failed to retrieve data from the database' });
        } else {
            // Truy cập vào trường 'total' được trả về từ kết quả
            return res.status(200).json({
                "totalWarn": totalOnResult[0].total
            });
        }
    });
};

const getchart = (req, res ) => {
    const query = "SELECT * FROM datasensor ORDER BY `timestamp` DESC LIMIT 15 OFFSET 0"

    db.query(query, (err, result)=>{
        if(err) {
            console,log("loi khi truy van");
            return res.status(500).json({ error: 'Failed to retrieve data from the database' });
        }
        else {
            res.json( {
                data:result.map(row =>(
                    {
                        id: row.id,
                        temperature: row.temperature,
                        humidity: row.humidity,
                        light: row.light,
                        dust: row.dust,
                        timestamp: row.timestamp
                    }))
            })
        }
    })
}


module.exports = { controll, getwarn, getchart };
