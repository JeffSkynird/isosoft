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

import { obtenerRecomendaciones } from "../../utils/API/recomendaciones";
import { obtenerTodasTipoCasas } from "../../utils/API/tipoCasas";
import { obtenerTodos } from "../../utils/API/tipoPlantas";



import { editarVilla,uploadFiles } from "../../utils/API/villas";
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import Initializer from '../../store/Initializer'

export default function Editar(props) {
    const initializer = useContext(Initializer);

    const dato = props.location.state;
    const edicion = props.location.pathname == "/villas/editar" ? true : false;

    const [proyecto, setProyecto] = useState("");
    const [urbanizacion, setUrbanizacion] = useState("");
    const [nombre, setNombre] = useState("");
    const [tipoCasaData, setTipoCasaData] = useState([]);
    const [tipoCasa, setTipoCasa] = useState("");
    const [plantaCasaData, setPlantaCasaData] = useState([]);
    const [plantaCasa, setPlantaCasa] = useState("");
    const [metros, setMetros] = useState(0);
    const [comedor, setComedor] = useState(0);
    const [sala, setSala] = useState(0);
    const [cocina, setCocina] = useState(0);
    const [baño, setBaño] = useState(0);
    const [lavanderia, setLavanderia] = useState(0);
    const [patioTrasero, setPatioTrasero] = useState(0);
    const [jardinDelantero, setJardinDelantero] = useState(0);
    const [jardinTrasero, setJardinTrasero] = useState(0);
    const [estacionamiento, setEstacionamiento] = useState(0);
    const [precio, setPrecio] = useState(0);
    const [entrada, setEntrada] = useState(0);
    const [financiamiento, setFinanciamiento] = useState(0);
    const [meses, setMeses] = useState(0);

    const [externalFiles, setExternalFiles] = useState(null);
    const [internalFile, setInternalFile] = useState(null);

    useEffect(() => {

        if (edicion) {
            if (dato != null) {
                setProyecto(dato.proyect);
                setUrbanizacion(dato.urbanization);
                setNombre(dato.name);
                setTipoCasa(dato.housing_type_id);
                setPlantaCasa(dato.housing_plants_id);
                setMetros(dato.house_metters);
                setSala(dato.dining_room);
                setCocina(dato.kitchen_room);
                setBaño(dato.bath_room);
                setLavanderia(dato.laundry);
                setPatioTrasero(dato.backyards);
                setJardinDelantero(dato.front_garden);
                setJardinTrasero(dato.back_garden);
                setEstacionamiento(dato.parking);

                setPrecio(dato.price);
                setEntrada(dato.entry);
                setFinanciamiento(dato.financing);
                setMeses(dato.financing_months);


            }

        }
    }, []);
    React.useEffect(() => {

        if (initializer.usuario != null) {
            obtenerTodos(setPlantaCasaData, initializer);
            obtenerTodasTipoCasas(setTipoCasaData, initializer)
        }




    }, [initializer.usuario])

    if (props.location.state == null) {
        props.history.push("/villas")
        return null
    }
    
    const editar = () => {
        editarVilla({
            village_id:dato.id,
            proyect:proyecto,
            urbanization:urbanizacion,
            name:nombre,
            housing_type_id:tipoCasa,
            housing_plants_id:plantaCasa,
            house_metters:metros,
            dining_room:comedor,
            living_room:sala,
            kitchen_room:cocina,
            bath_room:baño,
            laundry:lavanderia,
            backyards:patioTrasero,
            front_garden:jardinDelantero,
            back_garden:jardinTrasero,
            parking:estacionamiento,
            entry:entrada,
            price:precio,

            financing:financiamiento,
            financing_months:meses,
            
        }, initializer); 
        subirArchivos();

    }

    function subirArchivos() {
        uploadFiles({internal_file:internalFile,external_files:externalFiles,village_id:dato.id},initializer)
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
                    Productos
        </Link>
                <Typography color="textPrimary">Editar</Typography>
            </Breadcrumbs>
            <Box mb={2} mt={1}>
                <Typography variant="h6" component="h6">
                    {edicion ? "Editar producto" : "Crear producto"}
                </Typography>
            </Box>

            <Card>

                <CardContent>
                    <form noValidate autoComplete="off">
                        <Grid container spacing={3}>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    label="Proyecto"
                                    variant="outlined"
                                    style={{ width: "100%" }}
                                    onChange={(e) => setProyecto(e.target.value)}
                                    value={proyecto}
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    label="Urbanización"
                                    variant="outlined"
                                    style={{ width: "100%" }}
                                    onChange={(e) => setUrbanizacion(e.target.value)}
                                    value={urbanizacion}
                                />
                            </Grid>
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
                                <TextField
                                    label="Metros"
                                    variant="outlined"
                                    style={{ width: "100%" }}
                                    onChange={(e) => {
                                        
                                        const amount = e.target.value;
                                        if (
                                            !amount ||
                                            amount.match(/^\d{1,}(\.\d{0,4})?$/)
                                        ) {
                                           
                                            setMetros(e.target.value)
                                        }
                                    }}
                                    value={metros}
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <FormControl variant="outlined" style={{ width: "100%" }}>
                                    <InputLabel id="label2">Plantas</InputLabel>
                                    <Select
                                        labelId="label2"
                                        value={plantaCasa}
                                        onChange={(e) => setPlantaCasa(e.target.value)}
                                        label="ciu2"
                                    >
                                        <MenuItem value="">
                                            <em>Seleccione una opción</em>
                                        </MenuItem>
                                        {plantaCasaData.map((e) => (
                                            <MenuItem key={e.id} value={e.id}>
                                                <em>{e.name}</em>
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item md={6} xs={12}>

                                <FormControl variant="outlined" style={{ width: "100%" }}>
                                    <InputLabel id="label">Tipo de casa</InputLabel>
                                    <Select
                                        labelId="label"
                                        value={tipoCasa}
                                        onChange={(e) => setTipoCasa(e.target.value)}
                                        label="ciu"
                                    >
                                        <MenuItem value="">
                                            <em>Seleccione una tipo de casa</em>
                                        </MenuItem>
                                        {tipoCasaData.map((e) => (
                                            <MenuItem key={e.id} value={e.id}>
                                                <em>{e.name}</em>
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid container spacing={1} item md={12} xs={12}>
                                <Grid item md={3} xs={12}>
                                    <TextField
                                        label="Comedor"
                                        variant="outlined"
                                        style={{ width: "100%" }}
                                        onChange={(e) => {
                                            
                                            const re = /^[0-9\b]+$/;

                                            if (e.target.value === '' || re.test(e.target.value)) {
                                                setComedor(e.target.value)
                                            }
                                        }}
                                        value={comedor}
                                    />
                                </Grid>
                                <Grid item md={3} xs={12}>
                                    <TextField
                                        label="Sala"
                                        variant="outlined"
                                        style={{ width: "100%" }}
                                        onChange={(e) => {
                                            
                                            const re = /^[0-9\b]+$/;

                                            if (e.target.value === '' || re.test(e.target.value)) {
                                                setSala(e.target.value)
                                            }
                                        }}
                                        value={sala}
                                    />
                                </Grid>
                                <Grid item md={3} xs={12}>
                                    <TextField
                                        label="Cocina"
                                        variant="outlined"
                                        style={{ width: "100%" }}
                                        onChange={(e) => {
                                            
                                            const re = /^[0-9\b]+$/;

                                            if (e.target.value === '' || re.test(e.target.value)) {
                                                setCocina(e.target.value)
                                            }
                                        }}
                                        value={cocina}
                                    />
                                </Grid>
                                <Grid item md={3} xs={12}>
                                    <TextField
                                        label="Baño"
                                        variant="outlined"
                                        style={{ width: "100%" }}
                                        onChange={(e) => {
                                            
                                            const re = /^[0-9\b]+$/;

                                            if (e.target.value === '' || re.test(e.target.value)) {
                                                setBaño(e.target.value)
                                            }
                                        }}
                                        value={baño}
                                    />
                                </Grid>

                            </Grid>
                            <Grid container spacing={1} item md={12} xs={12}>
                                <Grid item md={3} xs={12}>
                                    <TextField
                                        label="Lavandería"
                                        variant="outlined"
                                        style={{ width: "100%" }}
                                        onChange={(e) => {
                                            
                                            const re = /^[0-9\b]+$/;

                                            if (e.target.value === '' || re.test(e.target.value)) {
                                                setLavanderia(e.target.value)
                                            }
                                        }}
                                        value={lavanderia}
                                    />
                                </Grid>
                                <Grid item md={3} xs={12}>

                                    <TextField
                                        label="Patio trasero"
                                        variant="outlined"
                                        style={{ width: "100%" }}
                                        onChange={(e) => {
                                            
                                            const re = /^[0-9\b]+$/;

                                            if (e.target.value === '' || re.test(e.target.value)) {
                                                setPatioTrasero(e.target.value)
                                            }
                                        }}
                                        value={patioTrasero}
                                    />
                                </Grid>
                                <Grid item md={3} xs={12}>

                                    <TextField
                                        label="Jardín Delantero"
                                        variant="outlined"
                                        style={{ width: "100%" }}
                                        onChange={(e) => {
                                            
                                            const re = /^[0-9\b]+$/;

                                            if (e.target.value === '' || re.test(e.target.value)) {
                                                setJardinDelantero(e.target.value)
                                            }
                                        }}
                                        value={jardinDelantero}
                                    />
                                </Grid>
                                <Grid item md={3} xs={12}>

                                    <TextField
                                        label="Jardin Trasero"
                                        variant="outlined"
                                        style={{ width: "100%" }}
                                        onChange={(e) => {
                                            
                                            const re = /^[0-9\b]+$/;

                                            if (e.target.value === '' || re.test(e.target.value)) {
                                                setJardinTrasero(e.target.value)
                                            }
                                        }}
                                        value={jardinTrasero}
                                    />
                                </Grid>

                            </Grid>
                            <Grid item md={6} xs={12}>

                                <TextField
                                    label="Estacionamiento"
                                    variant="outlined"
                                    style={{ width: "100%" }}
                                    onChange={(e) => 
                                        {
                                            const re = /^[0-9\b]+$/;

                                            if (e.target.value === '' || re.test(e.target.value)) {
                                                setEstacionamiento(e.target.value)
                                            }   
                                    }}
                                    value={estacionamiento}
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    label="Precio"
                                    variant="outlined"
                                    style={{ width: "100%" }}
                                    onChange={(e) => {
                                        
                                        const amount = e.target.value;
                                        if (
                                            !amount ||
                                            amount.match(/^\d{1,}(\.\d{0,4})?$/)
                                        ) {
                                           
                                            setPrecio(e.target.value)
                                        }
                                    }}
                                    value={precio}
                                />
                            </Grid>
                          
                            <Grid item md={6} xs={12}>
                                <TextField
                                    label="Entrada"
                                    variant="outlined"
                                    style={{ width: "100%" }}
                                    onChange={(e) => {
                                        
                                        const amount = e.target.value;
                                        if (
                                            !amount ||
                                            amount.match(/^\d{1,}(\.\d{0,4})?$/)
                                        ) {
                                           
                                            setEntrada(e.target.value)
                                        }
                                    }}
                                    value={entrada}
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    label="Financiamiento"
                                    variant="outlined"
                                    style={{ width: "100%" }}
                                    onChange={(e) => {
                                        
                                        const amount = e.target.value;
                                        if (
                                            !amount ||
                                            amount.match(/^\d{1,}(\.\d{0,4})?$/)
                                        ) {
                                           
                                            setFinanciamiento(e.target.value)
                                        }
                                    }}
                                    value={financiamiento}
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    label="Meses de financiamiento"
                                    variant="outlined"
                                    style={{ width: "100%" }}
                                    onChange={(e) => {
                                        
                                        const re = /^[0-9\b]+$/;

                                        if (e.target.value === '' || re.test(e.target.value)) {
                                            setMeses(e.target.value)
                                        }
                                    }}
                                    value={meses}
                                />
                            </Grid>
                            <Grid container item md={6} xs={12}>
                                <div style={{ marginRight: '5px' }}>
                                    <input
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        id="externalFile"
                                        accept="image/png"
                                        multiple
                                        type="file"
                                        onChange={(e) => setExternalFiles(e.target.files)

                                        }

                                    />
                                    <label htmlFor="externalFile">
                                        <Button variant="contained" color="primary" component="span">
                                            Fotos externas {externalFiles != null ? "(Archivos cargados)" : ""}
                                        </Button>
                                    </label>
                                </div>
                                <div style={{ marginRight: '5px' }}>
                                    <input
                                        accept="image/*"
                                        style={{ display: 'none', marginRight: '5px' }}
                                        id="internalFiles"

                                        type="file"
                                        accept="image/png"
                                        onChange={(e) => setInternalFile(e.target.files[0])
                                        }

                                    />
                                    <label htmlFor="internalFiles">
                                        <Button variant="contained" color="primary" component="span">
                                            Foto interna  {internalFile != null ? "(" + internalFile.name + ")" : ""}
                                        </Button>
                                    </label>
                                </div>

                            </Grid>


                        </Grid>
                    </form>
                </CardContent>
                <CardActions>
                    <Button startIcon={<SaveOutlinedIcon />} variant="contained" color="secondary" onClick={() => editar()}>
                        Guardar
                    </Button>
                </CardActions>
            </Card>
        </Box >
    );
}
