import React,{useContext,useEffect,useState} from 'react'
import Grid from '@material-ui/core/Grid';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import Initializer from '../../../store/Initializer'

import { obtenerDataManager,editarManager} from '../../../utils/API/managers.js'
import {encriptarJson,desencriptarJson} from '../../../utils/security'


export default function EditInfo() {
  const initializer= useContext(Initializer);

    const [dni,setDni]=useState('')
    const [names,setNames]=useState('')
    const [lastNames,setLastNames]=useState('')
    const [cellphone,setCellphone]=useState('')
    const [landline,setLandLine]=useState('')
    const [address,setAddress]=useState('')
    const [neighborhood,setNeighborhood]=useState('barrio')
    const [email,setEmail]=useState('')
    const [data,setData]=useState(null)

    React.useEffect(()=>{
     
      if(initializer.usuario!=null){
        obtenerDataManager(setData,initializer);
         
      }


  

},[initializer.usuario])

React.useEffect(() => {
  if (data!=null) {
    setDni(data.cedula)
    setNames(data.nombres)
    setLastNames(data.apellidos)
    setCellphone(data.celular)
    setLandLine(data.telefono)
    setAddress(data.direccion)
  
    setEmail(data.email)


      
  }
}, [data]);
    const editar=()=>{

          if(dni!=""){
            //if(validarCedula(dni)){
               
              editarManager({
            
                email:email,
                asesor_id:JSON.parse(desencriptarJson(initializer.usuario)).user.user_ca,
                type_user:JSON.parse(desencriptarJson(initializer.usuario)).user.type_user,
                  dni:dni,
                  names:names,
                  last_names:lastNames,
                  cellphone:cellphone,
                  landline:landline,
                  address:address,
                  neighborhood:neighborhood,
                 
              },function hola(){console.log("")},initializer,function hola(){console.log("")});  
              
            /* }else{
              initializer.mostrarNotificacion({ type: "error", message: "Cédula inválida" });
            } */
          }
      
      }
      function validarCedula(cad){
    
        var total = 0;
        var longitud = cad.length;
        var longcheck = longitud - 1;
    
        if (cad !== "" && longitud === 10) {
            for (let i = 0; i < longcheck; i++) {
                if (i % 2 === 0) {
                    var aux = cad.charAt(i) * 2;
                    if (aux > 9) aux -= 9;
                    total += aux;
                } else {
                    total += parseInt(cad.charAt(i)); // parseInt o concatenará en lugar de sumar
                }
            }
    
            total = total % 10 ? 10 - total % 10 : 0;
    
            if (cad.charAt(longitud - 1) == total) {
    
               return true;
            } else {
    
              return false;
            }
        } else {
           return false;
        }
    }
    return (
        <div>
              <Grid container spacing={3}>

              <Grid item md={6} xs={12}>
                <TextField
                  label="Cédula"
                  variant="outlined"
                  error={!validarCedula(dni)}
                  helperText={!validarCedula(dni)?"Cédula inválida.":""}
                  style={{ width: "100%" }}
                  onChange={(e) => {
                   
                    const re = /^[0-9\b]+$/;

                    if (e.target.value === '' || re.test(e.target.value)) {
                        setDni(e.target.value)
                    }
                  }}
                  value={dni}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  label="Nombres"
                  variant="outlined"
                  style={{ width: "100%" }}
                  onChange={(e) => setNames(e.target.value)}
                  value={names}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  label="Apellidos"
                  variant="outlined"
                  style={{ width: "100%" }}
                  onChange={(e) => setLastNames(e.target.value)}
                  value={lastNames}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  label="Teléfono"
                  variant="outlined"
                  style={{ width: "100%" }}
                  onChange={(e) => setCellphone(e.target.value)}
                  value={cellphone}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  label="Teléfono convencional"
     
                  variant="outlined"
                  value={landline}
                  onChange={(e) => {
                    setLandLine(e.target.value);
                  }}
                  style={{ width: "100%" }}
              
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  label="Dirección"
                  variant="outlined"
                  style={{ width: "100%" }}
                  onChange={(e) => {
                  
                  

                        setAddress(e.target.value)
                   
                  }}
                  value={address}
                />
              </Grid>
           
              <Grid item md={6} xs={12}>
                <TextField
                  label="Correo"
                  variant="outlined"
                  style={{ width: "100%" }}
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </Grid>
             
      

    
              </Grid>
              <Button  style={{marginTop:'20px'}} startIcon={<SaveOutlinedIcon />} variant="contained" color="secondary" onClick={()=>editar()}>
                        Guardar
                    </Button>
        </div>
    )
}
