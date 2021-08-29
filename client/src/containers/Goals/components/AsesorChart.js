import React,{useState} from 'react'
import Chart from "react-apexcharts";
export default function BarChart(props) {
    const [series,setSeries]=useState( [{
        name: 'Meta',
        data: props.values
      }])
      const [options,setOptions]=useState({
        
        chart: {
            height: 350,
            type: 'bar',
  
            toolbar: {
                show: false
              }
        }, 
        legend: {
            show: false,
        },
        plotOptions: {
            bar: {
              dataLabels: {
                position: 'top', // top, center, bottom
                hideOverflowingLabels: true,
              },
     
              distributed: true,
         
            }
          },
          dataLabels: {
            enabled: true,
            formatter: function (val) {
              return val;
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
            axisBorder: {
              show: false
            },
            axisTicks: {
              show: false
            },
          
          
          },
  
      
      }) 
    
        

    return (
       
   <div style={{overflowX: 'auto',overflowY:'hidden'}}>
        <Chart height={200} width={props.values.length>6?props.values.length*100:'100%'} options={options} series={series} type="bar"  />

   </div>


    )
}
