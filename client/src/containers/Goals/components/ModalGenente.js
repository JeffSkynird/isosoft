import React, { useEffect, useContext,useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import {
    DatePicker,
    KeyboardDatePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import esLocale from "date-fns/locale/es";
import RefreshIcon from '@material-ui/icons/Refresh';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import Grow from '@material-ui/core/Zoom';
import Alert from '@material-ui/lab/Alert';
import TextField from "@material-ui/core/TextField";
import TableGeneral from './TableGeneral'
import Chip from '@material-ui/core/Chip';
import { obtenerTodos } from '../../../utils/API/supervisors'
import Initializer from "../../../store/Initializer";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import { obtenerTodosKpis ,obtenerMetaKpiSupervisor} from '../../../utils/API/kpis.js'

import {editarKPISupervisorGlobal,generarGlobalPerformance} from '../../../utils/API/goals'
import AssessmentIcon from '@material-ui/icons/Assessment';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Grow ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
    const initializer = useContext(Initializer);

    const [open, setOpen] = React.useState(false);
    const [date, setDate] = React.useState(new Date());
    const [goal, setGoal] = React.useState('');
    const [data, setData] = useState([])
    const [supervisor, setSupervisor] = React.useState("");
    
    const [parametrosData, setParametrosData] = useState([])

    const [parametro, setParametro] = useState('')
    const handleClickOpen = () => {
        setOpen(true);
    };
    useEffect(() => {
        if (initializer.usuario != null) {
            obtenerTodosKpis(setParametrosData, initializer);
        }
    }, [initializer.usuario])
    const handleClose = () => {
        setOpen(false);
        setGoal("")
    };
    useEffect(() => {
        if (open&&initializer.usuario!=null) {
            obtenerMetaKpiSupervisor({kpi_id:parametro!=""?parametro:0,year:date.getFullYear(),month:date.getMonth() + 1 },setData,setGoal, initializer)

        }
    }, [open,initializer.usuario])

    const onChangeParametro=(id)=>{
        if(id!=""){
            setGoal("")
            obtenerMetaKpiSupervisor({kpi_id:id,year:date.getFullYear(),month:date.getMonth() + 1 },setData,setGoal, initializer)

        }
setParametro(id)
    }
    const onChangeDate=(mes)=>{
    

        setDate(mes)
        if(parametro!=""){
            setGoal("")
            obtenerMetaKpiSupervisor({kpi_id:parametro,year:mes.getFullYear(),month:mes.getMonth() + 1 },setData,setGoal, initializer)

        }

    }
    const edit=()=>{
        editarKPISupervisorGlobal({data:data,kpi_id:parametro,year:date.getFullYear(),month:date.getMonth() + 1 },initializer)
        props.resetear()
        handleClose()
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
    const sumarDias = (fecha, meses) => {
        let fechaTemp = new Date(fecha.getTime());
        fechaTemp.setMonth(fechaTemp.getMonth() + meses);
        return fechaTemp;
    }
    const generar = () => {
        if ( parametro != "" && goal > 0) {
            let previusDate = sumarDias(date, -1);
            generarGlobalPerformance({  kpi_id: parametro, global_goal: goal, previus_year: previusDate.getFullYear(), previus_month: previusDate.getMonth() + 1 }, setData, initializer)
        }
    }
    return (
        <React.Fragment>
            {
                props.short ?
                    <Tooltip title="Meta global">
                        <IconButton aria-label="Meta global" onClick={handleClickOpen}>
                            <AssessmentIcon />
                        </IconButton>
                    </Tooltip>
                    :
                    <Button startIcon={<AssessmentIcon />} variant="outlined" color="secondary" onClick={handleClickOpen}>
                        Configurar meta global
            </Button>
            }

            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{"Configuración de la Meta global"}</DialogTitle>
                <DialogContent>
                    <Alert severity="info" style={{ marginBottom: 10 }}>Establezca la meta global que se distribuirá entre los supervisores</Alert>

                    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>

                        <DatePicker
                            autoOk
                            style={{ width: '100%' }}
                            views={["year", "month"]}

                            inputVariant="outlined"
                            label="Seleccione un mes"
                            value={date}

                            variant="dialog"
                            onChange={mes => {
                                onChangeDate(mes)

                            }}
                            InputAdornmentProps={{ position: "start" }}

                        />
                    </MuiPickersUtilsProvider>
                    <FormControl variant="outlined" style={{ width: "100%", marginTop: 10 }} >
                        <InputLabel id="pm">Filtrar por parametro</InputLabel>
                        <Select
                            labelId="pm"
                            value={parametro}
                            onChange={(e) => {
                                onChangeParametro(e.target.value)
                               
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
                    <TextField id="outlined-basic" type="number" label="Meta" variant="outlined" style={{ width: '100%', marginTop: 10 }} value={goal} onChange={(e) => setGoal(e.target.value)} />

                    <div style={{ marginTop: 10, marginBottom: 10 }}>
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
                    <TableGeneral data={data} setData={setData}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="default">
                        Cerrar
          </Button>
                    <Button onClick={edit} color="secondary">
                        Guardar
          </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
