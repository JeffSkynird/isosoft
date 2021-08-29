import React, { useContext, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { encriptarJson, desencriptarJson } from '../../utils/security'
import Box from '@material-ui/core/Box';
import PersonIcon from '@material-ui/icons/Person';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import { utcDate } from '../../utils/Date'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import DateRange from './components/DateRange';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import CustomPieChart from './components/CustomPieChart';
import ReactTable from 'react-table-v6'
import "react-table/react-table.css";
import FormControl from "@material-ui/core/FormControl";
import BarChart from './components/BarChart';
import LineChart from './components/LineChart';
import PieChart from './components/PieChart';
import KpiChart from './components/KpiChart';
import noValue from '../../assets/noValue.svg'
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import Select from "@material-ui/core/Select";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import CallToActionIcon from '@material-ui/icons/CallToAction';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import SearchIcon from '@material-ui/icons/Search';
import es from 'date-fns/locale/es'

import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Initializer from '../../store/Initializer'
import GroupOutlinedIcon from '@material-ui/icons/GroupOutlined';
import Button from '@material-ui/core/Button';
import { obtenerTodos } from "../../utils/API/asessors.js";
import CloseIcon from '@material-ui/icons/Close';
import { obtenerTodos as obtenerTodosS } from '../../utils/API/supervisors'

import { obtenerKpis, obtenerClientesPorMes, obtenerClientesPorTipo, obtenerEstadoProspectos, obtenerClientesPorPaso, obtenerStatusPorAsesor, obtenerStatusPorSupervisor, obtenerMetasObtenidasPorSupervisor ,getFactibilidad} from "../../utils/API/dashboard";
import Skeleton from '@material-ui/lab/Skeleton';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import SimpleBar from './components/SimpleBar'
import { play } from '../../utils/sound'
import esLocale from "date-fns/locale/es";
import Table from './components/TablaFactibilidad'
import PieChart2 from './components/PieChart2';
import DateFnsUtils from '@date-io/date-fns';
import BarSupervisorGoal from './components/BarSupervisorGoal'
import {
  DatePicker,
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { obtenerTodosKpis } from '../../utils/API/kpis.js'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'by Ambiensa ©'}

      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(4),
    maxWidth: '100%'
  },
  paper: {

  },
  fixedHeight: {

  },
}));

export default function Dashboard(props) {
  const initializer = useContext(Initializer);


  const theme = useTheme();
  const classes = useStyles();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const [kpi1, setKpi1] = React.useState(0)
  const [desde, setDesde] = React.useState(new Date())
  const [hasta, setHasta] = React.useState(new Date())
  const [data, setData] = React.useState([])
  const [data2, setData2] = React.useState({ value: [], label: [] })


  const [kpi2, setKpi2] = React.useState(0)
  const [kpi3, setKpi3] = React.useState(0)
  const [kpi4, setKpi4] = React.useState(0)
  const [rangeFilter, setRangeFilter] = React.useState(null)
  const [openFilter, setOpenFilter] = React.useState(false)
  const [clientsCount, setClientsCount] = React.useState({ data: [], backup: [] })
  const [week, setWeek] = React.useState('')

  const [parametrosData, setParametrosData] = useState([])

  const [parametro, setParametro] = useState('')
  const [clientsType, setClientsType] = React.useState([0, 0, 0])

  const [types, setType] = React.useState([])

  const [clientsStep, setClientsStep] = React.useState({ labels: [], values: [0, 0, 0] })
  const [assesors, setAssesors] = React.useState([])
  const [productions, setProductions] = React.useState([])
  const [dateGoal, setDateGoal] = React.useState(new Date())

  const [supervisors, setSupervisors] = React.useState([])
  const [productions2, setProductions2] = React.useState([])

  const [supervisorsData, setSupervisorsData] = React.useState([]);
  const [supervisor, setSupervisor] = React.useState("");
  const [clientsStatusA, setClientsStatusA] = React.useState({ labels: [], values: [0, 0, 0] })
  const [clientsStatusS, setClientsStatusS] = React.useState({ labels: [], values: [0, 0, 0] })
  const [dataGoal, setDataGoal] = React.useState({ goal: [], obtained: [], labels: [] })

  const [asesorData, setAsesorData] = React.useState([])
  const [asesor, setAsesor] = React.useState('')

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);


  React.useEffect(() => {

    if (initializer.usuario != null) {
      obtenerEstadoProspectos(setData2, initializer, asesor, utcDate(getFirst()), utcDate(getLast()))

      getFactibilidad(setData, initializer, asesor, utcDate(getFirst()), utcDate(getLast()))
      obtenerTodosKpis(setParametrosData, initializer);

      if (JSON.parse(desencriptarJson(initializer.usuario)).user.type_user == "asessor") {
        props.history.push('dashboard_asesor');
      } else if (JSON.parse(desencriptarJson(initializer.usuario)).user.type_user == "supervisor") {
        props.history.push('dashboard_asesor');
        obtenerTodos(setAsesorData, initializer);

      } else {
        obtenerTodos(setAsesorData, initializer);
        obtenerTodosS(setSupervisorsData, initializer)

      }
      // obtenerCitasAsesores(setCitas,setAsesores,initializer);
      obtenerKpis(setKpi1, setKpi2, setKpi3, setKpi4, initializer,"", "")
      obtenerClientesPorMes(setClientsCount, initializer, utcDate(getFirst()), utcDate(getLast()))
      obtenerClientesPorTipo(setClientsType, setType, initializer, utcDate(getFirst()), utcDate(getLast()));
      obtenerClientesPorPaso(setClientsStep, initializer, utcDate(getFirst()), utcDate(getLast()))
      // obtenerStatusPorAsesor(asesor,setClientsStatusA,initializer, utcDate(getFirst()), utcDate(getLast()))

      // obtenerAsesoresPorProduccion(setAssesors,setProductions,initializer);
      // obtenerSupervisorProProduccion(setSupervisors,setProductions2,initializer)
    }




  }, [initializer.usuario])

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
  const resetFilter = () => {
    setRangeFilter(null)
    setWeek('')
    setClientsCount({ data: [], backup: [] })
    setClientsStatusA({ values: [0, 0, 0], labels: [] })

    setClientsStatusS({ values: [0, 0, 0], labels: [] })

    obtenerKpis(setKpi1, setKpi2, setKpi3, setKpi4, initializer, utcDate(getFirst()), utcDate(getLast()))
    obtenerClientesPorTipo(setClientsType, setType, initializer, utcDate(getFirst()), utcDate(getLast()));
    obtenerClientesPorPaso(setClientsStep, initializer, utcDate(getFirst()), utcDate(getLast()))
    obtenerClientesPorMes(setClientsCount, initializer, utcDate(getFirst()), utcDate(getLast()))

    // obtenerStatusPorAsesor(asesor, setClientsStatusA, initializer, utcDate(getFirst()), utcDate(getLast()))
    //obtenerStatusPorSupervisor(supervisor, setClientsStatusS, initializer, utcDate(getFirst()), utcDate(getLast()))
    setSupervisor('')
    setAsesor('')


  }
  const filtrar = () => {
    if (rangeFilter != null) {
      setClientsCount({ data: [], backup: [] })
      setClientsStatusA({ values: [0, 0, 0], labels: [] })
      setClientsStatusS({ values: [0, 0, 0], labels: [] })

      obtenerKpis(setKpi1, setKpi2, setKpi3, setKpi4, initializer, utcDate(rangeFilter.startDate), utcDate(rangeFilter.endDate))
      obtenerClientesPorTipo(setClientsType, setType, initializer, utcDate(rangeFilter.startDate), utcDate(rangeFilter.endDate));
      obtenerClientesPorPaso(setClientsStep, initializer, utcDate(rangeFilter.startDate), utcDate(rangeFilter.endDate))
      obtenerClientesPorMes(setClientsCount, initializer, utcDate(rangeFilter.startDate), utcDate(rangeFilter.endDate))
      if (asesor != "") {
        obtenerStatusPorAsesor(asesor, setClientsStatusA, initializer, utcDate(rangeFilter.startDate), utcDate(rangeFilter.endDate))

      }
      if (supervisor != "") {
        obtenerStatusPorSupervisor(supervisor, setClientsStatusS, initializer, utcDate(rangeFilter.startDate), utcDate(rangeFilter.endDate))

      }
      setSupervisor('')
      setAsesor('')


    }

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


  const onChangeSupervisor = (id) => {
    setClientsStatusS({ values: [0, 0, 0], labels: [] })
    if (rangeFilter != null) {
      if (id != "") {
        obtenerStatusPorSupervisor(id, setClientsStatusS, initializer, utcDate(rangeFilter.startDate), utcDate(rangeFilter.endDate))

      }

    } else {
      if (id != "") {
        obtenerStatusPorSupervisor(id, setClientsStatusS, initializer, utcDate(getFirst()), utcDate(getLast()))

      }

    }
    setSupervisor(id)
  }

  const obtenerMetasPorSupervisor = (id) => {
    if (id != "") {
      setDataGoal({ goal: [], obtained: [], labels: [] })
      obtenerMetasObtenidasPorSupervisor({ month: dateGoal.getMonth() + 1, year: dateGoal.getFullYear(), kpi_id: id }, setDataGoal, initializer);

    }
    setParametro(id)
  }
  const onChangeDate = (date) => {
    if (parametro != "") {
      setDataGoal({ goal: [], obtained: [], labels: [] })
      obtenerMetasObtenidasPorSupervisor({ month: date.getMonth() + 1, year: date.getFullYear(), kpi_id: parametro }, setDataGoal, initializer);

    }
    setDateGoal(date)
  }

  const buscar = () => {
    setData2({value:[],label:[]})
    obtenerEstadoProspectos(setData2, initializer, asesor, utcDate(desde), utcDate(hasta))
    getFactibilidad(setData, initializer, asesor, utcDate(desde), utcDate(hasta))

  }
  const changeColor = (position) => {

    if (position != undefined) {
        if (position.row.estado_compra === 1) {
            return "#008FFB"
        } else if (position.row.estado_compra ===  2) {
          return "#00E396"
        } else if (position.row.estado_compra ===0) {
          return "#FEB019"
        } 
    }


}
  return (


    initializer.usuario != null ?
      <div   >
        <DateRange open={openFilter} setOpen={setOpenFilter} setRange={setRangeFilter} range={rangeFilter} filtrar={filtrar} />



        <Box mb={2} mt={1} style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', }}>
          </div>

          <div>


          </div>

        </Box>
        <Grid container spacing={3}>
          {/* Chart */}
          <Grid item xs={12} md={4} >
            <Paper className={fixedHeightPaper}>

              <  KpiChart title="Gestión de prospectos" value={kpi1} icon={<PersonIcon color="primary" style={{ fontSize: '35pt' }} />} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} >
            <Paper className={fixedHeightPaper}>
              <  KpiChart title="Asesores" value={kpi2}  icon={<AssignmentIndIcon color="primary" style={{ fontSize: '35pt' }} />} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} >
            <Paper className={fixedHeightPaper}>
              <  KpiChart title="Supervisores" value={kpi3} icon={<SupervisedUserCircleIcon color="primary" style={{ fontSize: '35pt' }} />} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography style={{ fontSize: 24, textAlign: 'center' }} color="textPrimary">Factibilidad</Typography>
            <Paper >
              <Grid container style={{ padding: 10 }}>

                <Grid item xs={12} md={12}>
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
                      {/*     <Grid item md={4} xs={12}>

                    <Button onClick={() => {
                      setOpenFilter(!openFilter)
                      //setRangeFilter(null)
                    }} color="secondary"><EditIcon style={{ marginRight: 5 }} />{!fullScreen ? "Establecer un rango" : null}</Button>

                  </Grid>
                  <Grid item md={4} xs={12}>
                    {
                      rangeFilter != null ?
                        <Button onClick={() => {

                          resetFilter()
                        }
                        } size="small" color="secondary"><CloseIcon style={{ marginRight: 5 }} />{!fullScreen ? "Quitar  rango " + rangeFilter != null ? "(" + utcDate(rangeFilter.startDate) + " hasta " + utcDate(rangeFilter.endDate) + ")" : getFirstLast() : null}</Button>
                        : null
                    }

                  </Grid> */}
                      <Grid item xs={12} md={4} >

                        <Autocomplete
                          key={1}
                          id={1}
                          style={{ width: "95%" }}
                          options={asesorData}
                          size="small"
                          getOptionLabel={(option) => option.dni + " - " + option.names + " " + option.last_names}
                          onChange={(event, value) => {
                            if (value != null) {
                              setAsesor(value.id)

                            } else {
                              setAsesor('')

                            }

                          }} // prints the selected value
                          renderInput={params => (
                            <TextField {...params} label="Asesor" variant="outlined" fullWidth />
                          )}
                        />



                      </Grid>
                      <Grid item md={4} xs={12}>


                        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}>
                          <KeyboardDatePicker
                            autoOk
                            ampm={false}
                            size="small"
                            inputVariant="outlined"
                            label="Desde"
                            style={{ width: "95%" }}
                            // disablePast
                            format="yyyy-MM-dd"
                            value={desde}
                   
                            onChange={date => setDesde(date)}
                          />


                        </MuiPickersUtilsProvider>


                      </Grid>
                      <Grid item md={4} xs={12}>


                        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}>
                          <KeyboardDatePicker
                            autoOk
                            ampm={false}
                            size="small"
                            inputVariant="outlined"
                            label="Hasta"
                            style={{ width: "95%" }}
                            // disablePast
                            format="yyyy-MM-dd"
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
                          asesor != ""  ?
                            <Button
                              style={{ marginLeft: 10 }}
                              color="default"
                              size="md"
                              variant="outlined"

                              round="true"
                              icon="true"
                              onClick={() => buscar('todos')}
                            >
                              <CallToActionIcon fontSize="small" style={{ marginRight: 5 }} />   Limpiar
                            </Button>
                            : null
                        }

                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
                <Grid item xs={12} md={6}>
                  <ReactTable
                    columns={[

                      {
                        Header: () => <b style={{ display: 'block', textAlign: 'left' }}>Descripción</b>,
                        accessor: "estado_compra",
                        headerStyle: { backgroundColor: theme.palette.type == "dark" ? "#424242" : "white" },
                        Cell: ({ row }) => {

                          return (
                            <span>{row.estado_compra==0?'Bajo':row.estado_compra==1?"Medio":"Alto"}</span>
                          )
                          }
                      },

                      {
                        Header: () => <b style={{ display: 'block', textAlign: 'left' }}>Cantidad</b>,
                        accessor: "count",
                        headerStyle: { backgroundColor: theme.palette.type == "dark" ? "#424242" : "white" }
                      }

                      /*  ,
                       {
                         Header:()=><b>Acciones</b>,
                         accessor: "actions",
                         sortable: false,
                         filterable: false,
                         fixed: "right",
                         fixed: 'right',
                         sticky: "right",
                         width: 120
                       }, */

                    ]}
                    style={{
                      height: "200px",
                      textAlign: 'left'
                    }}
                    getTdProps={(a, b, { fixed }) => {
                      return ({ className: '', style: { background: fixed ? theme.palette.type == "dark" ? "#303030" : "white" : changeColor(b) } });
                  }}
                    defaultPageSize={50}
                    previousText="Anterior"
                    nextText="Siguiente"
                    rowsText="registros"
                    pageText="P&aacute;gina"
                    noDataText="No existen registros"
                    ofText="de"
                    showPaginationBottom={false}
                    className="-striped -highlight"
                    data={data}
                  />

                </Grid>
                <Grid item xs={12} md={6} >


                  {
                    data2.value.length != 0 ?

                      <PieChart2 values={data2.value} categories={data2.label} text="Estado de los prospectos" />

                      :
                      <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                        <img src={noValue} style={{ height: 140, width: 140 }} />
                        <p>Sin registros (Estado de los prospectos)</p>
                      </div>


                  }


                </Grid>
              </Grid>

            </Paper>
          </Grid>
      
          <Grid item xs={12} md={12} >
          <Typography style={{ fontSize: 24, textAlign: 'center' }} color="textPrimary">Citas y llamadas</Typography>
        <Table data={data} setData={setData} /> 
        {/* <Table2 data={data} setData={setData} /> */}

        </Grid>
        
        </Grid>
        <Box pt={4}>
          <Copyright />
        </Box>
      </div>
      :
      null

  );
}