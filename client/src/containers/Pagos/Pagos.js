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
import { obtenerTodosCiudades,eliminarCiudad} from '../../utils/API/ciudades.js'
import { obtenerTodosNuevo,obtenerReserva} from '../../utils/API/pagos.js'
import TextField from "@material-ui/core/TextField";
import XLSX from 'xlsx';

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import SearchIcon from '@material-ui/icons/Search';
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
import {base} from './data/base'
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
export default function Ciudades(props) {
    const initializer= useContext(Initializer);
    const [open, setOpen] = React.useState({status:false,id:'' });
    const [data,setData]=React.useState([])
    const [reserva,setReserva]=React.useState(null)

    const [fechaInicial,setFechaInicial]=React.useState("")
    const [fechaFinal,setFechaFinal]=React.useState("")

    React.useEffect(()=>{
     
            if(initializer.usuario!=null){
                obtenerTodosNuevo(setData,initializer,fechaInicial,fechaFinal);
            }
      

        
    
    },[initializer.usuario])
    
    const cargarData=()=>{
        obtenerTodosNuevo(setData,initializer,fechaInicial,fechaFinal);
    }
    const eliminar=()=>{
        eliminarCiudad(open.id,initializer,cargarData)
      
    }
    const obtenerRes=()=>{
        obtenerReserva(open.id,setReserva,initializer)
      
    }
    React.useEffect(()=>{
     
        if(open.status!=false){
            obtenerRes()
        }
  

    

},[open])

React.useEffect((e)=>{

},[data])

const download_table_as_csv=()=> {
    let nuevo = []
    data.map((e)=>{
        nuevo.push({
            Autorizacion:e.transaccion.autorizacion,
            Tarjeta:e.transaccion.numero_tarjeta,
            Titular:e.transaccion.nombre_tarjetahabiente,
            Emisor:e.transaccion.marca,
            Reserva:changeData((e.descripcion.split('-').length>1?e.descripcion.split('-')[0]:''),e.tercero.identificacion),
            Cedula:e.tercero.identificacion,
            Nombres:e.tercero.razon_social,
            Fecha:e.fecha_creacion,
            Estado:e.estado,
            Total:e.total,
           })
   })
    var ws = XLSX.utils.json_to_sheet(nuevo);
      var new_workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(new_workbook, ws, "SheetJS");
      XLSX.writeFile(new_workbook, 'out.xlsb');

  
            }
    const changeData=(valor,identificacion)=>{
        if(valor==""){
            let reser=valor;
            base.map((e)=>{
                if(e.dni==identificacion){
                    reser=e.codigo
                }
            })
    
            return reser
        }else{
            return valor;
        }
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
                <DialogTitle id="alert-dialog-slide-title">{"Información de la reserva"}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    Número de reserva: {reserva!=null?reserva.reservation_code:"xx"}
                </DialogContentText>
                </DialogContent>
                <DialogActions>
             
                <Button onClick={()=>{
                    setOpen({...open,status:false})
                
                }} color="primary">
                    Cerrar
                </Button>
                </DialogActions>
            </Dialog>
            <Grid container justify='space-between' alignItems="center" style={{marginBottom:'10px'}}>
                <Box>
                    <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                    <Link color="inherit" onClick={()=>props.history.push("dashboard")}>
                    Dashboard
                    </Link>
                    <Typography color="textPrimary">Pagos</Typography>
                </Breadcrumbs>
                </Box>    
          
            
            </Grid>
        
            <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
            <Card>
                <CardContent>
                <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                      
                      <TextField
                      label="Email"
                      variant="outlined"
                      label="Fecha inicial"
                      type="date"
                   
  
                      onChange={(e) => setFechaInicial(e.target.value)}
                      value={fechaInicial}
                      style={{ width: "100%" }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      />
                         </Grid>
                         <Grid item xs={12} md={12}>
                      <TextField
                        label="Fecha final"
                        type="date"
                        variant="outlined"
                        
                        value={fechaFinal}
                        onChange={(e) => {
                          setFechaFinal(e.target.value);
                        }}
                        style={{ width: "100%" }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                    </Grid>
                    </CardContent>
                    <CardActions>
                    <Button  startIcon={<SearchIcon />} variant="contained" color="secondary" onClick={()=>cargarData()}>
                        Buscar
                    </Button>
                    </CardActions>
                    </Card>   
                    </Grid>
                <Grid item xs="12">
                    <MaterialTable
                    id="table"
                                icons={TableIcons}
                                columns={[
                                    { title: "Numero de autorización", field: "autorizacion" },
                               
                                    
                                    { title: "Numero de tarjeta", field: "numero_tarjeta" },
                                    { title: "Titular de la tarjeta", field: "titular_tarjeta" },
                                    { title: "Emisor de la tarjeta", field: "emisor_tarjeta" },
                                    { title: "Numero de RECAP", field: "numero_recap" },
                                    { title: "Numero de reserva", field: "descripcion" },
                                    { title: "Cedula", field: "identificacion" },
                                    { title: "Nombres", field: "razon_social" },
                                    { title: "Fecha", field: "fecha_creacion" },
                                    { title: "Estado", field: "estado" },
                                    { title: "Valor", field: "total" },
                               

                             


                                ]}
                                
                                
                                actions={[
            
                                    {
                                        icon: TableIcons.GetAppIcon,
                                        tooltip: 'Descargar',
                                        onClick: (event, rowData)=> download_table_as_csv(),
                                        isFreeAction:true,
                                    },

                                ]}
                                data={
                                    data.map((e)=>{
                                        return ({...e,
                                            descripcion:changeData((e.descripcion.split('-').length>1?e.descripcion.split('-')[0]:''),e.tercero.identificacion),
                                            id_transaccion:e.transaccion.id_transaccion,
                                            
                                            numero_recap:"N/A",autorizacion:e.transaccion.autorizacion,emisor_tarjeta:e.transaccion.marca,titular_tarjeta:e.transaccion.nombre_tarjetahabiente, numero_tarjeta:e.transaccion.numero_tarjeta,identificacion:e.tercero.identificacion,razon_social:e.tercero.razon_social,direccion:e.tercero.direccion,telefonos:e.tercero.telefonos,email_facturacion:e.tercero.email_facturacion})
                                   })
                               }
                             
                                localization={LocalizationTable}
                                title="Lista de transacciones"
                               

                                options={{
                                    pageSize:20,  
                                    pageSizeOptions : [20, 50, 100],
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
