import React, { useState, useContext } from 'react'
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Accordion from '@material-ui/core/Accordion';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import SearchIcon from '@material-ui/icons/Search';
import Grid from "@material-ui/core/Grid";
import es from 'date-fns/locale/es'
import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import ChromeReaderModeIcon from '@material-ui/icons/ChromeReaderMode';
import CallToActionIcon from '@material-ui/icons/CallToAction';
import IconButton from '@material-ui/core/IconButton';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Select from "@material-ui/core/Select";

import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import AddCircleOutline from "@material-ui/icons/AddCircleOutline";
import {
    DatePicker,
    KeyboardDatePicker,
    MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import ClearIcon from '@material-ui/icons/Clear';
import GetAppIcon from '@material-ui/icons/GetApp';
import { Paper } from '@material-ui/core';
import Box from "@material-ui/core/Box";
import { obtenerTodos } from "../../utils/API/supervisors";
import Initializer from '../../store/Initializer'
import { utcDate } from '../../utils/Date'
import Button from "@material-ui/core/Button";
import { TreeTable, TreeState } from 'cp-react-tree-table';
import Typography from "@material-ui/core/Typography";
import { obtenerMetasPorMes, exportarMetas,exportarMetasExcel } from '../../utils/API/goals'
import { obtenerTodosKpis } from '../../utils/API/kpis.js'
import Menu from '@material-ui/core/Menu';

import './header.css';
import './table.css';
import './responsive.css';
export default function GoalAdmin(props) {
    const initializer = useContext(Initializer);

    const [supervisor, setSupervisor] = React.useState("")
    const [mes, setMes] = React.useState(new Date())
    const [dates, setDates] = React.useState([])
    const [fechas, setFechas] = React.useState([])
    const [expand, setExpand] = React.useState(false)

    const [supervisorData, setSupervisorData] = useState([]);


    const [data, setData] = React.useState(TreeState.create([]))

    const [parametrosData, setParametrosData] = useState([])

    const [parametro, setParametro] = useState('')
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClickMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setAnchorEl(null);
      };
    
    React.useEffect(() => {

        if (initializer.usuario != null) {

            obtenerTodos(setSupervisorData, initializer)
            obtenerMetasPorMes({ fechas: [utcDate(mes)], id_indicador: parametro, id_supervisor: supervisor }, cargarData, initializer)
            obtenerTodosKpis(setParametrosData, initializer);

        }



    }, [initializer.usuario])

    const descargar = () => {
        if (dates.length != 0) {
            exportarMetas({ fechas: dates, id_indicador: parametro, id_supervisor: supervisor }, initializer)

        } else {
            exportarMetas({ fechas: [utcDate(mes)], id_indicador: parametro, id_supervisor: supervisor }, initializer)

        }
    }
    const decargarExcel=()=>{
        
        if (dates.length != 0) {
            exportarMetasExcel({ fechas: dates, id_indicador: parametro, id_supervisor: supervisor }, initializer)

        } else {
            exportarMetasExcel({ fechas: [utcDate(mes)], id_indicador: parametro, id_supervisor: supervisor }, initializer)

        }
    }
    const cargarData = (info) => {
        setData(TreeState.expandAll(TreeState.create(info)))
    }
    const buscar = () => {
        if (dates.length != 0) {
            obtenerMetasPorMes({ fechas: dates, id_indicador: parametro, id_supervisor: supervisor }, cargarData, initializer)
        } else {
            obtenerMetasPorMes({ fechas: [utcDate(mes)], id_indicador: parametro, id_supervisor: supervisor }, cargarData, initializer)
        }

    }
    const limpiar = () => {
        obtenerMetasPorMes({ fechas: [utcDate(new Date())], id_indicador: parametro, id_supervisor: "" }, cargarData, initializer)
        setDates([])
        setMes(new Date())
        setSupervisor("")
    }
    const handleOnChange = (newValue) => {
        setData(newValue);
    }

    const handleOnExpandAll = () => {
        if (expand) {
            setData(TreeState.collapseAll(data));
            setExpand(false)
        } else {
            setData(TreeState.expandAll(data));
            setExpand(true)
        }

    }


    return (
        <Grid
            container
            spacing={2}
            style={{
                paddingTop: 15,
                paddingLeft: 15,
                paddingRight: 15,
                marginBottom: "10px",
            }}
        >
            <Box style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                <Typography style={{ fontSize: 24 }} color="textPrimary">Configuración de Metas</Typography>
            </Box>
            <Paper variant="outlined" style={{ padding: 10, width: '100%' }}>

                <Grid item xs={12} >

                    <Accordion elevation={0} component="div" style={{ margin: 0 }} expanded={true} >
                        <AccordionSummary
                            style={{ padding: 0, }}
                            aria-label="Expand"
                            aria-controls="additional-actions1-content"
                            id="additional-actions1-header"
                        >
                            <KeyboardArrowDownIcon color="primary" />  <Typography color="primary">       Filtros de búsqueda</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid item md={3} xs={12}>
                                <Autocomplete
                                    size="small"
                                    style={{ width: '95%' }}
                                    options={supervisorData}

                                    getOptionLabel={(option) => option.dni + " - " + option.names + " " + option.last_names}
                                    onChange={(event, value) => {
                                        if (value != null) {

                                            setSupervisor(value.id)

                                        } else {

                                            setSupervisor('')


                                        }

                                    }} // prints the selected value
                                    renderInput={params => (
                                        <TextField {...params} label="Supervisor" variant="outlined" fullWidth />
                                    )}
                                />


                            </Grid>
                            <Grid item md={3} xs={12}>
                                <FormControl variant="outlined" style={{ width: "95%" }} size="small" >
                                    <InputLabel id="pm">Indicador</InputLabel>
                                    <Select
                                        labelId="pm"
                                        value={parametro}
                                        onChange={(e) => {
                                            setParametro(e.target.value)
                                        }}
                                        label="Indicador"
                                    >
                                        <MenuItem value="">
                                            <em>Seleccione una opción</em>
                                        </MenuItem>
                                        {parametrosData.map((e) => (
                                            <MenuItem key={e.id} value={e.id}>
                                                <em>{e.nombre}</em>
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item md={3} xs={12}>


                                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}>
                                    <DatePicker
                                        autoOk
                                        ampm={false}
                                        size="small"
                                        inputVariant="outlined"
                                        label="Mes"
                                        style={{ width: "95%" }}
                                        // disablePast
                                        views={["year", "month"]}
                                        format="yyyy-MM"
                                        value={mes}

                                        onChange={date => {
                                            setMes(date)

                                            let dateTemp = dates.slice()
                                            let dateUtc = utcDate(date)
                                            if (!dates.includes(dateUtc)) {
                                                dateTemp.push(dateUtc)
                                                setDates(dateTemp)
                                            }

                                        }}
                                    />


                                </MuiPickersUtilsProvider>
                            </Grid>
                            <Grid item md={3} xs={12} style={{ display: 'flex', alignItems: 'center' }}>
                                <Button
                                    color="primary"
                                    size="md"
                                    variant="outlined"
                                    style={{ marginRight: 10 }}
                                    round="true"
                                    icon="true"
                                    onClick={() => buscar()}
                                >
                                    <SearchIcon fontSize="small" /> Buscar
                                </Button>

                                <Button
                                    color="default"
                                    size="md"
                                    variant="outlined"

                                    round="true"
                                    icon="true"
                                    onClick={() => limpiar()}
                                >
                                    <CallToActionIcon fontSize="small" style={{marginRight:5}} />   Limpiar
                                </Button>

                            </Grid>

                        </AccordionDetails>
                    </Accordion>
                    {
                        dates.length != 0 && (
                            <Grid item xs={12} style={{
                                display: 'flex',
                                marginBottom: 10,
                                flexWrap: 'wrap',
                                listStyle: 'none',
                                padding: 5
                            }} >

                                {dates.map((data, i) => {
                                    let dataT = data.split('-')[0] + "-" + data.split('-')[1];
                                    return (
                                        <li key={i}>
                                            <Chip
                                                icon={<CalendarTodayIcon />}
                                                style={{ marginRight: 10 }}
                                                onDelete={() => {
                                                    console.log("enter")
                                                    let datesT = dates.slice()
                                                    console.log(datesT.splice(i, 1))
                                                    setDates(datesT)
                                                }}
                                                label={dataT}

                                            />
                                        </li>
                                    );
                                })}

                            </Grid>
                        )
                    }

                    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between' }}>

                        <Button
                            style={{ marginRight: "5px", marginBottom: 15 }}
                            startIcon={<AddCircleOutline />}
                            variant="contained"
                            color="secondary"
                            size="small"
                            onClick={() => props.history.push("/nueva_meta")}
                        >
                            Nueva
                        </Button>
                        <div>
                            <IconButton aria-label="desplegar" onClick={handleOnExpandAll}>
                                <MenuOpenIcon />
                            </IconButton>
                            <IconButton aria-label="download" onClick={handleClickMenu}>
                                <GetAppIcon />
                            </IconButton>
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleCloseMenu}
                            >

                               
                                <MenuItem onClick={descargar}>Descargar pdf</MenuItem>
                                <MenuItem onClick={decargarExcel}>Descargar xlsx</MenuItem>

                            </Menu>
                        </div>

                    </Grid>


                </Grid>

                <Grid item xs={12}>
                    <TreeTable
                        className="demo-tree-table"
                        value={data}

                        onChange={handleOnChange}>

                        <TreeTable.Column
                            renderCell={(row) => (
                                <div style={{ paddingLeft: (row.metadata.depth * 15) + 'px' }}>
                                    <button className={`toggle-button ${row.$state.isExpanded ? 'expanded' : ''}`}
                                        onClick={row.toggleChildren}
                                        disabled={!row.metadata.hasChildren}>
                                        <span className={row.data.isWaldo ? 'is-waldo' : ''}>{row.data.name}</span>
                                    </button>
                                </div>
                            )}
                            renderHeaderCell={() => <span className="align-left">Mes</span>} />
                        <TreeTable.Column
                            renderCell={(row) => (

                                <span className="employees-cell">{row.data.indicador}</span>


                            )}
                            renderHeaderCell={() => <span className="align-left">Indicador</span>} />

                        <TreeTable.Column
                            renderCell={(row) => (

                                <span className="employees-cell">{row.data.meta}</span>


                            )}
                            renderHeaderCell={() => <span className="align-left">Meta Actual</span>} />
                        <TreeTable.Column
                            renderCell={(row) => (

                                <span className="employees-cell">{row.data.cumplimiento}</span>


                            )}
                            renderHeaderCell={() => <span className="align-left">Meta de Cumplimiento</span>} />

                    </TreeTable>
                </Grid>
            </Paper >
        </Grid>

    )
}
