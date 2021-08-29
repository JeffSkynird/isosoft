import React, { useContext, useState, useEffect } from "react";
import { obtenerGoalsConfig, editarGoalsConfig } from "../../utils/API/goals";
import Initializer from "../../store/Initializer";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import {
    DatePicker,
    KeyboardDatePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import SaveIcon from '@material-ui/icons/Save';
import Tooltip from '@material-ui/core/Tooltip';

import esLocale from "date-fns/locale/es";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Card from "@material-ui/core/Card";
import DateFnsUtils from '@date-io/date-fns';
import Alert from '@material-ui/lab/Alert';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { ColorPicker } from "material-ui-color";
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';
import Slide from '@material-ui/core/Slide';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { obtenerTodosPorMetas as obtenerTodosS } from '../../utils/API/supervisors'
import RefreshIcon from '@material-ui/icons/Refresh';
import Chip from '@material-ui/core/Chip';
import Modal from './components/Modal'
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import { obtenerTodosKpis } from '../../utils/API/kpis.js'
import { obtenerKPISupervisor, editarKPISupervisor, generarPerformance } from '../../utils/API/goals.js'
import { utcDate, getHours } from '../../utils/Date'
import IconButton from '@material-ui/core/IconButton';
import ModalGerente from './components/ModalGenente'
import AssessmentIcon from '@material-ui/icons/Assessment';
import Table from './components/Table'
const parametros = [
    {
        id: 1,
        name: 'Citas agendadas'
    },
    {
        id: 2,
        name: 'Entrevistas',
    },
    {
        id: 3,
        name: 'Llamadas salientes'
    },
    {
        id: 4,
        name: 'Llamadas efectivas'
    }
]
export default function Goals(props) {
    const initializer = useContext(Initializer);
    const theme = useTheme();

    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const fullScreenLg = useMediaQuery(theme.breakpoints.down('lg'));

    const [inEffectiveCites, setInEffectiveCites] = React.useState("");
    const [effectiveCites, setEffectiveCites] = React.useState("");
    const [effectiveCalls, setEffectiveCalls] = React.useState("");
    const [inEffectiveCalls, setInEffectiveCalls] = React.useState("");
    const [supervisorsData, setSupervisorsData] = React.useState([]);
    const [supervisor, setSupervisor] = React.useState("");
    const [error, setError] = React.useState(false);

    const [parametrosData, setParametrosData] = useState([])

    const [parametro, setParametro] = useState('')
    const [date, setDate] = useState(new Date())

    const [checked, setChecked] = React.useState(true);
    const [checked2, setChecked2] = React.useState(true);
    const [data, setData] = React.useState([]);
    const [goal, setGoal] = React.useState('');
    const [kpiSupervisorId, setKpiSupervisorId] = React.useState(null);

    const handleChange = () => {
        setChecked((prev) => !prev);
        if (checked == true) {
            if (fullScreen) {
                setChecked2(!checked2)
            } else {
                let timer = setTimeout(() => {
                    setChecked2(!checked2)
                    clearTimeout(timer);
                }
                    , 300);
            }


        } else {
            setChecked2(!checked)
        }
    };
    useEffect(() => {
        if (initializer.usuario != null) {
            obtenerTodosS(setSupervisorsData, initializer)
            obtenerTodosKpis(setParametrosData, initializer);
        }
    }, [initializer.usuario])

    const sumarDias = (fecha, meses) => {
        let fechaTemp = new Date(fecha.getTime());
        fechaTemp.setMonth(fechaTemp.getMonth() + meses);
        return fechaTemp;
    }
    const generar = () => {
        if (supervisor != "" && parametro != "" && goal > 0) {
            let previusDate = sumarDias(date, -1);
            generarPerformance({ supervisor_id: supervisor, kpi_id: parametro, global_goal: goal, previus_year: previusDate.getFullYear(), previus_month: previusDate.getMonth() + 1 }, setData, initializer)
        }
    }
    const retornarNombre = () => {
        let nombre = ""
        if (supervisor != "") {
            supervisorsData.map((e) => {
                if (supervisor == e.id) {
                    nombre = e.names + " " + e.last_names
                }
            })
        }

        return nombre
    }
    const obtenerData = (id, parametro_id) => {
        setSupervisor(id)
        if (id != "" && parametro_id != "") {
            if (goal != "") {
                setGoal('')
            }

            obtenerKPISupervisor({ supervisor_id: id, kpi_id: parametro_id, month: date.getMonth() + 1, year: date.getFullYear() }, setData, setGoal, setKpiSupervisorId, initializer)
        }
    }
    const obtenerDataMensual = (id, parametro_id, fecha) => {
        if (id != "" && parametro_id != "" && fecha != null) {
            if (goal != "") {
                setGoal('')
            }

            obtenerKPISupervisor({ supervisor_id: id, kpi_id: parametro_id, month: fecha.getMonth() + 1, year: fecha.getFullYear() }, setData, setGoal, setKpiSupervisorId, initializer)
        }
    }
    const enviar = () => {
        if (comprobar()) {
            editarKPISupervisor({ data: data, kpi_supervisor: kpiSupervisorId, supervisor_id: supervisor, kpi_id: parametro, global_goal: goal, date: utcDate(date) + " " + getHours(date) }, initializer)
            setError(false)
        } else {
            setError(true)
        }
    }
    const comprobar = () => {
        let suma = 0;
        data.map((e) => {
            if (e.meta != null) {
                suma += parseInt(e.meta)
            }

        })
        if (goal != "") {
            if (suma == parseInt(goal)) {
                return true
            } else {
                return false
            }
        } else {
            return false
        }

    }
    const comprobarResiduo = (array) => {
        let suma = 0;
        array.map((e) => {
            if (e.meta != null) {
                suma += parseInt(e.meta)
            }

        })
        if (goal != "") {
            if (suma == parseInt(goal)) {
                return 0
            } else {
                return parseInt(goal) - suma
            }
        } else {
            return parseInt(goal) - suma
        }

    }



    const equitativo = () => {
        if (data.length != 0 && goal != "" && goal > 0) {

            let value = goal / data.length
            if (goal > data.length) {
                let newArray = []
                data.map((e) => {
                    newArray.push({ ...e, meta: Math.floor(value) })
                })
                newArray[0].meta = newArray[0].meta + comprobarResiduo(newArray)
                setData(newArray)
            } else {
                let newArray = []
                let goalTemp = goal

                data.map((e) => {
                    if (goalTemp > 0) {
                        newArray.push({ ...e, meta: 1 })
                    } else {
                        newArray.push({ ...e, meta: 0 })
                    }
                    goalTemp = goalTemp - 1
                })

                setData(newArray)
            }




        }

    }
    const resetear = () => {
        setData([])
        setGoal('')
        setParametro('')
        setDate(new Date())
    }
    return (
        <Box >
           
            <Grid container>
                <Grid item md={12} xs={12}>


                    <Card>
                        <CardContent>
                            <Grid container spacing={1}>
                                <Grid item md={12} xs={12} style={{ display: 'flex', justifyContent: 'space-between', }}>

                                    <FormControlLabel
                                        control={<Switch checked={checked} onChange={handleChange} />}
                                        label="Mostrar calendario"
                                    />

                                    {
                                        fullScreen ?
                                            <div>
                                                <ModalGerente short={true} resetear={resetear}/>
                                                <Tooltip title="Guardar">
                                                    <IconButton aria-label="Guardar" onClick={() => enviar()}>
                                                        <SaveIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </div>
                                            :
                                            <div>
                                                <ModalGerente short={false}  resetear={resetear}/>
                                                <Button

                                                    startIcon={<SaveIcon />}
                                                    style={{ marginLeft: 10 }}
                                                    variant="contained"
                                                    color="secondary"
                                                    onClick={() => enviar()}
                                                >
                                                    Guardar
          </Button>

                                            </div>
                                    }


                                </Grid>

                                <Slide direction="right" in={checked} mountOnEnter unmountOnExit>
                                    <Grid item lg={3} md={4} sm={12} xs={12}>

                                        <div style={{ width: !fullScreen ? '306px' : '' }}>
                                            <Paper elevation={4} style={{ display: fullScreen ? 'flex' : '', justifyContent: fullScreen ? 'center' : '' }} >
                                                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>

                                                    <DatePicker
                                                        autoOk

                                                        views={["year", "month"]}

                                                        inputVariant="outlined"
                                                        label="Filtrar por mes"
                                                        value={date}

                                                        variant="static"
                                                        onChange={mes => {
                                                            setDate(mes)
                                                            if (parametro != "" && supervisor != "") {
                                                                obtenerDataMensual(supervisor, parametro, mes)
                                                            }
                                                        }}
                                                        InputAdornmentProps={{ position: "start" }}

                                                    />
                                                </MuiPickersUtilsProvider>
                                                {!fullScreen && (
                                                    <div style={{ display: 'flex', flexGrow: 1, borderTopWidth: 1, borderTopStyle: 'solid', borderTopColor: 'gray', marginTop: 50, padding: 10 }}>

                                                        <Typography variant="body2" style={{ textAlign: 'center' }} color="textPrimary">Seleccione un mes para establecer una meta</Typography>
                                                    </div>)
                                                }
                                            </Paper>
                                        </div>

                                    </Grid>
                                </Slide>



                                <Grid item lg={checked2 ? 9 : 12} md={checked2 ? 8 : 12} sm={12} xs={12}>
                                    <Box pl={1}>
                                        <Alert severity="info" style={{ marginBottom: 10 }}>Mes de gestión: {date.getFullYear() + " / " + date.toLocaleDateString('es-MX', { month: 'long' })}</Alert>
                                        <FormControl variant="outlined" style={{ width: "100%", marginBottom: 10 }} >
                                            <InputLabel id="pm">Filtrar por parametro</InputLabel>
                                            <Select
                                                labelId="pm"
                                                value={parametro}
                                                onChange={(e) => {
                                                    setParametro(e.target.value)
                                                    if (supervisor != "") {
                                                        obtenerData(supervisor, e.target.value)
                                                    }
                                                }}
                                                label="Filtrar por parametro"
                                            >
                                                <MenuItem value="">
                                                    <em>Seleccione una opción</em>
                                                </MenuItem>
                                                {parametrosData.map((e) => (
                                                    <MenuItem key={e.id} value={e.id}>
                                                        <em>{e.nombre}</em>
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>


                                        <Autocomplete
                                            options={supervisorsData}
                                            style={{ marginBottom: 10 }}
                                            getOptionLabel={(option) => option.dni + " - " + option.names + " " + option.last_names}
                                            onChange={(event, value) => {
                                                if (value != null) {


                                                    obtenerData(value.id, parametro)
                                                } else {

                                                    obtenerData('')

                                                }

                                            }} // prints the selected value
                                            renderInput={params => (
                                                <TextField {...params} label="Filtrar por supervisor" variant="outlined" fullWidth />
                                            )}
                                        />
                                        <TextField error={error} helperText={error ? "La meta del supervisor no corresponde con la meta de los asesores" : null} id="outlined-basic" type="number" label="Meta" variant="outlined" style={{ width: '100%', marginBottom: 10 }} value={goal} onChange={(e) => setGoal(e.target.value)} />
                                        <Typography variant="body1" color="textPrimary" style={{ marginBottom: 5 }}>Generar</Typography>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <div>
                                                <Chip
                                                    icon={<RefreshIcon />}
                                                    label="Equitativo"
                                                    style={{ marginRight: 10, marginBottom: 5 }}
                                                    onClick={equitativo}

                                                />
                                            
                                                <Chip
                                                    icon={<TrendingUpIcon />}
                                                    label="Rendimiento"
                                                    style={{ marginBottom: 5 }}
                                                    onClick={generar}
                                                />
                                               
                                            </div>
                                            <Modal parametrosData={parametrosData} supervisorId={supervisor} kpiId={parametro} disabled={supervisor == ""||parametro==""||1==1} names={retornarNombre()} date={date} />
                                        </div>

                                        <Table data={data} setData={setData} />

                                    </Box>

                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}
