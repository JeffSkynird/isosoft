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
            events: {
              click(event, chartContext, config) {
               if(config.seriesIndex!=-1){
                     props.obtenerDatosAsesor(props.ids[config.dataPointIndex])
              }
            },
        /*     events: {
              click: function (chart, w, e) {
                   console.log(chart, w, e)
                 
                       if(e.seriesIndex!=-1){
                          
                   
                             console.log(e.config.series[e.seriesIndex])
                             console.log(e.config.xaxis.categories[e.dataPointIndex] )
                             console.log(e.config.series[e.seriesIndex].data[e.dataPointIndex])
                      }
                   
                         
              }
          }, */
                 }
          },
          plotOptions: {
            bar: {
              dataLabels: {
                position: 'top', // top, center, bottom
              },
              borderRadius: 6,
              columnWidth: '45%',
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
              show: true,
              formatter: function (val) {
                return val;
              }
            }
          
          },
          title: {
            text: props.text,
       
            align: 'center',
            style: {
              color: '#444'
            }
          }
        
      
      }) 
    
        

    return (
       
   

        <Chart height={200} width={"100%"} options={options} series={series} type="bar"  />

    )
}
