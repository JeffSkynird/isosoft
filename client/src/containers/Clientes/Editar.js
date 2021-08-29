import React, { useState, useEffect ,useContext} from "react";
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
import { editarCliente,uploadFiles } from "../../utils/API/clientes";
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import Initializer from '../../store/Initializer'

export default function Editar(props) {
    const initializer= useContext(Initializer);

  const dato = props.location.state;
  const edicion = props.location.pathname == "/clientes/editar" ? true : false;
  const [cedula, setCedula] = useState();
  const [nombres, setNombres] = useState();
  const [apellidos, setApellidos] = useState();
  const [nacimiento, setNacimiento] = useState(new Date());
  const [celular, setCelular] = useState(new Date());
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [barrio, setBarrio] = useState("");
  const [ciudadData, setCiudadData] = useState([]);
  const [ciudad, setCiudad] = useState("");
  const [lugarTrabajo, setLugarTrabajo] = useState("");
  const [recomendationData, setRecomendationData] = useState([]);
  const [recomendation, setRecomendation] = useState("");

  const [cedulaS, setCedulaS] = useState("");
  const [nombresS, setNombresS] = useState();
  const [apellidosS, setApellidosS] = useState();
  const [nacimientoS, setNacimientoS] = useState(new Date());
  const [celularS, setCelularS] = useState("");
  const [telefonoS, setTelefonoS] = useState("");

  const [dependencia, setDependencia] = useState(false);

  const [dniFile, setDniFile] = useState(null);
  const [rolesFle, setRolesFile] = useState(null);
  const [precaFile, setPrecaFile] = useState(null);
  const [rucFiles, setRucFiles] = useState(null);
  const [ivaDeclarationFile, setIvaDeclarationFile] = useState(null);

  const [rentaDeclarationFile, setRentaDeclarationFile] = useState(null);

  
  const [accounMovFile, setAccountMovFile] = useState(null);

  const [ingresos, setIngresos] = useState(0);


  useEffect(() => {
    obtenerTodos(setCiudadData);
    obtenerRecomendaciones(setRecomendationData);
    
    if (edicion) {
        if(dato!=null){
            setCedula(dato.dni);
            setNombres(dato.names);
            setApellidos(dato.last_names);
            setNacimiento(dato.born_date);
            setCelular(dato.cellphone);
            setTelefono(dato.landline);
            setDireccion(dato.address);
            setBarrio(dato.neighborhood);
            setCiudad(dato.city);
            setLugarTrabajo(dato.work_place);
            setRecomendation(dato.recomendation_id);
            setIngresos(dato.month_income);

            setDependencia((dato.work_place!=null?true:false))
            if (dato.spouse != null) {
              setCedulaS(dato.spouse.dni);
              setNombresS(dato.spouse.names);
              setApellidosS(dato.spouse.last_names);
              setNacimientoS(dato.spouse.born_date);
              setCelularS(dato.spouse.cellphone);
              setTelefonoS(dato.spouse.landline);
           
            }
        }
      
    }
  }, []);
  if(props.location.state==null){
    props.history.push("/clientes")
    return null
  }
  const editar=()=>{
      if(validarCedula(cedula)){
          if(cedulaS!=""){
            if(validarCedula(cedulaS)){
              editarCliente({spouse_id:(dato.spouse!=null?dato.spouse.id:null),
                  client_id:dato.id,
                  dni:cedula,
                  names:nombres,
                  last_names:apellidos,
                  born_date:nacimiento,
                  cellphone:celular,
                  landline:telefono,
                  address:direccion,
                  neighborhood:barrio,
                  city_id:ciudad,
                  dependencia:(dato.spouse!=null?1:0),
                  recomendation_id:recomendation,
                  work_place:lugarTrabajo,
                  month_income:ingresos,
                  spouse_dni:cedulaS,
                  spouse_names:nombresS,
                  spouse_last_names:apellidosS,
                  spouse_born_date:nacimientoS,
                  spouse_cellphone:celularS,
                  spouse_landline:telefonoS,
              },initializer); 
              subirArchivos();
            }else{
              initializer.mostrarNotificacion({ type: "error", message: "Conyuge: Cédula inválida" });
            }
          }else{
        
              editarCliente({spouse_id:(dato.spouse!=null?dato.spouse.id:null),
                  client_id:dato.id,
                  dni:cedula,
                  names:nombres,
                  last_names:apellidos,
                  born_date:nacimiento,
                  cellphone:celular,
                  landline:telefono,
                  address:direccion,
                  neighborhood:barrio,
                  city_id:ciudad,
                  dependencia:(dato.spouse!=null?1:0),
                  recomendation_id:recomendation,
                  work_place:lugarTrabajo,
                  month_income:ingresos,
                  spouse_dni:cedulaS,
                  spouse_names:nombresS,
                  spouse_last_names:apellidosS,
                  spouse_born_date:nacimientoS,
                  spouse_cellphone:celularS,
                  spouse_landline:telefonoS,
              },initializer); 
              subirArchivos();
            
          }
              
            
       
        
      }else{
        initializer.mostrarNotificacion({ type: "error", message: "Cédula inválida" });
      }
    
  }
  const subirArchivos=()=>{

    uploadFiles({dni:cedula,dni_file:dniFile,roles_file:rolesFle,preca_file:precaFile,ruc_filesi:rucFiles,decla_filesi:ivaDeclarationFile,renta_filesi:rentaDeclarationFile,mov_filesi:accounMovFile},initializer)
    
  }
  function validarCedula(cad){
    
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
        <Link color="inherit" onClick={() => props.history.go(-1)}>
          Clientes
        </Link>
        <Typography color="textPrimary">Editar</Typography>
      </Breadcrumbs>
      <Grid container container justify="space-between" alignItems="center">
        <Box mb={2} mt={1}>
          <Typography variant="h6" component="h6">
            {edicion ? "Editar Interesado" : "Crear Interesado"}
          </Typography>
        </Box>
       
        <Box style={{display:'flex'}}>

    {/*       <Button
            style={{ marginRight: "5px" }}
            startIcon={<VisibilityOutlinedIcon />}
            variant="contained"
            color="secondary"
            onClick={() => props.history.push("/clientes/asignaciones",{id:dato.id})}
          >
            Ver datos de de villa
          </Button> */}
        
        </Box>
      </Grid>

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
                  onChange={(e) => setNombres(e.target.value)}
                  value={nombres}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  label="Apellidos"
                  variant="outlined"
                  style={{ width: "100%" }}
                  onChange={(e) => setApellidos(e.target.value)}
                  value={apellidos}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  label="Fecha de nacimiento"
                  type="date"
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
              <Grid item md={6} xs={12}>
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
              </Grid>
             
                <Grid item md={6} xs={12}>
                <TextField
                  label="Ingresos mensuales"
                  variant="outlined"
                  style={{ width: "100%" }}
                  onChange={(e) => {
                    const amount = e.target.value;
                    if (
                        !amount ||
                        amount.match(/^\d{1,}(\.\d{0,4})?$/)
                    ) {
                       
                      setIngresos(e.target.value)
                    }
                  }}
                  value={ingresos}
                />
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
                    {ciudadData.map((e) => (
                      <MenuItem key={e.id} value={e.id}>
                        <em>{e.names}</em>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item md={6} xs={12}>
                <FormControl variant="outlined" style={{ width: "100%" }}>
                  <InputLabel id="label1">
                    ¿Cómo se entero de nosotros?
                  </InputLabel>
                  <Select
                    labelId="label1"
                    value={recomendation}
                    onChange={(e) => setRecomendation(e.target.value)}
                    label="re"
                  >
                    <MenuItem value="">
                      <em>Seleccione una opción</em>
                    </MenuItem>
                    {recomendationData.map((e) => (
                      <MenuItem key={e.id} value={e.id}>
                        <em>{e.name}</em>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item md={6} xs={6}>
                <FormControlLabel
                        control={
                            <Switch
                            checked={dependencia}
                            onChange={()=>{
                                setDependencia(!dependencia)
                                setLugarTrabajo("")
                                if(!dependencia==true){
                                  setRucFiles(null)
                                  setIvaDeclarationFile(null)
                                  setAccountMovFile(null)
                                }else{
                                  setRolesFile(null)
                                  setPrecaFile(null)

                                    
                                    
                                }
                            }}
                            name="checkedA"
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                            />
                        }
                        label="¿Posee relación de dependencia?"
                    />
              </Grid>
            {/*   <Grid item md={6} xs={6}>
                <TextField
                
                  label="Lugar de trabajo"
                  variant="outlined"
                  style={{ width: "100%",display:(dependencia==true?'':'none') }}
                  onChange={(e) => setLugarTrabajo(e.target.value)}
                  value={lugarTrabajo}
                />
              </Grid> */}
              <Grid container item md={12} xs={12}>
              {
                  dependencia==true?
                  (
                      <React.Fragment>
                    <div style={{ marginRight:'5px'}}>
                        <input
                            accept="image/*"
                            style={{display:'none'}}
                            id="dniFile"
                            accept="application/pdf"
                            type="file"
                            onChange={(e)=> setDniFile(e.target.files[0])
                         
                            }
                         
                        />
                        <label htmlFor="dniFile">
                            <Button variant="contained" color="primary" component="span">
                                Cédula {dniFile!=null?"("+dniFile.name+")":""}
                            </Button>
                        </label>
                    </div>
                   <div style={{ marginRight:'5px'}}>
                        <input
                            accept="image/*"
                            style={{display:'none', marginRight:'5px'}}
                            id="rolesFle"
                            multiple
                            type="file"
                            accept="application/pdf"
                            onChange={(e)=> setRolesFile(e.target.files[0])
                            }
                         
                        />
                        <label htmlFor="rolesFle">
                            <Button variant="contained" color="primary" component="span">
                            Roles de Pago/Mecanizado  {rolesFle!=null?"("+rolesFle.name+")":""}
                            </Button>
                        </label>
                    </div>
                    <div style={{ marginRight:'5px'}}>
                        <input
                            accept="image/*"
                            style={{display:'none', marginRight:'5px'}}
                            id="precaFile"
                            multiple
                            type="file"
                            accept="application/pdf"
                            onChange={(e)=> setPrecaFile(e.target.files[0])
                            }
                  
                        />
                        <label htmlFor="precaFile">
                            <Button variant="contained" color="primary" component="span">
                            Precalificación hipotecaria  o buró de crédito {precaFile!=null?precaFile.name:""}
                            </Button>
                        </label>
                    </div>
                      </React.Fragment>
                    
                  
                  )
                  
                  :
                <React.Fragment>
                       <div style={{ marginRight:'5px'}}>
                    <input
                        accept="image/*"
                        style={{display:'none', marginRight:'5px'}}
                        id="dniFile2"
                        
                        type="file"
                        accept="application/pdf"
                        onChange={(e)=> setDniFile(e.target.files[0])
                        }
                    
                        
                    />
                    <label htmlFor="dniFile2">
                        <Button variant="contained" color="primary" component="span">
                        Cédula {dniFile!=null?"("+dniFile.name+")":""}
                        </Button>
                    </label>
                  </div>
                   <div style={{ marginRight:'5px'}}>
                        <input
                            accept="image/*"
                            style={{display:'none', marginRight:'5px'}}
                            id="precaFile"
                            multiple
                            type="file"
                            accept="application/pdf"
                            onChange={(e)=> setPrecaFile(e.target.files[0])
                            }
                  
                        />
                        <label htmlFor="precaFile">
                            <Button variant="contained" color="primary" component="span">
                            Precalificación hipotecaria  o buró de crédito {precaFile!=null?precaFile.name:""}
                            </Button>
                        </label>
                    </div>
                  <div style={{ marginRight:'5px'}}>
                    <input
                        accept="image/*"
                        style={{display:'none', marginRight:'5px'}}
                        id="rucFiles"
                        
                        accept="application/pdf"
                        type="file"
                        onChange={(e)=> setRucFiles(e.target.files[0])
                        }
                    
                        
                    />
                    <label htmlFor="rucFiles">
                        <Button variant="contained" color="primary" component="span">
                        Ruc/Rice {rucFiles!=null?rucFiles.name:""}
                        </Button>
                    </label>
                  </div>
                  <div style={{ marginRight:'5px'}}>
                    <input
                        accept="image/*"
                        style={{display:'none', marginRight:'5px'}}
                        id="ivaDeclarationFile"
                        accept="application/pdf"
                        type="file"
                        onChange={(e)=> setIvaDeclarationFile(e.target.files[0])
                        }
                      
                    />
                    <label htmlFor="ivaDeclarationFile">
                        <Button variant="contained" color="primary" component="span">
                        Declaración Iva (6 meses) {ivaDeclarationFile!=null?ivaDeclarationFile.name:""}
                        </Button>
                    </label>
                  </div> 
                  <div style={{ marginRight:'5px'}}>
                    <input
                        accept="image/*"
                        style={{display:'none', marginRight:'5px'}}
                        id="ivaDeclarationFile"
                        accept="application/pdf"
                        type="file"
                        onChange={(e)=> setRentaDeclarationFile(e.target.files[0])
                        }
                      
                    />
                    <label htmlFor="ivaDeclarationFile">
                        <Button variant="contained" color="primary" component="span">
                        Declaración del impuesto a la renta (último año) {rentaDeclarationFile!=null?rentaDeclarationFile.name:""}
                        </Button>
                    </label>
                  </div> 
                  <div >
                    <input
                        accept="image/*"
                        style={{display:'none'}}
                        id="accounMovFile"
                        accept="application/pdf"
                        type="file"
                        onChange={(e)=> setAccountMovFile(e.target.files[0])
                        }
                   
                    />
                    <label htmlFor="accounMovFile">
                        <Button variant="contained" color="primary" component="span">
                        Movimientos cuenta (3 meses) {accounMovFile!=null?accounMovFile.name:""}
                        </Button>
                    </label>
                  </div>
              
                </React.Fragment>

              }
               </Grid>
             
             
              {edicion?(dato.spouse != null ? (
                <Grid item xs={12}>
                  <Card>
                    <CardContent>
                      <Typography color="textSecondary" gutterBottom>
                        Datos del conyuge
                      </Typography>
                      <Box mb={2} mt={2}>
                        <Grid container spacing={2}>
                          <Grid item xs={12} md={4}>
                            <TextField
                              label="Cédula"
                              variant="outlined"
                              style={{ width: "100%" }}
                              onChange={(e) =>{
                                 
                                 const re = /^[0-9\b]+$/;

                                 if (e.target.value === '' || re.test(e.target.value)) {
                                  setCedulaS(e.target.value)
                                 } 
                              }}
                              value={cedulaS}
                            />
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <TextField
                              label="Nombres"
                              variant="outlined"
                              style={{ width: "100%" }}
                              onChange={(e) => setNombresS(e.target.value)}
                              value={nombresS}
                            />
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <TextField
                              label="Apellidos"
                              variant="outlined"
                              style={{ width: "100%" }}
                              onChange={(e) => setApellidosS(e.target.value)}
                              value={apellidosS}
                            />
                          </Grid>
                        </Grid>
                      </Box>
                      <Box>
                        <Grid container spacing={2}>
                          <Grid item xs={12} md={4}>
                            <TextField
                              label="Fecha de nacimiento"
                              type="date"
                              defaultValue="2017-05-24"
                              value={nacimientoS}
                              onChange={(e) => {
                                setNacimientoS(e.target.value);
                              }}
                              style={{ width: "100%" }}
                              InputLabelProps={{
                                shrink: true,
                              }}
                            />
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <TextField
                              label="Celular"
                              variant="outlined"
                              style={{ width: "100%" }}
                              onChange={(e) => {
                                
                                const re = /^[0-9\b]+$/;

                                if (e.target.value === '' || re.test(e.target.value)) {
                                  setCelularS(e.target.value)
                                }
                              }}
                              value={celularS}
                            />
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <TextField
                              label="Teléfono"
                              variant="outlined"
                              style={{ width: "100%" }}
                              onChange={(e) => {
                                
                                const re = /^[0-9\b]+$/;

                                if (e.target.value === '' || re.test(e.target.value)) {
                                  setTelefonoS(e.target.value)
                                }
                              }}
                              value={telefonoS}
                            />
                          </Grid>
                        </Grid>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ) : null):null}
            </Grid>
          </form>
        </CardContent>
        <CardActions>
        <Button  startIcon={<SaveOutlinedIcon />} variant="contained" color="secondary" onClick={()=>editar()}>
                        Guardar
                    </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
