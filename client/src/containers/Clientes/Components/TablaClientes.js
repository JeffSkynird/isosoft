import React, { useContext, useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { FormControlLabel, IconButton, Paper, Button } from '@material-ui/core';

import ReactTable from 'react-table-v6'
import "react-table/react-table.css";
import EditIcon from '@material-ui/icons/Edit';
import { blue } from '@material-ui/core/colors';
import Tooltip from "@material-ui/core/Tooltip";
import { obtenerIncidencias, guardarCitasLlamadas } from '../../../utils/API/citation'
import SearchIcon from '@material-ui/icons/Search';
import { obtenerLeadsPorAsesor } from "../../../utils/API/leads.js";
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import TextField from '@material-ui/core/TextField';
import Initializer from "../../../store/Initializer";
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import CallToActionIcon from '@material-ui/icons/CallToAction';
import HistoryIcon from '@material-ui/icons/History';
import Grid from '@material-ui/core/Grid';
import Accordion from '@material-ui/core/Accordion';
import Dialog from '@material-ui/core/Dialog';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import SaveIcon from '@material-ui/icons/Save';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

import { obtenerTodosTabla, exportFiles, eliminarCliente, cambiarInteres } from '../../../utils/API/clientes.js'
import { obtenerOpciones } from '../../../utils/API/precalificator'
import withFixedColumns from 'react-table-hoc-fixed-columns';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Grow from '@material-ui/core/Grow';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import 'react-table-hoc-fixed-columns/lib/styles.css'
import FormatListNumberedRtlIcon from '@material-ui/icons/FormatListNumberedRtl';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PhoneInTalkIcon from '@material-ui/icons/PhoneInTalk';
import DeleteOutline from '@material-ui/icons/DeleteOutlineOutlined';
import EventIcon from '@material-ui/icons/Event';
import { desencriptarJson } from '../../../utils/security'
import Checkbox from '@material-ui/core/Checkbox';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
const ReactTableFixedColumns = withFixedColumns(ReactTable);
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Grow ref={ref} {...props} />;
});

export default function DataGridDemo(props) {
    const initializer = useContext(Initializer);
    const theme = useTheme();

    const [open, setOpen] = React.useState({ status: false, data: [] });
    const [select, setSelect] = React.useState([]);
    const [clients, setClients] = React.useState([]);
    const [client, setClient] = React.useState("");
    const [indicadores, setIndicadores] = React.useState([]);
    const [pageNumber, setPageNumber] = React.useState(0);
    const [rowPerPage, setRowPerPage] = React.useState(30);
    const [totalRows, setTotalRows] = React.useState(5);
    const [opciones, setOpciones] = React.useState([]);
    const [query, setQuery] = useState("");
    const [status, setStatus] = useState("");
    const [contadorColor, setContadorColor] = React.useState(null)
    const [data, setData] = React.useState([])
    const [statusSelected, setStatusSelected] = React.useState('')


    const [open3, setOpen3] = React.useState(false);
    const [estadoP, setEstadoP] = React.useState('');

    const [tipo, setTipo] = React.useState("");
    const [titulo, setTitulo] = React.useState("");

    const [filtroNombre, setFiltroNombre] = React.useState("");
    const [filtroCedula, setFiltroCedula] = React.useState("");
    const [filtroColor, setFiltroColor] = React.useState("");
    const [filtroCorreo, setFiltroCorreo] = React.useState("");


    React.useEffect(() => {
        if (initializer.usuario != null) {

            obtenerTodosTabla("interesados", setData, initializer, pageNumber, rowPerPage, setTotalRows, query, status, setContadorColor, []);
            obtenerOpciones(setOpciones, initializer);
            //obtenerPermiso(setPermiso, initializer);
            setTipo(JSON.parse(desencriptarJson(initializer.usuario)).user.type_user)
        }




    }, [initializer.usuario])


    const extraer = () => {
        let temp = []
        select.map((e) => {
            temp.push({ ...data[(e - 1)] });
        })
        return temp
    }

    const changeColor = (position) => {
        console.log(theme.palette.type)
        if (position != undefined) {
            if (position.row.position_name === "Aprobado") {
                return opciones.length != 0 ? opciones[0].color.split(",")[1] : theme.palette.type == "dark" ? "#303030" : "white";//GREEN
            } else if (position.row.position_name === "Negado") {
                return opciones.length != 0 ? opciones[0].color.split(",")[3] : theme.palette.type == "dark" ? "#303030" : "white";
            } else if (position.row.position_name === "Revision") {
                return opciones.length != 0 ? opciones[0].color.split(",")[2] : theme.palette.type == "dark" ? "#303030" : "white"
            } else if (position.row.position_name === "Invalido") {

                return opciones.length != 0 ? opciones[0].color.split(",")[0] : theme.palette.type == "dark" ? "#303030" : "white";
            } else if (position.row.position_name === "." || position.row.position_name == null) {
                return theme.palette.type == "dark" ? "#303030" : opciones.length != 0 ? opciones[0].color.split(",")[0] : "white";//BLUE
            } else {
                return theme.palette.type == "dark" ? "#303030" : 'white'
            }
        }


    }
    useEffect(() => {
        if (status != "") {

            obtenerTodosTabla("interesados", setData, initializer, pageNumber, rowPerPage, setTotalRows, query, status, setContadorColor, []);
        }
    }, [status]);
    const eliminar = () => {
        eliminarCliente(open.id, initializer, cargarData2)

    }
    const cambiarInteresCliente = () => {
        cambiarInteres({ purchase_status: estadoP, client_id: open3.id }, initializer)
        setOpen3(false)
    }
    const cargarData2 = () => {
        //obtenerTodos("interesados",setData,initializer);
        obtenerTodosTabla("interesados", setData, initializer, pageNumber, rowPerPage, setTotalRows, query, status, setContadorColor, []);
        //obtenerTodos("interesados", setData, initializer, pageNumber, rowPerPage, setTotalRows, query, status, setContadorColor);
        setPageNumber(0)
    }
    const buscar = (e) => {
        if (e == "filtro") {
            let filter = [{ tipo: "cedula", valor: filtroCedula }, { tipo: "correo", valor: filtroCorreo }, { tipo: "nombre", valor: filtroNombre }, { tipo: "color", valor: filtroColor }]

            obtenerTodosTabla("interesados", setData, initializer, pageNumber, rowPerPage, setTotalRows, query, status, setContadorColor, filter);
        } else {
            obtenerTodosTabla("interesados", setData, initializer, pageNumber, rowPerPage, setTotalRows, query, status, setContadorColor, []);
            setFiltroCedula("")
            setFiltroColor("")
            setFiltroNombre("")
            setFiltroCorreo("")
        }


    }
    let columnsT=[]
    if(tipo=="asessor"){
        columnsT=[

            {
                Header: () => <b style={{ display: 'block', textAlign: 'left' }}>No.</b>,
                accessor: "numero",
                width: 30,
                headerStyle: { backgroundColor: theme.palette.type == "dark" ? "#424242" : "white" },

            },
            {
                Header: () => <b style={{ display: 'block', textAlign: 'left' }}>Registro</b>,
                accessor: "inicio",
                headerStyle: { backgroundColor: theme.palette.type == "dark" ? "#424242" : "white" },
            },

            {
                Header: () => <b style={{ display: 'block', textAlign: 'left' }}>Cédula</b>,
                accessor: "dni",
                headerStyle: { backgroundColor: theme.palette.type == "dark" ? "#424242" : "white" },

            },
            {
                Header: () => <b style={{ display: 'block', textAlign: 'left' }}>Nombres</b>,
                accessor: "full_name",
                width: 260,
                headerStyle: { backgroundColor: theme.palette.type == "dark" ? "#424242" : "white" },
            },
            {
                Header: () => <b style={{ display: 'block', textAlign: 'left' }}>Correo</b>,
                accessor: "email",
                headerStyle: { backgroundColor: theme.palette.type == "dark" ? "#424242" : "white" },

            },
            {
                Header: () => <b style={{ display: 'block', textAlign: 'left' }}>Celular</b>,

                accessor: "cellphone",
                headerStyle: { backgroundColor: theme.palette.type == "dark" ? "#424242" : "white" },

            },
            {
                Header: () => <b style={{ display: 'block', textAlign: 'left' }}>Teléfono</b>,

                accessor: "landline",
                headerStyle: { backgroundColor: theme.palette.type == "dark" ? "#424242" : "white" },

            },
            {
                Header: () => <b style={{ display: 'block', textAlign: 'left' }}>Dependencia</b>,

                accessor: "dependencia",
                headerStyle: { backgroundColor: theme.palette.type == "dark" ? "#424242" : "white" },

            },

            
            {
                Header: () => <b style={{ display: 'block', textAlign: 'left' }}>Resultado</b>,

                accessor: "position_name",
                headerStyle: { backgroundColor: theme.palette.type == "dark" ? "#424242" : "white" },

            }

            ,
            {
                Header: () => <b>Acciones</b>,
                accessor: "actions",
                sortable: false,
                filterable: false,
                fixed: "right",
                fixed: 'right',
                headerStyle: { backgroundColor: theme.palette.type == "dark" ? "#424242" : "white" },
                sticky: "right",
                width: tipo!="supervisor"?190:0
                ,
                Cell: ({ row }) => {

                    return (
                        <div>
                                   <Tooltip title="Agenda">
                            <IconButton aria-label="delete" onClick={() => props.history.push("/agenda", row._original)}>
                                <EventIcon fontSize="small" />
                            </IconButton>
                            </Tooltip>
                            <Tooltip title="Historial">
                            <IconButton aria-label="delete" onClick={() => {

                                props.history.push("/citations", row._original)
                            }
                            }>
                                <HistoryIcon fontSize="small" />
                            </IconButton>
                            </Tooltip>
                          
                            <Tooltip title="Cambiar interés">
                            <IconButton aria-label="delete" onClick={() => {

                                setOpen3({ status: true, id: row._original.id })
                                setEstadoP(row._original.purchase_status)
                            }
                            }>
                                <AccountCircleIcon fontSize="small" />
                            </IconButton>
                            </Tooltip>
                            <Tooltip title="Precalificador">
                            <IconButton aria-label="delete" onClick={() => props.history.push("/clientes/precalificador", row._original)}>
                                <FormatListNumberedRtlIcon fontSize="small" />
                            </IconButton>
                            </Tooltip>
                        </div>

                    )
                },

            },

        ]
    }else{
         columnsT = [

            {
                Header: () => <b style={{ display: 'block', textAlign: 'left' }}>No.</b>,
                accessor: "numero",
                width: 30,
                headerStyle: { backgroundColor: theme.palette.type == "dark" ? "#424242" : "white" },

            },
            {
                Header: () => <b style={{ display: 'block', textAlign: 'left' }}>Registro</b>,
                accessor: "inicio",
                headerStyle: { backgroundColor: theme.palette.type == "dark" ? "#424242" : "white" },
            },

            {
                Header: () => <b style={{ display: 'block', textAlign: 'left' }}>Cédula</b>,
                accessor: "dni",
                headerStyle: { backgroundColor: theme.palette.type == "dark" ? "#424242" : "white" },

            },
            {
                Header: () => <b style={{ display: 'block', textAlign: 'left' }}>Nombres</b>,
                accessor: "full_name",
                width: 260,
                headerStyle: { backgroundColor: theme.palette.type == "dark" ? "#424242" : "white" },
            },
            {
                Header: () => <b style={{ display: 'block', textAlign: 'left' }}>Correo</b>,
                accessor: "email",
                headerStyle: { backgroundColor: theme.palette.type == "dark" ? "#424242" : "white" },

            },
            {
                Header: () => <b style={{ display: 'block', textAlign: 'left' }}>Celular</b>,

                accessor: "cellphone",
                headerStyle: { backgroundColor: theme.palette.type == "dark" ? "#424242" : "white" },

            },
            {
                Header: () => <b style={{ display: 'block', textAlign: 'left' }}>Teléfono</b>,

                accessor: "landline",
                headerStyle: { backgroundColor: theme.palette.type == "dark" ? "#424242" : "white" },

            },
            {
                Header: () => <b style={{ display: 'block', textAlign: 'left' }}>Dependencia</b>,

                accessor: "dependencia",
                headerStyle: { backgroundColor: theme.palette.type == "dark" ? "#424242" : "white" },

            },

            {
                Header: () => <b style={{ display: 'block', textAlign: 'left' }}>Asesor asignado</b>,

                accessor: "asesor_name",
                width: 230,
                headerStyle: { backgroundColor: theme.palette.type == "dark" ? "#424242" : "white" },

            },
            {
                Header: () => <b style={{ display: 'block', textAlign: 'left' }}>Resultado</b>,

                accessor: "position_name",
                headerStyle: { backgroundColor: theme.palette.type == "dark" ? "#424242" : "white" },

            }

            ,
            {
                Header: () => <b>Acciones</b>,
                accessor: "actions",
                sortable: false,
                filterable: false,
                fixed: "right",
                fixed: 'right',
                headerStyle: { backgroundColor: theme.palette.type == "dark" ? "#424242" : "white" },
                sticky: "right",
                width: tipo!="supervisor"?190:0
                ,
                Cell: ({ row }) => {

                    return (
                        <div>
                                   <Tooltip title="Agenda">
                            <IconButton aria-label="delete" onClick={() => props.history.push("/agenda", row._original)}>
                                <EventIcon fontSize="small" />
                            </IconButton>
                            </Tooltip>
                            <Tooltip title="Historial">
                            <IconButton aria-label="delete" onClick={() => {

                                props.history.push("/citations", row._original)
                            }
                            }>
                                <HistoryIcon fontSize="small" />
                            </IconButton>
                            </Tooltip>
                          
                            <Tooltip title="Cambiar interés">
                            <IconButton aria-label="delete" onClick={() => {

                                setOpen3({ status: true, id: row._original.id })
                                setEstadoP(row._original.purchase_status)
                            }
                            }>
                                <AccountCircleIcon fontSize="small" />
                            </IconButton>
                            </Tooltip>
                            <Tooltip title="Precalificador">
                            <IconButton aria-label="delete" onClick={() => props.history.push("/clientes/precalificador", row._original)}>
                                <FormatListNumberedRtlIcon fontSize="small" />
                            </IconButton>
                            </Tooltip>
                        </div>

                    )
                },

            },

        ]
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
                    <Grid item md={4} xs={12}>

                        <TextField id="outlined-basic" size="small" label="Cédula" variant="outlined" style={{ width: '95%' }} value={filtroCedula} onChange={(e) => setFiltroCedula(e.target.value)} />
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <TextField id="outlined-basic" size="small" label="Nombres" variant="outlined" style={{ width: '95%' }} value={filtroNombre} onChange={(e) => setFiltroNombre(e.target.value)} />
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <TextField id="outlined-basic" size="small" label="Correo" variant="outlined" style={{ width: '95%' }} value={filtroCorreo} onChange={(e) => setFiltroCorreo(e.target.value)} />
                    </Grid>

                    <Grid item md={6} xs={12}>
                        <FormControl size="small" variant="outlined" style={{ width: '95%' }} >
                            <InputLabel id="demo-simple-select-outlined-label">Tipo</InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={filtroColor}
                                onChange={(event) => setFiltroColor(event.target.value)}
                                label="Estado"
                            >
                                <MenuItem value="">
                                    <em>Elegir tipo</em>
                                </MenuItem>
                                <MenuItem value={'Aprobado'}>Aprobado</MenuItem>
                                <MenuItem value={'Revision'}>Revision</MenuItem>
                                <MenuItem value={'Negado'}>Negado</MenuItem>

                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item md={6} xs={12} style={{ display: 'flex', alignItems: 'center' }}>
                        <Button
                            color="secondary"
                            size="md"
                            variant="outlined"

                            round="true"
                            icon="true"
                            onClick={() => buscar('filtro')}
                        >
                            <SearchIcon fontSize="small" /> Buscar
                        </Button>
                        {
                            filtroCedula != "" || filtroColor != "" || filtroCorreo != "" || filtroNombre != "" ?
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
            <div style={{ marginBottom: 10, display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    {
                        tipo!="supervisor"?
                        <Button
                        color="secondary"
                        size="md"
                        variant="contained"
                        startIcon={<AddCircleOutline />}
                        size="small"
                        round="true"
                        icon="true"
                        onClick={() => props.history.push("/clientes/crear")}
                    >
                        Nuevo interesado
                    </Button>
                        :null
                    }
                   
                    {
                        select.length != 0 ?
                            <Button
                                color="secondary"
                                style={{ marginLeft: 10 }}
                                size="md"
                                variant="outlined"
                                size="small"
                                round="true"
                                icon="true"
                                onClick={() => setOpen({ data: extraer(select), status: true })}
                            >
                                <AutorenewIcon fontSize="small" /> Cambiar estado
                            </Button>

                            :
                            null
                    }
                </div>
                <div>

                    <Chip avatar={<Avatar style={{ backgroundColor: 'white' }}>{contadorColor != null ? contadorColor.Aprobado : 0}</Avatar>} onClick={() => setStatus("Aprobado")} label="Aprobado" color="default" style={{ color: 'black', marginRight: 5, backgroundColor: opciones.length != 0 ? opciones[0].color.split(",")[1] : 'white' }} />
                    <Chip avatar={<Avatar style={{ backgroundColor: 'white' }}>{contadorColor != null ? contadorColor.Revision : 0}</Avatar>} onClick={() => setStatus("Revision")} label="Revision" color="default" style={{ color: 'black', marginRight: 5, backgroundColor: opciones.length != 0 ? opciones[0].color.split(",")[2] : 'white' }} />
                    <Chip avatar={<Avatar style={{ backgroundColor: 'white' }}>{contadorColor != null ? contadorColor.Negado : 0}</Avatar>} onClick={() => setStatus("Negado")} label="Negado" color="default" style={{ color: 'black', marginRight: 5, backgroundColor: opciones.length != 0 ? opciones[0].color.split(",")[3] : 'white' }} />
                    <Chip avatar={<Avatar style={{ backgroundColor: 'white' }}>{contadorColor != null ? contadorColor.Blanco : 0}</Avatar>} onClick={() => setStatus("Blanco")} label="Blanco" color="default" style={{ color: 'black', marginRight: 5 }} />

                    <Chip  avatar={<Avatar style={{ backgroundColor: 'white' }}>{contadorColor != null ? contadorColor.Todos : 0}</Avatar>} onClick={() => {
                        setStatus("")
                        obtenerTodosTabla("interesados", setData, initializer, pageNumber, rowPerPage, setTotalRows, query, "", setContadorColor, []);
                    }} label="Todos" color="default" />
                </div>
            </div>

            <ReactTableFixedColumns
                classNameLeftFixedColumns=""
                classNameRightFixedColumns=""
                stripedColor="#f00"
                highlightColor="#f00"
                columns={columnsT}
                style={{
                    height: "500px",
                    textAlign: 'left'
                }}
                getTdProps={(a, b, { fixed }) => {
                    return ({ className: '', style: { background: fixed ? theme.palette.type == "dark" ? "#303030" : "white" : changeColor(b) } });
                }}
                defaultPageSize={50}
                previousText="Anterior"
                nextText="Siguiente"
                rowsText="registros"
                pageText="P&aacute;gina"
                noDataText="No existen registros"
                ofText="de"
                showPaginationBottom={true}

                data={data}
            />
        </Paper>
    );
}