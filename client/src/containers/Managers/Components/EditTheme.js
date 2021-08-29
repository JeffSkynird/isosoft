import React, { useContext, useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import Initializer from '../../../store/Initializer'

import { obtenerDataManager, editPassword } from '../../../utils/API/managers.js'
import { encriptarJson, desencriptarJson } from '../../../utils/security'
import {colors} from '../../../utils/colors'
import Preview from './Preview'
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import indigo from '@material-ui/core/colors/indigo';
import pink from '@material-ui/core/colors/pink';
import {play} from '../../../utils/sound'
export default function EditInfo(props) {
    const initializer = useContext(Initializer);

    const [selectedP, setSelectedP] = useState(indigo)
    const [selectedS, setSelectedS] = useState(pink)
    const [state, setState] = React.useState(true);
    const [paused, setPaused] = React.useState(localStorage.getItem('sound-paused')==null?false:true);

    
    const cambiarTema=(color)=>{
        if(state){
            setSelectedP(color)    
            props.changeThemeColor(color,selectedS)
            play(initializer.playSound,'ok2')
        }else{
            setSelectedS(color)    
            props.changeThemeColor(selectedP,color)
            play(initializer.playSound,'ok2')
        }
        
    }
   const soundPaused=()=>{
       if(!paused==false){
        localStorage.removeItem('sound-paused');

       }else{
        localStorage.setItem('sound-paused', true);

       }
       setPaused(!paused)

   }
 
    return (
        <div>
            <div>
            <FormControlLabel
        control={<Switch  name="checkedA" checked={paused} onChange={soundPaused}  />}
        label={"Desactivar sonidos del sistema (mejora el rendimiento)"}
      />
            </div>
            
       <FormControlLabel
        control={<Switch checked={state} onChange={()=>setState(!state)} name="checkedA" />}
        label={state?"Tema Primario":"Tema Secundario"}
      />
            <Grid container spacing={3}>

                <Grid item md={12} xs={12}>
                    <div   style={{display:'flex',flexWrap:'wrap'}} >
                        {
                            colors.map((e)=>(
                                <div style={{opacity:state?(e.value[500]==selectedP[500]?0.155:1):(e.value['A400']==selectedS['A400']?0.155:1),cursor:'pointer',backgroundColor:e.value[state?500:'A400'],height:100,width:100}} onClick={()=>cambiarTema(e.value)}></div>
                            ))
                        }
                       
                    </div>
                </Grid>
               



            </Grid>
           
        </div>
    )
}
