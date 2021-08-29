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
      <DialogTitle id="alert-dialog-title">{"Detalle de lectura"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          A continuación se presenta la información extraida de los documentos.
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
              
      
    
            
                  <ListItem button>
                    <ListItemIcon>
                      <DescriptionIcon />
                    </ListItemIcon>
                    <ListItemText primary="Buró de crédito" />
                    <ListItemSecondaryAction>
                        <p style={{fontWeight:'bold'}}>{Number(data.buro!=null?data.buro:0).toFixed()}</p>
                  </ListItemSecondaryAction>
                  </ListItem>
                  <ListItem button>
                    <ListItemIcon>
                      <DescriptionIcon />
                    </ListItemIcon>
                    <ListItemText primary="Obligaciones" />
                    <ListItemSecondaryAction>
                        <p style={{fontWeight:'bold'}}>${Number(data.obligaciones_buro!=null?data.obligaciones_buro:0).toFixed(2)}</p>
                  </ListItemSecondaryAction>
                  </ListItem>

             
                
          
   
     
            </List>
          ) : null}
   </TabPanel>
<TabPanel value={value} index={1}>
{dataS != null ? (
            <List
              component="nav"
              aria-labelledby="nested-list-subheader"
            
            
            >
              
      
    
              <ListItem button>
                    <ListItemIcon>
                      <DescriptionIcon />
                    </ListItemIcon>
                    <ListItemText primary="Buró de crédito" />
                    <ListItemSecondaryAction>
                        <p style={{fontWeight:'bold'}}>{Number(dataS.buro!=null?dataS.buro:0).toFixed()}</p>
                  </ListItemSecondaryAction>
                  </ListItem>
                  <ListItem button>
                    <ListItemIcon>
                      <DescriptionIcon />
                    </ListItemIcon>
                    <ListItemText primary="Obligaciones" />
                    <ListItemSecondaryAction>
                        <p style={{fontWeight:'bold'}}>${Number(dataS.obligaciones_buro!=null?dataS.obligaciones_buro:0).toFixed(2)}</p>
                  </ListItemSecondaryAction>
                  </ListItem>

     
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
