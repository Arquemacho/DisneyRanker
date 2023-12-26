import React, { useEffect, useState } from 'react';

const DeviceUsage = () => {
    const [deviceData, setDeviceData] = useState([]);

    useEffect(() => {
        fetch('http://186.113.234.239:3001/api/device-usage')
            .then(res => res.json())
            .then(data => setDeviceData(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <h2>Device Usage Patterns</h2>
            <ul>
                {deviceData.map((device, index) => (
                    <li key={index}>{device.deviceInfo}: {device.count}</li>
                ))}
            </ul>
        </div>
    );
};

export default DeviceUsage;
