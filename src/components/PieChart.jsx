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

export const PieChart = ({values, labels, text, colors, isPercentage}) => {
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

    const total = values.reduce((acc,val) =>
        acc + val, 0);

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
            tooltip: {
                callbacks: {
                    label: function(context) {
                        const value = context.raw;

                        if(isPercentage) {
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${context.label}: ${percentage}%`;
                        }
                        return `${context.label}: ${value}`;
                    }
                }
            }
        },
    }

    return (
        <div className="pieWrapper">
            <Pie data={data} options={options} />
        </div>
    )
}