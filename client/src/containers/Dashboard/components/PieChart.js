import React,{useState,useContext} from 'react'
import Initializer from "../../../store/Initializer";
import { obtenerOpciones } from "../../../utils/API/precalificator";

import Chart from "react-apexcharts";
export default function BarChart(props) {
  const initializer = useContext(Initializer);
  const [opciones, setOpciones] = React.useState([]);

 

  React.useEffect(() => {
    if (initializer.usuario != null) {
      obtenerOpciones(setOpciones, initializer);
    }
  }, [initializer.usuario]);
  React.useEffect(() => {
    if (opciones.length!=0) {
       
        setOptions({
          colors: [opciones[0].color.split(",")[1], opciones[0].color.split(",")[2], opciones[0].color.split(",")[3], opciones[0].color.split(",")[3], opciones[0].color.split(",")[0]],
          chart: {
            width: 380,
            type: 'pie',
          },
          labels: props.categories,
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
         
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  show: true,
                 
                },
                
              },
              dataLabels: {
                position: 'top', // top, center, bottom,
                colors:['#F44336', '#E91E63', '#9C27B0']
              },
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
    }
  }, [opciones]);
    const [series,setSeries]=useState(props.values)
      const [options,setOptions]=useState({
        colors: ['#66DA26', '#FF9800', '#E91E63', '#E91E63', '#546E7A'],
        chart: {
          width: 380,
          type: 'pie',
        },
        labels: props.categories,
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 300
            },
            legend: {
              position: 'bottom'
            }
          }
        }],
       
      
        
        title: {
          text: props.text,
        
          offsetY: 0,
          align: 'center',
        
        }
      }) 
    
        

    return (
       
   

        <Chart options={options} series={series} height={200} type="pie" width="100%" />


    )
}
