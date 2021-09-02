import React from 'react'
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import CardContent from '@material-ui/core/CardContent';
import InputAdornment from '@material-ui/core/InputAdornment';
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import Avatar from '@material-ui/core/Avatar';
import Initializer from '../../store/Initializer'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import ScrollHorizontal from 'react-scroll-horizontal';
import { LocalizationTable, TableIcons, removeAccent } from '../../utils/table.js'
import MaterialTable from "material-table";
import { Grid } from '@material-ui/core';
import { obtenerTodos } from '../../utils/API/evaluaciones.js';
import CrearEvaluacion from './components/CrearEvaluacion'
import Eliminar from './components/EliminarEvaluacion'
import { obtenerTodosPorPoll } from '../../utils/API/metricas';

export default function Evaluacion(props) {
    console.log(props)
    const dato = props.location.state;

    const initializer = React.useContext(Initializer);

    const [data, setData] = React.useState([])
    const [open, setOpen] = React.useState(false)
    const [open2, setOpen2] = React.useState(false)
    const [selected, setSelected] = React.useState(null)

    React.useEffect(() => {
        if (initializer.usuario != null) {
            if (dato != null) {
                obtenerTodosPorPoll(dato.id, setData, initializer)
            }

        }
    }, [initializer.usuario])
    if (props.location.state == null) {
        props.history.push("/evaluaciones");
        return null;
    }
    const carga = () => {
        obtenerTodos(setData, initializer)
        setSelected(null)
    }
    const esPar=(value)=>{
        if (value%2==0) {
            return true
        }else{
            return false
        }
    }
    const color=(val)=>{
        console.log(val)
        if(parseFloat(val)>=70){
            return "#47B881"
        }else if(parseFloat(val)<=69&&parseFloat(val)>=30){
            return "#F7D154"
        }else if(parseFloat(val)<=29){
            return "#EC4C47"
        }else{
            return "#E4E7EB"
        }
    }
    const child = { width: `300em`, height: `100%`}
    return (
        <Grid container spacing={2}>
            <CrearEvaluacion sistema={selected} setOpen={setOpen} open={open} carga={carga} />
            <Eliminar sistema={selected} setOpen={setOpen2} open={open2} carga={carga} />
            <Grid item xs={12} md={12} style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <Typography variant="h5" >
                    Evaluacion {dato != null ? dato.name : ""}
                </Typography>
                <IconButton aria-label="Cancelar" onClick={() =>  props.history.goBack()}>
                  <ArrowBackIcon />
                </IconButton>
            </Grid>

            <div item xs={12} md={12} style={{ marginBottom:10,height:133,width: `100%` }}>
            <ScrollHorizontal >
                {
                    data.map((e,i) => (
                        <Card style={{ width: 300, height: 130, marginRight: 20, marginBottom: 5 }} >
                            <CardContent>
                                <Typography variant="subtitle1" gutterBottom>
                                    {e.metric}
                                </Typography>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="h4" gutterBottom>
                                        {e.score}%
                                    </Typography>
                                    <Avatar variant="rounded" style={{ backgroundColor:esPar(i+1)?'#47B881':'#EC4C47', borderRadius: 20 }} >
                                        <ShowChartIcon />
                                    </Avatar>
                                </div>
                                <div style={{backgroundColor:'#E4E7EB',height:3,borderRadius:3,marginTop:5}}>
                                    <div style={{backgroundColor:"#1665D8",height:3,borderRadius:3,width:e.score+"%"}}>

                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                }

</ScrollHorizontal>

            </div>
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

                </div>

            </Grid>

            <Grid item xs={12}>
                <MaterialTable
                    icons={TableIcons}
                    columns={[

                        { title: "Característica", field: "metric" },
                        { title: "Sistema", field: "system" },

                        { title: "Puntaje", field: "score",render: rowData =>  <div style={{display:'flex',alignItems:'center',height:12,backgroundColor:'gray',borderRadius:3,marginTop:5,width:50}}>
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
