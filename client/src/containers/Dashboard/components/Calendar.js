import React from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Initializer from "../../../store/Initializer";
import CloseIcon from '@material-ui/icons/Close';
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { obtenerTodosPorLead ,obtenerTodosPorAsesor} from "../../../utils/API/citation.js";
import noValue from '../../../assets/noValue.svg'
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import PhoneMissedIcon from '@material-ui/icons/PhoneMissed';
import PhoneIcon from '@material-ui/icons/Phone';
import Avatar from '@material-ui/core/Avatar';

require("moment/locale/es.js");

const localizer = momentLocalizer(moment);
 const messages = {
  allDay: 'Todo el día',
  previous: '<',
  next: '>',
  today: 'Centrar',
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
  const [events,setEvents] = React.useState([])
  const [initial,setInitial] = React.useState(new Date())
  const eventStyleGetter = function (event, start, end, isSelected) {
   console.log(event)
    var backgroundColor = "#" + event.hexColor;
    var style = {
      backgroundColor:  getColor(event.tipo),
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
  const getColor=(tipo)=>{
    let color = "#2980b9";
    if(tipo=="citas agendadas"){
      color="#2980b9"
    }else if(tipo=="entrevistas"){
      color="#8e44ad"
    }else if(tipo=="llamadas salientes"){
      color="#16a085"
    }else if(tipo=="llamadas efectivas"){
      color="#d35400"
    }
    return color
  }
  React.useEffect(()=>{
  if(props.data.length!=0){
    let total = []
   
    props.data.slice().map((e,i)=>{
 
      total.push({id:i,title:e.tipo+' - '+e.count,start:new Date(e.date+"T10:20:30Z"),end:new Date(e.date+"T10:20:30Z"),allDay:false, tipo:e.tipo})
    })  
    setEvents(total)
  }else{
    setEvents([])
  }
 


},[props.data])
React.useEffect(()=>{
 
    setInitial(props.date)
 

},[props.date])
  return (
    <div>
      {
        events.length!=0&&(
          <div style={{marginBottom:10,display:'flex',justifyContent: 'space-between',}} >
            <div>
            <Chip   icon={<CalendarTodayIcon fontSize="small" style={{color:"white"}}/>} label={"Citas agendadas - "+props.values.inEffectiveCitations} style={{backgroundColor:'#2980b9',color:'white',opacity:0.8,marginRight:5,marginBottom:5}} />
          <Chip   icon={<CalendarTodayIcon  fontSize="small"  style={{color:"white"}}/>} label={"Entrevistas - "+props.values.effectiveCitations} style={{backgroundColor:'#8e44ad',color:'white',opacity:0.8,marginRight:5,marginBottom:5}} />
          <Chip   icon={<PhoneMissedIcon  fontSize="small"  style={{color:"white"}}/>} label={"Llamadas salientes - "+props.values.inEffectiveCalls} style={{backgroundColor:'#16a085',color:'white',opacity:0.8,marginRight:5,marginBottom:5}} />
          <Chip    icon={<PhoneIcon fontSize="small"   style={{color:"white"}} />}  label={"Llamadas efectivas - "+props.values.effectiveCalls} style={{backgroundColor:'#d35400',color:'white',opacity:0.8,marginRight:5,marginBottom:5}} />
            </div>
            <Typography variant="body1" component="p" >
           
        </Typography>
         
    </div>
        )
      }
  

     
      {events.length==0&&(

        
<Alert severity="warning" style={{marginBottom:15}}>Sin registros</Alert>

       
      )
      }
        <Calendar
        popup
        views={['month']}
        style={{ height: 500 }}
          messages={messages}
          culture="es"
          startAccessor="start"
          endAccessor="end"
          toolbar={false}
          localizer={localizer}
          date={initial}
          events={events}
          eventPropGetter={eventStyleGetter}
         onSelectEvent={(e) => {
   
        initializer.mostrarNotificacion({ type: "success",message:e.start.toLocaleDateString()+" - "+e.title })
           }
          }
        />
   
  
    
    </div>
  );
};
export default MyCalendar1;
