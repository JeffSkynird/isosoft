import React,{useContext,useEffect} from 'react'
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import {ENTRYPOINT} from '../../config/API'
import { obtenerPorAsesor} from '../../utils/API/asessors.js'
import { obtenerTodosPorCliente,eliminarLlamada} from '../../utils/API/calls.js'


import GetAppIcon from '@material-ui/icons/GetApp';

import { LocalizationTable,TableIcons} from '../../utils/table.js'
import MaterialTable from "material-table";
import Initializer from '../../store/Initializer'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
export default function Calls(props) {
    const initializer= useContext(Initializer);
    const [open, setOpen] = React.useState(false);
    const [data,setData]=React.useState([])

    const dato=props.location.state
  useEffect(()=>{
    if(initializer.usuario!=null){
    if(dato!=null){
        obtenerTodosPorCliente(dato.id,setData,initializer)

        
    }      
}
  },[initializer.usuario])

    
    const cargarData=()=>{
        obtenerTodosPorCliente(dato.id,setData,initializer);
    }
    const eliminar = (id) => {
        eliminarLlamada(id, initializer, cargarData)
     
    }
    return (
        <div style={{paddingTop:15,paddingLeft:15,paddingRight:15}}>
           
         
            <Grid container justify='center' alignItems="center" style={{marginBottom:'10px'}}>
               
                <Typography style={{fontSize:20}} color="textPrimary">Llamadas</Typography>

            </Grid>
     
            <Grid container>
                <Grid item xs="12">
                    <MaterialTable
                                icons={TableIcons}
                                columns={[

                                    { title: "Fecha", field: "creado_en"},
                             
                                    { title: "Número", field: "destino" },
                                    { title: "Efectiva", field: "is_effective" },
                                    { title: "Asesor", field: "names" },



                                ]}
                                
                              
                                data={
                                      
                                    data.map((e)=>{
                                        return ({...e,cli_names:e.cli_names+" "+e.cli_last_names,is_effective:e.es_efectiva==1?'Sí':'No',names:e.nombres+" "+e.apellidos})
                                   })
                               }
                               title=""
                                localization={LocalizationTable}
                           
                               
                                options={{
                     
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
        </div>
        
    )
}
