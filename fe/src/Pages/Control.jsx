import React, { useState, useEffect } from 'react';
import { FaLightbulb, FaFan, FaSnowflake } from 'react-icons/fa';
import Switch from '@mui/material/Switch';
import './css/Control.css';

function Control() {
    const [isFanOn, setFanOn] = useState(localStorage.getItem("fanState") || "off");
    const [isLightOn, setLightOn] = useState(localStorage.getItem("lightState") || "off");
    const [isAcOn, setAcOn] = useState(localStorage.getItem("acState") || "off");
    const [totalWarn, setTotalWarn] = useState(0);  // Số lần bật

    // const [li, setLight] = useState(0);

    // const { light } = props; // Lấy giá trị light từ component cha

    const fetchOnOffCounts = async () => {
        try {
            const response = await fetch('http://localhost:4000/dashboard/getwarn'); // URL API tương ứng với backend
            const data = await response.json();
            console.log("data on of: ", data);
            setTotalWarn(data.totalWarn);
        } catch (error) {
            console.error('Error fetching on/off counts:', error);
        }
    };

    // Gọi hàm fetch khi component được render
    useEffect(() => {
        fetchOnOffCounts();
    }, []);

    // Lưu trạng thái vào localStorage và gửi request
    const sendRequest = async (device, action) => {
        try {
            const response = await fetch('http://localhost:4000/dashboard/controll', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ device, action }),
            });
            const data = await response.json();

            if (data.device === 'fan') {
                setFanOn(data.action);
                localStorage.setItem("fanState", data.action); // Lưu trạng thái quạt
            } else if (data.device === 'led') {
                setLightOn(data.action);
                localStorage.setItem("lightState", data.action); // Lưu trạng thái đèn
            } else if (data.device === 'ac') {
                setAcOn(data.action);
                localStorage.setItem("acState", data.action); // Lưu trạng thái điều hòa
            }
        } catch (error) {
            console.error('Error sending request:', error);
        }
    };

    const toggleFan = () => {
        const newFanState = isFanOn === 'on' ? 'off' : 'on';
        sendRequest('fan', newFanState);
    };

    const toggleLight = () => {
        const newLightState = isLightOn === 'on' ? 'off' : 'on';
        sendRequest('led', newLightState);
    };

    const toggleAc = () => {
        const newAcState = isAcOn === 'on' ? 'off' : 'on';
        sendRequest('ac', newAcState);
    };

    return (
        <div className='control'>
            <div className='fan' style={{ display: 'flex', alignItems: 'center' }}>
                <p>Fan</p>
                <FaFan
                    style={{
                        fontSize: '24px',
                        marginRight: '10px',
                        color: isFanOn === 'on' ? 'blue' : 'gray',
                        transition: 'color 0.3s, transform 0.3s',
                        transform: isFanOn === 'on' ? 'rotate(360deg)' : 'rotate(0deg)',
                        transformOrigin: 'center'
                    }}
                />
                <Switch checked={isFanOn === 'on'} onChange={toggleFan} />
            </div>

            <div className='led' style={{ display: 'flex', alignItems: 'center' }}>
                <p>Led</p>
                <FaLightbulb
                    style={{
                        fontSize: '24px',
                        marginRight: '10px',
                        color: isLightOn === 'on' ? 'gold' : 'gray',
                        transition: 'color 0.3s'
                    }}
                />
                <Switch checked={isLightOn === 'on'} onChange={() => toggleLight()} />
            </div>

            <div className='ac' style={{ display: 'flex', alignItems: 'center' }}>
                <p>AC</p>
                <FaSnowflake
                    style={{
                        fontSize: '24px',
                        marginRight: '10px',
                        color: isAcOn === 'on' ? 'lightblue' : 'gray',
                        transition: 'color 0.3s'
                    }}
                />
                <Switch checked={isAcOn === 'on'} onChange={toggleAc} />
            </div>

            {/* Hiển thị số lần bật/tắt */}
            <div className='action' style={{ marginTop: '0px' }}>
                <p>Số lần cảnh cáo: {totalWarn}</p>
            </div>
        </div>
    );
}

export default Control;