import React,{useState,useEffect} from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Initializer from "../../../store/Initializer";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import DescriptionIcon from "@material-ui/icons/Description";
import { tieneArchivos,tieneArchivosS } from "../../../utils/API/clientes";
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function DetallePlantilla(props) {
    const theme = useTheme();
 
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    
  const initializer = React.useContext(Initializer);
  const [files, setFiles] = useState([]);
  const [filesS, setFilesS] = useState([]);
  

  const [filesFormatted, setFilesFormatted] = useState([]);
  const [filesFormattedN, setFilesFormattedN] = useState([]);

  const [filesFormattedS, setFilesFormattedS] = useState([]);
  const [filesFormattedNS, setFilesFormattedNS] = useState([]);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    
    setValue(newValue);
  };

  React.useEffect(() => {
 
        tieneArchivos(props.client_id,setFiles)
        tieneArchivosS(props.spouse_id,setFilesS)

  }, [props.client_id,props.spouse_id]);
  let noSubidos = [
    "cedula",
    "precalificacionHipotecaria",
   // "rolesPagoMecanizado1",
    //"rolesPagoMecanizado2",
    //"rolesPagoMecanizado3",
    "mecanizado",
     "declaracionImpuestoRenta",
     "declaracionIva",
     "rucRice",
     "movimientosCuenta"
]
let noSubidosC = [
  "cedulaS",
  "precalificacionHipotecariaS",
  //"rolesPagoMecanizado1S",
  //"rolesPagoMecanizado2S",
  "mecanizadoS",
  //"rolesPagoMecanizado3S",
   "declaracionImpuestoRentaS",
   "declaracionIvaS",
   "rucRiceS",
   "movimientosCuentaS"
]
let dependienteFS=[
  "cedulaS",
    "precalificacionHipotecariaS",
    //"rolesPagoMecanizado1S",
    "mecanizadoS",
    //"rolesPagoMecanizado2S",
    //"rolesPagoMecanizado3S",
]
let independienteFS=[
  "cedulaS",
  "precalificacionHipotecariaS",
  "declaracionImpuestoRentaS",
  "declaracionIvaS",
  "rucRiceS",
  "movimientosCuentaS"
]
let dependienteF=[
  "cedula",
    "precalificacionHipotecaria",
    //"rolesPagoMecanizado1",
    //"rolesPagoMecanizado2",
    //"rolesPagoMecanizado3",
    "mecanizado",

]
let independienteF=[
  "cedula",
  "precalificacionHipotecaria",
  "declaracionImpuestoRenta",
  "declaracionIva",
  "rucRice",
  "movimientosCuenta"
]
var removeItemFromArr = ( arr, item ) => {
  var i = arr.indexOf( item );
  i !== -1 && arr.splice( i, 1 );
};
 

const estaEnNo=(esta)=>{
  let retorno=false
  noSubidos.map((e)=>{
        if(esta==e){
          retorno = true
        }
  })
return retorno

}
const estaEnNoS=(esta)=>{
  let retorno=false
  noSubidosC.map((e)=>{
        if(esta==e){
          retorno = true
        }
  })
return retorno

}


  React.useEffect(() => {
 
    if(files.length!=0){
        let filesF = []
        files.map((e)=>{
                if(e=="cedula"){
                    filesF.push("Cédula")
                }
                if(e=="precalificacionHipotecaria"){
                    filesF.push("Buró del credito")
                }
                if(e=="precalification"){
                  filesF.push("Precalificación hipotecaria")
              }
              if(e=="mecanizado"){
                filesF.push("Mecanizado")
            }
            if(e=="movimientosCuenta"){
              filesF.push("Movimientos de cuenta")
            }
            /*     if(e=="rolesPagoMecanizado1"){
                    filesF.push("Rol de pago (Número 1)")
                }
                if(e=="rolesPagoMecanizado2"){
                    filesF.push("Rol de pago (Número 2)")
                }
                if(e=="rolesPagoMecanizado3"){
                    filesF.push("Rol de pago (Número 3)")
                } */
                if(e=="declaracionImpuestoRenta"){
                    filesF.push("Declaración al impuesto a la renta")
                }
                if(e=="declaracionIva"){
                    filesF.push("Declaración al impuesto al valor agregado")
                }
                if(e=="rucRice"){
                    filesF.push("RUC/RICE")
                }
                
        })
        setFilesFormatted(filesF)
    }

}, [files]);
React.useEffect(() => {
 
  if(filesS.length!=0){
      let filesF = []
      filesS.map((e)=>{
              if(e=="cedulaS"){
                  filesF.push("Cédula")
              }
              if(e=="precalificacionHipotecariaS"){
                  filesF.push("Buró del credito")
              }
         /*    
              if(e=="rolesPagoMecanizado1S"){
                  filesF.push("Rol de pago (Número 1)")
              } */
              if(e=="mecanizadoS"){
                filesF.push("Mecanizado")
            }
            if(e=="movimientosCuentaS"){
              filesF.push("Movimientos de cuenta")
            }
           /*    if(e=="rolesPagoMecanizado2S"){
                  filesF.push("Rol de pago (Número 2)")
              }
              if(e=="rolesPagoMecanizado3S"){
                  filesF.push("Rol de pago (Número 3)")
              } */
              if(e=="declaracionImpuestoRentaS"){
                  filesF.push("Declaración al impuesto a la renta")
              }
              if(e=="declaracionIvaS"){
                  filesF.push("Declaración al impuesto al valor agregado")
              }
              if(e=="rucRiceS"){
                  filesF.push("RUC/RICE")
              }
              
      })
      setFilesFormattedS(filesF)
  }

}, [filesS]);
React.useEffect(()=>{
  if(filesS.length!=0){
    let noSubidosC=[]
    if(props.dependenceS==1){
      noSubidosC= dependienteFS.slice()
    }else{
      noSubidosC= independienteFS.slice()
    }
   

    filesS.map((e)=>{
      if(estaEnNoS(e)){
        removeItemFromArr(noSubidosC,e)
      }
    })
    let filesF=[]
    noSubidosC.map((e)=>{
      if(e=="cedulaS"){
        filesF.push("Cédula")
    }
    if(e=="precalificacionHipotecariaS"){
        filesF.push("Buró del credito")
    }
 /*    if(e=="rolesPagoMecanizado1S"){
        filesF.push("Rol de pago (Número 1)")
    }
    if(e=="rolesPagoMecanizado2S"){
        filesF.push("Rol de pago (Número 2)")
    }
    if(e=="rolesPagoMecanizado3S"){
        filesF.push("Rol de pago (Número 3)")
    } */
    if(e=="mecanizadoS"){
      filesF.push("Mecanizado")
  }
    if(e=="declaracionImpuestoRentaS"){
        filesF.push("Declaración al impuesto a la renta")
    }
    if(e=="declaracionIvaS"){
        filesF.push("Declaración al impuesto al valor agreagdo")
    }
    if(e=="rucRiceS"){
        filesF.push("RUC/RICE")
    }
    if(e=="movimientosCuentaS"){
      filesF.push("Movimientos de cuenta")
    }
    })
    
    setFilesFormattedNS(filesF) 
  }
  
},[files,props.dependence])
  React.useEffect(()=>{
    if(files.length!=0){
      let noSubidosC=[]
      if(props.dependence==1){
        noSubidosC= dependienteF.slice()
      }else{
        noSubidosC= independienteF.slice()
      }
     

      files.map((e)=>{
        if(estaEnNo(e)){
          removeItemFromArr(noSubidosC,e)
        }
      })
      let filesF=[]
      noSubidosC.map((e)=>{
        if(e=="cedula"){
          filesF.push("Cédula")
      }
      if(e=="precalificacionHipotecaria"){
          filesF.push("Buró del credito")
      }
      if(e=="precalification"){
        filesF.push("Precalificación hipotecaria")
    }
     
     /*  if(e=="rolesPagoMecanizado1"){
          filesF.push("Rol de pago (Número 1)")
      }
      if(e=="rolesPagoMecanizado2"){
          filesF.push("Rol de pago (Número 2)")
      }
      if(e=="rolesPagoMecanizado3"){
          filesF.push("Rol de pago (Número 3)")
      } */
      if(e=="mecanizado"){
        filesF.push("Mecanizado")
    }
      if(e=="declaracionImpuestoRenta"){
          filesF.push("Declaración al impuesto a la renta")
      }
      if(e=="declaracionIva"){
          filesF.push("Declaración al impuesto al valor agreagdo")
      }
      if(e=="rucRice"){
          filesF.push("RUC/RICE")
      }
      if(e=="movimientosCuenta"){
        filesF.push("Movimientos de cuenta")
      }
      })
      
      setFilesFormattedN(filesF) 
    }
    
  },[files,props.dependence])
  return (
    <Dialog
    fullScreen={fullScreen}
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Archivos subidos"} ({value==0?(props.dependence==1?"DEPENDIENTE":"INDEPENDIENTE"):(props.dependenceS==1?"DEPENDIENTE":"INDEPENDIENTE") })</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Si un documento no es visible, subirlo nuevamente o revisar el
          formato. Los documentos en  <span style={{color:theme.palette.secondary.main}}>rojo</span> no están subidos.
          <Paper  style={{marginTop:'10px'}} square>
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
              <Tab label="Cliente"  />
              <Tab label="Cónyuge" disabled={!props.married}/>
             
            </Tabs>
          </Paper>
          <TabPanel value={value} index={0}>
          <List
              component="nav"
              aria-labelledby="nested-list-subheader"
            
            
            >

                {
                    filesFormatted.map((e)=>(
                        <ListItem button>
                        <ListItemIcon>
                          <DescriptionIcon />
                        </ListItemIcon>
                        <ListItemText primary={e} />
                        
                      </ListItem>

                    ))
                }
            {
                    filesFormattedN.map((e)=>(
                        <ListItem button>
                        <ListItemIcon>
                          <DescriptionIcon  style={{color:theme.palette.secondary.main}}/>
                        </ListItemIcon>
                        <ListItemText primary={e} style={{color:theme.palette.secondary.main}} />
                        
                      </ListItem>

                    ))
                }
        
            </List>
        
          </TabPanel>
          <TabPanel value={value} index={1}>
          <List
              component="nav"
              aria-labelledby="nested-list-subheader"
            
            
            >

              
{
                    filesFormattedS.map((e)=>(
                        <ListItem button>
                        <ListItemIcon>
                          <DescriptionIcon />
                        </ListItemIcon>
                        <ListItemText primary={e} />
                        
                      </ListItem>

                    ))
                }
            {
                    filesFormattedNS.map((e)=>(
                        <ListItem button>
                        <ListItemIcon>
                          <DescriptionIcon  style={{color:theme.palette.secondary.main}}/>
                        </ListItemIcon>
                        <ListItemText primary={e} style={{color:theme.palette.secondary.main}} />
                        
                      </ListItem>

                    ))
                }
        
            </List>
        
          </TabPanel>
    
         
        </DialogContentText>
      </DialogContent>
      <DialogActions>
      
        <Button onClick={props.handleClose} color="primary" autoFocus>
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
