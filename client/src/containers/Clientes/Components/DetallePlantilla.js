import React from "react";
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
import { obtenerDetalleArchivos,obtenerDetalleArchivosS } from "../../../utils/API/precalificator";
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
  const [data, setData] = React.useState(null);
  const [dataS, setDataS] = React.useState(null);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    if (initializer.usuario != null) {
      obtenerDetalleArchivos(props.client_id, setData, initializer);

      obtenerDetalleArchivosS(props.spouse_id, setDataS, initializer);
    }
  }, [initializer.usuario]);
  return (
    <Dialog
    fullScreen={fullScreen}
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Detalle de lectura"} ($ {Number(props.total).toFixed(2)})</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          A continuación se presenta la información extraida de los documentos.
          Si un documento no es visible, subirlo nuevamente o revisar el
          formato.
          <Paper  style={{marginTop:'10px'}} square>
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
              <Tab label="Cliente"  />
              <Tab label="Cónyuge"  disabled={!props.married}/>
             
            </Tabs>
          </Paper>
          <TabPanel value={value} index={0}>
          {data != null ? (
            <List
              component="nav"
              aria-labelledby="nested-list-subheader"
            
            
            >
              
      
    
              {data.dependence == 0 ? (
                <React.Fragment>
                  <ListItem button>
                    <ListItemIcon>
                      <DescriptionIcon />
                    </ListItemIcon>
                    <ListItemText primary={fullScreen?"Dec. IVA (últ. semestre)":"Declaración del IVA (último semestre)"} />
                    <ListItemSecondaryAction>
                        <p style={{fontWeight:'bold'}}>$ {Number(data.iva!=null?data.iva:0).toFixed(2)}</p>
                  </ListItemSecondaryAction>
                  </ListItem>

                  <ListItem button>
                    <ListItemIcon>
                      <DescriptionIcon />
                    </ListItemIcon>
                    <ListItemText primary={fullScreen?"Dec. impuesto a la renta (último año)":"Declaración del impuesto a la renta (último año)"} />
                    <ListItemSecondaryAction>
                        <p style={{fontWeight:'bold'}}>$ {Number(data.renta!=null?data.renta:0).toFixed(2)}</p>
                  </ListItemSecondaryAction>
                  </ListItem>
                  {
                    data.utilidad_renta!=null?
                    <ListItem button>
                    <ListItemIcon>
                      <DescriptionIcon />
                    </ListItemIcon>
                    <ListItemText primary="Utilidad" />
                    <ListItemSecondaryAction>
                        <p style={{fontWeight:'bold'}}>$ {Number(data.utilidad_renta!=null?data.utilidad_renta:0).toFixed(2)}</p>
                  </ListItemSecondaryAction>
                  </ListItem>
                    :
                    null
                  }
                
                </React.Fragment>
              ) : 
              <React.Fragment>
           
              <ListItem button>
                <ListItemIcon>
                  <DescriptionIcon />
                </ListItemIcon>
                <ListItemText primary="Mecanizado del IESS" />
                <ListItemSecondaryAction>
                    <p style={{fontWeight:'bold'}}>$ {Number(data.mecanizado!=null?data.mecanizado:0).toFixed(2)}</p>
              </ListItemSecondaryAction>
              </ListItem>
             
            </React.Fragment>
              }
   
     
            </List>
          ) : null}
   </TabPanel>
<TabPanel value={value} index={1}>
{dataS != null ? (
            <List
              component="nav"
              aria-labelledby="nested-list-subheader"
            
            
            >
              
      
    
              {dataS.dependence == 0 ? (
                <React.Fragment>
                  <ListItem button>
                    <ListItemIcon>
                      <DescriptionIcon />
                    </ListItemIcon>
                    <ListItemText primary={fullScreen?"Dec. IVA (últ. semestre)":"Declaración del IVA (último semestre)"} />
                    <ListItemSecondaryAction>
                        <p style={{fontWeight:'bold'}}>$ {Number(dataS.iva!=null?dataS.iva:0).toFixed(2)}</p>
                  </ListItemSecondaryAction>
                  </ListItem>

                  <ListItem button>
                    <ListItemIcon>
                      <DescriptionIcon />
                    </ListItemIcon>
                    <ListItemText primary={fullScreen?"Dec. impuesto a la renta (último año)":"Declaración del impuesto a la renta (último año)"} />
                    <ListItemSecondaryAction>
                        <p style={{fontWeight:'bold'}}>$ {Number(dataS.renta!=null?dataS.renta:0).toFixed(2)}</p>
                  </ListItemSecondaryAction>
                  </ListItem>
                
                </React.Fragment>
              ) : 
              <React.Fragment>
           {/*    <ListItem button>
                <ListItemIcon>
                  <DescriptionIcon />
                </ListItemIcon>
                <ListItemText primary="Roles de pago" />
                <ListItemSecondaryAction>
                    <p style={{fontWeight:'bold'}}>$ {Number(dataS.role!=null?dataS.role:0).toFixed(2)}</p>
              </ListItemSecondaryAction>
              </ListItem> */}
              <ListItem button>
                <ListItemIcon>
                  <DescriptionIcon />
                </ListItemIcon>
                <ListItemText primary="Mecanizado del IESS" />
                <ListItemSecondaryAction>
                    <p style={{fontWeight:'bold'}}>$ {Number(dataS.mecanizado!=null?dataS.mecanizado:0).toFixed(2)}</p>
              </ListItemSecondaryAction>
              </ListItem>
             
            </React.Fragment>
              }
   
     
            </List>
          ) : null}
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
