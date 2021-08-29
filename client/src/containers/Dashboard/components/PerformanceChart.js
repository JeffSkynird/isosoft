import React,{useState} from 'react'
import Chart from "react-apexcharts";
export default function BarChart(props) {
    const [series,setSeries]=useState([{
        name: 'Series 1',
        data: props.data,
      }])
      const [options,setOptions]=useState({
        chart: {
            height: 350,
            type: 'radar',
            toolbar: {
                show: false
              }
          },
          dataLabels: {
            enabled: true
          },
          plotOptions: {
            radar: {
              size: 85,
               polygons: {
                strokeColors: '#e9e9e9',
                fill: {
                  colors: ['#f8f8f8', '#fff']
                }
              } 
            }
          },
          title: {
            text: 'Rendimiento',
           
          },
         
       
          tooltip: {
            y: {
              formatter: function(val) {
                return val
              }
            }
          },
          xaxis: {
            categories: props.categories
          },
          yaxis: {
            tickAmount: 7,
            labels: {
              formatter: function(val, i) {
                if (i % 2 === 0) {
                  return val+"%"
                } else {
                  return ''
                }
              }
            }
          }
    
      
      }) 
    
        

    return (
       
   

        <Chart height={200} width={"100%"} options={options} series={series} type="radar" />

    )
}
