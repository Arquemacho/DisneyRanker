import React, { useEffect, useState } from 'react';
import './admin.css'; // Import the CSS file
import BackToDashboardButton from './BackToDashboardButton'; // Correct path as per your project structure

const DeviceUsage = () => {
    const [deviceData, setDeviceData] = useState([]);

    useEffect(() => {
        fetch('http://186.113.234.239:3001/api/device-usage')
            .then(res => res.json())
            .then(data => setDeviceData(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="device-usage">
            <h2>Device Usage Patterns</h2>
            <ul className="data-list">
                {deviceData.map((device, index) => (
                    <li key={index} className="data-item">{device.deviceInfo}: {device.count}</li>
                ))}
            </ul>
            <BackToDashboardButton />
        </div>
    );
};

export default DeviceUsage;