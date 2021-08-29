import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Initializer from "../../../store/Initializer";
import ListSubheader from "@material-ui/core/ListSubheader";
import Divider from '@material-ui/core/Divider';

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
import FunctionsIcon from '@material-ui/icons/Functions';
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
      <DialogTitle id="alert-dialog-title">{"Detalle de ahorro neto"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          A continuación se presenta la información calculada del ahorro neto.
          
          <List
              component="nav"
              aria-labelledby="nested-list-subheader"
            
            
            >
          <ListItem button>
                    <ListItemIcon>
                      <FunctionsIcon  />
                    </ListItemIcon>
            <ListItemText primary="Ingresos totales" />
            <ListItemSecondaryAction>
                <p style={{fontWeight:'bold'}}>$ {Number(props.ingresos.client).toFixed(2)}</p>
            </ListItemSecondaryAction>
            </ListItem>
           
            <ListItem button>
                    <ListItemIcon>
                      <FunctionsIcon  />
                    </ListItemIcon>
            <ListItemText primary="Egresos totales" />
            <ListItemSecondaryAction>
                <p style={{fontWeight:'bold'}}>$ {Number(props.egresos.client).toFixed(2)}</p>
            </ListItemSecondaryAction>
            </ListItem>
         
            <ListItem button>
                    <ListItemIcon>
                      <FunctionsIcon  />
                    </ListItemIcon>
            <ListItemText primary="Ahorro neto" />
            <ListItemSecondaryAction>
                <p style={{fontWeight:'bold'}}>$ {Number(props.ahorro.client).toFixed(2)}</p>
            </ListItemSecondaryAction>
            </ListItem>
          
            <ListItem button>
                    <ListItemIcon>
                      <FunctionsIcon  />
                    </ListItemIcon>
            <ListItemText primary="Ahorro neto (%)" />
            {
            Number(props.ingresos.client)!=0?
            <ListItemSecondaryAction>
                <p style={{fontWeight:'bold'}}>{Math.round((Number(props.ahorro.client).toFixed(2)/(Number(props.ingresos.client)))*100)}%</p>
            </ListItemSecondaryAction>

            :
            <ListItemSecondaryAction>
            <p style={{fontWeight:'bold'}}>{0}</p>
        </ListItemSecondaryAction>
}

            </ListItem>
            {
              props.ingresos.spouse!=0?
              <Divider />
              :null
            }
          
            {
              props.ingresos.spouse!=0?
              <ListItem button>
              <ListItemIcon>
                <FunctionsIcon  />
              </ListItemIcon>
      <ListItemText primary="Ingresos totales (Cónyuge)" />
      <ListItemSecondaryAction>
          <p style={{fontWeight:'bold'}}>$ {Number(props.ingresos.spouse).toFixed(2)}</p>
      </ListItemSecondaryAction>
      </ListItem>
              :null
            }
             {
               dataS!=null?
              dataS.obligaciones_buro!=0&&dataS.obligaciones_buro!=null?
              <ListItem button>
              <ListItemIcon>
                <FunctionsIcon  />
              </ListItemIcon>
      <ListItemText primary="Obligaciones (Cónyuge)" />
      <ListItemSecondaryAction>
          <p style={{fontWeight:'bold'}}>$ {Number(dataS.obligaciones_buro).toFixed(2)}</p>
      </ListItemSecondaryAction>
      </ListItem>
      :null
              :null
            }
            {
              props.ahorro.spouse!=0?
              <ListItem button>
              <ListItemIcon>
                <FunctionsIcon  />
              </ListItemIcon>
      <ListItemText primary="Ahorro neto (Cónyuge)" />
      <ListItemSecondaryAction>
          <p style={{fontWeight:'bold'}}>$ {((Number(props.ahorro.spouse).toFixed(2)-(dataS!=null?Number(dataS.obligaciones_buro):0))>0?(Number(props.ahorro.spouse).toFixed(2)-(dataS!=null?Number(dataS.obligaciones_buro):0)):0).toFixed(2)}</p>
      </ListItemSecondaryAction>
      </ListItem>
              :null
            }
            {
              props.ahorro.spouse!=0?
              <ListItem button>
              <ListItemIcon>
                <FunctionsIcon  />
              </ListItemIcon>
      <ListItemText primary="Ahorro neto (% Cónyuge)" />
      <ListItemSecondaryAction>
          <p style={{fontWeight:'bold'}}>{(Math.round(Number(((props.ahorro.spouse-(dataS!=null?Number(dataS.obligaciones_buro):0))/props.ingresos.spouse)*100)))>0?(Math.round(Number(((props.ahorro.spouse-(dataS!=null?Number(dataS.obligaciones_buro):0))/props.ingresos.spouse)*100))):0}%</p>
      </ListItemSecondaryAction>
      </ListItem>
              :null
            }
            </List>
 

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
