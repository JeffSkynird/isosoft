import {encriptarJson,desencriptarJson} from '../security'
import {ENTRYPOINT,LARAVEL_SGI} from '../../config/API'
const axios = require('axios');
export const editarSistema = (id,data, store) => {
    const { usuario, mostrarNotificacion, mostrarLoader } = store;
   
 
    let url = ENTRYPOINT+"polls/"+id;
    let setting = {
      method: "PUT",
      url: url,
      params:data,
      data: data,
      body: data,
      headers: { Accept: "application/json",  Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token, },
    };
    mostrarLoader(true);
  
    axios(setting)
      .then((res) => {
        let response = res.data;
        if (response.type != "error") {
         
          mostrarLoader(false);
          mostrarNotificacion({ type: "success", message: response.message });
        } else {
          mostrarNotificacion({ type: "error", message: response.message });
          mostrarLoader(false);
        }
      })
      .catch((error) => {
        mostrarLoader(false);
  
        mostrarNotificacion({ type: "error", message: error.message });
      });
  };
export const eliminarPool = (id,store) => {
    const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;
  
    let url = ENTRYPOINT+"polls/"+id;
    
    let setting = {
      method: "DELETE",
      url: url,
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token,
  
      }
    };
    mostrarLoader(true);
  
    axios(setting)
      .then((res) => {
        let response = res.data
        if(res.data.type!="error"){
          mostrarLoader(false);
          mostrarNotificacion({ type: "success", message: response.message });
        }else{
        
          mostrarLoader(false);
          mostrarNotificacion({ type: "error", message: response.message });
        }
        
      })
      .catch((error) => {
        mostrarLoader(false);
        mostrarNotificacion({ type: "success", message: error.message });
      });
  };
export const registrarSistema = (data,store) => {
    const { usuario, mostrarNotificacion, mostrarLoader } = store;
    
    let url = ENTRYPOINT+"polls";
    let setting = {
      method: "POST",
      url: url,
      data: data,
      body: data,
      headers: { Accept: "application/json",
      Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token,  },
    };
    mostrarLoader(true);
  
    axios(setting)
      .then((res) => {
        let response = res.data;
        if (response.type != "error") {
         
          mostrarLoader(false);
          mostrarNotificacion({ type: "success", message: response.message });
        } else {
          mostrarNotificacion({ type: "error", message: response.message });
          mostrarLoader(false);
        }
      })
      .catch((error) => {
        mostrarLoader(false);
  
        mostrarNotificacion({ type: "error", message: error.message });
      });
  }
export const obtenerTodos = (setData,store) => {
    const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;

 
  let url = ENTRYPOINT+"polls"
  let setting = {
    method: "Get",
    url: url,
    headers: { 'Accept': 'application/json',
    Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token, }

  };


  axios(setting)
    .then((res) => {
      let response = res.data
     if(response.type!="error"){
        setData(response.data)
     

     }else{
     
     }
    })
    .catch((error) => {
     


    });
}
export const evaluar = (data,store) => {
    const { usuario, mostrarNotificacion, mostrarLoader } = store;
    
    let url = ENTRYPOINT+"polls";
    let setting = {
      method: "POST",
      url: url,
      data: data,
      body: data,
      headers: { Accept: "application/json",
      Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token,  },
    };
    mostrarLoader(true);
  
    axios(setting)
      .then((res) => {
        let response = res.data;
        if (response.type != "error") {
         
          mostrarLoader(false);
          mostrarNotificacion({ type: "success", message: response.message });
        } else {
          mostrarNotificacion({ type: "error", message: response.message });
          mostrarLoader(false);
        }
      })
      .catch((error) => {
        mostrarLoader(false);
  
        mostrarNotificacion({ type: "error", message: error.message });
      });
  }
  export const obtenerPool = (id,setData,store) => {
    const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;

 
  let url = ENTRYPOINT+"polls/"+id
  let setting = {
    method: "Get",
    url: url,
    headers: { 'Accept': 'application/json',
    Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token, }

  };


  axios(setting)
    .then((res) => {
      let response = res.data
     if(response.type!="error"){
        setData(response.data)
     

     }else{
     
     }
    })
    .catch((error) => {
     


    });
}
  