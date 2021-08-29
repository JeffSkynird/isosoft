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
import { obtenerTodos } from "../../utils/API/ciudades";
import { obtenerRecomendaciones } from "../../utils/API/recomendaciones";
import {  editarPais } from "../../utils/API/countries";
import ClearIcon from '@material-ui/icons/Clear';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Checkbox from '@material-ui/core/Checkbox';
import {  uploadFiles } from "../../utils/API/clientes";
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import Initializer from '../../store/Initializer'
import {obtenerPermisosRol,  editarRol,obtenerPermisos,asignarPermiso } from "../../utils/API/roles";
import Input from '@material-ui/core/Input';
import ListItemText from '@material-ui/core/ListItemText';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
export default function Editar(props) {
    const initializer = useContext(Initializer);

    const dato = props.location.state;
    const edicion = props.location.pathname == "/roles/editar" ? true : false;
    const [personName, setPersonName] = React.useState([]);

    const [nombres, setNombres] = useState();
    const [permisos, setPermisos] = useState([]);

    React.useEffect(()=>{
     
        if(initializer.usuario!=null){
            obtenerPermisos(setPermisos,initializer);
            obtenerPermisosRol(dato.name,setPersonName,initializer);        }
  

    

},[initializer.usuario])

    useEffect(() => {
        if (edicion) {
            if (dato != null) {
                setNombres(dato.name);
                


            }

        }
    }, []);
    if (props.location.state == null) {
        props.history.push("/roles")
        return null
    }
    const editar = () => {
   
        editarRol({
            id:dato.id,
            rol: dato.name,
            name: nombres,
            
        },   asignarP, initializer);
     


    }
    const asignarP = () => {
   
        asignarPermiso({
            permisos:personName,
            rol: nombres,
            
        }, initializer)
 
        props.history.push("/roles")

    }
     
 
    const handleChange = (event) => {
      setPersonName(event.target.value);
    }
    const limpiar=()=>{
        setNombres("")
        setPersonName([])
    }
    const atras=()=>{
        props.history.push("/roles")

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
                <Link color="inherit" onClick={() => props.history.push("/roles")}>
                    Roles
        </Link>
                <Typography color="textPrimary">Editar</Typography>
            </Breadcrumbs>
            <Box mb={2} mt={1}>
                <Typography variant="h6" component="h6">
                    {edicion ? "Editar Roles" : "Crear Roles"}
                </Typography>
            </Box>

            <Card>
                <CardContent>
                    <form noValidate autoComplete="off">
                        <Grid container spacing={3}>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    label="Nombre"
                                    variant="outlined"
                                    style={{ width: "100%" }}
                                    onChange={(e) => setNombres(e.target.value)}
                                    value={nombres}
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                            <FormControl style={{width:'100%'}}>
                                <InputLabel id="demo-mutiple-checkbox-label">Seleccione los permisos</InputLabel>
                                <Select
                                labelId="demo-mutiple-checkbox-label"
                                id="demo-mutiple-checkbox"
                                multiple
                                value={personName}
                                onChange={handleChange}
                                input={<Input />}
                                renderValue={(selected) => selected.join(', ')}
                                MenuProps={MenuProps}
                                >
                                {permisos.map((name) => (
                                    <MenuItem key={name} value={name}>
                                    <Checkbox checked={personName.indexOf(name) > -1} />
                                    <ListItemText primary={name} />
                                    </MenuItem>
                                ))}
                                </Select>
                            </FormControl>
                            </Grid>
                            </Grid>
                           </form>
                </CardContent>
                <CardActions>
                    <Button startIcon={<SaveOutlinedIcon />} variant="contained" color="secondary" onClick={() => editar()}>
                        Guardar
                    </Button>
                    <Button startIcon={<DeleteOutlineIcon />} variant="contained" color="default" onClick={() => limpiar()}>
                        Limpiar
                    </Button>
                    <Button startIcon={<ClearIcon />} variant="contained" color="default" onClick={() => atras()}>
                        Cancelar
                    </Button>
                </CardActions>
            </Card>
        </Box>
    );
}
