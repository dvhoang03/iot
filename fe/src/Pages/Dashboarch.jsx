import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import './css/Dashboarch.css';
import Linechart from './Linechart.jsx';
import Control from './Control.jsx';
import Datatime from './Datatime.jsx';


function Dashboarch() {
    // const [data, setData] = useState({
    //     temperature: [],
    //     light: [],
    //     humidity: []
    // });

    // const [lightSwitch, setLightSwitch] = useState(false);
    // const [fanSwitch, setFanSwitch] = useState(false);
    // const [acSwitch, setAcSwitch] = useState(false);

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         const newTemperature = Math.random() * 10 + 20;
    //         const newLight = Math.random() * 100;
    //         const newHumidity = Math.random() * 20 + 60;

    //         setData(prevData => ({
    //             temperature: [...prevData.temperature, newTemperature].slice(-10),
    //             light: [...prevData.light, newLight].slice(-10),
    //             humidity: [...prevData.humidity, newHumidity].slice(-10)
    //         }));
    //     }, 1000);

    //     return () => clearInterval(interval);
    // }, []);

    // useEffect(() => {
    //     const ctx = document.getElementById('combinedChart').getContext('2d');

    //     new Chart(ctx, {
    //         type: 'line',
    //         data: {
    //             labels: data.temperature.map((_, i) => `T-${i}`),
    //             datasets: [
    //                 {
    //                     label: 'Temperature (°C)',
    //                     data: data.temperature,
    //                     borderColor: 'red',
    //                     fill: false
    //                 },
    //                 {
    //                     label: 'Light (Lux)',
    //                     data: data.light,
    //                     borderColor: 'yellow',
    //                     fill: false
    //                 },
    //                 {
    //                     label: 'Humidity (%)',
    //                     data: data.humidity,
    //                     borderColor: 'blue',
    //                     fill: false
    //                 }
    //             ]
    //         },
    //         options: {
    //             responsive: true,
    //             scales: {
    //                 y: {
    //                     beginAtZero: true
    //                 }
    //             }
    //         }
    //     });
    // }, [data]);

    return (
        <div className='dashboard-main'>
            <div>
                <Control />
            </div>
            <div className="">
                <Datatime />
            </div>
            <div className="chart">
                <Linechart />
            </div>

        </div >
    );
}

export default Dashboarch;
