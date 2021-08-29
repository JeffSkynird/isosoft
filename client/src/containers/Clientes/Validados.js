import React,{useContext} from 'react'
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import { obtenerTodos,exportFiles,eliminarCliente} from '../../utils/API/clientes.js'
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
    const initializer= useContext(Initializer);
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);

    const [data,setData]=React.useState([])

    const [plantillaData,setPlantillaData]=React.useState([])
    const [plantilla,setPlantilla]=React.useState("")
 

    
    React.useEffect(()=>{
     
            if(initializer.usuario!=null){
                 obtenerTodos("Valido",setData,initializer);
                 obtenerTodosPlantilla(setPlantillaData,initializer)
            }
      

        
    
    },[initializer.usuario])
    const exportarClientes=()=>{
        exportFiles(initializer)
    }
    const cargarData=()=>{
        obtenerTodos("Valido",setData,initializer);
    }
    const eliminar=()=>{
        eliminarCliente(open.id,initializer,cargarData)
      
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
                    ¿Está seguro de eliminar el cliente?
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
            <Dialog
                open={open2.status}
                TransitionComponent={Transition}
                keepMounted
                onClose={()=>setOpen2({...open,status:false})}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{"Confirmación de envío de mensaje"}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    Elija una plantilla de mensaje
                </DialogContentText>
                <Grid item md={12} xs={12}>
                <FormControl variant="outlined" style={{ width: "100%" }}>
                  <InputLabel id="label">Plantilla</InputLabel>
                  <Select
                    labelId="label"
                    value={plantilla}
                    onChange={(e) => setPlantilla(e.target.value)}
                    label="ciu"
                  >
                    <MenuItem value="">
                      <em>Seleccione un cantón</em>
                    </MenuItem>
                    {plantillaData.map((e) => (
                      <MenuItem key={e.id} value={e.id}>
                        <em>{e.name}</em>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Button color="primary" disabled={plantilla==""} onClick={()=>props.history.push("/clientes/enviarVarios",{template_id:plantilla})}>Envar mensaje masivo</Button>

              </Grid>
                </DialogContent>
                <DialogActions>
                <Button onClick={()=>setOpen2({...open,status:false})} color="primary">
                    Cancelar
                </Button>
                <Button onClick={()=>{
                    setOpen({...open,status:false})
                    enviarMensaje(open2.id,plantilla,initializer)
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
                    <Typography color="textPrimary">Clients validados</Typography>
                </Breadcrumbs>
                </Box>
                <Box style={{display: 'flex'}}>
                    
                
                  <Button style={{marginRight:'5px'}}  startIcon={<AddCircleOutline />} variant="contained" color="secondary" onClick={()=> props.history.push("/clientes/crear")}>
                        Crear 
                    </Button> 
                    <Button  style={{marginRight:'5px'}} startIcon={<GetAppIcon />} variant="contained" color="default" onClick={()=>exportarClientes()}>
                        Exportar
                    </Button>
                   
                    <Importar/>
                </Box>
            </Grid>
     
            <Grid container>
                <Grid item xs="12">
                    <MaterialTable
                   
                                icons={TableIcons}
                                columns={[
                                    { title: "Cédula", field: "dni", type: "numeric" },
                                    { title: "Nombres", field: "names" },
                                    { title: "Apellidos", field: "last_names" },
                                    { title: "Email", field: "email" },
                                    { title: "Celular", field: "cellphone", type: "numeric" },
                                    { title: "Teléfono", field: "landline", type: "date" },
                                    { title: "Dirección", field: "address" },
                                    { title: "Zona", field: "neighborhood" },
                                    { title: "Ciudad", field: "city_name" },
                                    { title: "Ingresos ($)", field: "month_income" },
                                    { title: "Dependencia", field: "dependencia" },
                                    { title: "Recomendaciòn", field: "recomendation" },
                                    { title: "Estado civil", field: "estado" },
                                    { title: "Asesor asignado", field: "asesor" },
                                    { title: "Supervisor asignado", field: "supervisor" },
                                    { title: "Calificacion", field: "calificacion" },

                                    

                                ]}
                                
                              
                                data={
                                    data.map((e)=>{
                                      
                                            return ({...e,calificacion:"5",supervisor:(e.supervisor!=null?e.supervisor.names+" "+e.supervisor.last_names:"Sin asignar"),city_name:e.city.names,recomendation:e.recomendation.name,dependencia:(e.work_place!=null?"SI":"NO"),recomendation_id:e.recomendation.id,asesor:(e.asesor!=null?e.asesor.names+" "+e.asesor.last_names:"Sin asignar"),asesor_id:(e.asesor!=null?e.asesor.id:""),estado:(e.spouse!=null?'Casado':'Soltero')})
                                     
                                   })
                               }
                             
                                localization={LocalizationTable}
                                title="Clientes validados"
                                actions={[
                                    {
                                        icon: TableIcons.Edit,
                                        tooltip: 'Editar',
                                      
                                        onClick: (event, rowData) => props.history.push("/clientes/editar",rowData)
                                    },
                                    {
                                        icon: TableIcons.AssignmentIndIcon,
                                        tooltip: "Editar asesor",
                                     
                                        onClick: (event, rowData) => props.history.push("/clientes/asignar",rowData)
                                    }  ,
                                    {
                                        icon: TableIcons.VisibilityOutlinedIcon,
                                        tooltip: "Ver archivos",
                                     
                                        onClick: (event, rowData) => props.history.push("/clientes/archivos",rowData)
                                    }  ,
                                     {
                                        icon: TableIcons.MailOutlineIcon,
                                        tooltip: "Enviar correo",
                                     
                                        onClick: (event, rowData) => setOpen2({status:true,id:rowData.id})
                                    }  ,
                                    {
                                        icon: TableIcons.TelegramIcon,
                                        tooltip: "Telegram",
                                     
                                        onClick: (event, rowData) => alert("enviar")
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
