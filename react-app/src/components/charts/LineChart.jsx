import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

export default function LineChart({ data, options }) {
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
      x: {
        grid: { display: false },
        ticks: { font: { size: 11 } }
      },
      y: {
        grid: { color: '#e0e0e0', borderDash: [2, 3] },
        ticks: { font: { size: 11 } }
      }
    },
    animation: { duration: 400 }
  }

  const mergedOptions = { ...defaultOptions, ...options }

  return <Line data={data} options={mergedOptions} />
}
