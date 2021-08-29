import React from 'react'
import Typography from '@material-ui/core/Typography';

import GroupOutlinedIcon from '@material-ui/icons/GroupOutlined';

export default function KpiChart(props) {
    console.log(props.goal)
    const value=(title)=>{
       /*  if(title=="Citas totales"){
            return props.goal!=null?"/ "+props.goal.inEffectiveCitations:0
        }else if(title=="Entrevistas"){
            return props.goal!=null?"/ "+props.goal.effectiveCitations:0
        }else if(title=="Ll. Salientes"){
            return props.goal!=null?"/ "+props.goal.inEffectiveCalls:0
        }else if(title=="Ll. Efectivas"){
            return props.goal!=null?"/ "+props.goal.effectiveCalls:0
        }else if(title=="Leads"){
            return "/ "+0
        }else if(title=="Interesados ingresados"){
            return "/ "+0
        }else if(title=="Cotizaciones"){
            return "/ "+0
        }else if(title=="Reservas"){
            return "/ "+0
        } */
        if(props.title=="Cotizaciones"){
            return props.cotizaciones
        }else if(props.title=="Reservas"){
            return props.reservations
        }else{
            return props.value
        }
    }
    return (
        <div style={{
            padding: '12px', height: '100px',


        }}>
            <div style={{ display: 'flex',cursor:'pointer'}} onClick={()=>props.onClick!=null||props.onClick!=undefined?props.onClick(): null}>
                {props.icon}
                <div style={{marginLeft:10}}>
                    <Typography variant="subtitle1" style={{ fontSize: '15pt', paddingLeft: '10pt',  fontFamily: 'Roboto, Helvetica, Arial, sans-serif' }} component="h6">
                        {"    " + props.title}
                    </Typography>
                    <Typography variant="subtitle1" color="primary" component="h6" style={{ fontWeight: 'bold', paddingLeft: '10px', fontSize: '18pt'}}>
                        {value(props.value)}{props.goal}
                    </Typography>
                </div>

            </div>
        </div>


    )
}
