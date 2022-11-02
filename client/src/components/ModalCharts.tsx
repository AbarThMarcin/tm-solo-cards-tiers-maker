import { Bar } from 'react-chartjs-2'
import { ListInterface, PlayerInterface } from '../interfaces/listInterface'
import { Chart as ChartJS, registerables } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'

ChartJS.register(...registerables, ChartDataLabels)

const LABELS = ['S', 'A', 'B', 'C', 'D', 'E', 'F']
const BG_COLORS = [
   'rgba(255, 255, 255, 0.7)',
   'rgba(83, 244, 255, 0.7)',
   'rgba(83, 255, 140, 0.7)',
   'rgba(166, 255, 83, 0.7)',
   'rgba(255, 229, 83, 0.7)',
   'rgba(255, 132, 83, 0.7)',
   'rgba(255, 83, 83, 0.7)',
]

const OPTIONS = {
   layout: {
      padding: 10,
   },
   plugins: {
      title: {
         display: true,
         text: 'Number of tiers',
         color: 'rgba(255, 255, 255, 0.5)',
         font: {
            size: 20,
         },
      },
      legend: {
         display: true,
         labels: {
            boxWidth: 0,
            color: 'white',
            font: {
               size: 22,
            },
         },
      },
   },
   scales: {
      x: {
         ticks: {
            font: {
               size: 20,
            },
            color: BG_COLORS,
         },
         grid: {
            color: 'rgba(255, 255, 255, 0.04)',
            borderColor: 'rgba(255, 255, 255, 0.1)',
         },
      },
      y: {
         beginAtZero: true,
         ticks: {
            stepSize: 5,
            font: {
               size: 17,
            },
         },
         grid: {
            color: 'rgba(255, 255, 255, 0.05',
            borderColor: 'rgba(255, 255, 255, 0.1)',
         },
      },
   },
   maintainAspectRatio: false,
}

interface PropsCharts {
   list: ListInterface
}

interface PropsChart {
   player: PlayerInterface
}

export const ModalCharts: React.FC<PropsCharts> = ({ list }) => {
   return (
      <div className="charts">
         {list.players.map((player, idx) => (
            <ChartFC key={idx} player={player} />
         ))}
      </div>
   )
}

export const ChartFC: React.FC<PropsChart> = ({ player }) => {
   function getTiersCounts(player: PlayerInterface): number[] {
      return LABELS.map((label) =>
         player.rates.reduce((total, rate) => (rate.value === label ? total + 1 : total), 0)
      )
   }

   return (
      <div className="chart">
         <Bar
            data={{
               labels: LABELS,
               datasets: [
                  {
                     label: player.name,
                     data: getTiersCounts(player),
                     backgroundColor: BG_COLORS,
                     maxBarThickness: 40,
                     datalabels: {
                        font: {
                           weight: 'bold',
                        },
                        color: '#fff',
                        anchor: 'end',
                        clamp: true,
                        align: 'top',
                        offset: -4
                     }
                  },
               ],
            }}
            options={OPTIONS}
         />
      </div>
   )
}
