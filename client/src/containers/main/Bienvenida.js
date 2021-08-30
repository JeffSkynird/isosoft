import React from 'react'
import logo from '../../assets/logoPeque.png'
import splash from '../../assets/bienvenida.png'

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

export default function Bienvenida(props) {
    return (
        <div style={{height:'100%'}}>
            <div style={{ display: 'flex', justifyContent: 'space-between',padding:15 }}>
                <img src={logo} style={{ marginBottom: 15, height: 30, width: 124 }} alt="" srcset="" />

                <div>
                    <Button style={{marginRight:10}}  onClick={() => window.location.href="/evaluaciones"}>Registrarse</Button>
                    <Button variant="contained" color="primary" onClick={() => window.location.href="/evaluaciones"}>
                        Iniciar Sesión
                    </Button>
                </div>
            </div>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <div style={{width:'40%',paddingLeft:20}}>
                <Typography variant="h3" >
            Califica con check lists de <span style={{color:'#186FFD'}}>cumplimiento</span>  
                </Typography>     
                <Typography variant="h5" style={{marginTop:10,color:'#929396',marginBottom:15}} >
                Gestiona preguntas basadas en ISO 25010 para obtener el porcentaje de cumplimiento
                </Typography>
                <Button variant="outlined" color="primary" size="large" onClick={() => window.location.href="/evaluaciones"}>
                        Empezar
                    </Button>
                </div>
                <img src={splash} style={{width:700,height:625}} alt="" srcset="" />


            </div>
        </div>
    )
}
