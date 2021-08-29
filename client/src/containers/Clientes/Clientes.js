import React, { useContext, useRef, useState, useEffect } from 'react'
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import { obtenerTodos as obtenerTodosAsesor, asignarAsesor } from "../../utils/API/asessors.js";
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';

import { obtenerTodos, exportFiles, eliminarCliente, cambiarInteres } from '../../utils/API/clientes.js'
import { obtenerOpciones } from '../../utils/API/precalificator'
import { enviarMensaje, obtenerTodosPlantilla } from '../../utils/API/templates'
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import GetAppIcon from '@material-ui/icons/GetApp';
import Chip from '@material-ui/core/Chip';
import { TablePagination } from "@material-ui/core";
import InputAdornment from '@material-ui/core/InputAdornment';

import { LocalizationTable, TableIcons } from '../../utils/table.js'
import MaterialTable, { MTableToolbar } from "material-table";
import Initializer from '../../store/Initializer'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { obtenerPermiso } from '../../utils/API/managers.js'
import Autocomplete from '@material-ui/lab/Autocomplete';
import Grow from '@material-ui/core/Grow';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Importar from './Components/Importar';
import { desencriptarJson } from '../../utils/security'
import { SearchOutlined } from '@material-ui/icons';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Grow ref={ref} {...props} />;
});
export default function Clientes(props) {
  const theme = useTheme();

  const initializer = useContext(Initializer);
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [open4, setOpen4] = React.useState(false);
  const [contadorColor, setContadorColor] = React.useState(null)
  const [asesorData, setAsesorData] = React.useState([])
  const [asesor, setAsesor] = React.useState('')

  const [opciones, setOpciones] = React.useState([]);

  const [data, setData] = React.useState([])
  const [estadoP, setEstadoP] = React.useState('');

  const [plantillaData, setPlantillaData] = React.useState([])
  const [plantilla, setPlantilla] = React.useState("")

  const [tipo, setTipo] = React.useState("client")
  const [permiso, setPermiso] = React.useState([])
  const searchInput = useRef(null);
  const [pageNumber, setPageNumber] = React.useState(0);
  const [rowPerPage, setRowPerPage] = React.useState(30);
  const [totalRows, setTotalRows] = React.useState(5);

  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");

  const [searching, setSearching] = useState(false);
  React.useEffect(() => {
    if (initializer.usuario != null) {
      obtenerTodosAsesor(setAsesorData, initializer);

      obtenerTodos("interesados", setData, initializer, pageNumber, rowPerPage, setTotalRows, query, status, setContadorColor);
      obtenerOpciones(setOpciones, initializer);
      obtenerTodosPlantilla(setPlantillaData, initializer)
      setTipo(JSON.parse(desencriptarJson(initializer.usuario)).user.type_user)
      obtenerPermiso(setPermiso, initializer);
    }




  }, [initializer.usuario])
  useEffect(() => {
    if (status != "") {
      obtenerTodos("interesados", setData, initializer, pageNumber, rowPerPage, setTotalRows, query, status, setContadorColor);
    }
  }, [status]);
  useEffect(() => {
    if (query != "") {
      obtenerTodos("interesados", setData, initializer, pageNumber, rowPerPage, setTotalRows, query, status, setContadorColor);
    } else {
      if (searching != false) {
        obtenerTodos("interesados", setData, initializer, pageNumber, rowPerPage, setTotalRows, query, status, setContadorColor);
        setSearching(false)
      }

    }
  }, [query, searching]);
  const exportarClientes = () => {
    exportFiles(initializer)
  }
  const cargarData = (page, row) => {
    //obtenerTodos("interesados",setData,initializer);
    obtenerTodos("interesados", setData, initializer, page, row, setTotalRows, query, status, setContadorColor);
    setPageNumber(page)
  }
  const cargarData2 = () => {
    //obtenerTodos("interesados",setData,initializer);
    obtenerTodos("interesados", setData, initializer, pageNumber, rowPerPage, setTotalRows, query, status, setContadorColor);
    setPageNumber(0)
  }
  const eliminar = () => {
    eliminarCliente(open.id, initializer, cargarData2)

  }


  const obtenerPorcentaje = (rowData) => {
    if (rowData.position === "." || rowData.position == null) {
      var mydate = new Date(rowData.creado)
      let date2 = new Date(mydate)
      var hoy = new Date();
      var hoy2 = new Date(hoy.toLocaleString())
      let dif = (date2.getTime() - hoy2.getTime()) / 1000

      if ((Math.abs(dif) * 100 / 30) <= 100) {
        return (Math.abs(dif) * 100 / 30)
      } else {
        return (100)
      }
    }
    if (rowData.position === "Valido") {
      var mydate = new Date(rowData.modificado)
      let date2 = new Date(mydate)
      var hoy = new Date();
      var hoy2 = new Date(hoy.toLocaleString())
      let dif = (date2.getTime() - hoy2.getTime()) / 1000

      if ((Math.abs(dif) * 100 / 30) <= 100) {
        return (Math.abss(dif) * 100 / 30)
      } else {
        return (100)
      }
    }
    if (rowData.position === "Aprobado") {
      return (100)
    }
    if (rowData.position === "Negado") {
      return (100)
    }
    if (rowData.position === "Invalido") {
      return (100)
    }

    if (rowData.position === "Revision") {
      return (100)
    }
  }

  const fechaInicio = (rowData) => {

    var mydate = new Date(rowData.modificado)

    return mydate.toLocaleString()

  }

  let acciones = [
    {
      icon: TableIcons.PhoneInTalkIcon,
      tooltip: 'LLamadas',

      onClick: (event, rowData) => props.history.push("/client_calls", rowData)
    },
    {
      icon: TableIcons.EventIcon,
      tooltip: 'Agenda',

      onClick: (event, rowData) => props.history.push("/agenda", rowData)
    },
    {
      icon: TableIcons.AccountCircleIcon,
      tooltip: 'Cambiar interés',

      onClick: (event, rowData) => {
        setOpen3({ status: true, id: rowData.id })
        setEstadoP(rowData.purchase_status)
      }
    },
    {
      icon: TableIcons.FormatListNumberedRtlIcon,
      tooltip: 'Precalificador',

      onClick: (event, rowData) => props.history.push("/clientes/precalificador", rowData)
    }
   
    ,
    /*   {
        icon: TableIcons.AssignmentIndIcon,
        tooltip: "Editar asesor",
     
        onClick: (event, rowData) => setOpen4({status:true,id:rowData.id,asesor:rowData.asesor_id})
    } , */

    /*    {
          icon: TableIcons.MailOutlineIcon,
          tooltip: "Enviar correo",
       
          onClick: (event, rowData) => setOpen2({status:true,id:rowData.id})
      }  , */




    {
      icon: TableIcons.RefreshIcon,
      tooltip: "Refrescar",
      isFreeAction: true,
      onClick: (event, rowData) => {
        setPageNumber(0)
        obtenerTodos("interesados", setData, initializer, 0, 30, setTotalRows, query, status, setContadorColor)

      }
    }
  
   


  ]
  const existe = () => {
    let existe = false;
    permiso.slice().map((e2) => {
      if ("Uafe" == e2) {
        existe = true
      }

    })
    return existe
  };
  const existeRiesgo = () => {
    let existe = false;
    permiso.slice().map((e2) => {
      if ("Riesgo" == e2) {
        existe = true
      }

    })
    return existe
  };
  /*  if(existe()){
            acciones.push( 
                {
                    icon: TableIcons.AssignmentIndIcon,
                    tooltip: "Editar asesor",
                 
                    onClick: (event, rowData) => setOpen4({status:true,id:rowData.id,asesor:rowData.asesor_id})
                })   
          
               acciones.push( {
                    icon: TableIcons.AutorenewIcon,
                    tooltip: "Listas de control",
                 
                    onClick: (event, rowData) => props.history.push("/clientes/uafe",rowData)
                })  
        
          } */
  /* if(existeRiesgo()){
       acciones.push( 
          {
              icon: TableIcons.AutorenewIcon,
              tooltip: "Estado Riesgo",
           
              onClick: (event, rowData) => props.history.push("/clientes/risk",rowData)
          })    
    
          
   
    }*/
  const getDataAsesor = (id) => {
    let names = "Sin asignar";
    if (open4.status) {
      asesorData.slice().map((e) => {
        if (id == e.id) {
          names = e.names + " " + e.last_names
        }

      })
    }

    return names
  };

  const asignar = (asesorId, clientId) => {

    asignarAsesor({ asessor_id: asesorId, client_id: clientId, village_id: "" }, initializer)
  }
  const cambiarInteresCliente = () => {
    cambiarInteres({ purchase_status: estadoP, client_id: open3.id }, initializer)
  }
  
  return (
    <div style={{ paddingTop: 15, paddingLeft: 15, paddingRight: 15 }}>


      <Dialog
        open={open.status}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpen({ ...open, status: false })}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Confirmación de eliminación"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            ¿Está seguro de eliminar el interesado?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen({ ...open, status: false })} color="primary">
            Cancelar
          </Button>
          <Button onClick={() => {
            setOpen({ ...open, status: false })
            eliminar()
          }} color="primary">
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={open2.status}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpen2({ ...open, status: false })}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Confirmación de envío de mensaje"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Elija una plantilla de mensaje
          </DialogContentText>
          <Grid item md={12} xs={12}>
            <FormControl variant="outlined" style={{ width: "100%" }}>
              <InputLabel id="label">Plantilla</InputLabel>
              <Select
                labelId="label"
                value={plantilla}
                onChange={(e) => setPlantilla(e.target.value)}
                label="ciu"
              >
                <MenuItem value="">
                  <em>Seleccione una plantilla</em>
                </MenuItem>
                {plantillaData.map((e) => (
                  <MenuItem key={e.id} value={e.id}>
                    <em>{e.name}</em>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button color="primary" disabled={plantilla == ""} onClick={() => props.history.push("/clientes/enviarVarios", { template_id: plantilla })}>Envar mensaje</Button>

          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen2({ ...open, status: false })} color="primary">
            Cancelar
          </Button>
          <Button onClick={() => {
            setOpen({ ...open, status: false })
            enviarMensaje(open2.id, plantilla, initializer)
          }} color="primary">
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={open3.status}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpen3({ ...open3, status: false })}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Interés del cliente"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Elija una opción
          </DialogContentText>
          <Grid item md={12} xs={12}>
            <FormControl variant="outlined" style={{ width: "100%" }}>
              <InputLabel id="labelest">Interés</InputLabel>
              <Select
                labelId="labelest"
                value={estadoP}

                onChange={(e) => setEstadoP(e.target.value)}
                label="Interés"
              >
                <MenuItem value="">
                  <em>Seleccione una opción</em>
                </MenuItem>
                <MenuItem key={"2"} value={"2"}>
                  <em>Alto (Va a comprar en 8 días)</em>
                </MenuItem>
                <MenuItem key={"1"} value={"1"}>
                  <em>Medio (Va a comprar en un mes)</em>
                </MenuItem>
                <MenuItem key={"0"} value={"0"}>
                  <em>Bajo (No esta decidido)</em>
                </MenuItem>
              </Select>
            </FormControl>

          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen3({ ...open3, status: false })} color="primary">
            Cancelar
          </Button>
          <Button disabled={estadoP == ""} onClick={() => cambiarInteresCliente()} color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={open4.status}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpen4({ ...open4, status: false })}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Asignar asesor"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Elija un asesor para asignarlo
          </DialogContentText>
          <Grid item md={12} xs={12}>

            <Typography style={{ marginBottom: 10 }}>Asesor actual: {getDataAsesor(open4.asesor)}</Typography>
          </Grid>
          <Grid item md={12} xs={12}>
            <Autocomplete
              key={1}
              id={1}
              options={asesorData}

              getOptionLabel={(option) => option.dni + " - " + option.names + " " + option.last_names}
              onChange={(event, value) => {
                if (value != null) {
                  setAsesor(value.id)

                } else {
                  setAsesor('')

                }

              }} // prints the selected value
              renderInput={params => (
                <TextField {...params} label="Cambiar por asesor" variant="outlined" fullWidth />
              )}
            />
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen4({ ...open4, status: false })} color="primary">
            Cancelar
          </Button>
          <Button disabled={asesor == ""} onClick={() => asignar(asesor, open4.id)} color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>

      <Grid container justify='space-between' alignItems="center" style={{ marginBottom: '10px' }}>
        <Box>
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
            <Link style={{ fontSize: 14 }} color="inherit" onClick={() => props.history.push("dashboard")}>
              Dashboard
            </Link>
            <Typography style={{ fontSize: 14 }} color="textPrimary">Interesados</Typography>
          </Breadcrumbs>
        </Box>
        <Box style={{ display: 'flex' }}>


          <Button style={{ marginRight: '5px' }} startIcon={<AddCircleOutline />} variant="contained" color="secondary" onClick={() => props.history.push("/clientes/crear")}>
            Nuevo interesado
          </Button>
          {/*      <Button  style={{marginRight:'5px'}} startIcon={<GetAppIcon />} variant="contained" color="default" onClick={()=>exportarClientes()}>
                        Exportar
                    </Button>
                    */}
          {
            (1 == 2) ?
              <Importar />
              : null
          }
        </Box>
      </Grid>

      <Grid container>
        <Grid item xs="12">
          <MaterialTable
            onSearchChange={(e) => {

              setQuery(e)
              setSearching(true)

            }}
            tableRef={searchInput}
            icons={TableIcons}
            columns={[
              { title: "Fecha de registro", field: "inicio" },
              { title: "Cédula", field: "dni", type: "numeric" },

              { title: "Nombres", field: "full_name" },

              { title: "Email", field: "email" },
              { title: "Celular", field: "cellphone", type: "numeric" },
              { title: "Teléfono", field: "landline", type: "date" },
     
              { title: "Ciudad", field: "city_name" },
              { title: "Dependencia", field: "dependencia" },
              { title: "Estado civil", field: "estado_civil" },
              { title: "Asesor asignado", field: "asesor" },
              { title: "Resultado", field: "position_name" },
            ]}

            isLoading={initializer.loader}
            data={
              data.map((e) => {


                return ({ ...e, position_name: (e.position != null ? (e.position != "Invalido" ? e.position : "Documentos no válidos") : "Procesando"), inicio: fechaInicio(e), etapa: obtenerPorcentaje(e) + "%", calificacion: (e.work_place == "" || e.work_place == null ? "Procesando" : e.work_place), supervisor: (e.supervisor != null ? e.supervisor.nombres + " " + e.supervisor.apellidos : "Sin asignar"), city_name: e.city, recomendation: e.recomendation, dependencia: (e.dependencia != null ? (e.dependencia == '1' ? 'SI' : 'NO') : "N/A"), recomendation_id: e.recomendation, asesor: (e.asesor != null ? e.asesor.nombres + " " + e.asesor.apellidos : "Sin asignar"), asesor_id: (e.asesor != null ? e.asesor.id : ""), estado: e.estado_civil })

              })
            }

            localization={LocalizationTable}
            title="Interesados"
            actions={acciones}
         
            components={
              initializer.usuario != null ? JSON.parse(desencriptarJson(initializer.usuario)).user.type_user == "asessor" ?
                {
                  Toolbar: props1 => (
                    <div id='searchContainer'>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 10, paddingRight: '10px' }}>
                        {/*  <MTableToolbar width={150} style={{width:150}} {...props} /> */}
                        <Typography style={{ paddingLeft: '24px' }} variant="h6" component="h6">
                          Interesados
                        </Typography>
                        <div style={{ display: 'inline', textAlign: "left" }}>
                       
                        </div>
                      </div>
                      <div style={{ padding: '10px 10px' }}>

                        <Chip avatar={<Avatar style={{ backgroundColor: 'white' }}>{contadorColor != null ? contadorColor.Aprobado : 0}</Avatar>} onClick={() => setStatus("Aprobado")} label="Aprobado" color="default" style={{ color: 'black', marginRight: 5, backgroundColor: opciones.length != 0 ? opciones[0].color.split(",")[1] : 'white' }} />
                        <Chip avatar={<Avatar style={{ backgroundColor: 'white' }}>{contadorColor != null ? contadorColor.Revision : 0}</Avatar>} onClick={() => setStatus("Revision")} label="Revision" color="default" style={{ color: 'black', marginRight: 5, backgroundColor: opciones.length != 0 ? opciones[0].color.split(",")[2] : 'white' }} />
                        <Chip avatar={<Avatar style={{ backgroundColor: 'white' }}>{contadorColor != null ? contadorColor.Negado : 0}</Avatar>} onClick={() => setStatus("Negado")} label="Negado" color="default" style={{ color: 'black', marginRight: 5, backgroundColor: opciones.length != 0 ? opciones[0].color.split(",")[3] : 'white' }} />
                        <Chip onClick={() => {
                          setStatus("")
                          obtenerTodos("interesados", setData, initializer, pageNumber, rowPerPage, setTotalRows, query, "", setContadorColor)
                        }} label="Todos" color="default" />

                      </div>
                      <div style={{ paddingLeft: 15, paddingTop: 10, paddingBottom: 10, paddingRight: 15 }}>
                          <TextField
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="start">
                                  <SearchOutlined color="gray" />
                                </InputAdornment>
                              ),
                            }}
                            style={{ width: '100%', padding: 5 }}
                            autoFocus
                            placeholder="Buscar"
                            value={query}

                            onChange={(event) => {
                              setQuery(event.target.value)
                              setSearching(true)
                            }}
                          />
                        </div>
                    </div>
                  ),

                }
                : JSON.parse(desencriptarJson(initializer.usuario)).user.type_user == "supervisor" ? {
                  Toolbar: props1 => (
                    <div id='searchContainer'>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 10, paddingRight: '10px' }}>
                        {/*  <MTableToolbar width={150} style={{width:150}} {...props} /> */}
                        <Typography style={{ paddingLeft: '24px', fontWeight: 'bold' }} variant="h6" component="h6">
                          Interesados
                        </Typography>
                        <div style={{ display: 'inline', textAlign: "left" }}>

                        </div>
                      </div>
                      <div style={{ padding: '10px 10px' }}>

                        <Chip avatar={<Avatar style={{ backgroundColor: 'white' }}>{contadorColor != null ? contadorColor.Aprobado : 0}</Avatar>} onClick={() => setStatus("Aprobado")} label="Aprobado" color="default" style={{ color: 'black', marginRight: 5, backgroundColor: opciones.length != 0 ? opciones[0].color.split(",")[1] : 'white' }} />
                        <Chip avatar={<Avatar style={{ backgroundColor: 'white' }}>{contadorColor != null ? contadorColor.Revision : 0}</Avatar>} onClick={() => setStatus("Revision")} label="Revision" color="default" style={{ color: 'black', marginRight: 5, backgroundColor: opciones.length != 0 ? opciones[0].color.split(",")[2] : 'white' }} />
                        <Chip avatar={<Avatar style={{ backgroundColor: 'white' }}>{contadorColor != null ? contadorColor.Negado : 0}</Avatar>} onClick={() => setStatus("Negado")} label="Negado" color="default" style={{ color: 'black', marginRight: 5, backgroundColor: opciones.length != 0 ? opciones[0].color.split(",")[3] : 'white' }} />
                        <Chip onClick={() => {
                          setStatus("")
                          obtenerTodos("interesados", setData, initializer, pageNumber, rowPerPage, setTotalRows, query, "", setContadorColor)
                        }} label="Todos" color="default" />

                      </div>
                           <div style={{ paddingLeft: 15, paddingTop: 10, paddingBottom: 10, paddingRight: 15 }}>
                          <TextField
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="start">
                                  <SearchOutlined color="gray" />
                                </InputAdornment>
                              ),
                            }}
                            style={{ width: '100%', padding: 5 }}
                            autoFocus
                            placeholder="Buscar"
                            value={query}

                            onChange={(event) => {
                              setQuery(event.target.value)
                              setSearching(true)
                            }}
                          />
                        </div>
                    </div>
                  ),
                }
                  :
                  {
                    Toolbar: props1 => (
                      <div id='searchContainer'>

                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: 10, paddingRight: '10px' }}>
                          {/*  <MTableToolbar width={150} style={{width:150}} {...props} /> */}
                          <Typography style={{ paddingLeft: '24px' }} variant="h6" component="h6">
                            Interesados
                          </Typography>

                        </div>
                        <div style={{ paddingLeft: 10, paddingTop: 10 }}>

                          <Chip avatar={<Avatar style={{ backgroundColor: 'white' }}>{contadorColor != null ? contadorColor.Aprobado : 0}</Avatar>} onClick={() => setStatus("Aprobado")} label="Aprobado" color="default" style={{ color: 'black', marginRight: 5, backgroundColor: opciones.length != 0 ? opciones[0].color.split(",")[1] : 'white' }} />
                          <Chip avatar={<Avatar style={{ backgroundColor: 'white' }}>{contadorColor != null ? contadorColor.Revision : 0}</Avatar>} onClick={() => setStatus("Revision")} label="Revision" color="default" style={{ color: 'black', marginRight: 5, backgroundColor: opciones.length != 0 ? opciones[0].color.split(",")[2] : 'white' }} />
                          <Chip avatar={<Avatar style={{ backgroundColor: 'white' }}>{contadorColor != null ? contadorColor.Negado : 0}</Avatar>} onClick={() => setStatus("Negado")} label="Negado (Ahorro)" color="default" style={{ color: 'black', marginRight: 5, backgroundColor: opciones.length != 0 ? opciones[0].color.split(",")[3] : 'white' }} />
                          <Chip onClick={() => {
                            setStatus("")
                            obtenerTodos("interesados", setData, initializer, pageNumber, rowPerPage, setTotalRows, query, "", setContadorColor)
                          }} label="Todos" color="default" />

                        </div>
                        <div style={{ paddingLeft: 15, paddingTop: 10, paddingBottom: 10, paddingRight: 15 }}>
                          <TextField
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="start">
                                  <SearchOutlined color="gray" />
                                </InputAdornment>
                              ),
                            }}
                            style={{ width: '100%', padding: 5 }}
                            autoFocus
                            placeholder="Buscar"
                            value={query}

                            onChange={(event) => {
                              setQuery(event.target.value)
                              setSearching(true)
                            }}
                          />
                        </div>

                      </div>
                    ),
                    Pagination: props => (
                      <TablePagination
                        {...props}
                        rowsPerPageOptions={[30, 50, 100]}
                        rowsPerPage={rowPerPage}
                        count={totalRows}
                        page={
                          pageNumber
                        }
                        onChangePage={(e, page) => {

                          cargarData(page, rowPerPage)
                        }
                        }
                        onChangeRowsPerPage={event => {
                          props.onChangeRowsPerPage(event);
                          setRowPerPage(event.target.value);
                          cargarData(pageNumber, event.target.value)
                        }}
                      />
                    ),

                  } : null}
            options={{
              actionsCellStyle: !fullScreen ? {

                backgroundColor: theme.palette.type=="dark"?'#303030':'ghostwhite',
                boxShadow: "1px 3px 1px #9E9E9E",
                position: 'sticky',
                right: 0,
                borderLeftColor: 'gray',
                borderLeftWidth: 1,
                borderLeftStyle: 'solid',

                headerStyle: {
                  backgroundColor: '#039be5',
                  position: 'sticky',
                  right: 0,
                  zIndex: 11
                }
              } : null,
              headerStyle: {
                fontWeight: 'bold',
                position: 'sticky',
                top: 0
              },
              actionsColumnIndex: -1,
              debounceInterval: 500, searchAutoFocus: true,
              pageSize: 30,
              pageSizeOptions: [30, 50, 100],
              rowStyle: rowData => {
                if (rowData.position === "Aprobado") {
                  return { backgroundColor: opciones.length != 0 ? opciones[0].color.split(",")[1] : 'white' };//GREEN
                } else if (rowData.position === "Negado") {
                  return { backgroundColor: opciones.length != 0 ? opciones[0].color.split(",")[3] : 'white' };
                } else if (rowData.position === "Revision") {
                  return { backgroundColor: opciones.length != 0 ? opciones[0].color.split(",")[2] : 'white' };
                } else if (rowData.position === "Invalido") {

                  return { backgroundColor: opciones.length != 0 ? opciones[0].color.split(",")[0] : 'white' };
                } else if (rowData.position === "." || rowData.position == null) {
                  return { backgroundColor: opciones.length != 0 ? opciones[0].color.split(",")[0] : 'white' };//BLUE
                }

                return {};
              },


              search: false,
              maxBodyHeight: 400,
              padding: 'dense',

              cellStyle: {
                textAlign: 'left'
              },
              searchFieldStyle: {

                padding: 5
              }
            }}


          />
        </Grid>
      </Grid>

    </div>

  )
}
