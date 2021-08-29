import React,{useContext} from 'react'
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import {ENTRYPOINT} from '../../config/API'
import { obtenerTodos,exportFiles,eliminarCliente} from '../../utils/API/clientes.js'
import { obtenerReservas} from '../../utils/API/reservation.js'


import { obtenerOpciones} from '../../utils/API/precalificator'
import { enviarMensaje,obtenerTodosPlantilla} from '../../utils/API/templates'
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

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
import Importar from './Components/Importar';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
export default function Clientes(props) {
    const dato = props.location.state;

    const initializer= useContext(Initializer);
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [opciones, setOpciones] = React.useState([]);

    const [data,setData]=React.useState([])
    const [openImport,setOpenImport]=React.useState(false)

    const [plantillaData,setPlantillaData]=React.useState([])
    const [plantilla,setPlantilla]=React.useState("")
 

    
    React.useEffect(()=>{
     
            if(initializer.usuario!=null){
                if (dato != null) {
                obtenerReservas(dato.id,setData,initializer);
                }
            }
      

        
    
    },[initializer.usuario])
    const exportarClientes=()=>{
        exportFiles(initializer)
    }
    const cargarData=()=>{
        obtenerTodos("Pago",setData,initializer);
    }
    const eliminar=()=>{
        eliminarCliente(open.id,initializer,cargarData)
      
    }
  
    

    const fechaInicio=(rowData)=>{
       
        var mydate = new Date(rowData.creado)
      
        return mydate.toLocaleString()
     
    }
    return (
        <div style={{paddingTop:15,paddingLeft:15,paddingRight:15}}>
           
           
           <Dialog
                open={open.status}
                TransitionComponent={Transition}
                keepMounted
                onClose={()=>setOpen({...open,status:false})}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{"Confirmación de eliminación"}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    ¿Está seguro de eliminar el interesado?
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={()=>setOpen({...open,status:false})} color="primary">
                    Cancelar
                </Button>
                <Button onClick={()=>{
                    setOpen({...open,status:false})
                    eliminar()
                }} color="primary">
                    Aceptar
                </Button>
                </DialogActions>
            </Dialog>
          
            <Grid container justify='space-between' alignItems="center" style={{marginBottom:'10px'}}>
                <Box>
                    <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                    <Link color="inherit" onClick={()=>props.history.push("dashboard")}>
                    Dashboard
                    </Link>
                    <Link color="inherit" onClick={()=>props.history.go(-1)}>
                    Reservas
                    </Link>
                    <Typography color="textPrimary">Detalle</Typography>
                </Breadcrumbs>
                </Box>
               
            </Grid>
 
            <Grid container>
                <Grid item xs="12">
                    <MaterialTable
                   
                                icons={TableIcons}
                                columns={[
                                     {title: "Número", field: "reservation_code" },
                                    { title: "Fecha de reservación", field: "start_reservation", type: "numeric" },
                                    { title: "Saldo pendiente", field: "balance" },
                                   
                              
                                   

                                    

                                ]}
                                
                              
                                data={
                                    data
                               }
                             
                                localization={LocalizationTable}
                                title="Detalle"
                               

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
