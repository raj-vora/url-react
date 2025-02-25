import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";

function HealthCheck() {
    const [status, setStatus] = useState("Loading...");
    const mainUrl = process.env.REACT_APP_API_URL;

    const checkHealth = async () => {
        try {
            const response = await axios.get(mainUrl + "/health");
            if (response.status !== 200) throw new Error("API is down");
            const data = response.data;
            setStatus(`Backend: ${data.status}, DB: ${data.database}, Uptime: ${data.uptime}`);
        } catch (error) {
            setStatus("Backend is unreachable");
        }
    };

    checkHealth();

    return (
        <div>
            <h2>Health Check</h2>
            <p>{status}</p>

        </div>
    );
}

export default HealthCheck;
