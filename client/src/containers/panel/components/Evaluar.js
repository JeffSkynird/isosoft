import React from 'react'

import { Grid } from '@material-ui/core'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { obtenerOpciones, obtenerPreguntas, obtenerTodos } from '../../../utils/API/metricas';
import Initializer from '../../../store/Initializer'
import { Typography } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
export default function Evaluar(props) {
    const initializer = React.useContext(Initializer);

    const [metricas, setMetricas] = React.useState([])
    const [metrica, setMetrica] = React.useState("")
    const [preguntas, setPreguntas] = React.useState([])
    const [opciones, setOpciones] = React.useState([])
    const [answers, setAnswers] = React.useState([])

    React.useEffect(() => {
        if (initializer.usuario != null) {
            obtenerTodos(setMetricas, initializer)
            obtenerOpciones(setOpciones, initializer)

        }
    }, [initializer.usuario])
    React.useEffect(() => {
        if (metricas.length != 0) {
            obtenerPreguntas({ metric: metricas[0].id }, setPreguntas, initializer)
            setMetrica(metricas[0].id)
        }
    }, [metricas])
    React.useEffect(() => {
        if (props.datos != null) {
            setAnswers(props.datos.answers)
            
        }
    }, [props.datos])
    const obtenerRadio = (id_question) => {
        let op = "0"
        answers.map((e) => {
            if(e.id_metric==metrica){
                if (e.id_question.toString() == id_question.toString()) {
                    op = e.id_option.toString()
                }
            }

        })
        console.log(answers)
        console.log(op)
        return op
    }
    const cambiarRadio = (id_question, id_option) => {
        let ar = []
        let esta = false
        answers.map((e) => {
            if(e.id_metric==metrica){
                if (e.id_question.toString() == id_question.toString()) {
                    ar.push({ ...e, id_option: id_option,id_metric:metrica })
                    esta = true
                } else {
                    ar.push({ ...e })
                }
            }else{
                ar.push({...e})
            }
          

        })
        if (esta) {
            setAnswers(ar)
            console.log(ar)
            props.actualizarEval(ar)
        } else {
            ar.push({ id_question, id_option ,id_metric:metrica,score:0})
            setAnswers(ar)
            props.actualizarEval(ar)
            console.log(ar)
        }


    }
    return (
        <div style={{ padding: 10 }} >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>


                <FormControl variant="filled" style={{ width: '380px', height: 50, padding: 5 }} >
                    <InputLabel id="demo-simple-select-label">Seleccione una métrica</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={metrica}
                        onChange={(e) => {
                            setMetrica(e.target.value)
                            obtenerPreguntas({ metric:e.target.value }, setPreguntas, initializer)
                        }}
                    >
                        {
                            metricas.map((e) => (
                                <MenuItem value={e.id}>{e.name}</MenuItem>

                            ))
                        }
                    </Select>
                </FormControl>
                <div style={{ display: 'inline-flex' }}>
                    {
                        opciones.map((e) => (
                            <div style={{ width: 150, marginRight: 20 }}>
                                <Typography style={{ textAlign: 'center', color: '#929396' }}>
                                    {e.name}
                                </Typography>
                            </div>

                        ))
                    }


                </div>
            </div>
            <div style={{ marginTop: 20,display:'flex',flexDirection:'column' }}>
                {
                    preguntas.map((e, i) => (
                        <div key={i} style={{ marginTop: 15, display: 'flex',justifyContent:'space-between',alignItems: 'center', }}>
                            <div style={{width: '380px'}}>
                                <Typography style={{ fontWeight: 'bold', }}>
                                    {e.title}
                                </Typography>
                                <Typography style={{ color: '#929396' }}>
                                    {e.name}
                                </Typography>
                            </div>
                            <RadioGroup style={{ alignItems:'center',justifyContent:'center',display:'flex', flexDirection: 'row' }} key={i} aria-label="gender" value={obtenerRadio(e.id.toString())} onChange={(a) => cambiarRadio(e.id.toString(), a.target.value)}>
                                {
                                    opciones.map((z) => (
                                        <FormControlLabel style={{width: 150,marginRight: 20, display:'flex',justifyContent:'center'}} value={z.id.toString()} control={<Radio />} />

                                    ))
                                }
                            </RadioGroup>
                        </div>

                    ))
                }
            </div>
        </div>
    )
}
