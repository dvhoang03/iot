const mqtt = require('mqtt');


const MQTT_BROKER = 'mqtt://192.168.5.105';  // Replace with your MQTT broker address
// const MQTT_TOPIC = 'datasensor';  // Replace with your topic if needed

// Connect to the MQTT broker
const client = mqtt.connect(MQTT_BROKER, {
    clientId: 'nodejs_subscriber',  // You can customize the client ID
    username: 'hoang',              // Replace with your username if required
    password: 'b21dccn384',         // Replace with your password if required
});

client.on('connect', () => {
    console.log('Connected to MQTT broker');
});

client.on('error', (err) => {
    console.error('MQTT Connection error:', err);
});
module.exports = client;