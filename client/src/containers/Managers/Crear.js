import React, { useState, useEffect, useContext } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import ClearIcon from '@material-ui/icons/Clear';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
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
import {  registrarUsuario ,asignarRol} from "../../utils/API/managers";
import { obtenerTodos} from '../../utils/API/roles.js'


import {  uploadFiles } from "../../utils/API/clientes";
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import Initializer from '../../store/Initializer'

export default function Crear(props) {
    const initializer = useContext(Initializer);

    const dato = props.location.state;
    const edicion = props.location.pathname == "/paises/crear" ? true : false;
    
    const [nombres, setNombres] = useState();
   
    const [dni,setDni]=useState('')
    const [names,setNames]=useState('')
    const [lastNames,setLastNames]=useState('')
    const [cellphone,setCellphone]=useState('')
    const [landline,setLandLine]=useState('')
    const [address,setAddress]=useState('')
    const [neighborhood,setNeighborhood]=useState('N/A')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [roles,setRoles]=useState({data:[],backup:[]})
    const [rol,setRol]=useState('')

    React.useEffect(()=>{
     
        if(initializer.usuario!=null){
            obtenerTodos(setRoles,initializer);
        }
  

    

},[initializer.usuario])
const validacion=()=>{
  let pass=true
  let msg=''
  if(!validarCedula(dni)){
   msg='* Cédula inválida.'
    pass=false
  }
  if(!validarEmail(email)){
    pass=false
    msg+='\n* Email inválido'
  }
  if(cellphone.length!=10){
    pass=false
    msg+='\n* Longitud del celular'
  }
  if(landline.length!=9){
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
    const crear = () => {
      if(validacion()){
        registrarUsuario({
          
          email:email,
          password:password,
            dni:dni,
            names:names,
            last_names:lastNames,
            cellphone:cellphone,
            landline:landline,
            address:address,
            neighborhood:neighborhood,
          
      }, vaciarCampos,initializer,asignarR);
      }
      

       

    }
    const asignarR = (id) => {
   
        asignarRol({id_user:id,rol:rol},initializer)
       

    }
    
    const vaciarCampos = () => {
    
      props.history.push("/managers")
  }
  const limpiar=()=>{
    setDni("")
      setEmail("")
      setNames("")
      
      setLastNames("")
      setAddress("")
      setCellphone("")
      setLandLine("")
      setPassword("")
      setRol("")
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
                <Link color="inherit" onClick={() => props.history.push("/managers")}>
                    Usuarios
        </Link>
                <Typography color="textPrimary">Crear</Typography>
            </Breadcrumbs>
            <Box mb={2} mt={1}>
                <Typography variant="h6" component="h6">
                    {edicion ? "Editar usuarios" : "Crear usuarios"}
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
                        setDni(e.target.value)
                    }
                  }}
                  value={dni}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  label="Nombres"
                  variant="outlined"
                  style={{ width: "100%" }}
                  onChange={(e) =>{ 
                    if (new RegExp("^[a-zA-Z ]+$").test(e.target.value)) {
                    setNames(e.target.value)
                    }
                  }}
                  value={names}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  label="Apellidos"
                  variant="outlined"
                  style={{ width: "100%" }}
                  onChange={(e) => {
                    if (new RegExp("^[a-zA-Z ]+$").test(e.target.value)) {
                    setLastNames(e.target.value)
                    }
                  }}
                  value={lastNames}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  label="Teléfono"
                  variant="outlined"
                  style={{ width: "100%" }}
                  onChange={(e) => setCellphone(e.target.value)}
                  value={cellphone}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  label="Teléfono convencional"
     
                  variant="outlined"
                  value={landline}
                  onChange={(e) => {
                    setLandLine(e.target.value);
                  }}
                  style={{ width: "100%" }}
              
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  label="Dirección"
                  variant="outlined"
                  style={{ width: "100%" }}
                  onChange={(e) => {
                  
                  

                        setAddress(e.target.value)
                   
                  }}
                  value={address}
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
                  label="Contraseña"
                  type="password"
                  variant="outlined"
                  style={{ width: "100%" }}
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </Grid>
              <Grid item md={12} xs={12}>
              <FormControl  variant="outlined" style={{width:'100%'}}>
                <InputLabel id="demo-simple-select-label">Seleccione un rol</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={rol}
                onChange={(e)=>setRol(e.target.value)}
                >
                {
                    roles.data.map((e=>(
                        <MenuItem value={e.name}>{e.name}</MenuItem>
                    )))
                }
                </Select>
            </FormControl>
              </Grid>
           
                            </Grid>
                           </form>
                </CardContent>
                <CardActions>
                    <Button startIcon={<SaveOutlinedIcon />} variant="contained" color="secondary" onClick={() => crear()}>
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
