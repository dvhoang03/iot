import React from 'react'
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useState } from "react";
import { Data } from "../Components/utils/Data";
// import './App.css';
import TChart from './Chart/TChart';
import Hchart from './Chart/Hchart';
import Lchart from './Chart/Lchart';
import './css/LineChart.css'

Chart.register(CategoryScale);

export default function Linechart() {

    const [TchartData, setTChartData] = useState({
        labels: Data.map((data) => data.Time),
        datasets: [
            {
                label: "Temperature",
                data: Data.map((data) => data.Temperature),
                backgroundColor: [
                    "rgba(75,192,192,1)",
                    "&quot;#ecf0f1",
                    "#50AF95",
                    "#f3ba2f",
                    "#2a71d0"
                ],
                borderColor: "red",
                borderWidth: 2
            }
        ]
    });

    const [HchartData, setHChartData] = useState({
        labels: Data.map((data) => data.Time),
        datasets: [
            {
                label: "Humiditi",
                data: Data.map((data) => data.Humidity),
                backgroundColor: [
                    "rgba(75,192,192,1)",
                    "&quot;#ecf0f1",
                    "#50AF95",
                    "#f3ba2f",
                    "#2a71d0"
                ],
                borderColor: "red",
                borderWidth: 2
            }
        ]
    });

    const [LchartData, setLChartData] = useState({
        labels: Data.map((data) => data.Time),
        datasets: [
            {
                label: "Light",
                data: Data.map((data) => data.Light),
                backgroundColor: [
                    "rgba(75,192,192,1)",
                    "&quot;#ecf0f1",
                    "#50AF95",
                    "#f3ba2f",
                    "#2a71d0"
                ],
                borderColor: "red",
                borderWidth: 2
            }
        ]
    });

    return (
        <div className='linechart'>
            <div className="tchart"><TChart TchartData={TchartData} /></div>
            <div className="hchart"><Hchart HchartData={HchartData} /></div>
            <div className="lchart"><Lchart LchartData={LchartData} /></div>
        </div>
    )
}
