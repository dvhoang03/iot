import React from 'react'
import { Line } from "react-chartjs-2"


function Hchart({ HchartData }) {
    return (
        <div className="Hchart">
            <h2 style={{ textAlign: "center" }}>Humiditi</h2>
            <Line
                data={HchartData}
                options={{
                    plugins: {
                        title: {
                            display: true,
                            text: "Humiditi"
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

export default Hchart
