import React, { useState } from 'react';
import { FaLightbulb } from 'react-icons/fa'; // Biểu tượng bóng đèn
import { FaFan } from 'react-icons/fa'; // Biểu tượng quạt
import Switch from '@mui/material/Switch';
import './css/Control.css'

function Control() {
    const [isFanOn, setFanOn] = useState(false);
    const [isLightOn, setLightOn] = useState(false);

    const toggleFan = () => {
        setFanOn(!isFanOn);
    };

    const toggleLight = () => {
        setLightOn(!isLightOn);
    };

    return (
        <div className='control'>
            <div className="container">
                <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
                    <p>Fan</p>
                    <FaFan
                        style={{
                            fontSize: '24px',
                            marginRight: '10px',
                            color: isFanOn ? 'blue' : 'gray', // Đổi màu khi bật/tắt quạt
                            transition: 'color 0.3s, transform 0.3s',
                            transform: isFanOn ? 'rotate(360deg)' : 'rotate(0deg)', // Quay khi bật
                            transformOrigin: 'center'
                        }}
                    />
                    <Switch checked={isFanOn} onChange={toggleFan} />
                </div>

                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <p>Led</p>
                    <FaLightbulb
                        style={{
                            fontSize: '24px',
                            marginRight: '10px',
                            color: isLightOn ? 'gold' : 'gray', // Đổi màu khi bật/tắt đèn
                            transition: 'color 0.3s'
                        }}
                    />
                    <Switch checked={isLightOn} onChange={toggleLight} />
                </div>
            </div>
        </div>
    );
}

export default Control;
