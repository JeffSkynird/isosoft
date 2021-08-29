import React,{useState,useContext} from 'react'
import Initializer from "../../../store/Initializer";
import { obtenerOpciones } from "../../../utils/API/precalificator";
import { useTheme } from '@material-ui/styles';

import Chart from "react-apexcharts";
export default function BarChart(props) {
  const initializer = useContext(Initializer);
  const [opciones, setOpciones] = React.useState([]);
  const theme = useTheme();

    const [series,setSeries]=useState([{
        name: 'Series 1',
        data: props.values,
      }])
      const [options,setOptions]=useState({
        chart: {
          
            type: 'radar',
          },
          title: {
            text: 'Basic Radar Chart'
          },
          xaxis: {
            categories: props.categories
          }
      }) 
    
        

    return (
       
   

        <Chart options={options} series={series} height={250} type="radar" width="100%" />


    )
}
