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
import ClearIcon from '@material-ui/icons/Clear';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { obtenerRecomendaciones } from "../../utils/API/recomendaciones";
import {  obtenerTodos } from "../../utils/API/supervisors";
import { editarGrupo } from "../../utils/API/grupos";


import {  uploadFiles } from "../../utils/API/clientes";
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import Initializer from '../../store/Initializer'

export default function Editar(props) {
    const initializer = useContext(Initializer);

    const dato = props.location.state;
    const edicion = props.location.pathname == "/grupos/editar" ? true : false;
    
    const [nombres, setNombres] = useState("");

    const [supervisorData, setSupervisorData] = useState([]);
    const [supervisor, setSupervisor] = useState("");

    React.useEffect(()=>{
     
        if(initializer.usuario!=null){
            if (edicion) {
                obtenerTodos(setSupervisorData,initializer)
                if (dato != null) {
                    setNombres(dato.name);
                    setSupervisor(dato.supervisor.id);
    
    
    
                }
    
            }
        }
  
    

},[initializer.usuario])
  
    if (props.location.state == null) {
        props.history.push("/grupos")
        return null
    }

    const atras=()=>{
        props.history.push("/grupos")
    }
    const editar = () => {
   
    editarGrupo({
        group_id: dato.id,

            name: nombres,
            supervisor_id: supervisor,

        },atras, initializer);
  


    }
    const limpiar=()=>{
        setNombres("")
          setSupervisor("")
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
                <Link color="inherit" onClick={() => props.history.push("/grupos")}>
                    Grupos
        </Link>
                <Typography color="textPrimary">Editar</Typography>
            </Breadcrumbs>
            <Box mb={2} mt={1}>
                <Typography variant="h6" component="h6">
                    {edicion ? "Editar Grupos" : "Crear Grupos"}
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
                                <FormControl variant="outlined" style={{ width: "100%" }}>
                                    <InputLabel id="label">Supervisores</InputLabel>
                                    <Select
                                        labelId="label"
                                        value={supervisor}
                                        onChange={(e) => setSupervisor(e.target.value)}
                                        label="ciu"
                                    >
                                        <MenuItem value="">
                                            <em>Seleccione un supervisor</em>
                                        </MenuItem>
                                        {supervisorData.map((e) => (
                                            <MenuItem key={e.id} value={e.id}>
                                                <em>{e.names} {e.last_names}</em>
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
