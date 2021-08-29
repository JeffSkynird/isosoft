import React from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Initializer from "../../../store/Initializer";

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { obtenerTodosPorLead, obtenerTodosPorAsesor, obtenerTodosPorAsesorFiltro } from "../../../utils/API/citation.js";
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Accordion from '@material-ui/core/Accordion';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import SearchIcon from '@material-ui/icons/Search';
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import FormHelperText from "@material-ui/core/FormHelperText";
import es from 'date-fns/locale/es'
import FormControl from "@material-ui/core/FormControl";
import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import Menu from "../components/MenuNuevo";

import InputLabel from "@material-ui/core/InputLabel";
import TextField from '@material-ui/core/TextField';
import AddCircleOutline from "@material-ui/icons/AddCircleOutline";
import { obtenerLeadsPorAsesor } from "../../../utils/API/leads.js";
import { desencriptarJson } from "../../../utils/security";

import Button from "@material-ui/core/Button";

import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  DatePicker,
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
require("moment/locale/es.js");

const localizer = momentLocalizer(moment);
const messages = {
  allDay: 'Todo el día',
  previous: '<',
  next: '>',
  today: 'Hoy',
  month: 'Mes',
  week: 'Semana',
  day: 'Día',
  agenda: 'Agenda',
  date: 'Fecha',
  time: 'Hora',
  event: 'Evento',
  noEventsInRange: 'No hay eventos en este rango',
  showMore: total => `+ Ver más (${total})`
};
const MyCalendar1 = (props) => {
  const initializer = React.useContext(Initializer);
  const [data1, setData1] = React.useState([])
  const [leadClientsData, setLeadClientsData] = React.useState([]);
  const [leadClient, setLeadClient] = React.useState("");
  const [idCliente, setIdCliente] = React.useState("");

  const [desde, setDesde] = React.useState(new Date());
  const [open, setOpen] = React.useState(false);
  const [dataReagendada, setDataReagendada] = React.useState(null);

  const [refresh, setRefresh] = React.useState(false);
  const [selected, setSelected] = React.useState(null);
  const [hasta, setHasta] = React.useState(new Date());
  const [data, setData] = React.useState([])
  const [tipo, setTipo] = React.useState("");

  React.useEffect(() => {
    if (initializer.usuario != null) {
      obtenerLeadsPorAsesor(setLeadClientsData, initializer);
      setTipo(JSON.parse(desencriptarJson(initializer.usuario)).user.type_user)

    }
  }, [initializer.usuario]);
  /*  React.useEffect(() => {
     if (leadClient != "") {
       obtenerTodosPorLead(leadClient, setData1, initializer)
     }
   }, [leadClient]) */
  React.useEffect(() => {
    if (refresh != false) {
      obtenerTodosPorAsesor(setData1, initializer)
      setRefresh(false)
    }
  }, [refresh])
  React.useEffect(() => {
    if (initializer.usuario != null) {
      if (leadClient == "") {
        obtenerTodosPorAsesor(setData1, initializer)
      }
    }
  }, [initializer.usuario, leadClient]);
  const obtenerNombre = (id) => {
    let nombre = ""

    leadClientsData.map((e) => {

      if (e.id == id) {
        nombre = e.nombres + " " + e.apellidos
      }
    })
    return nombre;
  }
  React.useEffect(() => {

    let events = []

    data1.slice().map((e) => {

      console.log(e.date)
      events.push({ id: e.id, title: '(' + obtenerNombre(e.id_lead) + ')', start: new Date(e.fecha), end: new Date(e.fecha), allDay: false, })
    })
    setData(events)


  }, [data1, leadClientsData])
  const select = (id) => {
    setSelected(id)
  }
  const eventStyleGetter = function (event, start, end, isSelected) {
    var backgroundColor = "#" + event.hexColor;
    var style = {
      backgroundColor: backgroundColor,
      borderRadius: "0px",
      opacity: 0.8,
      color: "white",
      border: "0px",
      display: "block"
    };
    return {
      style: style
    };
  };
  const buscar = (e) => {
    if (e == "filtro") {
      //    let filter = [{ tipo: "type", valor: tipo }, { tipo: "title", valor: titulo }, { tipo: "client_id", valor: client },{"tipo":'accion',valor:gestionCita}]
      //obtenerIncidencias(setData, initializer, setIndicadores, filter)
      let filter = [{ tipo: "client_id", valor: idCliente }, { tipo: "desde", valor: desde.toISOString() }, { tipo: "hasta", valor: hasta.toISOString() }]
  
      obtenerTodosPorAsesorFiltro(setData1, initializer, filter)
    } else {
      obtenerTodosPorAsesor(setData1, initializer)
      //obtenerIncidencias(setData, initializer, setIndicadores, [])
      //setTipo("")
      //setTitulo("")
      //setClient("")
    }

  }
  const cargarTodos = () => {
    setRefresh(true)
  }
  const angendarNuevo = (data) => {
    setDataReagendada(data)
    setOpen(true)
  }

  return (
    <div>
      <Menu

        open={open}
        data={leadClientsData}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        cargarTodos={cargarTodos}
        selected={selected}
        select={select}
        dataReagendada={dataReagendada}
        setDataReagendada={setDataReagendada}
        angendarNuevo={angendarNuevo}
      />
      <Grid item xs="12" md="12">
        <Accordion style={{ marginBottom: 10 }} elevation={0}>
          <AccordionSummary
            style={{ padding: 0, }}
            aria-label="Expand"
            aria-controls="additional-actions1-content"
            id="additional-actions1-header"
          >
            <KeyboardArrowDownIcon color="primary" />  <Typography color="primary">       Filtros de búsqueda</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid item md={3} xs={12}>
              <Autocomplete
                size="small"
                style={{ width: '95%' }}
                options={leadClientsData}

                getOptionLabel={(option) => option.cedula + " - " + option.nombres + " " + option.apellidos}
                onChange={(event, value) => {
                  if (value != null) {

                    setLeadClient(value.id)
                    setIdCliente(value.id_cliente)
                  } else {

                    setLeadClient('')
                    setIdCliente('')

                  }

                }} // prints the selected value
                renderInput={params => (
                  <TextField {...params} label="Interesado" variant="outlined" fullWidth />
                )}
              />


            </Grid>
            <Grid item md={3} xs={12}>
            

              <MuiPickersUtilsProvider utils={DateFnsUtils}  locale={es}>
                <KeyboardDatePicker
                  autoOk
                  ampm={false}
                  size="small"
                  inputVariant="outlined"
                  label="Desde"
                  style={{ width: "95%" }}
                  // disablePast
                  format="yyyy/MM/dd"
                  value={desde}

                  onChange={date => setDesde(date)}
                />


              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item md={3} xs={12}>

   
              <MuiPickersUtilsProvider utils={DateFnsUtils}  locale={es}>
                <KeyboardDatePicker
                  autoOk
                  ampm={false}
size="small"
                  inputVariant="outlined"
                  label="Hasta"
                  style={{ width: "95%" }}
                  // disablePast
                  format="yyyy/MM/dd"
                  value={hasta}

                  onChange={date => setHasta(date)}
                />


              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item md={3} xs={12} style={{ display: 'flex', alignItems: 'center' }}>
              <Button
                color="primary"
                size="md"
                variant="outlined"

                round="true"
                icon="true"
                onClick={() => buscar('filtro')}
              >
                <SearchIcon fontSize="small" /> Buscar
              </Button>
              {
                leadClient != "" || desde != "" || hasta != "" ?
                  <Button
                    style={{ marginLeft: 10 }}
                    color="primary"
                    size="md"
                    variant="outlined"

                    round="true"
                    icon="true"
                    onClick={() => buscar('todos')}
                  >
                    <SearchIcon fontSize="small" /> Todos
                  </Button>
                  : null
              }

            </Grid>

          </AccordionDetails>
        </Accordion>
              {
                tipo!="supervisor"?
        <Button
          style={{ marginRight: "5px", marginBottom: 15 }}
          startIcon={<AddCircleOutline />}
          variant="contained"
          color="secondary"
          size="small"
          onClick={() => setOpen(true)}
        >
          Agendar
        </Button>

                :null
              }

      </Grid>
      <Calendar
        popup

        messages={messages}
        culture="es"
        localizer={localizer}
        events={data}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        eventPropGetter={eventStyleGetter}
        onSelectEvent={(e) => {
          select(e.id);
        }}
      />
    </div>
  );
};
export default MyCalendar1;
