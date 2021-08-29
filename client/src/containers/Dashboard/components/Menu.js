import React, { useContext } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Slide from '@material-ui/core/Slide';
import {
    DatePicker,
    KeyboardDateTimePicker,
    KeyboardDatePicker,
    KeyboardTimePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { obtenerLeadsPorAsesorId } from "../../../utils/API/leads.js";
import { registrarCitas, obtenerPorId, eliminarCitation, editarCitas } from "../../../utils/API/citation.js";
import Initializer from "../../../store/Initializer";
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export default function SwipeableTemporaryDrawer(props) {
    const initializer = useContext(Initializer);
    const [open, setOpen] = React.useState('')

    const [title, setTitle] = React.useState('')
    const [description, setDescription] = React.useState('')
    const [observation, setObservation] = React.useState('')
    const [date, setDate] = React.useState(new Date().toISOString())

    const [lead, setLead] = React.useState('');
    const [leadData, setLeadData] = React.useState([])
    const [citationInfo, setCitationInfo] = React.useState(null)
    const [leadClientsData, setLeadClientsData] = React.useState([]);

    const [isEffective, setIsEffective] = React.useState(false)
    const [address, setAddress] = React.useState('')
    const [reagendar, setReagendar] = React.useState(false)

   
    React.useEffect(() => {
        if (leadClientsData.length != 0) {
            setLeadData(leadClientsData)
        }
    }, [leadClientsData])
    React.useEffect(() => {
        if (props.selected != null) {
            obtenerPorId(props.selected, setCitationInfo, initializer)
            obtenerLeadsPorAsesorId(props.asesor,setLeadClientsData, initializer);
        }
    }, [props.selected])
    React.useEffect(() => {
        if (props.dataReagendada != null) {
            setTitle(props.dataReagendada.title)
            setDescription(props.dataReagendada.description)
            setDate(new Date(props.dataReagendada.date))
            setObservation(props.dataReagendada.observation)
            setLead(props.dataReagendada.lead_id)
            setAddress(props.dataReagendada.address)

        }
    }, [props.dataReagendada])
    const eliminar = () => {
        eliminarCitation(props.selected, initializer, props.cargarTodos)
        vaciarCampos()
    }
    React.useEffect(() => {
        if (citationInfo != null) {
            setTitle(citationInfo.titulo)
            setDescription(citationInfo.descripcion)
            setDate(new Date(citationInfo.fecha))
            setObservation(citationInfo.observaciones)
            setLead(citationInfo.id_lead)
            setAddress(citationInfo.id_direccion)
            setIsEffective(citationInfo.es_efectiva == 1 ? true : false)
            props.onOpen()
        }
    }, [citationInfo])

    const register = () => {
        registrarCitas({ title: title, description, date, lead_id: lead, observation, address }, initializer, props.cargarTodos)
        if(props.dataReagendada!=null){
            props.setDataReagendada(null)
        }
        vaciarCampos()
      
    }

    const editar = () => {


        editarCitas({ citation_id: props.selected, title: title, description, date, lead_id: lead, observation, address, is_effective: isEffective ? 1 : 0 }, initializer, props.cargarTodos)
        vaciarCampos()
        if(reagendar){
            props.angendarNuevo({title:title+ " reagendada",description,date,lead_id:lead,observation,address})
            setReagendar(false)
        }
     
    }
    const vaciarCampos = () => {
        setTitle("")
        setDescription("")
        setObservation("")
        setDate(new Date())
        setLead("")
        setCitationInfo(null)
        setIsEffective(false)
        setAddress("")
        setOpen(false)
        props.select(null)

        props.onClose()
    }
    const vaciar = () => {
        setTitle("")
        setDescription("")
        setObservation("")
        setDate(new Date())
        setLead("")
        setOpen(false)

        props.select(null)
        props.cargarTodos()
        props.onClose()
    }
    const getName=(id)=>{
        let object = null
        leadData.map((e)=>{
            if(id==e.id){
                object = {...e}
            }
        })
        return object
    }
    return (
        <div style={{ width: 'auto' }}>


            <SwipeableDrawer
                anchor={'bottom'}
                open={props.open}
                onClose={() => {

                    vaciarCampos()
                    props.onClose()
                    if(props.dataReagendada!=null){
                        props.setDataReagendada(null)
                    }

                }}
                onOpen={props.onOpen}
            >

                <Grid container spacing={2} style={{ padding: '10px', margin: '0px', width: 'auto' }} >
                    <Grid item md={12} xs={12} style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}>

                        <Typography color="textPrimary">Ver cita</Typography>
                      

                    </Grid>
                    <Grid item md={6} xs={12}>
                        <Autocomplete
                        disabled={true}
                            options={leadData}
                            value={getName(lead)}
                            getOptionLabel={(option) => option.cedula + " - " + option.nombres + " " + option.apellidos}
                         
                            renderInput={params => (
                                <TextField {...params} label="Filtrar por interesado" variant="outlined" fullWidth />
                            )}
                        />
                       {/*  <FormControl variant="outlined" style={{ width: "100%" }}>
                            <InputLabel id="label">Cliente</InputLabel>
                            <Select
                                labelId="label"
                                value={lead}
                                onChange={(e) => setLead(e.target.value)}
                                label="ciu"
                            >
                                <MenuItem value="">
                                    <em>Seleccione un cliente</em>
                                </MenuItem>
                                {leadData.map((e) => (
                                    <MenuItem key={e.id} value={e.id}>
                                        <em>{e.names + " " + e.last_names}</em>
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl> */}
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <TextField
                            label="Título"
                  
                            variant="outlined"
                            style={{ width: "100%" }}
                           
                            value={title}
                        />
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <TextField
                            label="Descripción"
                   
                            variant="outlined"
                            style={{ width: "100%" }}
                            
                            value={description}
                        />
                    </Grid>
                    <Grid item md={3} xs={12}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                autoOk
                                ampm={false}
                              
                                inputVariant="outlined"
                                label="Fecha"
                                style={{ width: "100%" }}
                                // disablePast
                                format="yyyy/MM/dd"
                                value={date}
                            disabled={true}
                                onChange={date => setDate(date)}
                            />


                        </MuiPickersUtilsProvider>

                    </Grid>
                    <Grid item md={3} xs={12}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardTimePicker
                                autoOk
                                ampm={false}
                         
                                inputVariant="outlined"
                                label="Hora"
                                style={{ width: "100%" }}
                                // disablePast
                                format="HH:mm"
                                value={date}
                                disabled={true}
                                onChange={date => setDate(date)}
                            />


                        </MuiPickersUtilsProvider>

                    </Grid>
                    <Grid item md={6} xs={12}>
                        <TextField
                            label="Dirección"
                  
                            variant="outlined"
                            style={{ width: "100%" }}
                           
                            value={address}
                        />
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <TextField
                            label="Observación"
                            variant="outlined"
                     
                            style={{ width: "100%" }}
                           
                            value={observation}
                        />
                    </Grid>
                    {
                        citationInfo != null ?
                        <React.Fragment>
                               
                            <Grid item md={12} xs={12}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography color="textPrimary">¿Fue efectiva? (entrevista)?</Typography>
                                    <FormControlLabel
                                   
                                        control={<Switch checked={isEffective} name="isEffective" />}
                                        label="Sí"
                                    />
                                </div>

                            </Grid>
                          
                     
                           </React.Fragment>
                           
                            : null
                    }
                    
                    <Grid item md={12} xs={12}>
                        <Button startIcon={<SaveOutlinedIcon />} style={{ width: '100%' }} variant="contained" color="secondary" onClick={() => { vaciarCampos()
                    props.onClose()
                    if(props.dataReagendada!=null){
                        props.setDataReagendada(null)
                    }}} >
                            Cerrar
                    </Button>
                    </Grid>

                </Grid>
            </SwipeableDrawer>


        </div>
    );
}
