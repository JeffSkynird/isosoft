import React,{useState} from 'react'
import Chart from "react-apexcharts";
export default function BarChart(props) {
    const [series,setSeries]=useState([0])
      const [options,setOptions]=useState({
        chart: {
            size:200,
            type: 'radialBar',
        
            sparkline: {
              enabled: true
            },
            toolbar: {
                show: false
              }
          },
       
          title: {
            text: props.text,
      
            offsetY: 0,
            align: 'center',
            style: {
              color: '#444',
      
            }
          },
          plotOptions: {
            radialBar: {
              startAngle: -135,
              endAngle: 225,
               hollow: {
                margin: 0,
                size: '65%',
                background: '#fff',
                image: undefined,
                imageOffsetX: 0,
                imageOffsetY: 0,
                position: 'front',
                dropShadow: {
                  enabled: true,
                  top: 3,
                  left: 0,
                  blur: 4,
                  opacity: 0.24
                }
              },
              track: {
                background: '#fff',
                strokeWidth: '67%',
                margin: 0, // margin is in pixels
               
              },
          
              dataLabels: {
                show: true,
                name: {
                  offsetY: -10,
                  show: true,
                  color: '#888',
                  fontSize: '17px'
                },
                value: {
                  formatter: function(val) {
                    return val!=null?val!=0?parseFloat(val).toFixed(2)+"%":'0%':'0%';
                  },
                  color: '#111',
                  fontSize: '25px',
                  show: true,
                }
              }
            }
          },
     
          stroke: {
            lineCap: 'round'
          },
          labels: ['Puntaje'],
        
      
      
          
      
      }) 
    
        
React.useEffect(()=>{
  setSeries([props.data])
},[props.data])
    return (
       
   

        <Chart height={200} width={"100%"} options={options} series={series} type="radialBar" />

    )
}
