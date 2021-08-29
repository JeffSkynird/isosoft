import React,{useState,useContext} from 'react'
import Initializer from "../../../store/Initializer";
import { obtenerOpciones } from "../../../utils/API/precalificator";
import { useTheme } from '@material-ui/styles';

import Chart from "react-apexcharts";
export default function BarChart(props) {
  const initializer = useContext(Initializer);
  const [opciones, setOpciones] = React.useState([]);
  const theme = useTheme();

    const [series,setSeries]=useState(props.values)
      const [options,setOptions]=useState({
       
        chart: {
          width: 380,
          type: 'donut',
        },
        theme:{ mode: theme.palette.type, },
       
       
          labels: props.categories,
         
          responsive: [{
            breakpoint: 480,
            options: {
              legend: {
                  show: true
              }
            }
          }],
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  show: true,
                 
                 
                }
              }
            }
          },
          title: {
            text: props.text,
          
            offsetY: 0,
            align: 'center',
          
          }
      }) 
    
        

    return (
       
   

        <Chart options={options} series={series} height={200} type="donut" width="100%" />


    )
}
