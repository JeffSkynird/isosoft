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
        colors: ['#00E396','#008FFB', '#FEB019'].reverse(),
        chart: {
          width: 380,
          type: 'pie',
        },
        theme:{ mode: theme.palette.type, },
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
