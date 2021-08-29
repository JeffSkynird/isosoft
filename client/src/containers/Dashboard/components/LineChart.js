import React,{useState} from 'react'
import Chart from "react-apexcharts";
export default function BarChart(props) {
    const [series,setSeries]=useState([{
        name: props.label,
        data: props.values
      }])
      const [options,setOptions]=useState({
        chart: {
          height: 500,
          type: 'line',
        },
      
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }],
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return val ;
          },
         
          style: {
            fontSize: '12px',
            colors: ["#304758"]
          }
        },
        
        xaxis: {
          categories: props.categories,
          
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
          tooltip: {
            enabled: true,
          }
        },
        yaxis: {
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false,
          },
          labels: {
            show: false,
            formatter: function (val) {
              return val ;
            }
          }
        
        },
        title: {
          text: props.text,
          floating: true,
          offsetY: 0,
          align: 'center',
          style: {
            color: '#444'
          }
        }
      }) 
    
        

    return (
       
   

<Chart
    options={options}
    series={series}
    type="area"
    height={350}
    width='100%'
    style={{padding:'10px'}}
  />

    )
}
