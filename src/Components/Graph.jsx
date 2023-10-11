import React from 'react'
import {Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useTheme } from '../Context/ThemeContext';

ChartJS.register(
    CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend
)


const Graph = ({graphData}) => {

    const {theme} = useTheme();

  return (
    <>
        <Line 
            data={
                {
                    labels: graphData.map(i => i[0]), // x-axis(horizontal) of graphData(time)
                    datasets: [
                        {
                            data: graphData.map(i => Math.round(i[1])), // y-axis(vertical) of graphData(wpm)
                            label: 'WPM',
                            borderColor: theme.textColor,
                            clip: false,
                            // borderWidth: 2,
                            yAxisID: "wpm",
                            // order: 2,
                            // pointRadius: 2,
                        },    
                    ],
                    
                }
            }
        />
    </>
  )
}

export default Graph