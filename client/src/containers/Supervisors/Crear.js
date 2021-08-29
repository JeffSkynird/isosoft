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
import ClearIcon from '@material-ui/icons/Clear';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
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
import {  registerSupervisor } from "../../utils/API/supervisors";


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
    const edicion = props.location.pathname == "/supervisores/editar" ? true : false;
    const [cedula, setCedula] = useState('');
    const [email, setEmail] = useState('');

    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState();
    const [nacimiento, setNacimiento] = useState(new Date());
    const [celular, setCelular] = useState("");
    const [telefono, setTelefono] = useState("");
    const [direccion, setDireccion] = useState("");
    const [barrio, setBarrio] = useState("N/A");

    const [password, setPassword] = useState("");



 
    const editar = () => {
        if (validacion()) {


            registerSupervisor({
                dni: cedula,
                names: nombres,email:email,
                last_names: apellidos,
                born_date: nacimiento,
                cellphone: celular,
                landline: telefono,
                address: direccion,
                password:password,
                neighborhood: barrio,
              
            },vaciarCampos, initializer);





        } 

    }
    const validarEmail = (valor) => {
        if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(valor)) {
            return true;
        } else {
            return false;
        }
    }
    const vaciarCampos = () => {
      
        props.history.push("/supervisores")
    }
    const limpiar=()=>{
        setCedula("")
        setEmail("")
        setNombres("")
        setApellidos("")
        setNacimiento(new Date())
        setCelular("")
        setTelefono("")
        setDireccion("")
     
        setPassword("")
    }
    const validacion=()=>{
        let pass=true
        let msg=''
        if(!validarCedula(cedula)){
         msg='* Cédula inválida.'
          pass=false
        }
        if(!validarEmail(email)){
          pass=false
          msg+='\n* Email inválido'
        }
        if(celular.length!=10){
          pass=false
          msg+='\n* Longitud del celular'
        }
        if(telefono.length!=9){
          pass=false
          msg+='\n* Longitud del convencional'
        }
        if(pass==false){
          initializer.mostrarNotificacion({ type: "error", message: msg });

        }
        return pass
    }
    function validarCedula(cad) {

        var total = 0;
        var longitud = cad.length;
        var longcheck = longitud - 1;

        if (cad !== "" && longitud === 10) {
            for (let i = 0; i < longcheck; i++) {
                if (i % 2 === 0) {
                    var aux = cad.charAt(i) * 2;
                    if (aux > 9) aux -= 9;
                    total += aux;
                } else {
                    total += parseInt(cad.charAt(i)); // parseInt o concatenará en lugar de sumar
                }
            }

            total = total % 10 ? 10 - total % 10 : 0;

            if (cad.charAt(longitud - 1) == total) {

                return true;
            } else {

                return false;
            }
        } else {
            return false;
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
                <Link color="inherit" onClick={() => props.history.push("/supervisores")}>
                    Supervisores
        </Link>
                <Typography color="textPrimary">Crear</Typography>
            </Breadcrumbs>
            <Box mb={2} mt={1}>
                <Typography variant="h6" component="h6">
                    {edicion ? "Editar Supervisores" : "Crear Supervisores"}
                </Typography>
            </Box>

            <Card>
                <CardContent>
                    <form noValidate autoComplete="off">
                        <Grid container spacing={3}>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    label="Cédula"
                                    variant="outlined"
                                    style={{ width: "100%" }}
                                    onChange={(e) => {
                                        
                                        const re = /^[0-9\b]+$/;

                                        if (e.target.value === '' || re.test(e.target.value)) {
                                            setCedula(e.target.value)
                                        }
                                    }}
                                    value={cedula}
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    label="Email"
                                    variant="outlined"
                                    style={{ width: "100%" }}
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    label="Nombres"
                                    variant="outlined"
                                    style={{ width: "100%" }}
                                    onChange={(e) => {
                                        if (new RegExp("^[a-zA-Z ]+$").test(e.target.value)) {
                                        setNombres(e.target.value)
                                        }
                                    }}
                                    value={nombres}
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    label="Apellidos"
                                    variant="outlined"
                                    style={{ width: "100%" }}
                                    onChange={(e) => {
                                        if (new RegExp("^[a-zA-Z ]+$").test(e.target.value)) {   
                                        setApellidos(e.target.value)
                                        }
                                    }}
                                    value={apellidos}
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    label="Fecha de nacimiento"
                                    type="date"
                                    variant="outlined"
                                    defaultValue="2017-05-24"
                                    value={nacimiento}
                                    onChange={(e) => {
                                        setNacimiento(e.target.value);
                                    }}
                                    style={{ width: "100%" }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    label="Celular"
                                    variant="outlined"
                                    style={{ width: "100%" }}
                                    onChange={(e) => {
                                        
                                        const re = /^[0-9\b]+$/;

                                        if (e.target.value === '' || re.test(e.target.value)) {
                                            setCelular(e.target.value)
                                        }
                                    }}
                                    value={celular}
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    label="Teléfono"
                                    variant="outlined"
                                    style={{ width: "100%" }}
                                    onChange={(e) =>{ 
                                        const re = /^[0-9\b]+$/;

                                        if (e.target.value === '' || re.test(e.target.value)) {
                                            setTelefono(e.target.value)
                                        }
                                    }}
                                    value={telefono}
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    label="Dirección"
                                    variant="outlined"
                                    style={{ width: "100%" }}
                                    onChange={(e) => setDireccion(e.target.value)}
                                    value={direccion}
                                />
                            </Grid>
                       
                            <Grid item md={6} xs={12}>
                                <TextField
                                    label="Contraseña"
                                    variant="outlined"
                                    type="password"
                                    style={{ width: "100%" }}
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                />
                            </Grid>
                                         {/*    <Grid item md={6} xs={12}>
                                <TextField
                                    label="Barrio"
                                    variant="outlined"
                                    style={{ width: "100%" }}
                                    onChange={(e) => setBarrio(e.target.value)}
                                    value={barrio}
                                />
                            </Grid> */}
                       



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
                    <Button startIcon={<ClearIcon />} variant="contained" color="default" onClick={() => vaciarCampos()}>
                        Cancelar
                    </Button>
                </CardActions>
            </Card>
        </Box>
    );
}
