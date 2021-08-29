import React, { useState } from 'react'
import Chart from "react-apexcharts";
export default function BarChart(props) {
  const [series, setSeries] = useState([
    {
      name: 'Meta',
      type: 'column',
  
      data: props.data1
    },{
    name: 'Obtenido',
    type: 'column',
    data: props.data2
  }
  
  ])
  const [options, setOptions] = useState({
    chart: {
      height: 350,
      type: 'line',
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false,

      }
    },
    stroke: {
      width: [0, 4]
    },
 

    dataLabels: {
      enabled: true,
      enabledOnSeries: [0, 1, 2],
    
    },
    legend: {
        show: false,
    },
    xaxis: {
      categories: props.categories,
      position: 'top',
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      crosshairs: {
        fill: {
          type: 'gradient',
          gradient: {
            colorFrom: '#D8E3F0',
            colorTo: '#BED1E6',
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          }
        }
      },
    
    },
    yaxis: [
 
      {
        seriesName: 'Meta',
      
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          color: '#008FFB'
        },
        labels: {
          style: {
            color: '#008FFB'
          }
        },
        title: {
          text: "Meta",
          style: {
            color: '#008FFB'
          }
        },
      },
      {
        opposite: true,
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          color: '#00E396',
        },
        labels: {
          style: {
            color: '#00E396',
          }
        },
        title: {
          text: "Obtenido",
          style: {
            color: '#00E396',
          }
        },
        tooltip: {
          enabled: true
        }
      }
    ],

    tooltip: {
      fixed: {
        enabled: false,
        position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
        offsetY: 30,
        offsetX: 60
      },
    },
   
    title: {
      text: props.text,

     
    }
  })



  return (

    <div style={{overflowX: 'auto',overflowY:'hidden'}}>

    <Chart height={200} width={props.data1.length>6?props.data1.length*100:'100%'} options={options} series={series} />

    </div>
  )
}
