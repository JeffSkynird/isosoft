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
import ClearIcon from '@material-ui/icons/Clear';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { obtenerTodos } from "../../utils/API/ciudades";
import { obtenerRecomendaciones } from "../../utils/API/recomendaciones";
import { editar,uploadAttach } from "../../utils/API/templates";
import avatar from '../../assets/LogoAmbiensa.png';
import { uploadFiles } from "../../utils/API/clientes";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import Initializer from "../../store/Initializer";
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import {PUBLIC_PATH} from '../../config/API'
const names = [
  'Confirmación de registro',
  'Aprobado',
  'En revisión',
  'Negada',
  'Envío de mensaje a asesor',
  'Información no válida',
  'Verificador de correo',
  'Formulario paso 1',
  'Formulario Paso 2',
  'Formulario Paso 3',
  'Premio de la ruleta',
];
const etiquetas = [
  {label:'Nombres completos',valor:'{NOMBRES}'},
  {label:'Cédula',valor:'{CEDULA}'},
  {label:'Fecha de registro',valor:'{FECHA_INICIO}'},
  {label:'Hora de registro',valor:'{HORA_INICIO}'},

];
export default function Editar(props) {
  const initializer = useContext(Initializer);
  const editorRef = React.useRef();

  const dato = props.location.state;
  const edicion =
    props.location.pathname == "/email_templates/editar" ? true : false;

  const [nombres, setNombres] = useState("");
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [footer, setFooter] = useState("");
  const [title, setTitle] = useState("");
  const [templateFile, setTemplateFile] = useState(null);
  const [emailModo, setEmailModo] = React.useState("");
  useEffect(() => {
    if (edicion) {
      if (dato != null) {
        setNombres(dato.nombre);
        setMessage(dato.mensaje);
        editorRef.current.editor.setContents(dato.mensaje);
        setSubject(dato.asunto);
        setTitle(dato.titulo);
        setFooter(dato.pie_pagina);
        setEmailModo(dato.modo);
      }
    }
  }, []);
  if (props.location.state == null) {
    props.history.push("/email_templates");
    return null;
  }
  const editarPlantilla = () => {
    editar(
      {
        template_id: dato.id,
        name: nombres,
        message: message,
        subject: subject,
        title:title,
        footer: footer,
        mode:emailModo,
      },atras,
      initializer
    );
    subirAdjunto();
  };
  const subirAdjunto=()=>{

    uploadAttach({template_file:templateFile,template_id:dato.id},initializer)
    
  }
  const añadirEtiqueta=(etiq)=>{
  
    
    setMessage(message + " <span>" + etiq+'</span>');
    editorRef.current.editor.setContents(message + " <span>" + etiq+'</span>');
  }
  const atras=()=>{
    props.history.push("/email_templates")
}
const limpiar=()=>{
  setNombres("")
  setMessage("")
  setSubject("")
  setFooter("")
  setTitle("")
  setEmailModo("")
  setTemplateFile(null)
  editorRef.current.editor.setContents("");
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
        <Link
          color="inherit"
          onClick={() => props.history.push("/email_templates")}
        >
          Plantillas
        </Link>
        <Typography color="textPrimary">Editar</Typography>
      </Breadcrumbs>
      <Box mb={2} mt={1}>
        <Typography variant="h6" component="h6">
          {edicion ? "Editar Plantillas" : "Crear Plantillas"}
        </Typography>
      </Box>

      <Card>
        <CardContent>
          <form noValidate autoComplete="off">
            <Grid container spacing={3}>
              <Grid item md={6}>
                <Grid  container spacing={2}>
                  <Grid item md={12} xs={12}>
                    <TextField
                      label="Nombre"
                      variant="filled"
                      style={{ width: "100%" }}
                      onChange={(e) => setNombres(e.target.value)}
                      value={nombres}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      label="Asunto"
                      variant="outlined"
                      style={{ width: "100%" }}
                      onChange={(e) => setSubject(e.target.value)}
                      value={subject}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      label="Titulo"
                      variant="outlined"
                      style={{ width: "100%" }}
                      onChange={(e) => setTitle(e.target.value)}
                      value={title}
                    />
                  </Grid>
                  
                  
                  {
                    emailModo!=6?
                    (
                      <Grid item md={12} xs={12} >
                      <p style={{marginTop:'0px',paddingLeft:'10px'}}>Datos del interesado: </p>
                      {etiquetas.map((e)=>(
                        <Chip style={{marginRight:'5px'}} label={e.label} onClick={()=>añadirEtiqueta(e.valor)} />
                      ))}
                    </Grid>
                    )
                    :
                    <Grid item md={12} xs={12} >
                    <p style={{marginTop:'0px',paddingLeft:'10px'}}>Datos del correo: </p>
                    <Chip style={{marginRight:'5px'}} label={'Código de verificación'} onClick={()=>añadirEtiqueta("{CODIGO}")} />
                  </Grid>
                  }
                  <Grid item md={12} xs={12}>
                    {/* <TextField
                      label="Mensaje"
                      variant="outlined"
                      multiline={true}
                      style={{ width: "100%" }}
                      onChange={(e) => setMessage(e.target.value)}
                      value={message}
                    /> */}
 <SunEditor
                      onChange={setMessage}
                      ref={editorRef}
                      lang="es"
                      setOptions={{
                        showPathLabel: false,
                        font: [
                          "Arial",
                          "tohoma",
                          "Courier New,Courier",
                          "Gotham SSm A",
                          "Impact",
                          "Georgia",
                          "Verdana",
                        ],
                        charCounter: true,
                        maxCharCount: 720,
                        width: "auto",
                        maxWidth: "700px",
                        height: "auto",
                        minHeight: "100px",
                        maxHeight: "250px",
                        buttonList: [
                          ["undo", "redo", "font", "fontSize", "formatBlock"],
                          [
                            "bold",
                            "underline",
                            "italic",
                            "strike",
                            "subscript",
                            "superscript",
                            "removeFormat",
                          ],

                          [
                            "fontColor",
                            "hiliteColor",
                            "outdent",
                            "indent",
                            "align",
                            "horizontalRule",
                            "list",
                            "table",
                          ],
                          [
                            "link",
                            "fullScreen",
                            "showBlocks",
                            "codeView",
                            
                          ],
                        ],
                      }}
                    />

                  </Grid>
                  <Grid item md={12} xs={12}>
                    <TextField
                      label="Pie de pagina"
                      variant="outlined"
                      style={{ width: "100%" }}
                      onChange={(e) => setFooter(e.target.value)}
                      value={footer}
                    />
                  </Grid>
                  
                  <Grid item md={12} xs={12}>
                    <FormControl variant="outlined" style={{width:'100%'}}>
                      <InputLabel id="demo-simple-select-filled-label">Seleccione modo de envío automático</InputLabel>
                      <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        value={emailModo}
                        onChange={(e)=>{
                          setEmailModo(e.target.value)
                        }}
                      >
                      <MenuItem value="">
                        <em>Ninguno</em>
                      </MenuItem>
                        {
                          names.map((e,i)=>(
                            <MenuItem value={i}>{e}</MenuItem>
                          ))
                        }
                        
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item md={12} xs={12}>
                  <input
                    accept="image/*"
                    style={{display:'none', marginRight:'5px'}}
                    id="templateFile"
                    multiple
                    type="file"
                    accept="application/pdf"
                    onChange={(e)=> setTemplateFile(e.target.files[0])
                    }
                    
                />
                <label htmlFor="templateFile">
                    <Button variant="contained" color="primary" component="span">
                    Archivo adjunto  {templateFile!=null?"("+templateFile.name+")":""}
                    </Button>
                </label>
                  </Grid>
                
                  
                </Grid>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper>
                    <Typography style={{textAlign:'center',fontWeight:'bold',marginTop:'25px',marginBottom:'15px'}} component="p">
                    Previsualización de correo
                    </Typography>

                    <Box style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                        <img   src={avatar}
                      style={{     width: '250px',
                        height: '126.48px'}}  alt="Logo" />
                        
                        <p style={{marginTop:'32px',paddingLeft:'30px',paddingRight:'30px',alignSelf:'flex-start',marginBottom:'10px',fontWeight:'bold',fontSize:'16px'}}>{title}</p>
                        <p style={{marginTop:'0',marginBottom:'0',textAlign:'justify',paddingLeft:'30px',paddingRight:'30px',fontSize:'14px'       ,  width:'100%',}}              dangerouslySetInnerHTML={{__html: message}}></p>
                        <p style={{marginTop:'10px',fontSize:'14px',alignSelf:'flex-start',paddingLeft:'30px',paddingRight:'30px',}}>{footer}</p>
                    </Box>
                </Paper>
              </Grid>
            </Grid>
          </form>
        </CardContent>
        <CardActions>
          <Button
            startIcon={<SaveOutlinedIcon />}
            variant="contained"
            color="secondary"
            onClick={() => editarPlantilla()}
          >
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
