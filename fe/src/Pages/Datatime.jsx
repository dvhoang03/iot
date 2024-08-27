import React, { useState, useEffect } from 'react';
import './css/Datatime.css'

function Datatime() {
    // Tạo các state để lưu trữ dữ liệu của nhiệt độ, độ ẩm, ánh sáng
    const [temperature, setTemperature] = useState(15); // Dữ liệu giả lập ban đầu cho nhiệt độ
    const [humidity, setHumidity] = useState(50); // Dữ liệu giả lập ban đầu cho độ ẩm
    const [light, setLight] = useState(300); // Dữ liệu giả lập ban đầu cho ánh sáng

    // Hàm giả lập việc nhận dữ liệu mới từ cảm biến mỗi giây


    // Hàm tính toán màu sắc dựa trên giá trị
    const calculateColor = (value, min, max, colorStart, colorEnd) => {
        const ratio = (value - min) / (max - min);
        const colorIntensity = Math.round(ratio * 255);
        return `rgb(${colorStart[0] + ratio * (colorEnd[0] - colorStart[0])}, 
                ${colorStart[1] + ratio * (colorEnd[1] - colorStart[1])}, 
                ${colorStart[2] + ratio * (colorEnd[2] - colorStart[2])})`;
    };

    return (
        <div className='datatime' >
            <div className='temperature' >
                <h3>Temperature</h3>
                <p>{temperature}°C</p>
                <hr style={{
                    borderColor: calculateColor(temperature, -10, 40, [0, 0, 255], [255, 0, 0]), // Màu sắc từ xanh dương (rất lạnh) sang đỏ (rất nóng)
                    borderWidth: '12px', // Tăng độ dày của thẻ hr
                    transition: 'border-color 0.5s ease'
                }} />
            </div>
            <div className='humiditi' >
                <h3>Humidity</h3>
                <p>{humidity}%</p>
                <hr style={{
                    borderColor: calculateColor(humidity, 0, 100, [0, 255, 0], [0, 0, 255]), // Màu sắc từ xanh lá (rất khô) sang xanh dương (rất ẩm)
                    borderWidth: '12px', // Tăng độ dày của thẻ hr
                    transition: 'border-color 0.5s ease'
                }} />
            </div>
            <div className='light' >
                <h3>Light Level</h3>
                <p>{light} lx</p>
                <hr style={{
                    borderColor: calculateColor(light, 0, 1000, [255, 255, 0], [255, 69, 0]), // Màu sắc từ vàng nhạt sang cam đậm
                    borderWidth: '12px', // Tăng độ dày của thẻ hr
                    transition: 'border-color 0.5s ease'
                }} />
            </div>
        </div>
    );
}

export default Datatime;
