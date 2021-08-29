import React, { useContext } from 'react'
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import EditIcon from '@material-ui/icons/Edit';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Typography from '@material-ui/core/Typography';
import DateRange from './components/DateRange';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PhoneMissedIcon from '@material-ui/icons/PhoneMissed';
import esLocale from "date-fns/locale/es";
import DateFnsUtils from '@date-io/date-fns';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import BarChart2 from './components/BarChart2';
import { utcDate } from '../../utils/Date'
import SimpleBar from './components/SimpleBar'
import PhoneInTalkIcon from '@material-ui/icons/PhoneInTalk';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import FormControl from "@material-ui/core/FormControl";
import GoalChart from './components/GoalChart';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import PersonIcon from '@material-ui/icons/Person';
import {
  DatePicker,
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import CallToActionIcon from '@material-ui/icons/CallToAction';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import SearchIcon from '@material-ui/icons/Search';

import PieChart2 from './components/PieChart2';
import KpiChart from './components/KpiChart';
import { obtenerTodos } from "../../utils/API/asessors.js";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import { desencriptarJson } from "../../utils/security";
import noValue from '../../assets/noValue.svg'
import { obtenerValorCotizaciones } from '../../utils/API/clientes'
import { obtenerKpisR, obtenerCitasPorSemana, obtenerLlamadasPorSemana, obtenerEstadoProspectos, obtenerGoalEffeectiveCitations } from "../../utils/API/dashboard";
import { obtenerReservasAsesor } from '../../utils/API/asessors'
import { obtenerGoalsPorFechaAsesorKpi,ObtenerKpisRendimiento } from "../../utils/API/goals";
import Initializer from '../../store/Initializer'
import { obtenerTodos as obtenerTodosS } from '../../utils/API/supervisors'

import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import PerformanceChart from './components/PerformanceChart'
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'by Ambiensa ©'}

      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function DashboardPrincipalV(props) {
  const initializer = useContext(Initializer);
  const theme = useTheme();
  const myRef = React.useRef(null)
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const [changeFilter, setChangeFilter] = React.useState(false)
  const [select,setSelect] =React.useState(0)
  const [cotizaciones, setCotizaciones] = React.useState(0)
  const [range, setRange] = React.useState('mensual')
  const [rangeFilter, setRangeFilter] = React.useState(null)
  const [dateGoal, setDateGoal] = React.useState(new Date())
  const [kpis, setKpis] = React.useState({ citations1: 0, citations2: 0, calls1: 0, calls2: 0 })
  const [kpisR,setKpisR] = React.useState([])
  const [openFilter, setOpenFilter] = React.useState(false)
  const [tipo, setTipo] = React.useState([])

  //const [citas,setCitas]=React.useState({labels:[],values:[]})
  const [citas, setCitas] = React.useState({ data: [], backup: [] })
  const [cita, setCita] = React.useState('')
  const [citasF, setCitasF] = React.useState(null)
  // const [citasE,setCitasE]=React.useState({labels:[],values:[]})
  const [citasE, setCitasE] = React.useState({ data: [], backup: [] })
  const [citaE, setCitaE] = React.useState('')

  const [asesorData, setAsesorData] = React.useState([])
  const [asesor, setAsesor] = React.useState('')

  const [llamadas, setLlamadas] = React.useState({ data: [], backup: [] })
  const [llamada, setLlamada] = React.useState('')

  const [llamadasE, setLlamadasE] = React.useState({ data: [], backup: [] })
  const [llamadaE, setLlamadaE] = React.useState('')

  const [reservations, setReservations] = React.useState(0)
  const [supervisorsData, setSupervisorsData] = React.useState([]);
  const [supervisor, setSupervisor] = React.useState("");
  const [data, setData] = React.useState({ value: [], label: [] })
  const [dataGoal, setDataGoal] = React.useState({ total_performance: 0, obtained: [], goal: [], performance: [], label: [] })
  const [goalAsesor, setGoalAsesor] = React.useState(null)

  React.useEffect(() => {

    if (initializer.usuario != null) {
      obtenerKpisR(setKpis, initializer, asesor, utcDate(getFirst()), utcDate(getLast()))
     
      obtenerGoalsPorFechaAsesorKpi(asesor, new Date().getMonth() + 1, new Date().getFullYear(), initializer, setGoalAsesor)

      // obtenerGoalEffeectiveCitations(setDataGoal, initializer, asesor, new Date().getMonth() + 1, new Date().getFullYear())
      obtenerEstadoProspectos(setData, initializer, asesor, utcDate(getFirst()), utcDate(getLast()))

      setTipo(JSON.parse(desencriptarJson(initializer.usuario)).user.type_user);
      /* if (JSON.parse(desencriptarJson(initializer.usuario)).user.type_user != "asessor") {
        obtenerValorCotizaciones(setCotizaciones, asesor, range)
      } else {
        obtenerValorCotizaciones(setCotizaciones, JSON.parse(desencriptarJson(initializer.usuario)).user.user_ca, range)
      } */
      obtenerCitasPorSemana(setCitas, setCitasE, initializer, asesor, utcDate(getFirst()), utcDate(getLast()));

      obtenerLlamadasPorSemana(setLlamadas, setLlamadasE, initializer, asesor, utcDate(getFirst()), utcDate(getLast()));
      //obtenerKpisAsesor(setKpi1,initializer);
      let id_asesor=JSON.parse(desencriptarJson(initializer.usuario)).user.user_ca
      if(asesor!=""){
        ObtenerKpisRendimiento({asesor_id:asesor,min:utcDate(getFirst()),max: utcDate(getLast()),year:new Date().getFullYear(),month:new Date().getMonth() + 1},setKpisR,initializer)
      }else{
        if(JSON.parse(desencriptarJson(initializer.usuario)).user.type_user == "asessor"){
          ObtenerKpisRendimiento({asesor_id:id_asesor,min:utcDate(getFirst()),max: utcDate(getLast()),year:new Date().getFullYear(),month:new Date().getMonth() + 1},setKpisR,initializer)
          obtenerReservasAsesor({ asesor_id: id_asesor, month: new Date().toLocaleDateString('es-MX', { month: 'long' }), year: new Date().getFullYear() }, setReservations, initializer)
          obtenerValorCotizaciones({ asesor_id: id_asesor, month: new Date().toLocaleDateString('es-MX', { month: 'long' }), year: new Date().getFullYear() }, setCotizaciones)
        }else{
          ObtenerKpisRendimiento({asesor_id:"",min:utcDate(getFirst()),max: utcDate(getLast()),year:new Date().getFullYear(),month:new Date().getMonth() + 1},setKpisR,initializer)
        }
      }
    }




  }, [initializer.usuario])

  React.useEffect(() => {

    if (tipo == "supervisor") {
      obtenerTodos(setAsesorData, initializer);
    }

    if (tipo == "manager") {
      obtenerTodos(setAsesorData, initializer);
    }
    if (tipo == "asessor") {

      obtenerGoalEffeectiveCitations(setDataGoal, initializer, JSON.parse(desencriptarJson(initializer.usuario)).user.user_ca, new Date().getMonth() + 1, new Date().getFullYear())
    }


  }, [tipo])
  const getCedula = (id) => {
    let cedu = "";
    asesorData.map((e) => {
      if (e.id == id) {
        cedu = e.dni;
      }
    })
    return cedu;
  }
  const actualizar = (id) => {


    setCitas({ data: [], backup: [] })
    setCitasE({ data: [], backup: [] })
    setLlamadas({ data: [], backup: [] })
    setLlamadasE({ data: [], backup: [] })
    setLlamada('')
    setLlamadaE('')
    setCita('')
    setCitaE('')

    // setDataGoal({ inEffectiveCitations: null, effectiveCitations: null, effeciveCalls: null, inEffectiveCalls: null })
    setDataGoal({ total_performance: 0, obtained: [], goal: [], performance: [], label: [] })
    if (rangeFilter != null) {
      obtenerKpisR(setKpis, initializer, id, utcDate(rangeFilter.startDate), utcDate(rangeFilter.endDate))
      obtenerEstadoProspectos(setData, initializer, id, utcDate(rangeFilter.startDate), utcDate(rangeFilter.endDate))
      obtenerLlamadasPorSemana(setLlamadas, setLlamadasE, initializer, id, utcDate(rangeFilter.startDate), utcDate(rangeFilter.endDate));
      obtenerCitasPorSemana(setCitas, setCitasE, initializer, id, utcDate(rangeFilter.startDate), utcDate(rangeFilter.endDate));

      obtenerGoalEffeectiveCitations(setDataGoal, initializer, id, rangeFilter.startDate.getMonth() + 1, rangeFilter.endDate.getFullYear())
      if (id != "") {
        obtenerReservasAsesor({ asesor_id: id, month: rangeFilter.startDate.toLocaleDateString('es-MX', { month: 'long' }), year: rangeFilter.startDate.getFullYear() }, setReservations, initializer)
        obtenerValorCotizaciones({ asesor_id: id, month: rangeFilter.startDate.toLocaleDateString('es-MX', { month: 'long' }), year: rangeFilter.startDate.getFullYear() }, setCotizaciones)

        ObtenerKpisRendimiento({asesor_id:id,min:utcDate(rangeFilter.startDate),max: utcDate(rangeFilter.endDate),year:new Date().getFullYear(),month:new Date().getMonth() + 1},setKpisR,initializer)
      }

    } else {
      obtenerKpisR(setKpis, initializer, id, utcDate(getFirst()), utcDate(getLast()))
      obtenerEstadoProspectos(setData, initializer, id, utcDate(getFirst()), utcDate(getLast()))
      obtenerLlamadasPorSemana(setLlamadas, setLlamadasE, initializer, id, utcDate(getFirst()), utcDate(getLast()));
      obtenerCitasPorSemana(setCitas, setCitasE, initializer, id, utcDate(getFirst()), utcDate(getLast()));
      if (id != "") {
        obtenerReservasAsesor({ asesor_id: id, month: new Date().toLocaleDateString('es-MX', { month: 'long' }), year: new Date().getFullYear() }, setReservations, initializer)
        obtenerValorCotizaciones({ asesor_id: id, month: new Date().toLocaleDateString('es-MX', { month: 'long' }), year: new Date().getFullYear() }, setCotizaciones)
        ObtenerKpisRendimiento({asesor_id:id,min:utcDate(getFirst()),max: utcDate(getLast()),year:new Date().getFullYear(),month:new Date().getMonth() + 1},setKpisR,initializer)
      }
      obtenerGoalEffeectiveCitations(setDataGoal, initializer, id, new Date().getMonth() + 1, new Date().getFullYear())

    }


  }
  const filtrar = () => {

    if (rangeFilter != null) {

      setDateGoal(rangeFilter.startDate)
      setCitas({ data: [], backup: [] })
      setCitasE({ data: [], backup: [] })
      setLlamadas({ data: [], backup: [] })
      setLlamadasE({ data: [], backup: [] })
      setLlamada('')
      setLlamadaE('')
      setCita('')
      setCitaE('')
      setDataGoal({ total_performance: 0, obtained: [], goal: [], performance: [], label: [] })

      obtenerKpisR(setKpis, initializer, asesor, utcDate(rangeFilter.startDate), utcDate(rangeFilter.endDate))
      obtenerEstadoProspectos(setData, initializer, asesor, utcDate(rangeFilter.startDate), utcDate(rangeFilter.endDate))
      obtenerLlamadasPorSemana(setLlamadas, setLlamadasE, initializer, asesor, utcDate(rangeFilter.startDate), utcDate(rangeFilter.endDate));
      obtenerCitasPorSemana(setCitas, setCitasE, initializer, asesor, utcDate(rangeFilter.startDate), utcDate(rangeFilter.endDate));
      if (asesor != "") {
        obtenerGoalEffeectiveCitations(setDataGoal, initializer, asesor, rangeFilter.startDate.getMonth() + 1, rangeFilter.endDate.getFullYear())


        obtenerReservasAsesor({ asesor_id: asesor, month: rangeFilter.startDate.toLocaleDateString('es-MX', { month: 'long' }), year: rangeFilter.startDate.getFullYear() }, setReservations, initializer)
        obtenerValorCotizaciones({ asesor_id: asesor, month: rangeFilter.startDate.toLocaleDateString('es-MX', { month: 'long' }), year: rangeFilter.startDate.getFullYear() }, setCotizaciones)

      }
    }


  }
  const resetFilter = () => {
    setDateGoal(new Date())
    setDataGoal({ total_performance: 0, obtained: [], goal: [], performance: [], label: [] })
    setCitas({ data: [], backup: [] })
    setCitasE({ data: [], backup: [] })
    setLlamadas({ data: [], backup: [] })
    setLlamadasE({ data: [], backup: [] })
    setLlamada('')
    setLlamadaE('')
    setCita('')
    setCitaE('')
    
    setRangeFilter(null)
    obtenerKpisR(setKpis, initializer, asesor, utcDate(getFirst()), utcDate(getLast()))
    obtenerEstadoProspectos(setData, initializer, asesor, utcDate(getFirst()), utcDate(getLast()))
    obtenerLlamadasPorSemana(setLlamadas, setLlamadasE, initializer, asesor, utcDate(getFirst()), utcDate(getLast()));
    obtenerCitasPorSemana(setCitas, setCitasE, initializer, asesor, utcDate(getFirst()), utcDate(getLast()));
    if (asesor != "") {
      obtenerGoalEffeectiveCitations(setDataGoal, initializer, asesor, new Date().getMonth() + 1, new Date().getFullYear())
    }
  }
  const reset = () => {
    setDateGoal(new Date())
    setDataGoal({ total_performance: 0, obtained: [], goal: [], performance: [], label: [] })
    setCitas({ data: [], backup: [] })
    setCitasE({ data: [], backup: [] })
    setLlamadas({ data: [], backup: [] })
    setLlamadasE({ data: [], backup: [] })
    setLlamada('')
    setLlamadaE('')
    setCita('')
    setCitaE('')
    setAsesor('')
    setSupervisor('')
  }
  const buscar = () => {

  }
  const getFirstLast = () => {
    let date = new Date();
    let primerDia = new Date(date.getFullYear(), date.getMonth(), 1);
    let ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0);


    return "(" + utcDate(primerDia) + " hasta " + utcDate(ultimoDia) + ")"
  }
  const getFirst = () => {
    let date = new Date();
    let primerDia = new Date(date.getFullYear(), date.getMonth(), 1);

    return primerDia
  }
  const getLast = () => {
    let date = new Date();

    let ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return ultimoDia
  }
  const translate = (txt) => {
    let lng = [{ es: 'Lunes', eng: 'Monday' }, { es: 'Martes', eng: 'Tuesday' }, { es: 'Miercoles', eng: 'Wednesday' }, { es: 'Jueves', eng: 'Thursday' }, { es: 'Viernes', eng: 'Friday' }, { es: 'Sabado', eng: 'Saturday' }, { es: 'Sabado', eng: 'Saturday' }, { es: 'Domingo', eng: 'Sunday' }]
    let retorno
    lng.map((e) => {
      if (txt == e.eng) {
        retorno = e.es
      }
    })
    return retorno
  }
  const factorizar = () => {
    let data = [{ "week": "2021-02-22 2021-02-28", "range": "Tuesday", "count": 1 }, { "week": "2021-02-15 2021-02-21", "range": "Thursday", "count": 1 }, { "week": "2021-02-22 2021-02-28", "range": "Wednesday", "count": 1 }, { "week": "2021-02-15 2021-02-21", "range": "Wednesday", "count": 1 }, { "week": "2021-02-08 2021-02-14", "range": "Tuesday", "count": 1 }, { "week": "2021-02-08 2021-02-14", "range": "Wednesday", "count": 2 }]
    let semanas = duplicado(data)
    let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    let newA = []
    days.map((e) => {
      let values = []
      data.map((i) => {
        if (e == i.range) {

          values.push(i.count)
        }
      })
      newA.push({
        name: translate(e),
        data: values
      })
    })
    console.log(newA)
    setCitasF({ series: newA, categories: semanas })

  }
  const filtrarSemanas = (datos, setDatos, semana, setCombo) => {
    //  let semanas = duplicado(data)
    // let days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']

    let newArray = []
    datos.backup.map((e) => {
      if (e.week == semana) {
        newArray.push({ ...e })
      }
    })
    setDatos({ data: newArray, backup: datos.backup })
    setCombo(semana)
    /*  let newA = []
     days.map((e)=>{
       let values = []
       data.map((i)=>{
         if(e==i.range){
   
           values.push(i.count)
         }
       })
       newA.push({
         name:translate(e),
         data: values
       })
     })
     console.log(newA)
    setCitasF({series:newA,categories:semanas}) */

  }
  const retornar = (datos) => {
    // let semanas = duplicado(data)
    // let days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']

    let values = []
    let labels = []
    datos.map((e) => {
      values.push(e.count)
      labels.push(translate(e.range.trim()))
    })

    return { values: values, labels: labels }

  }
  function duplicado(arr) {
    let newArray = []
    arr.map((e) => {
      if (!newArray.includes(e.week)) {
        newArray.push(e.week)
      }

    })
    return newArray
  }
  function duplicadoDays(arr) {
    let newArray = []
    arr.map((e) => {
      if (!newArray.includes(e.range)) {
        newArray.push(e.range)
      }

    })
    return newArray
  }
  React.useEffect(() => {
    if (citas.backup.length != 0) {
      filtrarSemanas(citas, setCitas, citas.data[0].week, setCita)


    }
    if (citasE.backup.length != 0) {
      filtrarSemanas(citasE, setCitasE, citasE.data[0].week, setCitaE)
    }
    if (llamadas.backup.length != 0) {
      filtrarSemanas(llamadas, setLlamadas, llamadas.data[0].week, setLlamada)
    }
    if (llamadasE.backup.length != 0) {
      filtrarSemanas(llamadasE, setLlamadasE, llamadasE.data[0].week, setLlamadaE)
    }
  }, [citas.backup, citasE.backup, llamadas.backup, llamadasE.backup])

  const onChangeDateGoal = (mes) => {
    setDataGoal({ total_performance: 0, obtained: [], goal: [], performance: [], label: [] })
    if (asesor != "") {
      obtenerGoalEffeectiveCitations(setDataGoal, initializer, asesor, mes.getMonth() + 1, mes.getFullYear())
      obtenerReservasAsesor({ asesor_id: asesor, month: mes.toLocaleDateString('es-MX', { month: 'long' }), year: mes.getFullYear() }, setReservations, initializer)
      obtenerValorCotizaciones({ asesor_id: asesor, month: mes.toLocaleDateString('es-MX', { month: 'long' }), year: mes.getFullYear() }, setCotizaciones)
    }
    setDateGoal(mes)
  }
  const onChangeFilter = (value) => {
    setChangeFilter(value)
    reset()
    if (supervisorsData.length == 0) {
      obtenerTodosS(setSupervisorsData, initializer)
    }

  }
  return (
    <div>
      <DateRange open={openFilter} setOpen={setOpenFilter} setRange={setRangeFilter} range={rangeFilter} filtrar={filtrar} />

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
          <Grid container>
            <Grid item md={4} xs={12}>


              <Button onClick={() => setOpenFilter(!openFilter)} color="secondary"><EditIcon style={{ marginRight: 5 }} />{!fullScreen ? "Establecer un rango" : null}</Button>

            </Grid>
         
              {
                rangeFilter != null ?
                <Grid item md={4} xs={12}>
                  <Button onClick={() => {

                    resetFilter()
                  }
                  } size="small" color="secondary"><CloseIcon style={{ marginRight: 5 }} />{!fullScreen ? "Quitar  rango " + rangeFilter != null ? "(" + utcDate(rangeFilter.startDate) + " hasta " + utcDate(rangeFilter.endDate) + ")" : getFirstLast() : null}</Button>
                   </Grid>
                  : null
              }

           
              {
                tipo == "supervisor" || tipo == "manager" ?
                  <Grid item xs={12} md={4} >

                    <Autocomplete
                      key={1}
                      id={1}
                      options={asesorData}
                  size="small"
                      getOptionLabel={(option) => option.dni + " - " + option.names + " " + option.last_names}
                      onChange={(event, value) => {
                        if (value != null) {
                          setAsesor(value.id)
                          actualizar(value.id)
                        } else {
                          setAsesor('')
                          actualizar('')
                        }

                      }} // prints the selected value
                      renderInput={params => (
                        <TextField {...params} label="Asesor" variant="outlined" fullWidth />
                      )}
                    />


                   
                  </Grid>

                  :
                  null

              }


          

          </Grid>

        </AccordionDetails>
      </Accordion>

      <Box mb={2} mt={1} style={{ display: 'flex', justifyContent: 'space-between' }}>


        <div>


        </div>

      </Box>

      <Grid container spacing={3} justify='center'>
        {/* Chart */}

        {/*      {
          tipo == "supervisor" || tipo == "manager" ?
            <Grid item xs={6} md={6} >
              <FormControl variant="outlined" style={{ width: "100%" }}>
                <InputLabel id="labels">Filtrar por supervisor</InputLabel>
                <Select
                  labelId="labels"
                  value={asesor}
                  
                  label="Filtrar por supervisor"
                >
                  <MenuItem value="">
                    <em>Seleccione una opción</em>
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            :
            null

        } */}



        {/*     <Grid item xs={12} md={12} >
                <FormControl variant="outlined" style={{ width: "100%" }}>
                  <InputLabel id="label">Seleccione un rango</InputLabel>
                  <Select
                    labelId="rang"
                    value={range}
                    onChange={(e) => {
                        setRange(e.target.value)
                      
                        if(JSON.parse(desencriptarJson(initializer.usuario)).user.type_user!="asessor"){
                          obtenerValorCotizaciones(setCotizaciones,asesor,e.target.value)
                        }else{
                          obtenerValorCotizaciones(setCotizaciones,JSON.parse(desencriptarJson(initializer.usuario)).user.user_ca,e.target.value)
                        }
                    }
                    }
                    label="Seleccione una rango"
                  >
                    <MenuItem value="">
                      <em>Seleccione una rango</em>
                    </MenuItem>
                    <MenuItem  value='mensual'>
                        <em>Mensual</em>
                      </MenuItem>
                      <MenuItem  value='trimestral'>
                        <em>Trimestral</em>
                      </MenuItem>
                      <MenuItem  value='semestral'>
                        <em>Semestral</em>
                      </MenuItem>
                      <MenuItem  value='anual'>
                        <em>Anual</em>
                      </MenuItem>
                  </Select>
                </FormControl>
            </Grid> */}
        {/*  {
          tipo == "manager" || tipo == "supervisor" ?
           


               asesor != "" ?
              <Grid item xs={12} md={12} style={{ display: 'flex', justifyContent: 'center' }} >
                <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                  <p style={{ fontWeight: 'bold' }}>Foto</p>
                  <img style={{ height: 100, width: 100 }} src={"http://api.ambiensa.info/storage/assesor_storage/" + getCedula(asesor) + "-profile.png"} />
                </div>
                      </Grid>
                : null

           



      
            : null
        } */}
        {
          kpisR.map((e)=>(
            <Grid item xs={12} md={3} >
            <Paper>
              <KpiChart onClick={()=>{
                setSelect(e.Nombre)
           myRef.current.scrollIntoView()   
                }} title={e.Nombre} value={e.obtenido} goal={"/"+e.Total}  cotizaciones={cotizaciones} reservations={reservations} icon={<CalendarTodayIcon color="primary" style={{ fontSize: '30pt' }} />} />
            </Paper>
          </Grid>
          ))
        }
       
     {/*    <Grid item xs={12} md={3} >
          <Paper>
            <KpiChart title="Entrevistas" value={kpis.citations2} goal={goalAsesor} icon={<CalendarTodayIcon color="primary" style={{ fontSize: '30pt' }} />} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={3} >
          <Paper >
            <  KpiChart title="Ll. Salientes" value={kpis.calls1} goal={goalAsesor} icon={<PhoneMissedIcon color="primary" style={{ fontSize: '30pt' }} />} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={3} >
          <Paper >
            <  KpiChart title="Ll. Efectivas" value={kpis.calls2} goal={goalAsesor} icon={<PhoneInTalkIcon color="primary" style={{ fontSize: '30pt' }} />} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={3} >
          <Paper >
            <  KpiChart title="Interesados ingresados" value={0} icon={<AttachMoneyIcon color="primary" style={{ fontSize: '30pt' }} />} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={3} >
          <Paper >
            <  KpiChart title="Leads" value={0} icon={<AttachMoneyIcon color="primary" style={{ fontSize: '30pt' }} />} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={3} >
          <Paper >
            <  KpiChart title="Cotizaciones" value={cotizaciones} icon={<AttachMoneyIcon color="primary" style={{ fontSize: '30pt' }} />} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={3} >
          <Paper >
            <  KpiChart title="Reservas" value={reservations} icon={<AttachMoneyIcon color="primary" style={{ fontSize: '30pt' }} />} />
          </Paper>
        </Grid>
 */}



        <Grid item xs={12} md={12} lg={12}>
          <Paper >
            <Grid container>


              <Grid item xs={12} md={12} lg={12} style={{ padding: 10 }}>

                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>

                  <DatePicker
                    autoOk
                    style={{ width: '100%', marginBottom: 15 }}
                    views={["month", "year"]}
                    variant="dialog"
                    inputVariant="outlined"
                    label="Filtrar por mes"
                    minDate={rangeFilter != null ? rangeFilter.startDate : new Date()}
                    maxDate={rangeFilter != null ? rangeFilter.endDate : new Date()}
                    value={dateGoal}

                    onChange={mes => onChangeDateGoal(mes)}


                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item xs={12} md={8} lg={8}>


                {
                  dataGoal.obtained.length != 0 ?

                    <BarChart2 key="2" data1={dataGoal.obtained} data2={dataGoal.goal} data3={dataGoal.performance} categories={dataGoal.label} text="Resumen de metas" />

                    :
                    /*                <Skeleton height={200}/> */
                    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                      <img src={noValue} style={{ height: 140, width: 140 }} />
                      <p>Sin registros (Resumen de metas del último mes)</p>
                    </div>
                }

              </Grid>

              <Grid item xs={12} md={4} lg={4}>

                {/*             {
              dataGoal.inEffectiveCitations != null ?
                <Paper >
              
                  <BarChart2 key="2" data={dataGoal} text="Resumen de metas" />
                </Paper>
                :
                /*                <Skeleton height={200}/> * /
                <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                  <img src={noValue} style={{ height: 140, width: 140 }}  />
                  <p>Sin registros (Resumen de metas del último mes)</p>
                </div>
            } */}

                {
                  dataGoal.performance.length != 0 && <PerformanceChart data={dataGoal.performance} categories={dataGoal.label} text="Resumen de metas" />

                }



              </Grid>

            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={6} >
          <Paper >

            {
              data.value.length != 0 ?

                <PieChart2 values={data.value} categories={data.label} text="Estado de los prospectos" />

                :
                <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                  <img src={noValue} style={{ height: 140, width: 140 }} />
                  <p>Sin registros (Estado de los prospectos)</p>
                </div>


            }
          </Paper>

        </Grid>
        <Grid item xs={12} md={6} lg={6} >

          <Paper >

            <GoalChart data={[dataGoal.total_performance]} text="Puntaje de rendimiento total" />
          </Paper>

        </Grid>

        {/*     <Grid item xs={12} md={12} lg={12}>
      
        {
          citas.values.length!=0?
          <Paper >
          <BarChart key="1" values={ citas.values} categories={citas.labels} text="Citas agendadas por semana"/>
          </Paper>
          :
        
         <div style={{display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'center'}}>
         <img src={noValue} style={{height:140,width:140}} alt="" />
         <p>Sin registros (Citas agendadas por semana)</p>
     </div>
        }
    
  
    </Grid> */}
   
    <Grid container ref={myRef}>

      {
        select=="Citas agendadas"&&(
          <Grid item xs={12} md={12} lg={12}>
  
            <Paper style={{ padding: 10 }}>
              <Typography variant="body1" style={{ marginBottom: 15 }} >
                Citas agendadas por semana
              </Typography>
              <FormControl variant="outlined" style={{ width: "100%", marginBottom: 10 }}>
                <InputLabel id="labelCitas">Seleccione una semana</InputLabel>
                <Select
                  labelId="labelCitas"
                  value={cita}
                  onChange={(e) => {
                    filtrarSemanas(citas, setCitas, e.target.value, setCita)
                  }
                  }
                  label="Seleccione una semana"
                >
                  <MenuItem value="">
                    <em>Seleccione una opción</em>
                  </MenuItem>
                  {duplicado(citas.backup).map((e) => (
                    <MenuItem key={e} value={e}>
                      <em>{e}</em>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
  
  
  
              {
                citas.data.length != 0 ?
  
  
                  <SimpleBar values={retornar(citas.data).values} categories={retornar(citas.data).labels} text="Citas agendadas por semana" />
  
                  :
  
                  <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                    <img src={noValue} style={{ height: 140, width: 140 }} alt="" />
                    <p>Sin registros (Citas agendadas por semana)</p>
                  </div>
              }
            </Paper>
  
          </Grid>
          

        )
      }
       {
        select=="Entrevistas"&&(
        <Grid item xs={12} md={12} lg={12}>

          <Paper style={{ padding: 10 }}>
            <Typography variant="body1" style={{ marginBottom: 15 }} >
              Entrevistas por semana
            </Typography>
            <FormControl variant="outlined" style={{ width: "100%", marginBottom: 10 }}>
              <InputLabel id="labelCitasE">Seleccione una semana</InputLabel>
              <Select
                labelId="labelCitasE"
                value={citaE}
                onChange={(e) => {
                  filtrarSemanas(citasE, setCitasE, e.target.value, setCitaE)
                }
                }
                label="Seleccione una semana"
              >
                <MenuItem value="">
                  <em>Seleccione una opción</em>
                </MenuItem>
                {duplicado(citasE.backup).map((e) => (
                  <MenuItem key={e} value={e}>
                    <em>{e}</em>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {
              citasE.data.length != 0 ?

                <SimpleBar values={retornar(citasE.data).values} categories={retornar(citasE.data).labels} text="Entrevistas por semana" />

                :

                <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                  <img src={noValue} style={{ height: 140, width: 140 }} alt="" />
                  <p>Sin registros (Entrevistas por semana)</p>
                </div>
            }

          </Paper>
        </Grid>
        )}
        {
          select=="Llamadas salientes"&&(

        <Grid item xs={12} md={12} lg={12}>
          <Paper style={{ padding: 10 }}>

            <Typography variant="body1" style={{ marginBottom: 10 }} >
              Llamadas salientes por semana
            </Typography>
            <FormControl variant="outlined" style={{ width: "100%", marginBottom: 10 }}>
              <InputLabel id="labelLlamadas">Seleccione una semana</InputLabel>
              <Select
                labelId="labelLlamadas"
                value={llamada}
                onChange={(e) => {
                  filtrarSemanas(llamadas, setLlamadas, e.target.value, setLlamada)
                }
                }
                label="Seleccione una semana"
              >
                <MenuItem value="">
                  <em>Seleccione una opción</em>
                </MenuItem>
                {duplicado(llamadas.backup).map((e) => (
                  <MenuItem key={e} value={e}>
                    <em>{e}</em>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {
              llamadas.data.length != 0 ?

                <SimpleBar values={retornar(llamadas.data).values} categories={retornar(llamadas.data).labels} text="Llamadas salientes por semana" />


                :
                /*       <Skeleton height={200}/>  */
                <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                  <img src={noValue} style={{ height: 140, width: 140 }} alt="" />
                  <p>Sin registros (Llamadas salientes por semana)</p>
                </div>
            }
          </Paper>

        </Grid>
        
          )}
       {
          select=="Llamadas efectivas"&&(
        <Grid item xs={12} md={12} lg={12}>
          <Paper style={{ padding: 10 }}>
            <Typography variant="body1" style={{ marginBottom: 10 }} >
              Llamadas efectivas por semana
            </Typography>

            <FormControl variant="outlined" style={{ width: "100%", marginBottom: 10 }}>
              <InputLabel id="labelLlamadasE">Seleccione una semana</InputLabel>
              <Select
                labelId="labelLlamadasE"
                value={llamadaE}
                onChange={(e) => {
                  filtrarSemanas(llamadasE, setLlamadasE, e.target.value, setLlamadaE)
                }
                }
                label="Seleccione una semana"
              >
                <MenuItem value="">
                  <em>Seleccione una opción</em>
                </MenuItem>
                {duplicado(llamadasE.backup).map((e) => (
                  <MenuItem key={e} value={e}>
                    <em>{e}</em>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {
              llamadasE.data.length != 0 ?


                <SimpleBar values={retornar(llamadasE.data).values} categories={retornar(llamadasE.data).labels} text="Llamadas efectivas por semana" />


                :
                /*  <Skeleton height={200}/>  */
                <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                  <img src={noValue} style={{ height: 140, width: 140 }} alt="" />
                  <p>Sin registros (Llamadas efectivas por semana)</p>
                </div>
            }

          </Paper>
        </Grid>

          )}
    </Grid>
      </Grid>
      <Box pt={4}>
        <Copyright />
      </Box>
    </div>


  )
}
