import React from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Initializer from "../../../store/Initializer";
import Avatar from '@material-ui/core/Avatar';
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import Chip from '@material-ui/core/Chip';
import { obtenerTodosPorLead, obtenerTodosPorAsesorId } from "../../../utils/API/citation.js";
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import PhoneMissedIcon from '@material-ui/icons/PhoneMissed';
import PhoneIcon from '@material-ui/icons/Phone';
import {desencriptarJson} from '../../../utils/security'
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

  const [data, setData] = React.useState([])
  const [initial, setInitial] = React.useState(new Date())

 
  const obtenerNombre = (id) => {
    let nombre = ""

    props.data.map((e) => {
    
      if (e.id_lead == id) {
        nombre = e.cli_names + " " + e.cli_last_names
      }
    })
    return nombre;
  }
  React.useEffect(() => {

    let events = []

    props.data.slice().map((e) => {

      events.push({ id: e.id,es_efectiva:e.es_efectiva, title: '(' + obtenerNombre(e.id_lead) + ')', start: new Date(e.fecha), end: new Date(e.fecha), allDay: false, })
    })
    setData(events)


  }, [props.data])

  const eventStyleGetter = function (event, start, end, isSelected) {
    var backgroundColor = "#" + event.hexColor;
 
    var style = {
      backgroundColor: getColor(event.es_efectiva),
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
  React.useEffect(() => {

    setInitial(props.date)


  }, [props.date])
  const getColor=(tipo)=>{
    let color = "#2980b9";
    if(tipo=="citas agendadas"||tipo==0){
      color="#2980b9"
    }else if(tipo=="entrevistas"||tipo==1){
      color="#8e44ad"
    }else if(tipo=="llamadas salientes"){
      color="#16a085"
    }else if(tipo=="llamadas efectivas"){
      color="#d35400"
    }
    return color
  }
  const returnValue=(tipo)=>{
    let count=0
    data.map((e)=>{
    
      if(e.es_efectiva==tipo){
        count+=1
      }
    })
    return count
  }
  return (
    <div>
      {
        data.length != 0 && (
          <div style={{ marginBottom: 10, display: 'flex', justifyContent: 'space-between', }} >
            <div>
          {/*     <Chip      avatar={<Avatar style={{backgroundColor:'white'}}>{returnValue(0)}</Avatar>} icon={<CalendarTodayIcon fontSize="small" style={{ color: "white" }} />} label={"Citas agendadas "} style={{ backgroundColor: '#2980b9', color: 'white', opacity: 0.8, marginRight: 5, marginBottom: 5 }} />
              <Chip  avatar={<Avatar style={{backgroundColor:'white'}}>{returnValue(1)}</Avatar>} icon={<CalendarTodayIcon fontSize="small" style={{ color: "white" }} />} label={"Entrevistas  "} style={{ backgroundColor: '#8e44ad', color: 'white', opacity: 0.8, marginRight: 5, marginBottom: 5 }} /> */}
              {/* <Chip icon={<PhoneMissedIcon fontSize="small" style={{ color: "white" }} />} label={"Llamadas salientes - " + props.values.inEffectiveCalls} style={{ backgroundColor: '#16a085', color: 'white', opacity: 0.8, marginRight: 5, marginBottom: 5 }} />
              <Chip icon={<PhoneIcon fontSize="small" style={{ color: "white" }} />} label={"Llamadas efectivas - " + props.values.effectiveCalls} style={{ backgroundColor: '#d35400', color: 'white', opacity: 0.8, marginRight: 5, marginBottom: 5 }} /> */}
            </div>
            <Typography variant="body1" component="p" >

            </Typography>

          </div>
        )
      }



      {data.length == 0 && (


        <Alert severity="warning" style={{ marginBottom: 15 }}>Sin registros</Alert>


      )
      }
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
          if(JSON.parse(desencriptarJson(initializer.usuario)).user.type_user!="supervisor"){
            props.select(e.id);
          }
        
        }}
      />
    </div>
  );
};
export default MyCalendar1;
