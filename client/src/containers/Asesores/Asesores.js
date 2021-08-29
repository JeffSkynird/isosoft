import React,{useContext} from 'react'
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import { exportFiles} from '../../utils/API/clientes.js'
import { obtenerTodos,eliminarAsesor} from '../../utils/API/asessors.js'



import { LocalizationTable,TableIcons} from '../../utils/table.js'
import MaterialTable from "material-table";
import Initializer from '../../store/Initializer'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import VerFoto from './components/VerFoto'
import Asignado from './components/Asignado'


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
export default function Clientes(props) {
    const initializer= useContext(Initializer);
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState({status:false,dni:""});
    const [open3, setOpen3] = React.useState({status:false,id:""});

    const [data,setData]=React.useState([])
    React.useEffect(()=>{
     
            if(initializer.usuario!=null){
                 obtenerTodos(setData,initializer);
            }
      

        
    
    },[initializer.usuario])
    const exportarClientes=()=>{
        exportFiles(initializer)
    }
    const cargarData=()=>{
        obtenerTodos(setData,initializer);
    }
    const eliminar=()=>{
        eliminarAsesor(open.id,initializer,cargarData)
      
    }
   
    return (
        <div style={{paddingTop:15,paddingLeft:15,paddingRight:15}}>
           {
            open2.status!=false?
            <VerFoto open={open2} setOpen={setOpen2}/>
            :

null
           }
                {
            open3.status!=false?
            <Asignado open={open3} setOpen={setOpen3}/>
            :

null
           }
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
                    ¿Está seguro de eliminar el asesor?
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
                    <Typography color="textPrimary">Asesores</Typography>
                </Breadcrumbs>
                </Box>
                <Box>
                  {/*   <Button style={{marginRight:'5px'}}  startIcon={<AddCircleOutline />} variant="contained" color="secondary" onClick={()=>props.history.push("/clientes/crear")}>
                        Crear cliente
                    </Button> */}
                    <Button  startIcon={<AddCircleOutline />} variant="contained" color="secondary" onClick={()=>props.history.push('/asesores/crear')}>
                        Crear
                    </Button>
          
                </Box>
            </Grid>
     
            <Grid container>
                <Grid item xs="12">
                    <MaterialTable
                                icons={TableIcons}
                                columns={[
                                    { title: "Cédula", field: "dni", type: "numeric" },
                                    { title: "Nombres", field: "full_name" },
                                    { title: "Email", field: "email" },
                                    { title: "Celular", field: "cellphone", type: "numeric" },
                                    { title: "Teléfono", field: "landline", type: "date" },
                                    { title: "Dirección", field: "address" },
                                    { title: "Ciudad", field: "city" },


                                ]}
                                
                              
                                data={
                                    data.map((e)=>{
                                        return ({...e,city_name:e.city.names,})
                                   })
                               }
                             
                                localization={LocalizationTable}
                                title="Asesores"
                                actions={[
                                    {
                                        icon: TableIcons.Edit,
                                        tooltip: 'Editar',
                                      
                                        onClick: (event, rowData) => props.history.push("/asesores/editar",rowData)
                                    },
                                    {
                                        icon: TableIcons.VisibilityOutlinedIcon,
                                        tooltip: "Ver foto",
                                     
                                        onClick: (event, rowData) => setOpen2({status:true,dni:rowData.dni})
                                    }  ,
                            
                                    
                                     {
                                        icon: TableIcons.Delete,
                                        tooltip: "Borrar",
                                     
                                        onClick: (event, rowData) => setOpen({status:true,id:rowData.id })
                                    }  ,
                                   
                                ]}

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
