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
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { LocalizationTable, TableIcons, removeAccent } from '../../utils/table.js'
import MaterialTable from "material-table";
import { Grid } from '@material-ui/core';
import { obtenerTodos } from '../../utils/API/sistemas.js';
import Crear from './components/Crear'
import Eliminar from './components/Eliminar'
import { obtenerMetricasSistemas, obtenerPanelResult } from '../../utils/API/evaluaciones';
import Bar from './components/Bar';
import Box from '@material-ui/core/Box';
import Tab2 from './components/Tab2';
import { obtenerTodos as obtenerTodosS } from '../../utils/API/sistemas';
import Autocomplete from '@material-ui/lab/Autocomplete';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}
export default function Sistemas(props) {
    const initializer = React.useContext(Initializer);

    const [data, setData] = React.useState([])
    const [data0, setData0] = React.useState([])

    const [open, setOpen] = React.useState(false)
    const [open2, setOpen2] = React.useState(false)
    const [selected, setSelected] = React.useState(null)
    const [selected2, setSelected2] = React.useState(null)
    const [values, setValues] = React.useState([])
    const [labels, setLabels] = React.useState([])
    const [value, setValue] = React.useState(0);
    const [sistemas, setSistemas] = React.useState([])
    const [sistema, setSistema] = React.useState('')
    const [data1, setData1] = React.useState([])

    React.useEffect(() => {
        if (initializer.usuario != null) {
            obtenerTodos(setData0, initializer)
            obtenerPanelResult(setData,setLabels,setValues, initializer)
            obtenerTodosS(setSistemas, initializer)
            obtenerMetricasSistemas(setData1, initializer)
        }
    }, [initializer.usuario])
    const carga = () => {
        obtenerTodos(setData, initializer)
        setSelected(null)
        setSelected2(null)
    }
    const total = () => {
        let tot = 0
        data0.map((e) => {
            tot += e.evaluaciones
        })
        return tot
    }
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const getName = (id) => {
        let object = null
        sistemas.map((e) => {
            if (id == e.id) {
                object = { ...e }
            }
        })
        return object
    }
    return (
        <Grid container spacing={2}>
            <Crear sistema={selected} setSelected={setSelected} setOpen={setOpen} open={open} carga={carga} />
            <Eliminar sistema={selected2} setOpen={setOpen2} open={open2} carga={carga} />
            <Grid item xs={12} md={12}>
                <Typography variant="h5" >
                    Sistemas
                </Typography>
            </Grid>

            <Grid item xs={12} md={12} style={{ display: 'flex', marginTop: 10 }}>

                <Card style={{ width: 300, height: 120, marginRight: 20, marginBottom: 5 }}>
                    <CardContent>
                        <Typography variant="subtitle1" gutterBottom>
                            Sistemas
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
                            Evaluaciones
                        </Typography>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="h4" gutterBottom>
                                {total()}
                            </Typography>
                            <Avatar variant="rounded" style={{ backgroundColor: '#47B881', borderRadius: 20 }} >
                                <EqualizerIcon />
                            </Avatar>
                        </div>
                    </CardContent>
                </Card>

            </Grid>
            <Grid item md={12} xs={12}>
            <div style={{ marginTop: 15 }} >
                        {
                            labels.length != 0 && values.length != 0 && (
                                <Bar values={values} labels={labels} />
                            )
                        }
                    </div>

         
            </Grid>
            <Grid item md={12} xs={12}>
                <MaterialTable
                    icons={TableIcons}
                    columns={[

                        { title: "Sistema", field: "name" },

                        { title: "Puntaje", field: "avg" },




                    ]}
                    data={
                        data
                    }
                    localization={LocalizationTable}
                    detailPanel={rowData => {
                        return (
                            <div style={{padding:10}}>

                                <MaterialTable
                                    icons={TableIcons}
                                    columns={[
    
                                        { title: "Métrica", field: "metric",headerStyle:{fontWeight:'bold'} },
    
                                        { title: "Puntaje", field: "avg" },
    
    
    
    
                                    ]}
                                    data={
                                        rowData.detail
                                    }
                                    localization={LocalizationTable}
                                
                                    options={{
                                        showTitle: false,
                                        actionsColumnIndex: -1,
                                        search: false,
                                        header:false,
                                        toolbar:false,
                                        padding: 'dense',
                                        headerStyle: {
                                            textAlign: 'left'
                                        },
                                         pageSizeOptions:false,
                                        cellStyle: {
                                            textAlign: 'left'
                                        },
                                        paging:false,
                                        searchFieldStyle: {
    
                                            padding: 5
                                        }
                                    }}
    
                                />
                            </div>
                        )
                    }}
                    title="Puntaje por sistemas"
                    options={{
                      
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
