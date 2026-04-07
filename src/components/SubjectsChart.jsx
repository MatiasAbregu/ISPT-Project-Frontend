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

export const SubjectsChart = ({aprobadas, pendientes}) => {
    const data = {
        labels: ['Aprobadas', 'Pendientes'],
        datasets: [
            {
                label: 'Materias',
                data: [aprobadas, pendientes],
                backgroundColor: [
                    'rgba(0, 230, 118, 0.5)',
                    'rgba(255, 82, 82, 0.5)'
                ], 
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