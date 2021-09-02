import React from 'react'
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CardContent from '@material-ui/core/CardContent';
import InputAdornment from '@material-ui/core/InputAdornment';
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import Avatar from '@material-ui/core/Avatar';
import Initializer from '../../store/Initializer'

import { LocalizationTable, TableIcons, removeAccent } from '../../utils/table.js'
import MaterialTable from "material-table";
import { Grid } from '@material-ui/core';
import { obtenerTodos } from '../../utils/API/evaluaciones.js';
import CrearEvaluacion from './components/CrearEvaluacion'
import Eliminar from './components/EliminarEvaluacion'

export default function Evaluaciones(props) {
    const initializer = React.useContext(Initializer);

    const [data, setData] = React.useState([])
    const [open, setOpen] = React.useState(false)
    const [open2, setOpen2] = React.useState(false)
    const [selected, setSelected] = React.useState(null)
    const [selected2, setSelected2] = React.useState(null)

    React.useEffect(() => {
        if (initializer.usuario != null) {
            obtenerTodos(setData, initializer)
        }
    }, [initializer.usuario])
    const carga = () => {
        obtenerTodos(setData, initializer)
        setSelected(null)
        setSelected2(null)
    }
    const color=(val)=>{
        console.log(val)
        if(parseFloat(val)>=80){
            return "#47B881"
        }else if(parseFloat(val)<=79&&parseFloat(val)>=45){
            return "#DFB733"
        }else if(parseFloat(val)<=25){
            return "#EC4C47"
        }else{
            return "#E4E7EB"
        }
    }
    const totalCumplimiento=()=>{
        let t=0
        data.map((e)=>{
            t+=e.score
        })
        let f =t/data!=0?data.length:1
        return f
    }
    return (
        <Grid container spacing={2}>
            <CrearEvaluacion sistema={selected} setOpen={setOpen} open={open} carga={carga} />
            <Eliminar sistema={selected2} setOpen={setOpen2} open={open2} carga={carga} />
            <Grid item xs={12} md={12}>
                <Typography variant="h5" >
                    Evaluaciones
                </Typography>
            </Grid>

            <Grid item xs={12} md={12} style={{ display: 'flex', marginTop: 10 }}>

                <Card style={{ width: 300, height: 120, marginRight: 20, marginBottom: 5 }}>
                    <CardContent>
                        <Typography variant="subtitle1" gutterBottom>
                            Totales
                        </Typography>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="h4" gutterBottom>
                                {data.length}
                            </Typography>
                            <Avatar variant="rounded" style={{ backgroundColor: '#EC4C47', borderRadius: 20 }} >
                                <DesktopWindowsIcon />
                            </Avatar>
                        </div>
                    </CardContent>
                </Card>
                <Card style={{ width: 300, height: 120 }}>
                    <CardContent>
                        <Typography variant="subtitle1" gutterBottom>
                            Total cumplimiento
                        </Typography>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="h4" gutterBottom>
                                {totalCumplimiento()}
                            </Typography>
                            <Avatar variant="rounded" style={{ backgroundColor: '#47B881', borderRadius: 20 }} >
                                <EqualizerIcon />
                            </Avatar>
                        </div>
                    </CardContent>
                </Card>

            </Grid>
            <Grid item xs={12} md={12} >
                <div style={{ display: 'flex' }}>
                    <Button disableTouchRipple variant="contained" size="small" style={{ marginRight: 20, backgroundColor: 'white' }}>Filtro</Button>

                    <TextField
                        label="Buscar"
                        id="outlined-start-adornment"
                        size="small"
                        style={{ width: '100%', marginRight: 20 }}
                        variant="outlined"
                    />
                    <Button onClick={() => setOpen(true)} startIcon={<AddIcon />} variant="contained" color="primary">
                        Nuevo
                    </Button>
                </div>

            </Grid>
         
            <Grid item xs={12}>
                <MaterialTable
                    icons={TableIcons}
                    columns={[

                        { title: "Nombre", field: "name" },
                        { title: "Sistema", field: "system" },
                        { title: "Descripción", field: "descripcion" },

                        { title: "Puntaje", field: "score" ,render: rowData =>  <div style={{display:'flex',alignItems:'center',height:12,backgroundColor:'gray',borderRadius:3,marginTop:5,width:50}}>
                        <div style={{backgroundColor:color(rowData.score),height:12,borderRadius:3,width:rowData.score+"%"}}>
                           
                        </div>
                        <span style={{position:'absolute',color:'white',fontWeight:'bold',fontSize:10,marginLeft:10}}>{rowData.score}%</span>
                    </div>  },
                        { title: "Fecha", field: "created_at", type: "datetime" },

                    ]}
                    data={
                        data
                    }

                    localization={LocalizationTable}

                    actions={[
                        {
                            icon: TableIcons.VisibilityOutlinedIcon,
                            tooltip: 'Ver métricas',

                            onClick: (event, rowData) => {
                                props.history.push("/evaluacion",rowData)
                            }
                        },
                        {
                            icon: TableIcons.Edit,
                            tooltip: 'Editar',

                            onClick: (event, rowData) => {
                                setSelected(rowData)
                                setOpen(true)
                            }
                        },

                        {
                            icon: TableIcons.Delete,
                            tooltip: "Borrar",

                            onClick: (event, rowData) => {
                                setSelected2(rowData)
                                setOpen2(true)
                            }
                        },

                    ]}

                    options={{
                        showTitle: false,
                        actionsColumnIndex: -1,
                        search: false,
                        maxBodyHeight: 350,
                        padding: 'dense',
                        headerStyle: {
                            textAlign: 'left'
                        },
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
    )
}
