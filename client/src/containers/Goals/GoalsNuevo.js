import React, { useState, useContext, useRef } from 'react'
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Accordion from '@material-ui/core/Accordion';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import SearchIcon from '@material-ui/icons/Search';
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import CallToActionIcon from '@material-ui/icons/CallToAction';
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import es from 'date-fns/locale/es'
import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import SaveIcon from '@material-ui/icons/Save';
import Autocomplete from '@material-ui/lab/Autocomplete';
import ClearIcon from '@material-ui/icons/Clear';
import { utcDate } from '../../utils/Date'

import TextField from '@material-ui/core/TextField';
import AddCircleOutline from "@material-ui/icons/AddCircleOutline";
import {
    DatePicker,
    KeyboardDatePicker,
    MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { Paper } from '@material-ui/core';

import Button from "@material-ui/core/Button";
import { TreeTable, TreeState } from 'cp-react-tree-table';
import Typography from "@material-ui/core/Typography";
import { obtenerMetasPorSupervisor, guardarMetas } from '../../utils/API/goals'
import { obtenerTodos } from "../../utils/API/supervisors";
import Initializer from '../../store/Initializer'
import { obtenerTodosKpis } from '../../utils/API/kpis.js'

import './header.css';
import './table.css';
import './responsive.css';
export default function GoalAdmin(props) {

    const initializer = useContext(Initializer);
    const inputRef = useRef();
    const [desde, setDesde] = React.useState(new Date())
    const [hasta, setHasta] = React.useState(new Date())
    const [supervisorData, setSupervisorData] = useState([]);
    const [supervisor, setSupervisor] = React.useState("")
    const [expand, setExpand] = React.useState(false)
    const [rowSelect, setRowSelect] = React.useState(null)
    const [parametrosData, setParametrosData] = useState([])

    const [parametro, setParametro] = useState('')
    const [data, setData] = React.useState(TreeState.create([]))
    const [datat, setDatat] = React.useState([])
    const [totalMetas, setTotalMetas] = React.useState(0)
    React.useEffect(() => {

        if (initializer.usuario != null) {

            obtenerTodos(setSupervisorData, initializer)
            obtenerMetasPorSupervisor({ fecha: utcDate(desde), id_indicador: parametro, id_supervisor: supervisor }, cargarData, initializer)
            obtenerTodosKpis(setParametrosData, initializer);

        }



    }, [initializer.usuario])
    const cargarData = (info) => {
        setDatat(info.data)
        setData(TreeState.expandAll(TreeState.create(info.data)))
        setTotalMetas(info.totalMetas)

    }
    const buscar = () => {
        setDatat([])
        setData(TreeState.create([]))
        obtenerMetasPorSupervisor({ fecha: utcDate(desde), id_indicador: parametro, id_supervisor: supervisor }, cargarData, initializer)

    }
    const limpiar = () => {

        /* 
        if(datat.length!=0){
        const node = datat[8].children[0];
               const rowModel = data.findRowModel(node);
               if (rowModel != null) {
                   setData(
                      TreeState.expandAncestors(data, rowModel),
                    );
                    
                      
                 }
               } */
        obtenerMetasPorSupervisor({ fecha: utcDate(new Date()), id_indicador: parametro, id_supervisor: "" }, cargarData, initializer)
        setSupervisor("")
        setDesde(new Date())
    }
    /*  React.useEffect(()=>{
     
             if(rowSelect!=null){
                 console.log(rowSelect)
                 const node = datat[8].children[0];
                 const rowModel = data.findRowModel(node);
                 console.log(rowModel)
                   setData(TreeState.updateData(data,rowModel,{
                     ...rowModel.data,
                     meta: 100,
                 }))
                 }
           
       
     },[rowSelect]) */

    const buscarPadre = (id_sup) => {
        let nu = null
        data.data.map((e) => {
            if (e.data.id == id_sup) {
                nu = e
            }
        })
        return nu
    }
    const handleOnChange = (newValue) => {

        setData(newValue);
    }
    const cantidadSupervisores = () => {
        let c = 0
        datat.map((e, i) => {
            if (e.data.hasOwnProperty("id")) {
                c++
            }
        })
        return c
    }
    const cantidadAsesores = (id) => {
        let c = 0
        datat.map((e, i) => {
            if (e.data.hasOwnProperty("id_asesor")) {
                if (e.data.id_supervisor == id) {
                    c++
                }
            }
        })
        return c
    }
    const obtenerMeta = (id) => {
        let c = 0
        datat.map((e, i) => {
            if (e.data.hasOwnProperty("id")) {
                if (e.data.id == id) {
                    c = e.data.meta
                }
            }
        })
        return c
    }
    const comprobarResiduo = (suma, met) => {

        if (met != "") {
            if (suma == parseInt(met)) {
                return 0
            } else {
                return parseInt(met) - suma
            }
        } else {
            return parseInt(met) - suma
        }

    }
    const distribuir = () => {
        let numAse = 0
        datat.map((e) => {
            numAse += e.children.length
        })
        let valor = Math.floor(totalMetas / numAse)
        let residuo = comprobarResiduo(Math.floor(totalMetas / numAse) * numAse, totalMetas)
        let temp2 = []
        let numAseCount=1
        datat.map((e, i) => {

            if (totalMetas > numAse) {
                let child = []
                let sumPadre = 0
                if (i != (datat.length - 1)) {
                    e.children.map((e2) => {
                        sumPadre += valor
                        child.push({ ...e2, data: { ...e2.data, meta: valor } })
                    })
                    temp2.push({ ...e, data: { ...e.data, meta: sumPadre }, children: child })

                } else {
                    e.children.map((e2, i2) => {
                        if (i2 != (e.children.length - 1)) {
                            sumPadre += valor
                            child.push({ ...e2, data: { ...e2.data, meta: valor } })
                        } else {
                            sumPadre += (residuo + valor)
                            child.push({ ...e2, data: { ...e2.data, meta: (valor + residuo) } })
                        }

                    })
                    temp2.push({ ...e, data: { ...e.data, meta: sumPadre }, children: child })
                }
            }else{
            
              
                    let child = []
                    let sumPadre = 0
                   
                    e.children.map((e2) => {
                        if(numAseCount<=totalMetas){
                            sumPadre += 1
                            child.push({ ...e2, data: { ...e2.data, meta: 1 } })
                            numAseCount=numAseCount+1
                        }else{
                            child.push({ ...e2, data: { ...e2.data, meta: 0 } })
                        }
                    })
                    temp2.push({ ...e, data: { ...e.data, meta: sumPadre }, children: child })
     
                    console.log(numAseCount)
               
            }
        })

        setDatat(temp2)
        setData(TreeState.expandAll(TreeState.create(temp2)));
    }
    const redistribuir = () => {
        let v = totalMetas
        let temp = Math.round(v / cantidadSupervisores())
        console.log(v + "/" + cantidadSupervisores())
        console.log("val" + temp)
        let temp2 = []
        let sumP = 0

        datat.map((e, i) => {
            sumP += Math.floor(totalMetas / cantidadSupervisores())
            let resi = 0
            if (i == (datat.length - 1)) {
                resi = comprobarResiduo(sumP, totalMetas)

            } else {
                resi = Math.floor(totalMetas / cantidadSupervisores())
            }


            temp2.push({ ...e, data: { ...e.data, meta: resi } })
        })
        let temp3 = []

        let res = 0;
        temp2.map((e, i) => {
            let aseCount = e.children.length
            let metaSup = e.data.meta / (aseCount != 0 ? aseCount : 1);
            let aseArray = []
            console.log(e.data.meta + "/" + aseCount)
            console.log(Math.round(e.data.meta / aseCount))
            console.log(metaSup)
            sumP += Math.floor(totalMetas / cantidadSupervisores())

            e.children.map((e2) => {
                let b = { ...e2, data: { ...e2.data, meta: Math.floor(metaSup) } }
                console.log(b)
                aseArray.push({ ...e2, data: { ...e2.data, meta: Math.floor(metaSup) } })
            })
            temp3.push({ ...e, children: aseArray })
        })
        console.log("FINAL FINAL" + sumP)
        console.log("SOBRO " + comprobarResiduo(sumP, totalMetas) + " para llegar al total")
        console.log(temp3)
        setDatat(temp3)
        setData(TreeState.expandAll(TreeState.create(temp3)));

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
    const guardar = () => {
        let nuevaData = []

        for (let [key, value] of Object.entries(data.data)) {
            nuevaData.push({ ...value.data })
        }
        console.log(nuevaData)
        guardarMetas({ data: nuevaData, month: desde.getMonth() + 1, year: desde.getFullYear(), kpi_id: parametro != '' ? parametro : 1 }, initializer)
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
                <Typography style={{ fontSize: 24 }} color="textPrimary">Datos de la Meta</Typography>
            </Box>
            <Paper variant="outlined" style={{ padding: 10, width: '100%' }}>

                <Grid item xs={12} style={{ marginBottom: 10 }}>
                    <Grid container >
                        <Grid item xs={12} style={{ marginTop: 13, marginBottom: 10 }} >
                            <Typography style={{ display: 'flex', alignItems: 'center' }} color="primary"> <KeyboardArrowDownIcon color="primary" />       Ingresos de la meta</Typography>
                        </Grid>
                        <Grid item xs={12} style={{ paddingLeft: 15 }}>
                            <Grid container style={{ marginTop: 10, marginBottom: 15 }}>

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
                                <Grid item md={2} xs={12}>
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
                                <Grid item md={2} xs={12}>


                                    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}>
                                        <KeyboardDatePicker
                                            autoOk
                                            ampm={false}
                                            size="small"
                                            inputVariant="outlined"
                                            label="Mes"
                                            style={{ width: "95%" }}
                                            // disablePast
                                            format="yyyy-MM"
                                            value={desde}
                                            views={["year", "month"]}
                                            onChange={date => setDesde(date)}
                                        />


                                    </MuiPickersUtilsProvider>
                                </Grid>

                                <Grid style={{

                                    pointerEvents: "auto"
                                }} item md={2} xs={12}>


                                    <TextField style={{ width: '95%' }} size="small" id="outlined-basic" label="Meta Global" variant="outlined" onChange={(e) => setTotalMetas(e.target.value)} value={totalMetas} onKeyDown={(event) => {
                                        if (event.key === 'Enter') {
                                            console.log('entro')
                                            distribuir()
                                        }
                                    }} />
                                </Grid>
                                <Grid item md={3} xs={12} style={{ display: 'flex', alignItems: 'center' }}>
                                    <Button
                                        color="primary"
                                        size="md"
                                        variant="outlined"

                                        round="true"
                                        icon="true"
                                        onClick={() => buscar('filtro')}
                                        style={{ marginRight: 10 }}
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
                                        <CallToActionIcon fontSize="small" style={{ marginRight: 5 }} />   Limpiar
                                    </Button>
                                </Grid>


                            </Grid>

                        </Grid>
                    </Grid>


                </Grid>
                <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between' }} >
                    <div>
                        <Button
                            style={{ marginRight: "5px", marginBottom: 15 }}
                            startIcon={<SaveIcon />}
                            variant="contained"
                            color="secondary"
                            size="small"
                            onClick={guardar}
                        >
                            Guardar
                        </Button>
                        <Button
                            style={{ marginRight: "5px", marginBottom: 15 }}
                            startIcon={<ArrowBackIcon />}
                            variant="contained"
                            color="default"
                            size="small"
                            onClick={() => props.history.push("/goals_config")}
                        >
                            Atrás
                        </Button>
                    </div>
                    <IconButton aria-label="desplegar" onClick={handleOnExpandAll}>
                        <MenuOpenIcon />
                    </IconButton>
                </Grid>

                <Grid item xs={12}>
                    <TreeTable
                        className="demo-tree-table"
                        value={data}
                        onChange={handleOnChange}
                        ref={inputRef}
                    >

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
                            renderHeaderCell={() => <span className="align-left">Grupo de Trabajo</span>} />

                        <TreeTable.Column
                            renderCell={(row) => (

                                <span className="employees-cell">{row.data.indicador}</span>


                            )}
                            renderHeaderCell={() => <span className="align-left">Indicador</span>} />
                        <TreeTable.Column

                            renderCell={(row) => (

                                <input type="text" style={{ textAlign: 'left' }} value={row.data.meta != null ? row.data.meta : 0}
                                    onChange={(event) => {

                                        console.log("GUARDANDO DATA ANTIGUA " + row.data.meta)
                                        console.log("GUARDANDO DATA NUEVA " + event.target.value)
                                        row.updateData({
                                            ...row.data,
                                            meta: event.target.value,
                                            previous_meta: row.data.meta != null ? row.data.meta : 0,
                                            previous_asesor: row.data.name
                                        });
                                    }}
                                    onBlur={(event) => {
                                        if (row.data.id_supervisor != null && row.data.previous_meta != undefined) {

                                            if (row.data.meta != row.data.previous_meta) {

                                                console.log(datat)
                                                let nData = []
                                                let totalSum = 0
                                                datat.map((e) => {
                                                    let metaSum = 0
                                                    let childSum = 0
                                                    let childId = -1

                                                    if (e.data.id == row.data.id_supervisor) {

                                                        let childrenData = []
                                                        e.children.map((e2) => {
                                                            if (e2.data.id_supervisor == row.data.id_supervisor) {

                                                                if (row.data.previous_asesor == e2.data.name) {
                                                                    childrenData.push({ ...e2, data: { ...e2.data, meta: row.data.meta } })
                                                                    childSum += parseInt(row.data.meta != null ? row.data.meta : 0)
                                                                    totalSum += parseInt(row.data.meta != null ? row.data.meta : 0)
                                                                } else {
                                                                    childSum += parseInt(e2.data.meta != null ? e2.data.meta : 0)
                                                                    childrenData.push({ ...e2 })
                                                                    totalSum += parseInt(e2.data.meta != null ? e2.data.meta : 0)
                                                                }
                                                            } else {
                                                                childrenData.push({ ...e2 })
                                                                totalSum += parseInt(e2.data.meta != null ? e2.data.meta : 0)
                                                            }
                                                        })
                                                        //const rowModel = data.findRowModel(e);

                                                        let rowModelF = buscarPadre(row.data.id_supervisor)
                                                        setData(TreeState.updateData(data, rowModelF, {
                                                            ...rowModelF.data,
                                                            meta: childSum,
                                                        }))
                                                        nData.push({ ...e, data: { ...e.data, meta: childSum }, children: childrenData })
                                                    } else {
                                                        nData.push({ ...e })
                                                        totalSum += parseInt(e.data.meta != null ? e.data.meta : 0)
                                                    }


                                                })
                                                setDatat(nData)
                                                //  handleOnChange(TreeState.create(nData))
                                                /*  const node = datat[8].children[0];
                                                                  const rowModel = data.findRowModel(node);
                                                                  console.log(rowModel)
                                                                  setData(TreeState.updateData(data,rowModel,{
                                                                      ...rowModel.data,
                                                                      meta: 100,
                                                                  }))
                                                                  }*/
                                                setTotalMetas(totalSum)
                                                // setRowSelect(row)

                                                //
                                                /* console.log(row.data.meta+"!="+row.data.previous_meta)
                                                console.log("segunda condicion")
                                                let nData = []
                                                datat.map((e)=>{
                                                    console.log(row.data.id_supervisor+"=="+e.data.id)
                                                    if(row.data.id_supervisor==e.data.id){
                                                        console.log((row.data.meta-row.data.previous_meta)+e.data.meta)

                                                        let nChildData=[]
                                                        console.log(row.data)
                                                        e.children.map((e2)=>{
                                                            console.log(row.data.previous_asesor+"=="+e2.data.name)
                                                            if(row.data.previous_asesor==e2.data.name){
                                                                nChildData.push({...e2,data:{...e2.data,meta:row.data.meta}})
                                                            }else{
                                                                nChildData.push({...e2})
                                                            }
                                                        })
                                                        console.log("data antigua")
                                                        console.log(row.data.previous_meta)
                                                        console.log("data nueva")
                                                        console.log(row.data.meta)
                                                        console.log("resta")
                                                        console.log(row.data.meta-row.data.previous_meta)
                                                        console.log("suma final")
                                                        console.log((row.data.meta-row.data.previous_meta)+e.data.meta)
                                                        nData.push({...e,children:nChildData,data:{...e.data,meta:(row.data.meta-row.data.previous_meta)+e.data.meta}})

                                                    }else{
                                                        nData.push({...e})
    
                                                    }
                                                
                                                })
                                                setDatat(nData)
                                                setData(TreeState.create(nData)) */
                                            }

                                        }

                                    }}
                                />

                            )}
                            renderHeaderCell={() => <span className="align-left">Meta</span>} />
                        <TreeTable.Column
                            renderCell={(row) => (

                                <input type="text" style={{ textAlign: 'left', width: '100%' }} value={row.data.observacion}
                                    onChange={(event) => {
                                        console.log(data)
                                        console.log(row)
                                        row.updateData({
                                            ...row.data,
                                            observacion: event.target.value,
                                        });
                                    }}

                                />


                            )}
                            renderHeaderCell={() => <span className="align-left">Observación</span>} />
                    </TreeTable>
                </Grid>
            </Paper >
        </Grid>

    )
}
