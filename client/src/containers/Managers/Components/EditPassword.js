import React,{useContext,useEffect,useState} from 'react'
import Grid from '@material-ui/core/Grid';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import Initializer from '../../../store/Initializer'

import { obtenerDataManager,editPassword} from '../../../utils/API/managers.js'
import {encriptarJson,desencriptarJson} from '../../../utils/security'


export default function EditInfo() {
  const initializer= useContext(Initializer);

    const [clave,setClave]=useState('')
    const [nuevaClave,setNuevaClave]=useState('')


    const editar=()=>{

       
               
              editPassword({
            
              
                manager_id:JSON.parse(desencriptarJson(initializer.usuario)).user.user_ca,
                user_id:  JSON.parse(desencriptarJson(initializer.usuario)).user.user_id,
                  password:clave,
                  new_password:nuevaClave,
              
                 
              },initializer);  
              
         
        
      
      }
     
    return (
        <div>
              <Grid container spacing={3}>

              <Grid item md={6} xs={12}>
                <TextField
                  label="Contraseña antigua"
                  variant="outlined"
                  type="password"
                  style={{ width: "100%" }}
                  onChange={(e) => {
               
                        setClave(e.target.value)
                 
                  }}
                  value={clave}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  label="Contraseña nueva"
                  type="password"
                  variant="outlined"
                  style={{ width: "100%" }}
                  onChange={(e) => {
                  

                        setNuevaClave(e.target.value)
                  
                  }}
                  value={nuevaClave}
                />
              </Grid>
            
      

    
              </Grid>
              <Button  style={{marginTop:'20px'}} startIcon={<SaveOutlinedIcon />} variant="contained" color="secondary" onClick={()=>editar()}>
                        Guardar
                    </Button>
        </div>
    )
}
