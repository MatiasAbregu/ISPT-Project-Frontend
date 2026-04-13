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

export const BarChart = ({fields, values, label, text, stepSize, minY, maxY }) => {

    const data = {
        labels: fields,
        datasets: [
            {
                label: label,
                data: values,
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
                text: text,
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
                    stepSize: stepSize,
                },
                min: minY,
                max: maxY,
            },
        },
    }

  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  )
}