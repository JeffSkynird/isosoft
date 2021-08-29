import React, { useContext } from 'react'

import {
    DatePicker,
    KeyboardDatePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import noValue from '../../assets/noValue.svg'
import Paper from '@material-ui/core/Paper';
import esLocale from "date-fns/locale/es";
import DateFnsUtils from '@date-io/date-fns';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import BarGlobalSupervisors from './components/BarGlobalSupervisors'
import Initializer from '../../store/Initializer'
import { obtenerGlobalGoals, ObtenerKpisRendimiento, ObtenerKpisRendimientoS } from '../../utils/API/goals'
import BarSupervisorGoal from './components/BarSupervisorGoal'
import { obtenerMetasObtenidasPorSupervisor } from "../../utils/API/dashboard";
import Typography from '@material-ui/core/Typography';
import DateRange from './components/DateRange';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import KpiChart from './components/KpiChart';

import CloseIcon from '@material-ui/icons/Close';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import CallToActionIcon from '@material-ui/icons/CallToAction';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import SearchIcon from '@material-ui/icons/Search';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { utcDate } from '../../utils/Date'
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

export default function SupervisorRendimiento() {
    const initializer = useContext(Initializer);
    const theme = useTheme();
    const myRef = React.useRef(null)
    const [cotizaciones, setCotizaciones] = React.useState(0)
    const [reservations, setReservations] = React.useState(0)

    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
    const [dataGoal, setDataGoal] = React.useState({ obtained: [], goal: [], labels: [] })
    const [kpisR, setKpisR] = React.useState([])
    const [select, setSelect] = React.useState(0)

    const [dataGoalI, setDataGoalI] = React.useState({ obtained: [], goal: [], labels: [] })
    const [dataGoalCI, setDataGoalCI] = React.useState({ obtained: [], goal: [], labels: [] })
    const [dataGoalCE, setDataGoalCE] = React.useState({ obtained: [], goal: [], labels: [] })
    const [dataGoalCAI, setDataGoalCAI] = React.useState({ obtained: [], goal: [], labels: [] })
    const [dataGoalCAE, setDataGoalCAE] = React.useState({ obtained: [], goal: [], labels: [] })
    const [rangeFilter, setRangeFilter] = React.useState(null)
    const [openFilter, setOpenFilter] = React.useState(false)

    const [dateGoal, setDateGoal] = React.useState(new Date())

    React.useEffect(() => {

        if (initializer.usuario != null) {
            obtenerGlobalGoals({ month: dateGoal.getMonth() + 1, year: dateGoal.getFullYear() }, setDataGoal, initializer)
            obtenerMetasObtenidasPorSupervisor({ month: dateGoal.getMonth() + 1, year: dateGoal.getFullYear(), kpi_id: 6 }, setDataGoalI, initializer);
            obtenerMetasObtenidasPorSupervisor({ month: dateGoal.getMonth() + 1, year: dateGoal.getFullYear(), kpi_id: 1 }, setDataGoalCI, initializer);
            obtenerMetasObtenidasPorSupervisor({ month: dateGoal.getMonth() + 1, year: dateGoal.getFullYear(), kpi_id: 3 }, setDataGoalCE, initializer);
            obtenerMetasObtenidasPorSupervisor({ month: dateGoal.getMonth() + 1, year: dateGoal.getFullYear(), kpi_id: 5 }, setDataGoalCAI, initializer);
            obtenerMetasObtenidasPorSupervisor({ month: dateGoal.getMonth() + 1, year: dateGoal.getFullYear(), kpi_id: 2 }, setDataGoalCAE, initializer);
            ObtenerKpisRendimientoS({ asesor_id: "", min: utcDate(getFirst()), max: utcDate(getLast()), year: new Date().getFullYear(), month: new Date().getMonth() + 1 }, setKpisR, initializer)
        }




    }, [initializer.usuario])
    const onChangeDateGoal = (mes) => {
        setDataGoal({ obtained: [], goal: [], labels: [] })
        setDataGoalI({ obtained: [], goal: [], labels: [] })
        setDataGoalCI({ obtained: [], goal: [], labels: [] })
        setDataGoalCE({ obtained: [], goal: [], labels: [] })
        setDataGoalCAI({ obtained: [], goal: [], labels: [] })
        setDataGoalCAE({ obtained: [], goal: [], labels: [] })
        obtenerGlobalGoals({ month: mes.getMonth() + 1, year: mes.getFullYear() }, setDataGoal, initializer)
        obtenerMetasObtenidasPorSupervisor({ month: mes.getMonth() + 1, year: mes.getFullYear(), kpi_id: 6 }, setDataGoalI, initializer);
        obtenerMetasObtenidasPorSupervisor({ month: mes.getMonth() + 1, year: mes.getFullYear(), kpi_id: 1 }, setDataGoalCI, initializer);
        obtenerMetasObtenidasPorSupervisor({ month: mes.getMonth() + 1, year: mes.getFullYear(), kpi_id: 3 }, setDataGoalCE, initializer);
        obtenerMetasObtenidasPorSupervisor({ month: mes.getMonth() + 1, year: mes.getFullYear(), kpi_id: 5 }, setDataGoalCAI, initializer);
        obtenerMetasObtenidasPorSupervisor({ month: mes.getMonth() + 1, year: mes.getFullYear(), kpi_id: 2 }, setDataGoalCAE, initializer);
        setDateGoal(mes)
    }
    const filtrar = () => {

    }
    const resetFilter = () => {

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
    const getFirstLast = () => {
        let date = new Date();
        let primerDia = new Date(date.getFullYear(), date.getMonth(), 1);
        let ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0);


        return "(" + utcDate(primerDia) + " hasta " + utcDate(ultimoDia) + ")"
    }
    return (
        <Grid container>
            <DateRange open={openFilter} setOpen={setOpenFilter} setRange={setRangeFilter} range={rangeFilter} filtrar={filtrar} />
            <Grid md={12} xs={12}>

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
                            <Grid item md={12} xs={12}>

                                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>

                                    <DatePicker
                                        autoOk
                                        style={{ width: '100%', marginBottom: 15 }}
                                        views={["month", "year"]}
                                        variant="dialog"
                                        inputVariant="outlined"
                                        label="Filtrar por mes"

                                        value={dateGoal}

                                        onChange={mes => onChangeDateGoal(mes)}


                                    />
                                </MuiPickersUtilsProvider>


                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>

            </Grid>
            <Grid container spacing={3} justify='center' style={{ marginBottom: 15 }}>


                {
                    kpisR.map((e) => (
                        <Grid item xs={12} md={3} >
                            <Paper>
                                <KpiChart onClick={() => {
                                    setSelect(e.Nombre)
                                    myRef.current.scrollIntoView()
                                }} title={e.Nombre} value={e.obtenido} goal={"/" + e.Total} cotizaciones={cotizaciones} reservations={reservations} icon={<CalendarTodayIcon color="primary" style={{ fontSize: '30pt' }} />} />
                            </Paper>
                        </Grid>
                    ))
                }

            </Grid>
            <Grid item xs={12} md={12} lg={12} style={{ marginBottom: 10 }}>

                <Paper className={""} style={{ padding: 10 }}>
                    {
                        dataGoal.obtained.length != 0 ?

                            <BarGlobalSupervisors key="2" data1={dataGoal.obtained} data2={dataGoal.goal} categories={dataGoal.labels} text="Resumen de metas" />

                            :
                            /*                <Skeleton height={200}/> */
                            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                                <img src={noValue} style={{ height: 140, width: 140 }} />
                                <p>Sin registros (Resumen de metas del último mes)</p>
                            </div>
                    }
                </Paper>
            </Grid>
            <Grid container ref={myRef}>


            {
                select == "Interesados" ? (

                    <Grid item xs={12} style={{ marginBottom: 10 }}>
                        <Paper className={""} style={{ padding: 10 }}>
                            <Typography variant="body1" style={{ marginBottom: 15 }} >
                                Resumen de interesados por supervisor
                            </Typography>


                            {
                                dataGoalI.goal.length != 0 ?

                                    <BarSupervisorGoal data1={dataGoalI.goal} data2={dataGoalI.obtained} categories={dataGoalI.labels} />



                                    :
                                    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                                        <img src={noValue} style={{ height: 140, width: 140 }} alt="" />
                                        <p>Sin registros (Resumen de interesados por supervisor)</p>
                                    </div>
                            }
                        </Paper>
                    </Grid>
                ) : null
            }
            {
                select == "Citas agendadas" ? (
                    <Grid item xs={12} style={{ marginBottom: 10 }}>
                        <Paper className={""} style={{ padding: 10 }}>
                            <Typography variant="body1" style={{ marginBottom: 15 }} >
                                Resumen de Citas agendadas por supervisor
                            </Typography>


                            {
                                dataGoalCI.goal.length != 0 ?

                                    <BarSupervisorGoal data1={dataGoalCI.goal} data2={dataGoalCI.obtained} categories={dataGoalCI.labels} />



                                    :
                                    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                                        <img src={noValue} style={{ height: 140, width: 140 }} alt="" />
                                        <p>Sin registros (Resumen de Citas agendadas por supervisor)</p>
                                    </div>
                            }
                        </Paper>
                    </Grid>

                ) : null}
            {
                select == "Entrevistas" ? (
                    <Grid item xs={12} style={{ marginBottom: 10 }}>
                        <Paper className={""} style={{ padding: 10 }}>
                            <Typography variant="body1" style={{ marginBottom: 15 }} >
                                Resumen de entrevistas por supervisor
                            </Typography>


                            {
                                dataGoalCE.goal.length != 0 ?

                                    <BarSupervisorGoal data1={dataGoalCE.goal} data2={dataGoalCE.obtained} categories={dataGoalCE.labels} />



                                    :
                                    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                                        <img src={noValue} style={{ height: 140, width: 140 }} alt="" />
                                        <p>Sin registros (Resumen de entrevistas por supervisor)</p>
                                    </div>
                            }
                        </Paper>
                    </Grid>) : null}
            {
                select == "Llamadas salientes" ? (
                    <Grid item xs={12} style={{ marginBottom: 10 }}>
                        <Paper className={""} style={{ padding: 10 }}>
                            <Typography variant="body1" style={{ marginBottom: 15 }} >
                                Resumen de llamadas salientes por supervisor
                            </Typography>


                            {
                                dataGoalCAI.goal.length != 0 ?

                                    <BarSupervisorGoal data1={dataGoalCAI.goal} data2={dataGoalCAI.obtained} categories={dataGoalCAI.labels} />



                                    :
                                    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                                        <img src={noValue} style={{ height: 140, width: 140 }} alt="" />
                                        <p>Sin registros (Resumen de llamadas salientes por supervisor)</p>
                                    </div>
                            }
                        </Paper>
                    </Grid>
                ) : null}
            {
                select == "Llamadas efectivas" ? (
                    <Grid item xs={12}>
                        <Paper className={""} style={{ padding: 10 }}>
                            <Typography variant="body1" style={{ marginBottom: 15 }} >
                                Resumen de llamadas efectivas por supervisor
                            </Typography>


                            {
                                dataGoalCAE.goal.length != 0 ?

                                    <BarSupervisorGoal data1={dataGoalCAE.goal} data2={dataGoalCAE.obtained} categories={dataGoalCAE.labels} />



                                    :
                                    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                                        <img src={noValue} style={{ height: 140, width: 140 }} alt="" />
                                        <p>Sin registros (Resumen de llamadas efectivas por supervisor)</p>
                                    </div>
                            }
                        </Paper>
                    </Grid>

                ) : null}
            </Grid>
        </Grid>
    )
}
