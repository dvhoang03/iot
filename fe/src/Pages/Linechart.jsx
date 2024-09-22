import React, { useState, useEffect } from 'react';
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import TChart from './Chart/TChart';
import Hchart from './Chart/Hchart';
import Lchart from './Chart/Lchart';
import './css/LineChart.css';

Chart.register(CategoryScale);

export default function Linechart(props) {
    const { timestamp, light, humidity, temperature } = props;

    // State for charts data
    const [TchartData, setTChartData] = useState({
        labels: [], // Initially empty, will be populated with timestamps
        datasets: [{
            label: "Temperature",
            data: [], // Initially empty, will be populated with temperature data
            backgroundColor: "rgba(75,192,192,1)",
            borderColor: "red",
            borderWidth: 2
        }]
    });

    const [HchartData, setHChartData] = useState({
        labels: [],
        datasets: [{
            label: "Humidity",
            data: [],
            backgroundColor: "rgba(75,192,192,1)",
            borderColor: "blue",
            borderWidth: 2
        }]
    });

    const [LchartData, setLChartData] = useState({
        labels: [],
        datasets: [{
            label: "Light",
            data: [],
            backgroundColor: "rgba(75,192,192,1)",
            borderColor: "green",
            borderWidth: 2
        }]
    });

    // Update chart data when props change
    const MAX_DATA_POINTS = 30; // Số lượng dữ liệu tối đa hiển thị
    // const MAX_DATA_POINTS = 20;
    useEffect(() => {
        if (timestamp) {
            // Append new data to Temperature chart
            setTChartData((prevData) => ({
                labels: [...prevData.labels.slice(-MAX_DATA_POINTS + 1), timestamp], // Giữ lại MAX_DATA_POINTS gần nhất
                datasets: [{
                    ...prevData.datasets[0],
                    data: [...prevData.datasets[0].data.slice(-MAX_DATA_POINTS + 1), temperature] // Giữ lại MAX_DATA_POINTS gần nhất
                }]
            }));

            // Append new data to Humidity chart
            setHChartData((prevData) => ({
                labels: [...prevData.labels.slice(-MAX_DATA_POINTS + 1), timestamp],
                datasets: [{
                    ...prevData.datasets[0],
                    data: [...prevData.datasets[0].data.slice(-MAX_DATA_POINTS + 1), humidity]
                }]
            }));

            // Append new data to Light chart
            setLChartData((prevData) => ({
                labels: [...prevData.labels.slice(-MAX_DATA_POINTS + 1), timestamp],
                datasets: [{
                    ...prevData.datasets[0],
                    data: [...prevData.datasets[0].data.slice(-MAX_DATA_POINTS + 1), light]
                }]
            }));
        }
    }, [timestamp, temperature, humidity, light]);

    return (
        <div className='linechart'>
            <div className="tchart"><TChart TchartData={TchartData} /></div>
            <div className="hchart"><Hchart HchartData={HchartData} /></div>
            <div className="lchart"><Lchart LchartData={LchartData} /></div>
        </div>
    );
}
