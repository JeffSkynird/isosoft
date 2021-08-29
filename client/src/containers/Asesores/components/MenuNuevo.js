import React, { useContext } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import es from 'date-fns/locale/es'
import ReactTable from 'react-table-v6'
import "react-table/react-table.css";
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

import { obtenerLeadsPorAsesor } from "../../../utils/API/leads.js";
import { registrarCitas, obtenerPorId, eliminarCitation, editarCitas,reagendarCita } from "../../../utils/API/citation.js";
import { obtenerGestiones, obtenerGestionesCitas, obtenerGestionNombre } from "../../../utils/API/gesitones";
import { obtenerCanales } from "../../../utils/API/recomendaciones";
import Initializer from "../../../store/Initializer";
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export default function SwipeableTemporaryDrawer(props) {
    const initializer = useContext(Initializer);
    const [open, setOpen] = React.useState('')

    const [title, setTitle] = React.useState('ejemplo')
    const [description, setDescription] = React.useState('ejemplo')
    const [observation, setObservation] = React.useState('')
    const [date, setDate] = React.useState(new Date().toISOString())

    const [lead, setLead] = React.useState('');
    const [leadData, setLeadData] = React.useState([])
    const [citationInfo, setCitationInfo] = React.useState(null)

    const [isEffective, setIsEffective] = React.useState(false)
    const [address, setAddress] = React.useState('')
    const [reagendar, setReagendar] = React.useState(false)
    const [reagendar2, setReagendar2] = React.useState(false)

    const [gestiones, setGestiones] = React.useState([])
    const [gestion, setGestion] = React.useState('')

    const [canales, setCanales] = React.useState([])
    const [data, setData] = React.useState([])
    const [gestionNombre, setGestionNombre] = React.useState(null)


    const [gestionesCitas, setGestionesCitas] = React.useState([])
    const [gestionCita, setGestionCita] = React.useState('')
    React.useEffect(() => {
        obtenerGestiones(setGestiones)

        obtenerCanales(setCanales)


    }, [])
    React.useEffect(() => {

        if (gestionNombre != null) {
            if (data.length != 0) {
                let temp = []
                data.slice().map((e) => {
                    temp.push({ ...e, gestion: gestionNombre.gestion, accion: gestionNombre.gestionCita })
                })
                setData(temp)
                setGestionNombre(null)

            }
        }

    }, [gestionNombre, data])

    const cargarGestionesCitas = (value) => {
        setGestionCita("")
        obtenerGestionesCitas(value, setGestionesCitas)
        setGestion(value)
        if(value!=1){
            setAddress("")
        }
    }

    const reagendarCitation = (id) => {
        reagendarCita({id_cita:id})
    }
    React.useEffect(() => {
        if (props.data.length != 0) {
            setLeadData(props.data)
        }
    }, [props.data])
    React.useEffect(() => {
        if (props.selected != null) {
            obtenerPorId(props.selected, setCitationInfo, initializer)

        }
    }, [props.selected])
/*     React.useEffect(() => {
        if (props.dataReagendada != null) {
            setTitle(props.dataReagendada.title)
            setDescription(props.dataReagendada.description)
            setDate(new Date(props.dataReagendada.date))
            setObservation(props.dataReagendada.observation)
            setLead(props.dataReagendada.lead_id)
            setAddress(props.dataReagendada.address)


        }
    }, [props.dataReagendada]) */
    const eliminar = () => {
        eliminarCitation(props.selected, initializer, props.cargarTodos)
        vaciarCampos()
    }
    React.useEffect(() => {
        if (citationInfo != null) {
            setTitle(citationInfo.titulo)
            setDescription(citationInfo.descripcion)
            console.log("ENTRAR")
            console.log(citationInfo.id_gestion_cita)
            setGestionCita(citationInfo.id_gestion_cita)
            setDate(new Date(citationInfo.fecha))
          //  setObservation(citationInfo.observaciones)
            setLead(citationInfo.id_lead)
            console.log(citationInfo.id_direccion)
            setAddress(citationInfo.id_direccion)
            setIsEffective(citationInfo.es_efectiva == 1 ? true : false)
            setGestion(citationInfo.id_gestion)
            if (citationInfo.id_gestion_cita != null) {
                obtenerGestionesCitas(citationInfo.id_gestion, setGestionesCitas)
                obtenerGestionNombre(citationInfo.id_gestion_cita, setGestionNombre)
            }
            let temp = []
            temp.push({ fecha: new Date(citationInfo.fecha).toLocaleString(), gestion: "", accion: "", canal: citationInfo.id_direccion, comentario: citationInfo.observaciones })


            console.log("cargando")
            console.log(temp)
            setData(temp)
            props.onOpen()
        }
    }, [citationInfo])

    const register = () => {
        registrarCitas({ id_gestion_cita: gestionCita, title: title, description, date, lead_id: lead, observation, address }, initializer, props.cargarTodos)
        if (props.dataReagendada != null) {
            props.setDataReagendada(null)
        }
        vaciarCampos()

    }

    const editar = () => {


      
        if (reagendar2) {
            registrarCitas({id_cita_reagendada:props.selected, id_gestion_cita: gestionCita, title: title, description, date, lead_id: lead, observation, address }, initializer, props.cargarTodos)
            reagendarCitation(props.selected)
            setReagendar(false)
            setReagendar2(false)
            vaciarCampos()
        }else{
            editarCitas({ id_gestion_cita: gestionCita, citation_id: props.selected, title: title, description, date, lead_id: lead, observation:observation, address, is_effective: isEffective ? 1 : 0 }, initializer, props.cargarTodos)
            vaciarCampos()
        }

    }
    const vaciarCampos = () => {
     
        setReagendar2(false)
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
    const getName = (id) => {
        let object = null
        leadData.map((e) => {
            if (id == e.id) {
                object = { ...e }
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
                    if (props.dataReagendada != null) {
                        props.setDataReagendada(null)
                    }

                }}
                onOpen={props.onOpen}
            >
                {props.selected == null ?
                    <Grid container spacing={2} style={{ padding: '10px', margin: '0px', width: 'auto' }} >
               {/*          <Grid item md={12} xs={12} style={{ alignItems: 'center', display: 'flex', justifyContent: 'flex-end' }}>

                            {
                                props.selected != null ?
                                    <div style={{ display: 'flex' }}>
                                        <Button color="secondary" style={{ display: open == true ? '' : 'none' }} onClick={eliminar}>¿Está seguro de eliminar la cita?</Button>
                                        <IconButton aria-label="delete" disabled={props.selected == null} onClick={() => setOpen(true)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </div> : null

                            }


                        </Grid> */}
                        <Grid item md={6} xs={12}>
                            <Autocomplete
                                options={leadData}
                                value={getName(lead)}
                                getOptionLabel={(option) => option.cedula + " - " + option.nombres + " " + option.apellidos}
                                onChange={(event, value) => {
                                    if (value != null) {

                                        setLead(value.id)
                                    } else {

                                        setLead('')

                                    }

                                }} // prints the selected value
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
                            <FormControl variant="outlined" style={{ width: '100%' }} >
                                <InputLabel id="demo-simple-select-outlined-label">Gestión</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={gestion}
                                    onChange={(event) => cargarGestionesCitas(event.target.value)}
                                    label="Estado"
                                >
                                    <MenuItem value="">
                                        <em>Elegir tipo</em>
                                    </MenuItem>

                                    {
                                        gestiones.map((e) => (
                                            <MenuItem value={e.id_gestion}>{e.nombre}</MenuItem>
                                        ))
                                    }

                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <FormControl variant="outlined" style={{ width: '100%' }} >
                                <InputLabel id="demo-simple-select-outlined-label">Acción</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={gestionCita}
                                    onChange={(event) => setGestionCita(event.target.value)}
                                    label="Estado"
                                >
                                    <MenuItem value="">
                                        <em>Elegir una acción</em>
                                    </MenuItem>
                                    {
                                        gestionesCitas.map((e) => (
                                            <MenuItem value={e.id_gestion_cita}>{e.nombre}</MenuItem>
                                        ))
                                    }

                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <FormControl disabled={gestion!=1} variant="outlined" style={{ width: '100%' }} >
                                <InputLabel id="demo-simple-select-outlined-label">Canales</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={address}
                                    onChange={(event) => setAddress(event.target.value)}
                                    label="Canales"
                                >
                                    <MenuItem value="">
                                        <em>Elegir un canal</em>
                                    </MenuItem>
                                    {
                                        canales.map((e) => (
                                            <MenuItem value={e.desc_canal}>{e.desc_canal}</MenuItem>
                                        ))
                                    }

                                </Select>
                            </FormControl>
                        </Grid>
                        {/*      <Grid item md={6} xs={12}>
                        <TextField
                            label="Título"
                            variant="outlined"
                            style={{ width: "100%" }}
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                        />
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <TextField
                            label="Descripción"
                            variant="outlined"
                            style={{ width: "100%" }}
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                        />
                    </Grid> */}
                        <Grid item md={3} xs={12}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}>
                                <KeyboardDatePicker
                                    autoOk
                                    ampm={false}

                                    inputVariant="outlined"
                                    label="Fecha"
                                    style={{ width: "100%" }}
                                    disablePast
                                    format="yyyy/MM/dd"
                                    value={date}

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

                                    onChange={date => setDate(date)}
                                />


                            </MuiPickersUtilsProvider>

                        </Grid>

                        <Grid item md={6} xs={12}>
                            <TextField
                                label="Comentarios"
                                variant="outlined"
                                style={{ width: "100%" }}
                                onChange={(e) => setObservation(e.target.value)}
                                value={observation}
                            />
                        </Grid>
                        {
                            citationInfo != null ?
                                <React.Fragment>

                                    <Grid item md={12} xs={12}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Typography color="textPrimary">¿Fue efectiva?</Typography>
                                            <FormControlLabel
                                                control={<Switch checked={isEffective} onChange={() => setIsEffective(!isEffective)} name="isEffective" />}
                                                label="Sí"
                                            />
                                        </div>

                                    </Grid>
                                    {!isEffective &&
                                        <Grid item md={12} xs={12}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <Typography color="textPrimary">¿Desea reangendar la cita?</Typography>
                                                <FormControlLabel
                                                    control={<Switch checked={reagendar} onChange={() => setReagendar(!reagendar)} name="isEffective" />}
                                                    label="Sí"
                                                />
                                            </div>

                                        </Grid>}

                                </React.Fragment>

                                : null
                        }

                        <Grid item md={12} xs={12}>
                            <Button startIcon={<SaveOutlinedIcon />} style={{ width: '100%' }} variant="contained" color="secondary" onClick={() => {
                                if (props.selected != null) {
                                    editar()
                                } else {
                                    register()
                                }


                            }} >
                                Guardar
                            </Button>
                        </Grid>

                    </Grid>
                    :
                    <Grid container spacing={2} style={{ padding: '10px', margin: '0px', width: 'auto' }} >
                        <Grid item md={12} xs={12} style={{ alignItems: 'center', display: 'flex', justifyContent: 'flex-start' }}>
                            <span style={{ fontWeight: 'bold' }}>{lead != "" ? getName(lead).nombres + " " + getName(lead).apellidos : null}</span>
                            <span style={{ fontWeight: 'bold', marginLeft: 10, marginRight: 10 }}> - </span>
                            <span >Reagendar Cita</span>
                        </Grid>
                        <Grid item md={12} xs={12}>

                            <ReactTable
                                columns={[

                                    {
                                        Header: () => <b style={{ display: 'block', textAlign: 'left' }}>Fecha y hora</b>,
                                        accessor: "fecha",


                                    },

                                    {
                                        Header: () => <b style={{ display: 'block', textAlign: 'left' }}>Gestión</b>,
                                        accessor: "gestion",

                                    },

                                    {
                                        Header: () => <b style={{ display: 'block', textAlign: 'left' }}>Acción</b>,
                                        accessor: "accion",


                                    },

                                    {
                                        Header: () => <b style={{ display: 'block', textAlign: 'left' }}>Canal</b>,
                                        accessor: "canal",


                                    },
                                    {
                                        Header: () => <b style={{ display: 'block', textAlign: 'left' }}>Comentario</b>,

                                        accessor: "comentario",


                                    },
                                ]}
                                style={{
                                    height: "100px",
                                    textAlign: 'left'
                                }}

                                defaultPageSize={1}
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
                        <Grid item md={12} xs={12}>
                            {
                                citationInfo != null ?
                                citationInfo.es_efectiva!=1?
                                    <React.Fragment>

                                        <Grid item md={12} xs={12}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <Typography color="textPrimary">¿Fue efectiva?</Typography>
                                                <FormControlLabel
                                                    control={<Switch checked={isEffective} onChange={() =>{
                                                        setIsEffective(!isEffective)
                                                        if((!isEffective)==true){
                                                            setReagendar2(false)
                                                        }
                                                    } } name="isEffective" />}
                                                    label="Sí"
                                                />
                                            </div>

                                        </Grid>
                                        {!isEffective &&
                                            <Grid item md={12} xs={12}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <Typography color="textPrimary">¿Desea reangendar la cita?</Typography>
                                                    <FormControlLabel
                                                        control={<Switch checked={reagendar2} onChange={() => setReagendar2(!reagendar2)} name="isEffective" />}
                                                        label="Sí"
                                                    />
                                                </div>

                                            </Grid>}

                                    </React.Fragment>
                                :
                                <Grid item md={12} xs={12}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography color="textPrimary">¿Fue efectiva?</Typography>
                                    <Typography color="textPrimary">Sí</Typography>

                                </div>

                            </Grid>
                                    : null
                            }
                        </Grid>
                    
                            {
                                reagendar2 ?
                                    <Grid container spacing={1}>
                                        <Grid item md={4} xs={12}>
                                            <FormControl variant="outlined" style={{ width: '100%' }} >
                                                <InputLabel id="demo-simple-select-outlined-label">Gestión</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-outlined-label"
                                                    id="demo-simple-select-outlined"
                                                    value={gestion}
                                                    onChange={(event) => cargarGestionesCitas(event.target.value)}
                                                    label="Estado"
                                                >
                                                    <MenuItem value="">
                                                        <em>Elegir tipo</em>
                                                    </MenuItem>

                                                    {
                                                        gestiones.map((e) => (
                                                            <MenuItem value={e.id_gestion}>{e.nombre}</MenuItem>
                                                        ))
                                                    }

                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item md={4} xs={12}>
                                            <FormControl variant="outlined" style={{ width: '100%' }} >
                                                <InputLabel id="demo-simple-select-outlined-label">Acción</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-outlined-label"
                                                    id="demo-simple-select-outlined"
                                                    value={gestionCita}
                                                    onChange={(event) => setGestionCita(event.target.value)}
                                                    label="Estado"
                                                >
                                                    <MenuItem value="">
                                                        <em>Elegir una acción</em>
                                                    </MenuItem>
                                                    {
                                                        gestionesCitas.map((e) => (
                                                            <MenuItem value={e.id_gestion_cita}>{e.nombre}</MenuItem>
                                                        ))
                                                    }

                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item md={4} xs={12}>
                                            <FormControl variant="outlined" style={{ width: '100%' }} >
                                                <InputLabel id="demo-simple-select-outlined-label">Canales</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-outlined-label"
                                                    id="demo-simple-select-outlined"
                                                    value={address}
                                                    onChange={(event) => setAddress(event.target.value)}
                                                    label="Canales"
                                                >
                                                    <MenuItem value="">
                                                        <em>Elegir un canal</em>
                                                    </MenuItem>
                                                    {
                                                        canales.map((e) => (
                                                            <MenuItem value={e.desc_canal}>{e.desc_canal}</MenuItem>
                                                        ))
                                                    }

                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item md={4} xs={12}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}>
                                <KeyboardDatePicker
                                    autoOk
                                    ampm={false}

                                    inputVariant="outlined"
                                    label="Fecha"
                                    style={{ width: "100%" }}
                                    disablePast
                                    format="yyyy/MM/dd"
                                    value={date}

                                    onChange={date => setDate(date)}
                                />


                            </MuiPickersUtilsProvider>

                        </Grid>
                        <Grid item md={4} xs={12}>
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

                                    onChange={date => setDate(date)}
                                />


                            </MuiPickersUtilsProvider>

                        </Grid>
                        <Grid item md={4} xs={12}>
                            <TextField
                                label="Comentarios"
                                variant="outlined"
                                style={{ width: "100%" }}
                                onChange={(e) => setObservation(e.target.value)}
                                value={observation}
                            />
                        </Grid>
                       
                                    </Grid>
                                    :
                                    citationInfo!=null?
                                    citationInfo.es_efectiva!=1?
                                    <Grid item md={12} xs={12}>
                                    <TextField
                                        label="Comentarios"
                                        variant="outlined"
                                        style={{ width: "100%" }}
                                        onChange={(e) => setObservation(e.target.value)}
                                        value={observation}
                                    />
                                </Grid>
                                :null
                                :null
                            }
                            {
                                citationInfo!=null?
                                        citationInfo.es_efectiva!=1?
                                        <Grid item md={12} xs={12}>
                                        <Button startIcon={<SaveOutlinedIcon />} style={{ width: '100%' }} variant="contained" color="secondary" onClick={() => {
                                            if (props.selected != null) {
                                                editar()
                                            } else {
                                                register()
                                            }
            
            
                                        }} >
                                            Guardar
                                        </Button>
                                    </Grid>
                                        :null
                                        : <Grid item md={12} xs={12}>
                                        <Button startIcon={<SaveOutlinedIcon />} style={{ width: '100%' }} variant="contained" color="secondary" onClick={() => {
                                            if (props.selected != null) {
                                                editar()
                                            } else {
                                                register()
                                            }
            
            
                                        }} >
                                            Guardar
                                        </Button>
                                    </Grid>
                            }
                
                    </Grid>
                }

            </SwipeableDrawer>


        </div>
    );
}
