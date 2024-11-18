import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import './css/LineChart.css';

const Linechart2 = (props) => {
    const sensorDataArray = props.dataChart;
    const { dust, timestamp } = props.sensorData; // Chỉ giữ lại dust và timestamp

    const [series, setSeries] = useState([
        {
            name: 'Dust',
            data: sensorDataArray.map(data => sensorDataArray.dust)
        }
    ]);

    const [timestamps, setTimestamps] = useState([]); // Mảng lưu các timestamp

    const [options, setOptions] = useState({
        chart: {
            height: 1200,
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
        colors: ['#08eb48'], // Chỉ giữ màu cho Dust
        dataLabels: {
            enabled: true
        },
        stroke: {
            curve: 'straight',
            width: 1.5
        },
        title: {
            text: 'Dust Levels',
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
        yaxis: {
            title: {
                text: 'Dust'
            },
            min: 0,
            max: 1100,
            labels: {
                style: {
                    colors: ['#08eb48']
                }
            }
        },
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
        if (dust !== undefined && timestamp) {
            // Cập nhật mảng dữ liệu
            setSeries((prevSeries) => [
                {
                    ...prevSeries[0], // Dust
                    data: [...prevSeries[0].data, dust].slice(-15) // Giữ lại 15 giá trị cuối cùng
                }
            ]);

            // Cập nhật mảng timestamp, chỉ giữ lại 15 timestamp gần nhất
            setTimestamps((prevTimestamps) => [...prevTimestamps, timestamp].slice(-15));
        }
    }, [dust, timestamp]); // Theo dõi sự thay đổi của dust và timestamp


    useEffect(() => {
        if (sensorDataArray.length) {
            setSeries([
                {
                    name: 'Dust',
                    data: sensorDataArray.map(data => data.dust)
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

export default Linechart2;
