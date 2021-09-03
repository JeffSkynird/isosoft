import React from 'react'
import Chart from "react-apexcharts";
import { Typography } from '@material-ui/core'
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';

export default function Bar(props) {
    
    const [state,setState]=React.useState({
          
        series: [{
          name: 'Puntaje',
          data: props.values
        }],
        options: {
          chart: {
            height: 350,
            width:'100%',
            type: 'bar',
          },
          title: {
            text: 'Puntaje',
            align: 'left'
          },
          plotOptions: {
            bar: {
                distributed: true,
              borderRadius: 10,
              dataLabels: {
                position: 'top', // top, center, bottom
              },
            }
          },
          dataLabels: {
            enabled: true,
            formatter: function (val) {
              return val + "%";
            },
            offsetY: -20,
            style: {
              fontSize: '12px',
              colors: ["#304758"]
            }
          },
          
          xaxis: {
          
            categories: props.labels,
            position: 'top',
            enabled: false,
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
        
        labels: {
          show: false,
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
                return val + "%";
              }
            }
          
          },
        
          
        },
      
      
      }
    )
    return (
   
              <Chart options={state.options} series={state.series} type="bar"  height={295} />
     
    )
}
