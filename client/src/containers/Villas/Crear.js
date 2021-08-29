import React, { useState, useEffect, useContext } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { convertirDate, dateFormat } from "../../utils/Date";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import AddIcon from '@material-ui/icons/Add';
import { obtenerRecomendaciones } from "../../utils/API/recomendaciones";
import { obtenerTodasTipoCasas } from "../../utils/API/tipoCasas";
import { obtenerTodos } from "../../utils/API/tipoPlantas";
import CancelIcon from '@material-ui/icons/Cancel';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Input from '@material-ui/core/Input';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { registerVillage, uploadFiles } from "../../utils/API/villas";
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import Initializer from '../../store/Initializer'

export default function Editar(props) {
    const initializer = useContext(Initializer);
    const [nombre, setNombre] = useState("");
    const [proyectData, setProyectData] = useState([]);
    const [proyect, setProyect] = useState("");
    const [ground, setGround] = useState("");
    const [building, setBuilding] = useState("");
    const [sheet, setSheet] = useState(null);
    const [url, setUrl] = useState("");
    const [nameDetail, setNameDetail] = useState("");
    const [quantityDetail, setQuantityDetail] = useState("");

    const [images, setImages] = useState([]);
    const [urls, setUrls] = useState([]);
    const [details, setDetails] = useState([]);
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };
    const removeItem = (index) => {
        let temp = urls.filter((e, i) => i != index)
        let temp2 = images.filter((e, i) => i != index)
        setUrls(temp)
        setImages(temp2)
    }

    const removeDetail = (index) => {
        let temp = details.filter((e, i) => i != index)
        setDetails(temp)

    }
    const guardar = () => {
       initializer.mostrarNotificacion({ type: "success", message: "Guardado exitoso"});
       props.history.goBack()
    }
    const add = () => {
        if(nameDetail!=""&&quantityDetail!=""){
            let temp = details.slice()
            temp.push({ name: nameDetail, quantity: quantityDetail })
            setDetails(temp)
    
            setNameDetail("")
            setQuantityDetail("")
            setState({...state,['bottom']:false})
        }
     
    }
    return (
        <Box mt={2} ml={2} mr={2}>
            <Breadcrumbs
                separator={<NavigateNextIcon fontSize="small" />}
                aria-label="breadcrumb"
            >
                <Link color="inherit" onClick={() => props.history.push("dashboard")}>
                    Dashboard
        </Link>
                <Link color="inherit" onClick={() => props.history.push("/villas")}>
                Villas
        </Link>
                <Typography color="textPrimary">Crear</Typography>
            </Breadcrumbs>
            <Box mb={2} mt={1}>
                <Typography variant="h6" component="h6">
                    Crear villa
                </Typography>
            </Box>

            <Card>

                <CardContent>
                    <Grid container spacing={1}>
                        <Grid item md={6} xs={12}>
                            <TextField
                                label="Nombre"
                                variant="outlined"
                                style={{ width: "100%" }}
                                onChange={(e) => setNombre(e.target.value)}
                                value={nombre}
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <FormControl variant="outlined" style={{ width: "100%" }}>
                                <InputLabel id="label">Proyecto</InputLabel>
                                <Select
                                    labelId="label"
                                    value={proyect}
                                    onChange={(e) => setProyect(e.target.value)}
                                    label="Proyecto"
                                >
                                    <MenuItem value="">
                                        <em>Seleccione un proyecto</em>
                                    </MenuItem>
                                    {proyectData.map((e) => (
                                        <MenuItem key={e.id} value={e.id}>
                                            <em>{e.name}</em>
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField
                                label="Terreno"
                                variant="outlined"
                                type="number"
                                style={{ width: "100%" }}
                                onChange={(e) => setGround(e.target.value)}
                                value={ground}
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField
                                label="Construcción"
                                type="number"
                                variant="outlined"
                                style={{ width: "100%" }}
                                onChange={(e) => setBuilding(e.target.value)}
                                value={building}
                            />
                        </Grid>
                        <Grid item md={12} xs={12}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', }}>

                                <Typography >
                                    Hoja técnica
                                </Typography>
                                {
                                    url != "" ?


                                        <div>

                                            <IconButton onClick={() => {
                                                window.open(url, '_blank').focus();
                                            }} aria-label="delete" >
                                                <VisibilityOutlinedIcon />
                                            </IconButton>
                                            <IconButton onClick={() => {
                                                setUrl("")
                                                setSheet(null)
                                            }} aria-label="delete" >
                                                <CancelIcon />
                                            </IconButton>


                                        </div>


                                        : <div>


                                            <input
                                                accept="application/pdf"
                                                style={{ display: "none" }}
                                                id="sheet"
                                                type="file"

                                                onChange={(e) => {
                                                    if (e.target.files[0] != null) {
                                                        setSheet(e.target.files[0])
                                                        setUrl(URL.createObjectURL(e.target.files[0]))
                                                    }


                                                }}
                                            />
                                            <label htmlFor="sheet">
                                                <IconButton edge="end" aria-label="delete" component="span" color="secondary">
                                                    <AddIcon />
                                                </IconButton>
                                            </label>
                                        </div>
                                }

                            </div>

                        </Grid>
                        <Grid item md={12} xs={12}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', }}>

                                <Typography >
                                    Imágenes
                                </Typography>
                                <input
                                    accept="image/*"
                                    style={{ display: "none" }}
                                    id="imagen"
                                    type="file"

                                    onChange={(e) => {
                                        if (e.target.files[0] != null) {
                                            let temp = images.slice()
                                            let temp2 = urls.slice()
                                            temp.push(e.target.files[0])
                                            temp2.push(URL.createObjectURL(e.target.files[0]))
                                            setImages(temp)
                                            setUrls(temp2)
                                        }


                                    }}
                                />
                                <label htmlFor="imagen">

                                    <IconButton edge="end" aria-label="delete" component="span" color="secondary">
                                        <AddIcon />
                                    </IconButton>
                                </label>

                            </div>

                        </Grid>
                        <Grid item md={12} xs={12}>
                            <div style={{ flexWrap: 'wrap' }}>
                                {
                                    urls.map((e, i) => (
                                        <img style={{ height: 100, width: 100, objectFit: 'contain', marginRight: 10 }} src={e} onClick={() => removeItem(i)} />
                                    ))
                                }
                            </div>

                        </Grid>
                        <Grid item md={12} xs={12}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', }}>

                                <Typography >
                                    Detalle
                                </Typography>

                                <IconButton onClick={toggleDrawer('bottom', true)} edge="end" aria-label="delete" component="span" color="secondary">
                                    <AddIcon />
                                </IconButton>
                            </div>
                        </Grid>
                        <Grid item md={12} xs={12}>
                            <List component="nav" aria-label="main mailbox folders">
                                {
                                    details.map((e, i) => (
                                        <ListItem button>

                                            <ListItemText primary={e.name+" - "+e.quantity} />


                                            <ListItemSecondaryAction>
                                                <IconButton onClick={() => removeDetail(i)} edge="end" aria-label="delete" color="secondary">
                                                    <DeleteOutlineIcon />
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    ))
                                }


                            </List>

                        </Grid>
                    </Grid>

                </CardContent>
                <CardActions>
                    <Button startIcon={<SaveOutlinedIcon />} variant="contained" color="secondary" onClick={guardar}>
                        Guardar
                    </Button>
                </CardActions>
            </Card>
            <SwipeableDrawer
                anchor={'bottom'}
                open={state['bottom']}
                onClose={toggleDrawer('bottom', false)}
                onOpen={toggleDrawer('bottom', true)}
            >

                <Grid container style={{ padding: 10 }}>
                <Typography style={{marginBottom:10}} variant="h6" component="h6" >
                                    Agregar detalle
                                </Typography>
                    <Grid item md={12} xs={12} style={{ display: 'flex', justifyContent: 'space-between' }}>
                        
                        <div>
                            <TextField label="Nombre" style={{marginRight:10}} variant="outlined" value={nameDetail} onChange={(e) => setNameDetail(e.target.value)} />
                            <TextField label="Cantidad" variant="outlined" value={quantityDetail} onChange={(e) => setQuantityDetail(e.target.value)} type="number" />
                        </div>

                        <Button startIcon={<SaveOutlinedIcon />} variant="contained" color="secondary" onClick={() => add()}>
                            Agregar
                    </Button>
                    </Grid>




                </Grid>
            </SwipeableDrawer>
        </Box >
    );
}
