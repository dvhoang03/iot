// // const mqtt = require('mqtt');
// const express = require('express');

// const app = express();
// const port = 3000;
// const client = require('../model/mqttConn')

// // MQTT configuration
// // const MQTT_BROKER = 'mqtt://192.168.5.105';  // Replace with your MQTT broker address
// const MQTT_TOPIC = 'data';  // Replace with your topic if needed

// // Connect to the MQTT broker
// // const client = mqtt.connect(MQTT_BROKER, {
// //     clientId: 'nodejs_subscriber',  // You can customize the client ID
// //     username: 'hoang',              // Replace with your username if required
// //     password: 'b21dccn384',         // Replace with your password if required
// // });

// // When connected to MQTT broker
// client.on('connect', () => {
//     console.log('Connected to MQTT broker');
//     // Subscribe to the topic
//     client.subscribe(MQTT_TOPIC, (err) => {
//         if (!err) {
//             console.log(`Subscribed to topic: ${MQTT_TOPIC}`);
//         } else {
//             console.error('Subscription error:', err);
//         }
//     });
// });


// // When a message is received
// client.on('message', (topic, message) => {
//     console.log(`Received message from ${topic}: ${message.toString()}`);
//     // Here you can handle the received data
//     // For example, you could store it in a database or process it in another way
// });

// // Set up a simple express server to display data (Optional)
// app.get('/', (req, res) => {
//     res.send('MQTT Subscriber is running...');
// });

// // Start the server
// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });