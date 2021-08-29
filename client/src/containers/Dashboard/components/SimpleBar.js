import React, { useState,useContext,useEffect } from 'react'
import Chart from "react-apexcharts";
import Initializer from "../../../store/Initializer";
import { obtenerOpciones } from "../../../utils/API/precalificator";

export default function BarChart(props) {
    const initializer = useContext(Initializer);

    const [opciones, setOpciones] = React.useState([]);

    const [series, setSeries] = useState([{
        data: props.values
    }])
    const [options, setOptions] = useState({

        chart: {
            height: 350,
            type: 'bar',
          
            toolbar: {
                show: false
              }
        },
        // colors: colors,
        plotOptions: {
            bar: {
                borderRadius: 6,
                columnWidth: '45%',
                distributed: true,
            }
        },
        yaxis: {
            title: {
                text: 'Número de ocurrencias'
            }
        },
        dataLabels: {
            enabled: true,
            formatter: function (val) {
                return val;
            },

            style: {
                fontSize: '12px',

            }
        },

        legend: {
            show: false
        },
        title: {
            text: props.text,

            offsetY: 0,
            align: 'center',
            style: {
                color: '#444',

            }
        },
        xaxis: {

            categories: props.categories,
            labels: {
                style: {
                    // colors: colors,
                    fontSize: '12px', marginBottom: '50px'
                }
            }
        }
    })


    React.useEffect(() => {
        setSeries([{
            data: props.values
        }])
        setOptions({...options,xaxis:{...options.xaxis,categories:props.categories}})
    }, [props.categories, props.values])
    React.useEffect(() => {
        if (opciones.length!=0) {
           
            setOptions({...options,
              colors: [opciones[0].color.split(",")[1], opciones[0].color.split(",")[2], opciones[0].color.split(",")[3], opciones[0].color.split(",")[3], opciones[0].color.split(",")[0]],
            })
        }
      }, [opciones]);
    React.useEffect(() => {
        if (initializer.usuario != null) {
            if(props.hasOwnProperty('colors')){
                obtenerOpciones(setOpciones, initializer);
            }
         
        }
      }, [initializer.usuario]);
    return (



        <Chart height={200} width={"100%"} options={options} series={series} type="bar" />

    )
}
