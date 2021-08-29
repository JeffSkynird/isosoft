import React,{useState,useEffect,useContext} from 'react'
import Initializer from '../../../store/Initializer'
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import { LocalizationTable,TableIcons} from '../../../utils/table.js'
import { obtenerTotalProProyecto} from '../../../utils/API/pagos.js'

import MaterialTable from "material-table";
export default function Detalle(props) {
    const initializer= useContext(Initializer);

    const [data,setData]=React.useState([])

    React.useEffect(()=>{
     
        if(initializer.usuario!=null){
            obtenerTotalProProyecto(setData,initializer);
           
        }
  

    

},[initializer.usuario])
    
    return (
        <Grid container>
        <Grid item xs="12" style={{padding:'20px'}}>
            <MaterialTable
                        icons={TableIcons}
                        columns={[
                            { title: "Proyecto", field: "proyect" },
                            { title: "Total", field: "total" },

                     


                        ]}
                        
                      
                        data={
                            data.map((e)=>{

                               
                                return ({...e,total:"$"+(e.total!=null?Number(e.total).toFixed(3):0)})
                       
                       })
                       }
                     
                        localization={LocalizationTable}
                        title={"Detalle ($"+props.total+")"}
                       
                        options={{
                            exportButton: true,
                            actionsColumnIndex: -1,
                            search: true,
                            maxBodyHeight: 350,
                            padding: 'dense',
                            headerStyle: {
                                textAlign: 'left'
                            },
                            cellStyle: {
                                textAlign: 'left'
                            },
                            searchFieldStyle: {

                                padding: 5
                            }
                        }}

                    />
        </Grid>
   
    </Grid>
    )
}
