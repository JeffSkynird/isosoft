import React from 'react';
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
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Grid } from '@material-ui/core';
import Initializer from '../../../store/Initializer'
import TextField from '@material-ui/core/TextField';

import { obtenerTodos } from '../../../utils/API/sistemas';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import add from '../../../assets/add.png'
import Evaluar from './Evaluar';
import { evaluar, obtenerPool } from '../../../utils/API/evaluaciones';
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
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog(props) {
    const classes = useStyles();
    const initializer = React.useContext(Initializer);
    const [nombre, setNombre] = React.useState("")

    const [descripcion, setDescripcion] = React.useState("")
    const [tab, setTab] = React.useState(0)
    const [sistemas, setSistemas] = React.useState([])
    const [sistema, setSistema] = React.useState('')
    const [evalu,setEvalu]=React.useState([])

    const [datos,setDatos]=React.useState(null)
    
    React.useEffect(() => {
        if (initializer.usuario != null) {
            obtenerTodos(setSistemas, initializer)
        }
    }, [initializer.usuario])
    const empezar = () => {
        setTab(1)
     
    };
    React.useEffect(() => {
        if (props.sistema != null) {
            setNombre(props.sistema.name)
            setSistema(props.sistema.id_system)
            setDescripcion(props.sistema.descripcion)
            obtenerPool(props.sistema.id,setDatos, initializer)
        }
    }, [props.sistema])
    const actualizarEval=(ev)=>{
        setEvalu(ev)
    }
    const guardar=()=>{
        if(datos==null){
            evaluar({ name:nombre,
                system:sistema,
                description:descripcion,
                evaluations:evalu
            },initializer)
        }
        
        setEvalu([])
        setNombre("")
        setDescripcion("")
        setTab(0)
        props.setOpen(false)
        props.carga()
        setDatos(null)
    }
    const close =()=>{
        setEvalu([])
        setNombre("")
        setDescripcion("")
        setTab(0)
        props.setOpen(false)
        props.carga()
        setDatos(null)
    }
    return (


        <Dialog fullScreen open={props.open} onClose={() =>close() } TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={() => close()} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        {props.sistema!=null?"Editar evaluación":"Nueva evaluación"}
                    </Typography>
                    <Button disabled={evalu.length==0} autoFocus color="inherit" onClick={guardar}>
                        {props.sistema!=null?"Cerrar":"Guardar"}
                    </Button>
                </Toolbar>
            </AppBar>
            {
                tab == 0 ?
                    <Grid container style={{ padding: 10, marginTop: 10 }}>
                        <Grid item xs={12} md={12} style={{ display: 'flex' }}>
                            <FormControl style={{ width: '100%', marginRight: 10 }} variant="outlined" size="small" className={classes.formControl}>
                                <InputLabel id="demo-simple-select-outlined-label">Seleccione un sistema</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={sistema}
                                    onChange={(e) => setSistema(e.target.value)}
                                    label="Seleccione un sistema"
                                >
                                    <MenuItem value="">
                                        <em>Seleccione una opción</em>
                                    </MenuItem>
                                    {
                                        sistemas.map((e) => (
                                            <MenuItem value={e.id}>
                                                <em>{e.name}</em>
                                            </MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                            <Button disabled={sistema == ""||nombre==""||descripcion==""} onClick={() => empezar()} startIcon={<ExitToAppIcon />} variant="contained" size="small" color="primary">
                                Empezar
                            </Button>
                        </Grid>
                        <Grid item xs={12} style={{ marginTop: 10 }}>
                            <TextField
                                variant="outlined"
                                style={{ marginBottom: 10, width: '100%' }}
                                size="small"
                                label="Nombre"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}

                            /></Grid>
                        <Grid item xs={12} >
                            <TextField
                                variant="outlined"
                                style={{ marginBottom: 10, width: '100%' }}
                                size="small"
                                label="Descripción"
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}

                            /></Grid>
                        <Grid md={12} xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
                            <img src={add} style={{ height: 300, width: 300 }} alt="" srcset="" />
                        </Grid>
                    </Grid>
                    :
                     <Evaluar datos={datos} actualizarEval={actualizarEval}/>
            }


        </Dialog>

    );
}
