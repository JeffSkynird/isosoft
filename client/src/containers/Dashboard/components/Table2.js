import React, { useContext,useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { FormControlLabel, IconButton, Paper, Button } from '@material-ui/core';

import ReactTable from 'react-table-v6'
import "react-table/react-table.css";
import EditIcon from '@material-ui/icons/Edit';
import { blue } from '@material-ui/core/colors';
import { obtenerIncidencias, guardarCitasLlamadas } from '../../../utils/API/citation'
import SearchIcon from '@material-ui/icons/Search';
import { obtenerLeadsPorAsesor } from "../../../utils/API/leads.js";
import TextField from '@material-ui/core/TextField';
import Initializer from "../../../store/Initializer";
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Accordion from '@material-ui/core/Accordion';
import Dialog from '@material-ui/core/Dialog';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import CallToActionIcon from '@material-ui/icons/CallToAction';

import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import SaveIcon from '@material-ui/icons/Save';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import withFixedColumns from 'react-table-hoc-fixed-columns';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Grow from '@material-ui/core/Grow';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import 'react-table-hoc-fixed-columns/lib/styles.css'
import Checkbox from '@material-ui/core/Checkbox';
import { desencriptarJson } from "../../../utils/security";
import { obtenerTodos } from "../../../utils/API/asessors.js";

import { useTheme } from '@material-ui/core/styles';
import { obtenerGestiones, obtenerGestionesCitas } from "../../../utils/API/gesitones";
const ReactTableFixedColumns = withFixedColumns(ReactTable);
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Grow ref={ref} {...props} />;
});
export default function DataGridDemo() {
  const initializer = useContext(Initializer);
  const theme = useTheme();

  const [open, setOpen] = React.useState({ status: false, data: [] });
  const [select, setSelect] = React.useState([]);
  const [clients, setClients] = React.useState([]);
  const [client, setClient] = React.useState("");
  const [indicadores, setIndicadores] = React.useState([]);
  const [asesorData, setAsesorData] = useState([])
  const [asesor, setAsesor] = useState('')

  const [data, setData] = React.useState([])
  const [statusSelected, setStatusSelected] = React.useState('')

  const [gestiones, setGestiones] = React.useState([])
  const [gestion, setGestion] = React.useState('')

  const [gestionesCitas, setGestionesCitas] = React.useState([])
  const [gestionCita, setGestionCita] = React.useState('')


  const [tipo, setTipo] = React.useState("");
  const [titulo, setTitulo] = React.useState("");

  React.useEffect(() => {
    if (initializer.usuario != null) {
      obtenerLeadsPorAsesor(setClients, initializer);
      obtenerGestiones(setGestiones)
      setTipo(JSON.parse(desencriptarJson(initializer.usuario)).user.type_user);
      if(JSON.parse(desencriptarJson(initializer.usuario)).user.type_user=="supervisor"){
        obtenerTodos(setAsesorData, initializer);
      }
   
    }
  }, [initializer.usuario]);

  const cargarGestionesCitas = (value) => {
    setGestionCita("")
    obtenerGestionesCitas(value, setGestionesCitas)
    setGestion(value)
  }
  React.useEffect(() => {

    if (initializer.usuario != null) {
      obtenerIncidencias(setData, initializer, setIndicadores, [])
    }
  }, [initializer.usuario]);
  const guardarSeleccionado = () => {

    if (statusSelected !== "") {
      let array = open.data.slice();
      let newArray = []
      array.map((e) => {
        newArray.push({ ...e, efectiva: statusSelected })

      })
      console.log(newArray)
      newArray.map((e) => {
        refrescar(e.tipo, e.id, e.efectiva)
      })
      console.log("AQUI")
      console.log(newArray)
      setOpen({ data: [], status: false })
      setStatusSelected('')
      setSelect([])
      guardarCitasLlamadas({ data: newArray }, initializer)
    }

  }
  const cambiarEstado = (es, id) => {
    let newArray = []
    console.log(id)
    data.map((e) => {
      if (e.numero == id) {
        newArray.push({ ...e, efectiva: es })
      } else {
        newArray.push({ ...e })
      }

    })
    console.log(newArray)
    setData(newArray)
  }
  const guardar = () => {
    guardarCitasLlamadas({ data: data }, initializer)
  }
  const cambiar = () => {

  }
  const refrescar = (tipo, id, valor) => {
    let array = data.slice()
    array.map((e, i) => {
      if (e.tipo == tipo) {
        if (id == e.id) {
          array[i].efectiva = valor
        }
      } else if (e.tipo == tipo) {
        if (id == e.id) {
          array[i].efectiva = valor
        }
      }

    })
    setData(array)
  }
  console.log(select)
  const extraer = () => {
    let temp = []
    select.map((e) => {
      temp.push({ ...data[(e - 1)] });
    })
    return temp
  }
  const buscar = (e) => {
    if (e == "filtro") {
      let filter = [{tipo:"asesor",valor:asesor},{ tipo: "type", valor: tipo }, { tipo: "title", valor: titulo }, { tipo: "client_id", valor: client }, { "tipo": 'accion', valor: gestionCita }]
      obtenerIncidencias(setData, initializer, setIndicadores, filter)
    } else {
      obtenerIncidencias(setData, initializer, setIndicadores, [])
    
      setTitulo("")
      setClient("")
    }

  }
  const buscarKpi = (fil) => {
    let filter = [{ tipo: "type", valor: fil }, { tipo: "title", valor: titulo }, { tipo: "client_id", valor: client }, { "tipo": 'accion', valor: gestionCita }]
    obtenerIncidencias(setData, initializer, setIndicadores, filter)
  }
  return (
    <Paper variant="outlined" style={{ padding: 20, width: '100%' }}>
      <Dialog
        open={open.status}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpen({ ...open, status: false })}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Guardardo múltiple"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Guarda los registros seleccionados
          </DialogContentText>
          <Grid item md={12} xs={12}>
            <FormControl variant="outlined" style={{ width: '100%' }} >
              <InputLabel id="demo-simple-select-outlined-label">Estado</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={statusSelected}
                onChange={(event) => setStatusSelected(event.target.value)}
                label="Estado"
              >
                <MenuItem value="">
                  <em>Elegir el estado</em>
                </MenuItem>
                <MenuItem value={1}>Efectiva</MenuItem>
                <MenuItem value={0}>No efectiva</MenuItem>

              </Select>
            </FormControl>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setOpen({ ...open, status: false })
            setStatusSelected('')
          }
          } color="primary">
            Cancelar
          </Button>
          <Button onClick={() => guardarSeleccionado()} color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>

      <Accordion style={{ marginBottom: 10 }} elevation={0}>
        <AccordionSummary
          style={{ padding: 0, }}
          aria-label="Expand"
          aria-controls="additional-actions1-content"
          id="additional-actions1-header"
        >
          <KeyboardArrowDownIcon color="primary" />  <Typography color="primary">       Filtros de búsqueda</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {
            clients.length!=0?
     <Grid item md={3} xs={12}>
     <Autocomplete
       options={clients}
       style={{ width: '95%' }}
       size="small"
       getOptionLabel={(option) => option.cedula + " - " + option.nombres + " " + option.apellidos}
       onChange={(event, value) => {
         if (value != null) {

           setClient(value.id_cliente)
         } else {

           setClient('')

         }

       }} // prints the selected value
       renderInput={params => (
         <TextField {...params} label="Interesado" variant="outlined" fullWidth />
       )}

     />

   </Grid>:null
          }
     
          {
            tipo == "supervisor" || tipo == "manager" ? (
              <Grid item xs={12} md={3} >
                <Autocomplete
                style={{ width: '95%' }} 
                  options={asesorData}
                  size="small"
                  getOptionLabel={(option) => option.dni + " - " + option.names + " " + option.last_names}
                  onChange={(event, value) => {
                    if (value != null) {
                      setAsesor(value.id)
                    } else {
                      setAsesor('')
                    }

                  }} // prints the selected value
                  renderInput={params => (
                    <TextField {...params} label="Asesor" variant="outlined" fullWidth />
                  )}
                />

              </Grid>)
              : null
          }
          <Grid item md={3} xs={12}>
            <FormControl size="small" variant="outlined" style={{ width: '95%' }} >
              <InputLabel id="demo-simple-select-outlined-label">Gestión</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={gestion}
                onChange={(event) => cargarGestionesCitas(event.target.value)}
                label="Estado"
              >
                <MenuItem value="">
                  <em>Elegir tipo</em>
                </MenuItem>

                {
                  gestiones.map((e) => (
                    <MenuItem value={e.id_gestion}>{e.nombre}</MenuItem>
                  ))
                }

              </Select>
            </FormControl>
          </Grid>
          <Grid item md={3} xs={12}>
            <FormControl size="small" variant="outlined" style={{ width: '95%' }} >
              <InputLabel id="demo-simple-select-outlined-label">Acción</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={gestionCita}
                onChange={(event) => setGestionCita(event.target.value)}
                label="Estado"
              >
                <MenuItem value="">
                  <em>Elegir un canal</em>
                </MenuItem>
                {
                  gestionesCitas.map((e) => (
                    <MenuItem value={e.id_gestion_cita}>{e.nombre}</MenuItem>
                  ))
                }

              </Select>
            </FormControl>
          </Grid>
          <Grid item md={3} xs={12} style={{ display: 'flex', alignItems: 'center' }}>
            <Button
              color="primary"
              size="md"
              variant="outlined"

              round="true"
              icon="true"
              onClick={() => buscar('filtro')}
            >
              <SearchIcon fontSize="small" /> Buscar
            </Button>
            {
              tipo != "" || titulo != "" || client != "" ?
                <Button
                  style={{ marginLeft: 10 }}
                  color="default"
                  size="md"
                  variant="outlined"

                  round="true"
                  icon="true"
                  onClick={() => buscar('todos')}
                >
                     <CallToActionIcon fontSize="small" style={{marginRight:5}} />   Limpiar
                </Button>
                : null
            }

          </Grid>

        </AccordionDetails>
      </Accordion>
      {/*    <div style={{ marginBottom: 10, display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', width: '100%' }}>

          {
            indicadores.map((e, i) => (
              <div onClick={()=>buscarKpi(i==0?'cita':'llamada')} style={{ cursor:'pointer',display:'flex', flexDirection: 'column', padding: 10, width: i == 0 ? '30%' : '70%', height: 60, backgroundColor: i == 0 ? '#3498db' : '#2ecc71' }}>
                <span style={{ color: 'white', fontSize: 18 }}>{e.nombre=="Citas"?"Total citas":"Total Llamadas"}</span>
                <span style={{ color: 'white', fontSize: 16 }}>{e.valor}</span>
              </div>

            ))
          }
        </div>
      </div> */}

      <ReactTableFixedColumns
        columns={[

          {
            Header: () => <b style={{ display: 'block', textAlign: 'left' }}>No.</b>,
            accessor: "numero",
            headerStyle: { backgroundColor: theme.palette.type == "dark" ? "#424242" : "white" }

          },

          {
            Header: () => <b style={{ display: 'block', textAlign: 'left' }}>Tipo</b>,
            accessor: "tipo",
            headerStyle: { backgroundColor: theme.palette.type == "dark" ? "#424242" : "white" }
          },

          {
            Header: () => <b style={{ display: 'block', textAlign: 'left' }}>Interesado</b>,
            accessor: "nombres_completos",
            headerStyle: { backgroundColor: theme.palette.type == "dark" ? "#424242" : "white" }

          },

          {
            Header: () => <b style={{ display: 'block', textAlign: 'left' }}>Comentario</b>,
            accessor: "descripcion",
            headerStyle: { backgroundColor: theme.palette.type == "dark" ? "#424242" : "white" }

          },
          {
            Header: () => <b style={{ display: 'block', textAlign: 'left' }}>Fecha</b>,

            accessor: "fecha",
            headerStyle: { backgroundColor: theme.palette.type == "dark" ? "#424242" : "white" }

          },

          {
            Header: () => <b style={{ display: 'block', textAlign: 'left' }}>Efectiva</b>,
            accessor: "efectiva",
            headerStyle: { backgroundColor: theme.palette.type == "dark" ? "#424242" : "white" },
            Cell: ({ row }) => {

              return (
                <FormControl style={{ width: '100%' }}>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    readOnly={true}
                    value={row.efectiva}
                    onChange={(e) => cambiarEstado(e.target.value, row.numero)}
                  >
                    <MenuItem value={1}>Efectiva</MenuItem>
                    <MenuItem value={0}>No efectiva</MenuItem>
                  </Select>
                </FormControl>

              )
            },
          }
          /*  ,
           {
             Header:()=><b>Acciones</b>,
             accessor: "actions",
             sortable: false,
             filterable: false,
             fixed: "right",
             fixed: 'right',
             sticky: "right",
             width: 120
           }, */

        ]}
        style={{
          height: "500px",
          textAlign: 'left'
        }}
        getTdProps={(a, b, { fixed }) => {
          return ({ className: '', style: { background: fixed ? theme.palette.type == "dark" ? "#303030" : "white" : theme.palette.type == "dark" ? "#303030" : "white" } });
        }}
        defaultPageSize={50}
        previousText="Anterior"
        nextText="Siguiente"
        rowsText="registros"
        pageText="P&aacute;gina"
        noDataText="No existen registros"
        ofText="de"
        showPaginationBottom={true}
        className="-striped -highlight"
        data={data}
      />
    </Paper>
  );
}