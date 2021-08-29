import React,{useState} from 'react'
import Chart from "react-apexcharts";
export default function BarChart(props) {
    const [series,setSeries]=useState(props.values)
      const [options,setOptions]=useState({
        chart: {
          height: 350,
          type: 'bar',
          zoom: {
            enabled: true,
            type: 'x',
            resetIcon: {
                offsetX: -10,
                offsetY: 0,
                fillColor: '#fff',
                strokeColor: '#37474F'
            },
            selection: {
                background: '#90CAF9',
                border: '#0D47A1'
            }    
        }
        },
        plotOptions: {
          bar: {
            dataLabels: {
              position: 'bottom', // top, center, bottom
            },
          },
          
        },
        dataLabels: {
            enabled: true,
            textAnchor: 'start',
            style: {
              colors: ['#fff']
            },
            position: 'bottom', // top, center, bottom,
            formatter: function (val, opt) {
            
              return opt.w.globals.initialSeries[opt.seriesIndex].name+"("+val+")"
            },
    
            dropShadow: {
              enabled: true
            }
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
        title: {
          text: props.text,
        
          offsetY: 0,
          align: 'center',
          style: {
            color: '#444',
       
          }
        }
      }) 
    
        

    return (
       
   

        <Chart height={200} width="100%" options={options} series={series} type="bar"  />

    )
}
