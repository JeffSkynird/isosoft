import React, { useContext, useEffect, useState } from 'react'
import Calendar from './components/Calendar'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import FormControl from "@material-ui/core/FormControl";
import Typography from '@material-ui/core/Typography';
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { obtenerTodos } from "../../utils/API/asessors.js";
import Initializer from '../../store/Initializer'
import DateFnsUtils from '@date-io/date-fns';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import esLocale from "date-fns/locale/es";
import { obtenerGoalsPorFechaAsesor } from '../../utils/API/goals'
import {
    DatePicker,
    KeyboardDatePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { desencriptarJson } from "../../utils/security";

export default function CalendarGoals(props) {
    const initializer = useContext(Initializer);

    const [asesorData, setAsesorData] = useState([])
    const [asesor, setAsesor] = useState('')
    const [date, setDate] = useState(new Date())
    const [data, setData] = useState([])
    const [number, setNumber] = useState({effectiveCitations:0,inEffectiveCitations:0,effectiveCalls:0,ineffectiveCalls:0})

    const [tipo, setTipo] = React.useState([])

    useEffect(() => {

        if (initializer.usuario != null) {
            obtenerTodos(setAsesorData, initializer);
            setTipo(JSON.parse(desencriptarJson(initializer.usuario)).user.type_user);

        }




    }, [initializer.usuario])
    useEffect(() => {
        if (asesorData.length != 0) {
            if(JSON.parse(desencriptarJson(initializer.usuario)).user.type_user=="asessor"){
            obtenerGoalsPorFechaAsesor(asesor, date.getMonth() + 1, date.getFullYear(), setData, initializer,setNumber)
            }
        }
    }, [asesorData])
    const onChange = (id) => {
        setData([])
        obtenerGoalsPorFechaAsesor(id, date.getMonth() + 1, date.getFullYear(), setData, initializer,setNumber)
        setAsesor(id)
    }
    const onChangeDate = (fecha) => {
        setData([])
        obtenerGoalsPorFechaAsesor(asesor, fecha.getMonth() + 1, fecha.getFullYear(), setData, initializer,setNumber)
        setDate(fecha)
    }
    return (
        <div>
            <Box mb={2} mt={1} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6" component="h6" style={{
                    display: 'flex', justifyContent: "center",
                    alignItems: "center"
                }}>
                    Calendario de metas
        </Typography>

            </Box>
            <Grid container spacing={2} justify='center'>
            {
          tipo == "supervisor" || tipo == "manager" ?(
                <Grid item xs={6} md={6} >
                    <Autocomplete
                        options={asesorData}

                        getOptionLabel={(option) => option.dni+" - "+option.names + " " + option.last_names}
                        onChange={(event, value) => {
                            if(value!=null){
                                onChange(value.id)
                            }else{
                                onChange('')
                            }
                           
                        }} // prints the selected value
                        renderInput={params => (
                            <TextField {...params} label="Filtrar por asesor" variant="outlined" fullWidth />
                        )}
                    />
                   
                </Grid>)
                :null
}
                <Grid item xs={tipo == "supervisor" || tipo == "manager"?6:12} md={tipo == "supervisor" || tipo == "manager"?6:12} >
                    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>

                        <DatePicker
                            autoOk
                            style={{ width: '100%' }}
                            views={["month", "year"]}
                            variant="dialog"
                            inputVariant="outlined"
                            label="Filtrar por mes"
                            value={date}
                          
                            onChange={mes => onChangeDate(mes)}
                            InputAdornmentProps={{ position: "start" }}

                        />
                    </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={12} md={12} >
                    <Calendar data={data} date={date} values={number}/>
                </Grid>
            </Grid>

        </div>
    )
}
