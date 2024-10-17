import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import './css/LineChart.css';

const Linechart = (props) => {
    const sensorDataArray = props.dataChart;
    // console.log("datachartoo linechart: ", dataChart);
    const { light, humidity, temperature, timestamp } = props.sensorData; // Không lấy giá trị dust

    const [series, setSeries] = useState([
        {
            name: 'Light',
            data: sensorDataArray.map(data => sensorDataArray.light)
        },
        {
            name: 'Humidity',
            data: sensorDataArray.map(data => sensorDataArray.humidity)
        },
        {
            name: 'Temperature',
            data: sensorDataArray.map(data => sensorDataArray.temperature)
        }
    ]);

    const [timestamps, setTimestamps] = useState(sensorDataArray.map(data => sensorDataArray.timestamp)); // Mảng lưu các timestamp

    const [options, setOptions] = useState({
        chart: {
            height: 1000,
            type: 'line',
            dropShadow: {
                enabled: true,
                color: '#000',
                top: 18,
                left: 7,
                blur: 10,
                opacity: 0.2
            },
            zoom: {
                enabled: false
            },
            toolbar: {
                show: false
            }
        },
        colors: ['#f10e0e', '#4003f6', '#000000'], // Không cần màu cho Dust
        dataLabels: {
            enabled: true
        },
        stroke: {
            curve: 'straight',
            width: 1.5
        },
        title: {
            text: 'Light, Humidity & Temperature Levels',
            align: 'center'
        },
        grid: {
            borderColor: '#e7e7e7',
            row: {
                colors: ['#f3f3f3', 'transparent'],
                opacity: 0.5
            }
        },
        markers: {
            size: 1
        },
        xaxis: {
            categories: timestamps, // Hiển thị timestamp
            title: {
                text: 'Timestamp'
            }
        },
        yaxis: [
            {
                opposite: true,
                title: {
                    text: 'Light'
                },
                min: 0,
                max: 1300,
                labels: {
                    style: {
                        colors: ['#f10e0e']
                    }
                }
            },
            {
                title: {
                    text: 'Humidity'
                },
                min: 0,
                max: 100,
                labels: {
                    style: {
                        colors: ['#4003f6']
                    }
                }
            },
            {
                title: {
                    text: 'Temperature'
                },
                min: 0,
                max: 50,
                labels: {
                    style: {
                        colors: ['#000000']
                    }
                }
            }
        ],
        legend: {
            position: 'top',
            horizontalAlign: 'right',
            floating: true,
            offsetY: -25,
            offsetX: -5
        }
    });

    // Hàm này sẽ được gọi khi nhận data mới từ component cha
    useEffect(() => {
        if (light !== undefined && humidity !== undefined && temperature !== undefined && timestamp) {
            // Cập nhật mảng dữ liệu, không cần xử lý dust
            setSeries((prevSeries) => [
                {
                    ...prevSeries[0], // Light
                    data: [...prevSeries[0].data, light].slice(-15) // Giữ lại 15 giá trị cuối cùng
                },
                {
                    ...prevSeries[1], // Humidity
                    data: [...prevSeries[1].data, humidity].slice(-15)
                },
                {
                    ...prevSeries[2], // Temperature
                    data: [...prevSeries[2].data, temperature].slice(-15)
                }
            ]);

            // Cập nhật mảng timestamp
            setTimestamps((prevTimestamps) => [...prevTimestamps, timestamp].slice(-15));
        }
    }, [light, humidity, temperature, timestamp]); // Không theo dõi dust

    useEffect(() => {
        if (sensorDataArray.length) {

            console.log("data ỏ lne1:", sensorDataArray)
            setSeries([
                {
                    name: 'Light',
                    data: sensorDataArray.map(data => data.light)
                },
                {
                    name: 'Humidity',
                    data: sensorDataArray.map(data => data.humidity)
                },
                {
                    name: 'Temperature',
                    data: sensorDataArray.map(data => data.temperature)
                }
            ]);

            setTimestamps(sensorDataArray.map(data => data.timestamp));
        }
    }, [sensorDataArray]);


    return (
        <div>
            <div id="chart">
                <ReactApexChart options={options} series={series} type="line" height={500} />
            </div>
        </div>
    );
};

export default Linechart;
