import React, { useEffect, useContext,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import ResumenChart from './ResumenChart'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Box from "@material-ui/core/Box";
import Alert from '@material-ui/lab/Alert';
import Tooltip from '@material-ui/core/Tooltip';
import Select from "@material-ui/core/Select";
import AsesorChart from './AsesorChart'
import { obtenerMetasPorSupervisor,obtenerMetasPorAsesor } from '../../../utils/API/dashboard'
import Initializer from "../../../store/Initializer";
import esLocale from "date-fns/locale/es";
import DateFnsUtils from '@date-io/date-fns';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import noValue from '../../../assets/noValue.svg'
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";

import InputLabel from "@material-ui/core/InputLabel";
import {
    DatePicker,
    KeyboardDatePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import InfoIcon from '@material-ui/icons/Info';
const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

export default function FullScreenDialog(props) {
    const initializer = useContext(Initializer);

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const sumarDias = (fecha, meses) => {
        let fechaTemp = new Date(fecha.getTime());
        fechaTemp.setMonth(fechaTemp.getMonth() + meses);
        return fechaTemp;
    }
    const [initDate, setInitDate] = React.useState(sumarDias(props.date, -1));
    const [finalDate, setFinalDate] = React.useState(props.date);
    const [data, setData] = React.useState({ labels: [], values: [] });
    const [dataAsesor, setDataAsesor] = React.useState({ labels: [], values: [] });

    const [parametrosData, setParametrosData] = useState([])

    const [parametro, setParametro] = useState('')
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setData({ labels: [], values: [] })
        setDataAsesor({ labels: [], values: [] })
        setOpen(false);
    };
    useEffect(() => {
        if (open) {
            obtenerMetasPorSupervisor({ kpi_id: props.kpiId, supervisor_id: props.supervisorId, init_month: initDate.getMonth() + 1, init_year: initDate.getFullYear(), final_month: finalDate.getMonth() + 1, final_year: finalDate.getFullYear() }, setData, initializer)
            setParametrosData(props.parametrosData)
            setParametro(props.kpiId)
        }
    }, [open])
    useEffect(() => {
        if (props.date) {
            setInitDate(sumarDias(props.date, -1))
            setFinalDate(props.date)
        }
    }, [props.date])
    const cargar=()=>{
        setData({ labels: [], values: [] })
        setDataAsesor({ labels: [], values: [] })
        obtenerMetasPorSupervisor({ kpi_id: parametro, supervisor_id: props.supervisorId, init_month: initDate.getMonth() + 1, init_year: initDate.getFullYear(), final_month: finalDate.getMonth() + 1, final_year: finalDate.getFullYear() }, setData, initializer)

    }
    const obtenerDate=(date,mes)=>{
        let d = new Date(date)
        d.setMonth(mes)

        return d;
    }
    const obtenerDatosAsesor=(id)=>{
        setDataAsesor({ labels: [], values: [] })
        obtenerMetasPorAsesor({kpi_supervisor_id:id},setDataAsesor,initializer)
    }
    return (
        <div>
            <Tooltip title={props.disabled ? "Seleccione un supervisor" : ""}>
                <span>
                    <Button variant="outlined" color="secondary" disabled={props.disabled} onClick={handleClickOpen} style={{ marginBottom: 5 }} >
                        Ver resumen
</Button>
                </span>
            </Tooltip>

            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <ArrowBackIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            {sumarDias(props.date, -1).getFullYear() + " / " + sumarDias(props.date, -1).toLocaleDateString('es-MX', { month: 'long' })} AL {props.date.getFullYear() + " / " + props.date.toLocaleDateString('es-MX', { month: 'long' })}
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleClose}>
                            Cerrar
            </Button>
                    </Toolbar>
                </AppBar>
                <Box m={2}>
                    <Grid container >
                        <Grid item md={12} xs={12}>
                            <Alert severity="info" style={{ marginBottom: 10 }}>A continuación se muestra un gráfico de metas a partir del supervisor <b>{props.names}</b> y la fecha seleccionada.</Alert>
                            <FormControl variant="outlined" style={{ width: "100%", marginBottom: 10 }} >
                                            <InputLabel id="pm">Filtrar por parametro</InputLabel>
                                            <Select
                                                labelId="pm"
                                                value={parametro}
                                                onChange={(e) => {
                                                    setParametro(e.target.value)
                                                   
                                                }}
                                                label="Filtrar por parametro"
                                            >
                                              
                                                {parametrosData.map((e) => (
                                                    <MenuItem key={e.id} value={e.id}>
                                                        <em>{e.name}</em>
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                            <Grid container spacing={1} alignItems="center" style={{marginBottom:10}}>
                                <Grid item md={4} xs={6}>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>

                                        <DatePicker
                                            autoOk
                                            views={["month", "year"]}
                                            style={{width:'100%'}}
                                            variant="inline"
                                            inputVariant="outlined"
                                            label="Fecha inicial"
                                         
                                            minDate={obtenerDate(initDate,0)}
                                            maxDate={obtenerDate(initDate,11)}
                                            value={initDate}
                              
                                            onChange={date => setInitDate(date)}
                                        />
                                    </MuiPickersUtilsProvider>
                                </Grid>
                                <Grid item md={4} xs={6}>

                                    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>

                                        <DatePicker
                                            autoOk
                                            views={["month", "year"]}
                                            style={{width:'100%'}}
                                            variant="inline"
                                            inputVariant="outlined"
                                            minDate={obtenerDate(initDate,0)}
                                            maxDate={obtenerDate(initDate,11)}
                                            label="Fecha final"
                                    
                                            value={finalDate}
                                     
                                            onChange={date => setFinalDate(date)}
                                        />
                                    </MuiPickersUtilsProvider>
                                </Grid>
                                <Grid item md={4} xs={12}>

                                    <Button

                                        startIcon={<AutorenewIcon />}
                                        style={{ marginLeft: 10 }}
                                        variant="contained"
                                        color="secondary"
                                    onClick={() => cargar()}
                                    >
                                        Cargar
</Button>
                                </Grid>


                            </Grid>
<div style={{display:'flex',alignItems:'center'}}>
<Typography variant="h6" style={{marginRight: 10}}>

                                Resumen 
     
</Typography> 
<Tooltip title="Seleccione un mes del gráfico para filtrar">

<InfoIcon fontSize="small"/>
</Tooltip> 
</div>
                       
                            {
                                data.values.length != 0 ?
                                    <ResumenChart obtenerDatosAsesor={obtenerDatosAsesor} ids={data.ids} labels={data.labels} values={data.values} text="Metas por mes" />

                                    :
                                    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                                        <img src={noValue} style={{ height: 140, width: 140 }} alt="" />
                                        <p>Sin registros (Tipos de interesados)</p>
                                    </div>
                            }
                           
                               {
                                dataAsesor.values.length != 0 &&
                                <React.Fragment>
                                          <Typography variant="h6" className={classes.title}>
                                Metas por asesor
            </Typography>
                                    <AsesorChart labels={dataAsesor.labels} values={dataAsesor.values} text="Metas por mes" />

                                </React.Fragment>

                            }
                        </Grid>
                    </Grid>
                 
                </Box>


            </Dialog>
        </div>
    );
}
