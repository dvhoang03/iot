import React from 'react'
import { Line } from "react-chartjs-2"

function TChart({ TchartData }) {
    return (
        <div className="Tchart">
            <h2 style={{ textAlign: "center" }}>Temperature</h2>
            <Line
                data={TchartData}
                options={{
                    plugins: {
                        title: {
                            display: true,
                            text: "Temperature"
                        },
                        legend: {
                            display: false
                        }
                    }
                }}
            />
        </div>
    );
}

export default TChart
