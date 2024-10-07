import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import './css/LineChart.css';

const Linechart = (props) => {
    const { light, humidity, temperature, dust, timestamp } = props.sensorData; // Lấy trực tiếp các giá trị từ props

    const [series, setSeries] = useState([
        {
            name: 'Light',
            data: []
        },
        {
            name: 'Humidity',
            data: []
        },
        {
            name: 'Temperature',
            data: []
        },
        {
            name: 'Dust',
            data: []
        }
    ]);

    const [timestamps, setTimestamps] = useState([]); // Mảng lưu các timestamp

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
        colors: ['#f10e0e', '#4003f6', '#000000','#08eb48'],
        dataLabels: {
            enabled: true
        },
        stroke: {
            curve: 'straight',
            width: 1.5
        },
        title: {
            text: 'Light, Humidity & Temperature Dust Levels',
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
            },
            {
                title: {
                    text: 'Dust'
                },
                min: 0,
                max: 100,
                labels: {
                    style: {
                        colors: ['#08eb48']
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
        // Kiểm tra nếu các giá trị trong props không undefined
        if (light !== undefined && humidity !== undefined && temperature !== undefined && dust !== undefined && timestamp) {
            // Cập nhật mảng dữ liệu
            setSeries((prevSeries) => [
                {
                    ...prevSeries[0], // Light
                    data: [...prevSeries[0].data, light].slice(-15) // Giữ lại 10 giá trị cuối cùng
                },
                {
                    ...prevSeries[1], // Humidity
                    data: [...prevSeries[1].data, humidity].slice(-15)
                },
                {
                    ...prevSeries[2], // Temperature
                    data: [...prevSeries[2].data, temperature].slice(-15)
                },
                {
                    ...prevSeries[3], // Dust
                    data: [...prevSeries[3].data, dust].slice(-15)
                }
            ]);

            // Cập nhật mảng timestamp, chỉ giữ lại 10 timestamp gần nhất
            setTimestamps((prevTimestamps) => [...prevTimestamps, timestamp].slice(-15));
        }
    }, [light, humidity, temperature, dust, timestamp]); // Theo dõi sự thay đổi của từng giá trị trong props

    return (
        <div>
            <div id="chart">
                <ReactApexChart options={options} series={series} type="line" height={500} />
            </div>
        </div>
    );
};

export default Linechart;
