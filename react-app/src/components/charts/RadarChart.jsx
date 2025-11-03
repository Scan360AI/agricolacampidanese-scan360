import { Radar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

export default function RadarChart({ data, options }) {
  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { boxWidth: 12, padding: 15, font: { size: 11 } }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: { weight: 'bold', size: 13 },
        bodyFont: { size: 12 },
        padding: 10,
        cornerRadius: 4
      }
    },
    scales: {
      r: {
        beginAtZero: true,
        angleLines: { color: 'rgba(0, 0, 0, 0.1)' },
        grid: { color: 'rgba(0, 0, 0, 0.1)' },
        pointLabels: { font: { size: 11 } },
        ticks: {
          font: { size: 10 },
          backdropColor: 'transparent'
        }
      }
    },
    animation: { duration: 400 }
  }

  const mergedOptions = { ...defaultOptions, ...options }

  return <Radar data={data} options={mergedOptions} />
}
