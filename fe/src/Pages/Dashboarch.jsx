import React, { useState, useEffect } from 'react';
import './css/Dashboarch.css';
import Linechart from './Linechart.jsx';
import Control from './Control.jsx';
import Datatime from './Datatime.jsx';
import io from 'socket.io-client';

const socket = io('http://localhost:8080'); // Địa chỉ của server backend

function Dashboarch() {
    const [sensorData, setSensorData] = useState(null);

    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected to WebSocket server');
        });

        socket.on('connect_error', (error) => {
            console.error('WebSocket connection error:', error);
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from WebSocket server');
        });

        // Lắng nghe sự kiện 'newSensorData' từ server
        socket.on('newSensorData', (data) => {
            console.log('Received new sensor data:', data, "typeof: ", typeof (sensorData));
            setSensorData(data);
        });

        return () => {
            socket.off('newSensorData');
        };
    }, []);

    console.log("data nhan duoc ơ dashboard sensordata", sensorData);

    return (
        <div className='dashboard-main'>
            <div>
                <Control />
            </div>
            <div className="">
                <Datatime
                    light={sensorData && sensorData.length > 0 ? sensorData[0].light : 0} // Truy cập thuộc tính light trong đối tượng đầu tiên của mảng
                    humidity={sensorData && sensorData.length > 0 ? sensorData[0].humidity : 0} // Truy cập thuộc tính humidity
                    temperature={sensorData && sensorData.length > 0 ? sensorData[0].temperature : 0}

                />
            </div>
            <div className="chart">
                <Linechart
                    light={sensorData && sensorData.length > 0 ? sensorData[0].light : 0} // Truy cập thuộc tính light trong đối tượng đầu tiên của mảng
                    humidity={sensorData && sensorData.length > 0 ? sensorData[0].humidity : 0} // Truy cập thuộc tính humidity
                    temperature={sensorData && sensorData.length > 0 ? sensorData[0].temperature : 0} // Truy cập thuộc tính temperature
                    timestamp={sensorData && sensorData.length > 0 ? sensorData[0].timestamp : 0} />
            </div>
        </div>
    );
}

export default Dashboarch;
