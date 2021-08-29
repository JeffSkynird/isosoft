import React, { useState, useEffect, useContext } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ClearIcon from '@material-ui/icons/Clear';

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
import {  editarAsesor,upload} from "../../utils/API/asessors";


import {  uploadFiles } from "../../utils/API/clientes";
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import InputAdornment from '@material-ui/core/InputAdornment';
import Initializer from '../../store/Initializer'
import { obtenerTodosProvincia } from "../../utils/API/provinces";
export default function Editar(props) {
    const initializer = useContext(Initializer);

    const dato = props.location.state;
    const edicion = props.location.pathname == "/asesores/editar" ? true : false;
    const [cedula, setCedula] = useState();
    const [nombres, setNombres] = useState();
    const [apellidos, setApellidos] = useState();
    const [nacimiento, setNacimiento] = useState(new Date());
    const [celular, setCelular] = useState(new Date());
    const [telefono, setTelefono] = useState("");
    const [email,setEmail]=useState('')

    const [direccion, setDireccion] = useState("");
    const [barrio, setBarrio] = useState("N/A");
    const [ciudadData, setCiudadData] = useState({data:[],backup:[]});
    const [ciudad, setCiudad] = useState("");
    const [production, setProduction] = useState("0");
    const [imageFile, setImageFile] = useState(null);
    const [password, setPassword] = useState("");
    const [provinciaData, setProvinciaData] = useState({data:[],backup:[]});
    const [provincia, setProvincia] = useState("");
 
    const changeProvince=(id)=>{
        let data=[]
        ciudadData.backup.slice().map((e)=>{
          if(e.id_provincia==id){
            data.push({...e})
          }
        })
        
        setCiudadData({...ciudadData,data:data})
        setProvincia(id)
      }
    useEffect(() => {
        obtenerTodos(setCiudadData);
        obtenerTodosProvincia(setProvinciaData,initializer)
        if (edicion) {
            if (dato != null) {
                setCedula(dato.dni);
                setNombres(dato.names);
                setEmail(dato.email);
                setApellidos(dato.last_names);
                setNacimiento(dato.born_date);
                setCelular(dato.cellphone);
                setTelefono(dato.landline);
                setDireccion(dato.address);
                setBarrio(dato.neighborhood);
                setCiudad(dato.city);
                
                setProvincia(9)
                setProduction(dato.production);


            }

        }
    }, []);
    if (props.location.state == null) {
        props.history.push("/asesores")
        return null
    }
    
    const editar = () => {
         if (validacion()) {


            editarAsesor({
                asesor_id: dato.id,
                dni: cedula,
                names: nombres,
                email:email,
                last_names: apellidos,
                born_date: nacimiento,
                cellphone: celular,
                landline: telefono,
                address: direccion,
                neighborhood: barrio,
                city_id: ciudad,
                production:production,
                password:password
            }, atras,initializer);

            subirArchivos()



         } 

    }
    const atras=()=>{
        props.history.push("/asesores")
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
    const subirArchivos=()=>{
        upload({image_file:imageFile,dni:cedula},initializer)
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
    const validarEmail = (valor) => {
        if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(valor)) {
            return true;
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
                <Link color="inherit" onClick={() => props.history.push("/asesores")}>
                    Asesores
        </Link>
                <Typography color="textPrimary">Editar</Typography>
            </Breadcrumbs>
            <Box mb={2} mt={1}>
                <Typography variant="h6" component="h6">
                    {edicion ? "Editar asesores" : "Crear asesores"}
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
                                    label="Correo"
                                    variant="outlined"
                                    style={{ width: "100%" }}
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    label="Fecha de nacimiento"
                                    type="date"
                                    defaultValue="2017-05-24"
                                    value={nacimiento}
                                    variant="outlined"
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
                                    onChange={(e) => {
                                        
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
                           {/*  <Grid item md={6} xs={12}>
                                <TextField
                                    label="Barrio"
                                    variant="outlined"
                                    style={{ width: "100%" }}
                                    onChange={(e) => setBarrio(e.target.value)}
                                    value={barrio}
                                />
                            </Grid> */}
                         {/*    <Grid item md={6} xs={12}>
                                <FormControl variant="outlined" style={{ width: "100%" }}>
                                <InputLabel id="label1">
                                    Zona o Sector
                                </InputLabel>
                                <Select
                                    labelId="label1"
                                    value={barrio}
                                    onChange={(e) => setBarrio(e.target.value)}
                                    label="re"
                                >
                                    <MenuItem value="">
                                    <em>Seleccione una opción</em>
                                    </MenuItem>
                                    <MenuItem value="NORTE">
                                    <em>Norte</em>
                                    </MenuItem>
                                    <MenuItem value="SUR">
                                    <em>Sur</em>
                                    </MenuItem>
                                    <MenuItem value="CENTRO">
                                    <em>Centro</em>
                                    </MenuItem>
                                </Select>
                                </FormControl>
                            </Grid> */}
                            <Grid item md={6} xs={12}>
                                <FormControl variant="outlined" style={{ width: "100%" }}>
                                <InputLabel id="provin">Provincia</InputLabel>
                                <Select
                                    labelId="provin"
                                    value={provincia}
                                    onChange={(e) => changeProvince(e.target.value)}
                                    label="provin"
                                >
                                    <MenuItem value="">
                                    <em>Seleccione una provincia</em>
                                    </MenuItem>
                                    {provinciaData.data.map((e) => (
                                    <MenuItem key={e.id_provincia} value={e.id_provincia}>
                                        <em>{e.pv_descrip}</em>
                                    </MenuItem>
                                    ))}
                                </Select>
                                </FormControl>
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <FormControl variant="outlined" style={{ width: "100%" }}>
                                    <InputLabel id="label">Cantón</InputLabel>
                                    <Select
                                        labelId="label"
                                        value={ciudad}
                                        onChange={(e) => setCiudad(e.target.value)}
                                        label="ciu"
                                    >
                                        <MenuItem value="">
                                            <em>Seleccione un cantón</em>
                                        </MenuItem>
                                        {ciudadData.data.map((e) => (
                                            <MenuItem key={e.id_ciudad} value={e.id_ciudad}>
                                                <em>{e.cd_descrip}</em>
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
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
                       {/*      <Grid item md={6} xs={12}>
                                <TextField
                                    label="Producción del último mes"
                                    type="number"
                                    variant="outlined"
                                    style={{ width: "100%" }}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">%</InputAdornment>,
                                      }}
                                    onChange={(e) => setProduction(e.target.value)}
                                    value={production}
                                />
                            </Grid> */}
                            <Grid item xs={12} md={6}>
                                <input
                                    accept="image/*"
                                    style={{display:'none', marginRight:'5px'}}
                                    id="image_file"
                                    multiple
                                    type="file"
                                    accept="image/jpg, image/png"
                                    onChange={(e)=> setImageFile(e.target.files[0])
                                    }
                        
                                />
                                <label htmlFor="image_file">
                                    <Button variant="contained" color="primary" component="span">
                                        Foto {imageFile!=null?imageFile.name:""}
                                    </Button>
                                </label>
                            </Grid>


                        </Grid>
                    </form>
                </CardContent>
                <CardActions>
                    <Button startIcon={<SaveOutlinedIcon />} variant="contained" color="secondary" onClick={() => editar()}>
                        Guardar
                    </Button>
                    <Button startIcon={<ClearIcon />} variant="contained" color="default" onClick={() => atras()}>
                        Cancelar
                    </Button>
                </CardActions>
            </Card>
        </Box>
    );
}
