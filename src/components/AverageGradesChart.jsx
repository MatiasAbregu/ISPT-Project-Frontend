import React from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

export const AverageGradesChart = ({materias, notas}) => {

    const data = {
        labels: materias,
        datasets: [
            {
                label: 'Notas',
                data: notas,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'white',
                borderWidth: 1,
                
            },
        ],
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: 'Notas promedio de las materias',
                color: 'white',
            },
        },
        scales: {
            x: {
                ticks: {
                    color: 'white',
                },
            },
            y: {
                ticks: {
                    color: 'white',
                    stepSize: 1,
                },
                min: 1,
                max: 10,
            },
        },
    }

  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  )
}