import React, { useState } from 'react';
import { FaLightbulb } from 'react-icons/fa'; // Biểu tượng bóng đèn
import { FaFan } from 'react-icons/fa'; // Biểu tượng quạt
import { FaSnowflake } from 'react-icons/fa'; // Biểu tượng điều hòa
import Switch from '@mui/material/Switch';
import './css/Control.css';

function Control() {
    const [isFanOn, setFanOn] = useState("off");
    const [isLightOn, setLightOn] = useState("off");
    const [isAcOn, setAcOn] = useState("off");

    const sendRequest = async (device, action) => {
        try {
            console.log("data gui len be", device, action);
            const response = await fetch('http://localhost:4000/dashboard/controll', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ device, action }),
            });
            console.log("data tu backend", response);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Response from backend:', data);

            if (data.device === 'fan') {
                setFanOn(data.action);
            } else if (data.device === 'led') {
                setLightOn(data.action);
            } else if (data.device === 'ac') {
                setAcOn(data.action);
            }

        } catch (error) {
            console.error('Error sending request:', error);
            alert("loi xay ra");
        }
    };

    const toggleFan = () => {
        const newFanState = isFanOn === 'on' ? 'off' : 'on';
        // setFanOn(newFanState);
        sendRequest('fan', newFanState);
    };

    const toggleLight = () => {
        const newLightState = isLightOn === 'on' ? 'off' : 'on';
        // setLightOn(newLightState);
        sendRequest('led', newLightState);
    };

    const toggleAc = () => {
        const newAcState = isAcOn === 'on' ? 'off' : 'on';
        // setAcOn(newAcState);
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
                <Switch checked={isLightOn === 'on'} onChange={toggleLight} />
            </div>

            <div className='ac' style={{ display: 'flex', alignItems: 'center' }}>
                <p>AC</p>
                <FaSnowflake
                    style={{
                        fontSize: '24px',
                        marginRight: '10px',
                        color: isAcOn == 'on' ? 'lightblue' : 'gray',
                        transition: 'color 0.3s'
                    }}
                />
                <Switch checked={isAcOn === 'on'} onChange={toggleAc} />
            </div>
        </div>
    );
}

export default Control;
