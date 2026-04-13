import React from 'react'
import { Pie } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
ArcElement,
  Tooltip,
  Legend
)

export const PieChart = ({values, labels, text, colors}) => {
    const data = {
        labels: labels,
        datasets: [
            {
                label: text,
                data: values,
                backgroundColor: colors, 
                borderColor: 'white',
                borderWidth: 1,
            },
        ],
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    color: 'white',
                },
            },
            title: {
                display: true,
                text: 'Estado de las materias',
                color: 'white',
            },
        },
    }

    return (
        <div className="pieWrapper">
            <Pie data={data} options={options} />
        </div>
    )
}