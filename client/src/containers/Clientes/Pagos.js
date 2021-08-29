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
import { obtenerTodosClientesReservas} from '../../utils/API/reservation'


import { obtenerOpciones} from '../../utils/API/precalificator'
import { enviarMensaje,obtenerTodosPlantilla} from '../../utils/API/templates'
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

import GetAppIcon from '@material-ui/icons/GetApp';
import {TablePagination} from "@material-ui/core";

import { LocalizationTable,TableIcons} from '../../utils/table.js'
import MaterialTable from "material-table";
import Initializer from '../../store/Initializer'
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import CloseIcon from '@material-ui/icons/Close';
import Detalle from './Components/Detalle'
import ImportarReservas from './Components/ImportarReservas'

import Importar from './Components/Importar';
import VisibilityIcon from '@material-ui/icons/Visibility';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
export default function Clientes(props) {
    const initializer= useContext(Initializer);
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [opciones, setOpciones] = React.useState([]);
    const [pageNumber, setPageNumber] = React.useState(0);
    const [rowPerPage, setRowPerPage] = React.useState(5);
    const [totalRows, setTotalRows] = React.useState(5);

    const [data,setData]=React.useState([])
    const [openImport,setOpenImport]=React.useState(false)

    const [plantillaData,setPlantillaData]=React.useState([])
    const [plantilla,setPlantilla]=React.useState("")
 
    const [total,setTotal]=React.useState(0)

    
    React.useEffect(()=>{
     
            if(initializer.usuario!=null){
                obtenerTodosClientesReservas((pageNumber),rowPerPage,setTotalRows,setTotal,setData,initializer);
                 obtenerOpciones(setOpciones,initializer);
                 obtenerTodosPlantilla(setPlantillaData,initializer)
            }
      

        
    
    },[initializer.usuario])
    const exportarClientes=()=>{
        exportFiles(initializer)
    }
    const cargarData=(page,row)=>{
        obtenerTodosClientesReservas((page),row,setTotalRows,setTotal,setData,initializer);
        setPageNumber(page)
    }
    const eliminar=()=>{
        eliminarCliente(open.id,initializer,cargarData)
      
    }
  
    
    const obtenerPorcentaje=(rowData)=>{
        if(rowData.position === ""||rowData.position==null){
            var mydate = new Date(rowData.creado)
            let date2 = new Date(mydate)
            var hoy=new Date();
            var hoy2=new Date(hoy.toLocaleString())
            let dif=(date2.getTime()-hoy2.getTime())/1000
           
            if((Math.abs(dif)*100/30)<=100){
               return (Math.abs(dif)*100/30)
            }else{
                return (100)
            }
        }
        if(rowData.position === "Valido"){
            var mydate = new Date(rowData.modificado)
            let date2 = new Date(mydate)
            var hoy=new Date();
            var hoy2=new Date(hoy.toLocaleString())
            let dif=(date2.getTime()-hoy2.getTime())/1000
            
            if((Math.abs(dif)*100/30)<=100){
                return (Math.abss(dif)*100/30)
            }else{
                return (100)
            }
        }
        if(rowData.position === "Aprobado"){
            return (100)
        }
        if(rowData.position === "Negado"){
            return (100)
        }
        if(rowData.position === "Invalido"){
            return (100)
        }
        
        if(rowData.position === "Revision"){
            return (100)
        }
    }

    const fechaInicio=(rowData)=>{
       
        var mydate = new Date(rowData.creado)
      
        return mydate.toLocaleString()
     
    }
    return (
        <div style={{paddingTop:15,paddingLeft:15,paddingRight:15}}>
           
           
         
            <Grid container justify='space-between' alignItems="center" style={{marginBottom:'10px'}}>
                <Box>
                    <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                    <Link color="inherit" onClick={()=>props.history.push("dashboard")}>
                    Dashboard
                    </Link>
                    <Typography color="textPrimary">Reservas</Typography>
                </Breadcrumbs>
                
                </Box>
                {/* <ImportarReservas/> */}
            </Grid>
        
            <Grid container>
         
            <Grid item xs="12" style={{marginBottom:'5px'}}>
                <div style={{display:'flex'}}>
                <Typography color="textPrimary" variant="h5" style={{marginRight:'10px'}}>Total: ${Number(total).toFixed(3)}</Typography>
            <Button variant="outlined" color="secondary"   startIcon={<VisibilityIcon />} onClick={()=>setOpen(true)}>
        Ver detalle de proyectos
      </Button>
                </div>
           
            </Grid>
                <Grid item xs="12">
                    <MaterialTable
                   
                                icons={TableIcons}
                                columns={[
                                    { title: "Número de reserva", field: "reservations" },
                                    { title: "Valor pendiente de pago", field: "reservation_balance" },

                                    
                                    { title: "Cédula", field: "dni", type: "numeric" },
                                    { title: "Nombres", field: "names" },
                                    { title: "Apellidos", field: "last_names" },
                                    { title: "Email", field: "email" },
                                    { title: "Celular", field: "cellphone", type: "numeric" },
                                    { title: "Teléfono", field: "landline", type: "date" },
                                    { title: "Dirección", field: "address" },
                                    { title: "Ciudad", field: "city_name" },
                                   
                              
                                   

                                    

                                ]}
                                
                              
                                data={
                                    data.map((e)=>{

                               
                                            return ({...e,inicio:fechaInicio(e),supervisor:(e.supervisor!=null?e.supervisor.names+" "+e.supervisor.last_names:"Sin asignar"),city_name:e.city.names,recomendation:e.recomendation.name,dependencia:(e.dependencia!=null?(e.dependencia=='1'?'SI':'NO'):"N/A"),recomendation_id:e.recomendation.id,asesor:(e.asesor!=null?e.asesor.names+" "+e.asesor.last_names:"Sin asignar"),asesor_id:(e.asesor!=null?e.asesor.id:""),estado:e.estado_civil,month_income:"$"+e.month_income,reservation_balance:"$"+e.reservation_balance})
                                   
                                   })
                               }
                               components={{
                                Pagination: props => (
                                             <TablePagination
                                             {...props}
                                            rowsPerPageOptions={[5, 10, 20, 30]}
                                        rowsPerPage={rowPerPage}
                                       count={totalRows}
                                        page={
                                          pageNumber
                                        }
                                        onChangePage={(e, page) =>{
                                          
                                            cargarData(page,rowPerPage)
                                        }
                                        }
                                        onChangeRowsPerPage={event => {
                                          props.onChangeRowsPerPage(event);
                                          setRowPerPage(event.target.value);
                                          cargarData(pageNumber,event.target.value)
                                        }}
                                      />
                                    ),
                                          }}
                                localization={LocalizationTable}
                                title="Reservas"
                                actions={[
                                  
                                    {
                                        icon: TableIcons.VisibilityOutlinedIcon,
                                        tooltip: "Ver detalle",
                                     
                                        onClick: (event, rowData) => props.history.push("/reservas_history",rowData)
                                    }  ,
                                    {
                                        icon: TableIcons.RefreshIcon,
                                        tooltip: "Refrescar",
                                        isFreeAction:true,
                                        onClick: (event, rowData) => cargarData(pageNumber,rowPerPage)
                                    }  ,
                                   
                                ]}

                                options={{
                                    exportButton: true,
                                    rowStyle: rowData => {
                                        if(rowData.position === "Aprobado") {
                                          return {backgroundColor:  opciones.length!=0?opciones[0].color.split(",")[1]:'white'};//GREEN
                                        }else if(rowData.position === "Negado"){
                                            return {backgroundColor:opciones.length!=0?opciones[0].color.split(",")[3]:'white'};
                                        }else if(rowData.position === "Revision"){
                                            return {backgroundColor: opciones.length!=0?opciones[0].color.split(",")[2]:'white'};
                                        }else if(rowData.position === "Invalido"){
                                         
                                            return {backgroundColor:opciones.length!=0?opciones[0].color.split(",")[3]:'white'};
                                        }else if(rowData.position === ""||rowData.position==null){
                                            return {backgroundColor: opciones.length!=0?opciones[0].color.split(",")[0]:'white'};//BLUE
                                        }
                                        
                                        return {};
                                      },
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
            <Dialog fullScreen open={open} onClose={()=>setOpen(false)} TransitionComponent={Transition}>
                <AppBar style={{position:'relative'}}>
                <Toolbar style={{display: "flex",
    justifyContent: 'space-between'}}>
                    <IconButton edge="start" color="inherit" onClick={()=>setOpen(false)} aria-label="close">
                    <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" >
                    Detalle por proyecto
                    </Typography>
                    <Button autoFocus color="inherit" onClick={()=>setOpen(false)}>
                    Cerrar
                    </Button>
                </Toolbar>
                </AppBar>
                
                {
                    open!=false?
                    <div >
                        <Detalle total={Number(total).toFixed(3)}/>

                    </div>
                    :null
                }
            
            </Dialog>
        </div>
        
    )
}
