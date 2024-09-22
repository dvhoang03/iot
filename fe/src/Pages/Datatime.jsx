import React, { useState, useEffect } from 'react';
import './css/Datatime.css'

function Datatime(props) {
    const [temp, setTemperature] = useState(100); // Dữ liệu ban đầu cho nhiệt độ
    const [hum, setHumidity] = useState(100); // Dữ liệu ban đầu cho độ ẩm
    const [lig, setLight] = useState(10); // Dữ liệu ban đầu cho ánh sáng
    console.log("data props ở ơ datatime: ",props);
    const { light, humidity, temperature } = props;

    // Cập nhật các giá trị khi nhận được data mới từ props, chỉ khi data không phải null hoặc undefined
    useEffect(() => {
        if (light != null) {
            setLight(light);
        }
        if (humidity != null) {
            setHumidity(humidity);
        }
        if (temperature != null) {
            setTemperature(temperature);
        }
    }, [light, humidity, temperature]);  // Theo dõi sự thay đổi của các props

    const calculateColor = (value, min, max, colorStart, colorEnd) => {
        const ratio = (value - min) / (max - min);
        return `rgb(${colorStart[0] + ratio * (colorEnd[0] - colorStart[0])}, 
                ${colorStart[1] + ratio * (colorEnd[1] - colorStart[1])}, 
                ${colorStart[2] + ratio * (colorEnd[2] - colorStart[2])})`;
    };

    return (
        <div className='datatime' >
            <div className='temperature' >
                <h3>Temperature</h3>
                <p>{temp}°C</p>
                <hr style={{
                    borderColor: calculateColor(temp, -10, 40, [0, 0, 255], [255, 0, 0]), // Màu sắc từ xanh dương (rất lạnh) sang đỏ (rất nóng)
                    borderWidth: '12px',
                    transition: 'border-color 0.5s ease'
                }} />
            </div>
            <div className='humiditi' >
                <h3>Humidity</h3>
                <p>{hum}%</p>
                <hr style={{
                    borderColor: calculateColor(hum, 0, 100, [0, 255, 0], [0, 0, 255]), // Màu sắc từ xanh lá (rất khô) sang xanh dương (rất ẩm)
                    borderWidth: '12px',
                    transition: 'border-color 0.5s ease'
                }} />
            </div>
            <div className='light' >
                <h3>Light Level</h3>
                <p>{lig} lx</p>
                <hr style={{
                    borderColor: calculateColor(lig, 0, 1000, [255, 255, 0], [255, 69, 0]), // Màu sắc từ vàng nhạt sang cam đậm
                    borderWidth: '12px',
                    transition: 'border-color 0.5s ease'
                }} />
            </div>
        </div>
    );
}

export default Datatime;
