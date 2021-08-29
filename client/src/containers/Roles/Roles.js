import React,{useContext} from 'react'
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import { obtenerTodos,eliminarRole} from '../../utils/API/roles.js'




import { LocalizationTable,TableIcons,removeAccent} from '../../utils/table.js'
import MaterialTable, { MTableToolbar }  from "material-table";
import { TextField } from "@material-ui/core";
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
export default function Ciudades(props) {
    const initializer= useContext(Initializer);
    const [open, setOpen] = React.useState(false);
    const [data,setData]=React.useState({data:[],backup:[]})
    const [searching, setSearching] = React.useState(false);
    const [query, setQuery] = React.useState("");

    React.useEffect(()=>{
     
            if(initializer.usuario!=null){
                obtenerTodos(setData,initializer);
            }
      

        
    
    },[initializer.usuario])
    
    const cargarData=()=>{
        obtenerTodos(setData,initializer);
    }
    const eliminar=()=>{
        eliminarRole(open.id,initializer,cargarData)
      
    }
   
    const cambiar=(text)=>{
       

       let temp = data.backup.filter(word => {
           return removeAccent(word.name).toLowerCase().includes(removeAccent(text).toLowerCase())
           
       });
   
        setData({...data,data:temp})

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
                    ¿Está seguro de eliminar el rol?
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
                    <Typography color="textPrimary">Roles/Permisos</Typography>
                </Breadcrumbs>
                </Box>
                <Box>
                  {/*   <Button style={{marginRight:'5px'}}  startIcon={<AddCircleOutline />} variant="contained" color="secondary" onClick={()=>props.history.push("/clientes/crear")}>
                        Crear cliente
                    </Button> */}
                    <Button  startIcon={<AddCircleOutline />} variant="contained" color="secondary" onClick={()=>props.history.push('/roles/crear')}>
                        Crear
                    </Button>
          
                </Box>
            </Grid>
     
            <Grid container>
                <Grid item xs="12">
                    <MaterialTable
                                icons={TableIcons}
                                columns={[
                                
                                    { title: "Nombre", field: "name" },
                             


                                ]}
                                onSearchChange={(e)=>{
                        
                                   cambiar(e)
                                   
                                 }}   
                              
                                data={
                                    data.data.map((e)=>{
                                        return ({...e,name:e.name})
                                   })
                               }
                             
                                localization={LocalizationTable}
                                title="Roles"
                                actions={[
                                    {
                                        icon: TableIcons.Edit,
                                        tooltip: 'Editar',
                                      
                                        onClick: (event, rowData) => props.history.push("/roles/editar",rowData)
                                    },
                                    {
                                        icon: TableIcons.Delete,
                                        tooltip: "Borrar",
                                     
                                        onClick: (event, rowData) => setOpen({status:true,id:rowData.name })
                                    }  ,
                                    
                                   
                                ]}
                                components={{
                                    Toolbar: (props) => (
                                      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',paddingTop:10,paddingRight:'10px'}}>
                                       {/*  <MTableToolbar width={150} style={{width:150}} {...props} /> */}
                                        <Typography style={{paddingLeft:'24px'}} variant="h6" component="h6">
                                            Roles
                                        </Typography>
                                        <div style={{ display:'inline', textAlign: "left" }}>
                                          <TextField
                                    autoFocus 
                                            label="Buscar"
                                            value={query}

                                            onChange={(event) =>{
                                                setQuery(event.target.value)
                                                cambiar(event.target.value)
                                            } }
                                          />
                                        </div>
                                      </div>
                                    )
                                  }}
                                options={{
                                   
                                    actionsColumnIndex: -1,
                                    search: false,
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
