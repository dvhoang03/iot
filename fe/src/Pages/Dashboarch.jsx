import React, { useState, useEffect } from 'react';
import './css/Dashboarch.css';
import Linechart from './Linechart.jsx';
import Control from './Control.jsx';
import Datatime from './Datatime.jsx';
import io from 'socket.io-client';
import Linechart2 from './linechart2.jsx';

const socket = io('http://localhost:8080'); // Địa chỉ của server backend

function Dashboarch() {
    const [sensorData, setSensorData] = useState(null);
    const [controll, setControll] = useState(null);
    const [dataChart, setdataChart] = useState([]);

    const dataline = [];
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
            console.log('Received new sensor data in  socket:', data, "typeof: ", typeof (data));
            setSensorData(data);
        });

        // socket.on('controll', (data) => {
        //     console.log('Received new controll data in socket:', data, "typeof: ", typeof (data));
        //     setControll(data);
        // });

        return () => {
            socket.off('newSensorData');
        };

    }, []);

    useEffect(() => {
        getChart();
    }, []);

    const getChart = async () => {
        try {
            const response = await fetch("http://localhost:4000/dashboard/getchart");
            const result = await response.json();
            setdataChart(result.data);
            setSensorData(result.data[0]); // Cập nhật sensorData nếu cần
            console.log("Dữ liệu nhận từ backend 1:", dataChart);
            console.log("Kiểu dữ liệu của result.data:", typeof result.data);  // Phải là 'object'
            console.log("Có phải là mảng không?", Array.isArray(result.data));
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    console.log('Received  data:', sensorData, "typeof: ", typeof (sensorData));
    console.log("controll received: ", dataChart, "type of", typeof (dataChart));
    return (
        <div className='dashboard-main'>
            <div>
                <Control controll={controll} setControll={setControll}
                />
            </div>
            <div className="">
                <Datatime
                    light={sensorData && sensorData.length > 0 ? sensorData[0].light : 0} // Truy cập thuộc tính light trong đối tượng đầu tiên của mảng
                    humidity={sensorData && sensorData.length > 0 ? sensorData[0].humidity : 0} // Truy cập thuộc tính humidity
                    temperature={sensorData && sensorData.length > 0 ? sensorData[0].temperature : 0}
                    dust={sensorData && sensorData.length > 0 ? sensorData[0].dust : 0}
                    dataDatetime={dataChart[0]}

                />
            </div>
            <div className="chart">
                <Linechart
                    // Truy cập thuộc tính temperature
                    dataChart={dataChart}
                    sensorData={sensorData && sensorData.length > 0 ? sensorData[0] : 0} />
                <Linechart2
                    // Truy cập thuộc tính temperature
                    sensorData={sensorData && sensorData.length > 0 ? sensorData[0] : 0}
                    dataChart={dataChart} />


            </div>
        </div>
    );
}

export default Dashboarch;
