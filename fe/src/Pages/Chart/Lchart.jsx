import React from 'react'
import { Line } from "react-chartjs-2"

function Lchart({ LchartData }) {
    return (
        <div className="Lchart">
            <h2 style={{ textAlign: "center" }}>Ligh</h2>
            <Line
                data={LchartData}
                options={{
                    plugins: {
                        title: {
                            display: true,
                            text: "Ligh"
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

export default Lchart
