import React from 'react'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Initializer from '../../store/Initializer'

import { iniciarSesion } from '../../utils/API/auth';

export default function Iniciar(props) {
    const initializer = React.useContext(Initializer);

    const [correo,setCorreo]=React.useState("")
    const [clave,setClave]=React.useState("")
    const entrar=()=>{
        iniciarSesion(correo,clave,initializer)
    }
    return (
        <form className={props.classes.form} noValidate>
        <TextField
            variant="outlined"
      
            required
            style={{marginBottom:10,marginTop:10}}
            size="small"
            id="email"
            label="Correo electrónico"
            name="email"
            value={correo}
            onChange={(e)=>setCorreo(e.target.value)}
        />
        <TextField
            variant="outlined"
            
            size="small"
            required
            value={clave}
            onChange={(e)=>setClave(e.target.value)}
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
        />

        <Button
     
            onClick={entrar}
            variant="contained"
            color="primary"
            className={props.classes.submit}
        >
            Iniciar Sesión Ahora
        </Button>

    </form>

    )
}
