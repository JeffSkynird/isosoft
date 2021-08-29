import React, { useContext, useEffect, useState } from 'react'
import Calendar from './components/Calendario'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import FormControl from "@material-ui/core/FormControl";
import Typography from '@material-ui/core/Typography';
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import es from 'date-fns/locale/es'
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Accordion from '@material-ui/core/Accordion';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import SearchIcon from '@material-ui/icons/Search';
import Menu from "../Asesores/components/MenuNuevo";
import CallToActionIcon from '@material-ui/icons/CallToAction';

import { obtenerTodos } from "../../utils/API/asessors.js";
import Initializer from '../../store/Initializer'
import DateFnsUtils from '@date-io/date-fns';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { obtenerTodosPorLead, obtenerTodosPorAsesorId, obtenerTodosPorAsesorFiltro } from "../../utils/API/citation.js";
import { obtenerLeadsPorAsesor } from "../../utils/API/leads.js";

import esLocale from "date-fns/locale/es";
import { obtenerGoalsPorFechaAsesor } from '../../utils/API/goals'
import {
    DatePicker,
    KeyboardDatePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { desencriptarJson } from "../../utils/security";

export default function CalendarGoals(props) {
    const initializer = useContext(Initializer);
    const [open, setOpen] = React.useState(false);
    const [leadClientsData, setLeadClientsData] = React.useState([]);
    const [asesorData, setAsesorData] = useState([])
    const [asesor, setAsesor] = useState('')

    const [leadClient, setLeadClient] = React.useState("");
    const [idCliente, setIdCliente] = React.useState("");
    const [date, setDate] = useState(new Date())
    const [desde, setDesde] = React.useState(new Date());
    const [hasta, setHasta] = React.useState(new Date());

    const [data, setData] = useState([])
    const [number, setNumber] = useState({ effectiveCitations: 0, inEffectiveCitations: 0, effectiveCalls: 0, ineffectiveCalls: 0 })
    const [selected, setSelected] = React.useState(null);
    const [refresh, setRefresh] = React.useState(false);
    const [dataReagendada, setDataReagendada] = React.useState(null);
    const [tipo, setTipo] = React.useState([])
    const cargarTodos = () => {
        obtenerTodosPorAsesorId("", date, setData, initializer)

    }
    const select = (id) => {
        setSelected(id)
    }
    const angendarNuevo = (data) => {

    }
    React.useEffect(() => {
        if (initializer.usuario != null) {
            obtenerLeadsPorAsesor(setLeadClientsData, initializer);
        }
    }, [initializer.usuario]);
    useEffect(() => {

        if (initializer.usuario != null) {
            obtenerTodos(setAsesorData, initializer);
            console.log(JSON.parse(desencriptarJson(initializer.usuario)).user.type_user)
            setTipo(JSON.parse(desencriptarJson(initializer.usuario)).user.type_user);
            obtenerTodosPorAsesorId("", date, setData, initializer)


        }




    }, [initializer.usuario])
    useEffect(() => {
        if (asesorData.length != 0) {
            if (JSON.parse(desencriptarJson(initializer.usuario)).user.type_user == "asessor") {
                // obtenerGoalsPorFechaAsesor(asesor, date.getMonth() + 1, date.getFullYear(), setData, initializer, setNumber)
                obtenerTodosPorAsesorId("", date, setData, initializer)

            }
        }
    }, [asesorData])
    const onChange = (id) => {
        setData([])
        //obtenerGoalsPorFechaAsesor(id, date.getMonth() + 1, date.getFullYear(), setData, initializer, setNumber)
        obtenerTodosPorAsesorId(id, date, setData, initializer)

        setAsesor(id)
    }
    const onChangeDate = (fecha) => {
        setData([])
        //obtenerGoalsPorFechaAsesor(asesor, fecha.getMonth() + 1, fecha.getFullYear(), setData, initializer, setNumber)
        obtenerTodosPorAsesorId(asesor, fecha, setData, initializer)

        setDate(fecha)
    }
    const buscar = (e) => {
        if (e == "filtro") {
            //    let filter = [{ tipo: "type", valor: tipo }, { tipo: "title", valor: titulo }, { tipo: "client_id", valor: client },{"tipo":'accion',valor:gestionCita}]
            //obtenerIncidencias(setData, initializer, setIndicadores, filter)
            let filter = [{tipo:"asesor",valor:asesor},{ tipo: "client_id", valor: idCliente }, { tipo: "desde", valor: desde.toISOString() }, { tipo: "hasta", valor: hasta.toISOString() }]

            obtenerTodosPorAsesorFiltro(setData, initializer, filter)
        } else {
            obtenerTodosPorAsesorId("", date, setData, initializer)

            //obtenerIncidencias(setData, initializer, setIndicadores, [])
            //setTipo("")
            //setTitulo("")
            //setClient("")
        }

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
            <Box mb={2} mt={1} style={{ display: 'flex', justifyContent: 'center' }}>
                <Typography variant="h6" component="h6" style={{
                    display: 'flex', justifyContent: "center",
                    alignItems: "center", fontSize: 24
                }}>
                    Agenda
                </Typography>

            </Box>
            <Paper variant="outlined" style={{ padding: 10, width: '100%' }}>

                <Grid container spacing={2}>
                    <Grid item xs={12} md={12} >

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
                                <Grid container spacing={2}>

                                    {
                                        leadClientsData.length!=0?
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
                                        :null
                                    }
                             
                                    {
                                        tipo == "supervisor" || tipo == "manager" ? (
                                            <Grid item xs={12} md={3} >
                                                <Autocomplete
                                                style={{ width: '95%' }} 
                                                    options={asesorData}
                                                    size="small"
                                                    getOptionLabel={(option) => option.dni + " - " + option.names + " " + option.last_names}
                                                    onChange={(event, value) => {
                                                        if (value != null) {
                                                            onChange(value.id)
                                                        } else {
                                                            onChange('')
                                                        }

                                                    }} // prints the selected value
                                                    renderInput={params => (
                                                        <TextField {...params} label="Asesor" variant="outlined" fullWidth />
                                                    )}
                                                />

                                            </Grid>)
                                            : null
                                    }
                                    {/*    <Grid item xs={tipo == "supervisor" || tipo == "manager" ? 6 : 12} md={tipo == "supervisor" || tipo == "manager" ? 6 : 12} >
                            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>

                                <DatePicker
                                    autoOk
                                    style={{ width: '100%' }}
                                    views={["month", "year"]}
                                    variant="dialog"
                                    inputVariant="outlined"
                                    label="Filtrar por mes"
                                    value={date}

                                    onChange={mes => onChangeDate(mes)}
                                    InputAdornmentProps={{ position: "start" }}

                                />
                            </MuiPickersUtilsProvider>
                    </Grid>*/}

                                    <Grid item xs={12} md={3} >

                                        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}>
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
                                    <Grid item xs={12} md={3} >


                                        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}>
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
                                                    color="default"
                                                    size="md"
                                                    variant="outlined"

                                                    round="true"
                                                    icon="true"
                                                    onClick={() => buscar('todos')}
                                                >
                                                             <CallToActionIcon fontSize="small" style={{marginRight:5}} />   Limpiar
                                                </Button>
                                                : null
                                        }

                                    </Grid>
                                </Grid>

                            </AccordionDetails>
                        </Accordion>
                        <Button
                        color="secondary"
                        size="md"
                        variant="contained"
                        startIcon={<AddCircleOutline />}
                        size="small"
                        round="true"
                        icon="true"
                        onClick={() => setOpen(true)}
                    >
                        AGENDAR
                    </Button>
                    </Grid>


                    <Grid item xs={12} md={12} >

                        <Calendar lead_id={""} data={data} refresh={refresh} setRefresh={setRefresh} select={select} date={date} />
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
}
