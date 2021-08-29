import { guardarSession,obtenerSession,removeSession } from '../session'
import {encriptarJson,desencriptarJson} from '../security'
import {ENTRYPOINT} from '../../config/API'
import {play} from '../../utils/sound'

const axios = require('axios');

export const iniciarSesion = (email, password, store,history) => {
  const { cargarUsuario ,playSound,mostrarNotificacion,mostrarLoader} = store
  var raw = {
    "email": email,
    "password": password
  }
  let url = ENTRYPOINT+"auth/login"
  let setting = {
    method: "POST",
    url: url,
    data: raw,
    body:raw,
    headers: { 'Accept': 'application/json' }

  };
  mostrarLoader(true)

  axios(setting)
    .then((res) => {
      let response = res.data
     if(response.type!="error"){
      let user={
        user:response.user,
        token: response.token
      }
      let encrypt= encriptarJson(JSON.stringify(user))
    
      cargarUsuario(encrypt)
      guardarSession(encrypt);
      mostrarLoader(false)
      mostrarNotificacion({type:"success",message:response.message})
      play(playSound,'intro')
     
    
      /* if(response.user.type_user=="client"){
        history.push('dashboard');
      }else{
        history.push('dashboard_asesor');
      } */
      history.push('dashboard');

     }else{
      mostrarNotificacion({type:"error",message:response.message})
      mostrarLoader(false)
      play(playSound,'error')
     }
    })
    .catch((error) => {
      mostrarLoader(false)
      play(playSound,'error')

      


    });
}
export const cerrarSesion = (store) => {
  const { usuario,logout,mostrarNotificacion ,playSound,mostrarLoader} = store

  let url = ENTRYPOINT+"logout"
  let setting = {
    method: "POST",
    url: url,

    headers: {
       'Accept': 'application/json',
      'Authorization':'Bearer '+JSON.parse(desencriptarJson(usuario)).token
      }

  };
  mostrarLoader(true)

  axios(setting)
    .then((res) => {
      logout()
      removeSession()
     
      mostrarNotificacion({type:"success",message:res.data.message})
      mostrarLoader(false)
      play(playSound,'intro2')

    })
    .catch((error) => {
      mostrarLoader(false)

      let response = error.data

   
    });
}
