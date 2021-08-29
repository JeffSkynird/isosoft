import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import DateRange from './components/DateRange';
import Box from '@material-ui/core/Box';
import EditIcon from '@material-ui/icons/Edit';
import noValue from '../../assets/noValue.svg'

import Skeleton from '@material-ui/lab/Skeleton';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import BarChart from './components/BarChart';
import LineChart from './components/LineChart';
import PieChart from './components/PieChart';
import { utcDate } from '../../utils/Date'
import FormControl from "@material-ui/core/FormControl";
import { desencriptarJson } from "../../utils/security";
import { obtenerValorCotizaciones } from '../../utils/API/clientes'
import KpiChart from './components/KpiChart';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import SimpleBar from './components/SimpleBar'
import { obtenerTodos } from "../../utils/API/asessors.js";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { obtenerKpisA, obtenerClientesPorMes, obtenerStatusPorAsesor, obtenerStatusPorSupervisor, obtenerLeadsPorMes } from "../../utils/API/dashboard";
import Initializer from '../../store/Initializer'
import Table from './components/Table2'
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import TodayIcon from '@material-ui/icons/Today';
import PersonIcon from '@material-ui/icons/Person';
import CallIcon from '@material-ui/icons/Call';
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

  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const [kpi1, setKpi1] = React.useState(0)
  const [kpi2, setKpi2] = React.useState(0)
  const [kpi3, setKpi3] = React.useState(0)
  const [kpi4, setKpi4] = React.useState(0)
  const [openFilter, setOpenFilter] = React.useState(false)
  const [months, setMonths] = React.useState([])
  const [rangeFilter, setRangeFilter] = React.useState(null)
  const [clientsCount, setClientsCount] = React.useState({ data: [], backup: [] })
  const [week, setWeek] = React.useState('')
  const [clientsStatusA, setClientsStatusA] = React.useState({ labels: [], values: [0, 0, 0] })
  const [clientsStatusS, setClientsStatusS] = React.useState({ labels: [], values: [0, 0, 0] })
  const [asesorData, setAsesorData] = React.useState([])
  const [asesor, setAsesor] = React.useState('')
  const [citesCount, setCitesCount] = React.useState([])
  const [monthsCites, setMonthsCites] = React.useState([])
  const [data, setData] = React.useState([])

  const [clientsType, setClientsType] = React.useState([])
  const [types, setType] = React.useState([])

  React.useEffect(() => {

    if (initializer.usuario != null) {
      obtenerKpisA(setKpi1, setKpi2, setKpi3, initializer, "", "")
      setType(JSON.parse(desencriptarJson(initializer.usuario)).user.type_user);
      if (JSON.parse(desencriptarJson(initializer.usuario)).user.type_user == "supervisor") {
    //    obtenerTodos(setAsesorData, initializer);
      //  obtenerStatusPorSupervisor(JSON.parse(desencriptarJson(initializer.usuario)).user.user_ca, setClientsStatusS, initializer, utcDate(getFirst()), utcDate(getLast()))

      }else if(JSON.parse(desencriptarJson(initializer.usuario)).user.type_user == "asessor"){
  //      obtenerStatusPorAsesor(JSON.parse(desencriptarJson(initializer.usuario)).user.type_user.user_ca, setClientsStatusA, initializer,  utcDate(getFirst()), utcDate(getLast()))

      }

      // obtenerClientesPorTipo(setClientsType, setType, initializer);

    //  obtenerClientesPorMes(setClientsCount, initializer, utcDate(getFirst()), utcDate(getLast()))
      //   obtenerValorCotizaciones(setCotizaciones,JSON.parse(desencriptarJson(initializer.usuario)).user.user_ca,'anual')
      //  obtenerCitasPorMes(setCitesCount, setMonthsCites, initializer);
      //obtenerKpisAsesor(setKpi1,initializer);
    }




  }, [initializer.usuario])
  const filtrar = () => {
    if (rangeFilter != null) {
      setClientsCount({ data: [], backup: [] })
      setClientsStatusA({ values: [0, 0, 0], labels: [] })
      setClientsStatusS({ values: [0, 0, 0], labels: [] })

      obtenerClientesPorMes(setClientsCount, initializer, utcDate(rangeFilter.startDate), utcDate(rangeFilter.endDate))
      obtenerKpisA(setKpi1, setKpi2, setKpi3, initializer, utcDate(rangeFilter.startDate), utcDate(rangeFilter.endDate))
      if(JSON.parse(desencriptarJson(initializer.usuario)).user.type_user == "supervisor"){
        if(asesor!=""){
          obtenerStatusPorAsesor(asesor, setClientsStatusA, initializer, utcDate(rangeFilter.startDate), utcDate(rangeFilter.endDate))

        }

      obtenerStatusPorSupervisor(JSON.parse(desencriptarJson(initializer.usuario)).user.user_ca, setClientsStatusS, initializer, utcDate(rangeFilter.startDate), utcDate(rangeFilter.endDate))
      }else{
        obtenerStatusPorAsesor(JSON.parse(desencriptarJson(initializer.usuario)).user.type_user.user_ca, setClientsStatusA, initializer, utcDate(rangeFilter.startDate), utcDate(rangeFilter.endDate))

      }


    }
  }
  const resetFilter = () => {
    setRangeFilter(null)
    setClientsCount({ data: [], backup: [] })
    setClientsStatusA({ values: [0, 0, 0], labels: [] })
    setClientsStatusS({ values: [0, 0, 0], labels: [] })

    setWeek('')
    obtenerKpisA(setKpi1, setKpi2, setKpi3, initializer, utcDate(getFirst()), utcDate(getLast()))
    obtenerClientesPorMes(setClientsCount, initializer, utcDate(getFirst()), utcDate(getLast()))
    if(JSON.parse(desencriptarJson(initializer.usuario)).user.type_user == "supervisor"){
      obtenerStatusPorSupervisor(JSON.parse(desencriptarJson(initializer.usuario)).user.user_ca, setClientsStatusS, initializer, utcDate(getFirst()), utcDate(getLast()))

    }else{
      obtenerStatusPorAsesor(JSON.parse(desencriptarJson(initializer.usuario)).user.type_user.user_ca, setClientsStatusA, initializer, utcDate(getFirst()), utcDate(getLast()))

    }


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
  const filtrarSemanas = (datos, setDatos, semana, setCombo) => {
    let newArray = []
    datos.backup.map((e) => {
      if (e.week == semana) {
        newArray.push({ ...e })
      }
    })
    setDatos({ data: newArray, backup: datos.backup })
    setCombo(semana)


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
  React.useEffect(() => {
    if (clientsCount.backup.length != 0) {
      filtrarSemanas(clientsCount, setClientsCount, clientsCount.data[0].week, setWeek)


    }

  }, [clientsCount.backup])
  const onChangeAsesor = (id) => {
    setClientsStatusA({ values: [0, 0, 0], labels: [] })
    if (rangeFilter != null) {
      if (id != "") {
        obtenerStatusPorAsesor(id, setClientsStatusA, initializer, utcDate(rangeFilter.startDate), utcDate(rangeFilter.endDate))

      }

    } else {
      if (id != "") {
        obtenerStatusPorAsesor(id, setClientsStatusA, initializer, utcDate(getFirst()), utcDate(getLast()))

      }

    }
    setAsesor(id)
  }

 
  return (
    <div>
      {/* <DateRange open={openFilter} setOpen={setOpenFilter} setRange={setRangeFilter} range={rangeFilter} filtrar={filtrar} /> */}
      <Box mb={2} mt={1} style={{ display: 'flex', justifyContent: 'space-between' }}>
   


      </Box>
      <Grid container spacing={3} >
        {/* Chart */}
        <Grid item xs={12} md={4} >
          <Paper >
     
            <  KpiChart {...props} onClick={()=>props.history.push("/clientes")} icon={     <PeopleAltIcon style={{color:'#3f51b5',fontSize:55}} />} title="Gestión de prospectos" value={kpi1} />
          </Paper>
        </Grid>
       

        <Grid item xs={12} md={4} >
          <Paper >
            <  KpiChart title="Agenda" value={kpi2} {...props} icon={     <TodayIcon style={{color:'#3f51b5',fontSize:55}} />}  onClick={()=>types!="supervisor"?props.history.push("/agenda"):null}/>
          </Paper>
        </Grid>

        {
          types!="supervisor"?
          <Grid item xs={12} md={4} >
          <Paper >
          <  KpiChart title="Nuevo Interesado" onClick={()=>props.history.push("/clientes/crear")} value={""} {...props} icon={     <PersonIcon style={{color:'#3f51b5',fontSize:55}} />} />
          </Paper>
        </Grid>
          :null
        }
       
        
        <Grid item xs={12} md={12} >
        <Table data={data} setData={setData} /> 
        {/* <Table2 data={data} setData={setData} /> */}

        </Grid>
      </Grid>
      <Box pt={4}>
        <Copyright />
      </Box>
    </div>


  )
}
