import React, { useContext, useEffect } from "react";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Paper} from '@material-ui/core';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Accordion from '@material-ui/core/Accordion';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import SearchIcon from '@material-ui/icons/Search';

import Link from "@material-ui/core/Link";
import AddCircleOutline from "@material-ui/icons/AddCircleOutline";
import Menu from "./components/MenuNuevo";
import Calendar from "./components/Calendar";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import DateFnsUtils from "@date-io/date-fns"; // choose your lib

import InputLabel from "@material-ui/core/InputLabel";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  DatePicker,
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';

import {
  obtenerTodos,
  exportFiles,
  eliminarCliente,
} from "../../utils/API/clientes.js";
import { obtenerLeadsPorAsesor } from "../../utils/API/leads.js";
import Tooltip from "@material-ui/core/Tooltip";

import Initializer from "../../store/Initializer";

const MyCalendar = (props) => {
  const initializer = useContext(Initializer);
  const [open, setOpen] = React.useState(false);
  const [leadClientsData, setLeadClientsData] = React.useState([]);
  const [leadClient, setLeadClient] = React.useState("");
  const [selected, setSelected] = React.useState(null);
  const [refresh, setRefresh] = React.useState(false);
  const [dataReagendada, setDataReagendada] = React.useState(null);
  const [desde, setDesde] = React.useState(new Date());
  const [hasta, setHasta] = React.useState(new Date());

  React.useEffect(() => {
    if (initializer.usuario != null) {
      obtenerLeadsPorAsesor(setLeadClientsData, initializer);
    }
  }, [initializer.usuario]);
  const cargarTodos = () => {
    setRefresh(true)
  }
  const select = (id) => {
    setSelected(id)
  }
  const angendarNuevo = (data) => {
    setDataReagendada(data)
    setOpen(true)
  }
  const buscar = (e) => {
    if (e == "filtro") {
  //    let filter = [{ tipo: "type", valor: tipo }, { tipo: "title", valor: titulo }, { tipo: "client_id", valor: client },{"tipo":'accion',valor:gestionCita}]
      //obtenerIncidencias(setData, initializer, setIndicadores, filter)
    } else {
      //obtenerIncidencias(setData, initializer, setIndicadores, [])
      //setTipo("")
      //setTitulo("")
      //setClient("")
    }

  }
  const atras = () => {
    props.history.push("/clientes")
  }
  return (
    <Grid container style={{
      paddingTop: 15,
      paddingLeft: 15,
      paddingRight: 15,
      marginBottom: "10px",
    }}>
 
      <Grid
        container
 
        alignItems="center"

      >
           <div style={{width:'100%',display:'flex',justifyContent:'space-between'}}>
          <Typography style={{width:'100%',fontSize:24, textAlign: 'center'}} color="textPrimary">Agenda</Typography>
          <Tooltip title="Cancelar">

        <IconButton aria-label="Cancelar" onClick={() => atras()}>
                  <ArrowBackIcon />
                </IconButton>
                </Tooltip>
                </div>
      </Grid>
      
      <Paper variant="outlined" style={{ padding: 10, width: '100%' }}>
      <Grid
        container
        justify="space-between"
        alignItems="center"
        style={{ marginBottom: '10px', }}
      >
     

      </Grid>
      <Grid item xs="12">
        <Calendar lead_id={leadClient} data={leadClientsData} refresh={refresh} setRefresh={setRefresh} select={select} />
      </Grid>
      </Paper>
    </Grid>
  );
};
export default MyCalendar;
