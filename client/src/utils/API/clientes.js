import { encriptarJson, desencriptarJson } from "../security";
import {ENTRYPOINT} from '../../config/API'
const axios = require("axios");

export const crearCodigo = (data, store) => {
  const { usuario, mostrarNotificacion, mostrarLoader } = store;
 

  let url = ENTRYPOINT+"email/create_code";
  let setting = {
    method: "POST",
    url: url,
    data: data,
    body: data,
    headers: { Accept: "application/json",  },
  };
  mostrarLoader(true);

  axios(setting)
    .then((res) => {
      let response = res.data;
      if (response.type != "error") {
       
        mostrarLoader(false);
      
      } else {
       
        mostrarLoader(false);
      }
    })
    .catch((error) => {
      mostrarLoader(false);

    
    });
};
export const estaVerificado = (data, setData,store) => {
  const { mostrarNotificacion, mostrarLoader } = store;
 

  let url = ENTRYPOINT+"user/is_verified";
  let setting = {
    method: "POST",
    url: url,
    data: data,
    body: data,
    headers: { Accept: "application/json",  },
  };
  mostrarLoader(true);

  axios(setting)
    .then((res) => {
      let response = res.data;
      if (response.type != "error") {
       setData(response.verified)
        mostrarLoader(false);
      
      } else {
        setData(response.verified)
        mostrarLoader(false);
      }
    })
    .catch((error) => {
      mostrarLoader(false);
      setData(false)
    
    });
};

export const verificarCodigo = (data,setSuccess, store) => {
  const { usuario, mostrarNotificacion, mostrarLoader } = store;
 

  let url = ENTRYPOINT+"email/verify_code";
  let setting = {
    method: "POST",
    url: url,
    data: data,
    body: data,
    headers: { Accept: "application/json",  },
  };
  mostrarLoader(true);

  axios(setting)
    .then((res) => {
      let response = res.data;
      if (response.type != "error") {
        setSuccess(true)
        mostrarLoader(false);
      
      } else {
        setSuccess(false)
        mostrarLoader(false);
      }
    })
    .catch((error) => {
      mostrarLoader(false);

    
    });
};
export const editarIngresos = (data, store,changeStep) => {
  const { usuario, mostrarNotificacion, mostrarLoader } = store;
 

  let url = ENTRYPOINT+"client/edit_income";
  let setting = {
    method: "POST",
    url: url,
    data: data,
    body: data,
    headers: { Accept: "application/json",  },
  };
  mostrarLoader(true);

  axios(setting)
    .then((res) => {
      let response = res.data;
      if (response.type != "error") {
        mostrarLoader(false);
        changeStep()  
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
export const enviarRegalo = (data,setChange) => {

 

  let url = ENTRYPOINT+"client/send_reward";
  let setting = {
    method: "POST",
    url: url,
    data: data,
    body: data,
    headers: { Accept: "application/json",  },
  };


  axios(setting)
    .then((res) => {
      let response = res.data;
      if (response.type != "error") {
       setChange(1)
      } else {
        setChange(1)
      }
    })
    .catch((error) => {
     
    });
};
export const cambiarInteres = (data,store) => {

  const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;


  let url = ENTRYPOINT+"client/change_status";
  let setting = {
    method: "POST",
    url: url,
    data: data,
    body: data,
    headers: { Accept: "application/json", Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token,  },
  };


  axios(setting)
    .then((res) => {
      let response = res.data;
      if (response.type != "error") {
        mostrarLoader(false);
        mostrarNotificacion({ type: "success", message: response.message });
      } else {
        mostrarLoader(false);
        mostrarNotificacion({ type: "success", message: response.message });
      }
    })
    .catch((error) => {
      mostrarLoader(false);
        mostrarNotificacion({ type: "success", message: "Error de red" });
    });
};

export const cambiarRisk = (data,store) => {
  const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;

 

  let url = ENTRYPOINT+"client/change_risk";
  let setting = {
    method: "POST",
    url: url,
    data: data,
    body: data,
    headers: { Accept: "application/json",  },
  };


  axios(setting)
    .then((res) => {
      let response = res.data;
      if (response.type != "error") {
        mostrarLoader(false);
        mostrarNotificacion({ type: "success", message: response.message });
      } else {
        mostrarLoader(false);
        mostrarNotificacion({ type: "error", message: response.message });
      }
    })
    .catch((error) => {
      mostrarLoader(false);
       
    });
};

export const enviarCotizacion = (data,store) => {
  const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;

 

  let url = ENTRYPOINT+"cliente/send_cotization";
  let setting = {
    method: "POST",
    url: url,
    data: data,
    body: data,
    headers: { Accept: "application/json", Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token,  },
  };


  mostrarLoader(true)
  axios(setting)
    .then((res) => {
      let response = res.data;
      if (response.type != "error") {
        mostrarLoader(false);
        mostrarNotificacion({ type: "success", message: response.message });
        
      } else {
        mostrarLoader(false);
        mostrarNotificacion({ type: "error", message: response.message });
      }
    })
    .catch((error) => {
      mostrarLoader(false);
    });
};
export const cotizar = (data,store,setLink) => {
  const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;

 

  let url = ENTRYPOINT+"cliente/cotizar";
  let setting = {
    method: "POST",
    url: url,
    data: data,
    body: data,
    headers: { Accept: "application/json", Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token,  },
  };

mostrarLoader(true)
  axios(setting)
    .then((res) => {
      let response = res.data;
      if (response.type != "error") {
        mostrarLoader(false);
      //  mostrarNotificacion({ type: "info", message: response.message });
        setLink(response.url_cotiza)
      } else {
        mostrarLoader(false);
        mostrarNotificacion({ type: "error", message: response.message });
      }
    })
    .catch((error) => {
      mostrarLoader(false);
       
    });
};

export const obtenerValorCotizaciones = (data,setData) => {


 

  let url = ENTRYPOINT+"client/get_cotization";
  let setting = {
    method: "GET",
    url: url,
    params:data,
    headers: { Accept: "application/json"},
  };


  axios(setting)
    .then((res) => {
      let response = res.data;
      setData(response.cantidad_cotizaciones)
      if(response.hasOwnProperty('cantidad_cotizaciones')){
        setData(response.cantidad_cotizaciones);
      }
    })
    .catch((error) => {

       
    });
};
export const obtenerCotizacion = (cedula_interesado,store,setLink) => {
  const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;

 

  let url = ENTRYPOINT+"cliente/get_cotizacion?cedula_interesado="+cedula_interesado;
  let setting = {
    method: "GET",
    url: url,

    headers: { Accept: "application/json", Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token,  },
  };

mostrarLoader(true)
  axios(setting)
    .then((res) => {
      let response = res.data;
      if (response.type != "error") {
        mostrarLoader(false);
        mostrarNotificacion({ type: "success", message:response.message });
        setLink(response.url_PDFcotizacion)
      } else {
        mostrarLoader(false);
        mostrarNotificacion({ type: "error", message: response.message });
      }
    })
    .catch((error) => {
      mostrarLoader(false);
       
    });
};

export const cambiarUafe = (data,store) => {
  const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;

 

  let url = ENTRYPOINT+"client/change_uafe";
  let setting = {
    method: "POST",
    url: url,
    data: data,
    body: data,
    headers: { Accept: "application/json",  },
  };


  axios(setting)
    .then((res) => {
      let response = res.data;
      if (response.type != "error") {
        mostrarLoader(false);
        mostrarNotificacion({ type: "success", message: response.message });
      } else {
        mostrarLoader(false);
        mostrarNotificacion({ type: "error", message: response.message });
      }
    })
    .catch((error) => {
      mostrarLoader(false);
       
    });
};

export const precalificar = (data,store,recargar) => {
  const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;

 

  let url = ENTRYPOINT+"client/precalificate";
  let setting = {
    method: "POST",
    url: url,
    data: data,
    body: data,
    headers: { Accept: "application/json", Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token,  },
  };

mostrarLoader(true)
  axios(setting)
    .then((res) => {
      let response = res.data;
      if (response.type != "error") {
        mostrarLoader(false);
        mostrarNotificacion({ type: "success", message: response.message });
        recargar();
      } else {
        mostrarLoader(false);
        mostrarNotificacion({ type: "error", message: response.message });
      }
    })
    .catch((error) => {
      mostrarLoader(false);
       
    });
};




export const obtenerFiles = (client_id,setData) => {


  let url = ENTRYPOINT+"client/files?client_id="+client_id;
  let setting = {
    method: "GET",
    url: url,
    headers: {
      Accept: "application/json",
      
    },
  };

  axios(setting)
    .then((res) => {
      let response = res.data;
      if (response.type != "error") {
        setData(response.data);
        
      } else {
        
      }
    })
    .catch((error) => {
     
    });
};
export const obtenerReward = (client_id,setData) => {


  let url = ENTRYPOINT+"client/has_reward?client_id="+client_id;
  let setting = {
    method: "GET",
    url: url,
    headers: {
      Accept: "application/json",
      
    },
  };

  axios(setting)
    .then((res) => {
      let response = res.data;
      if (response.type != "error") {
        setData(response.has_reward);
        
      } else {
        
      }
    })
    .catch((error) => {
     
    });
};


export const getClientWithLead = (setData, store) => {
  const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;

  let url = ENTRYPOINT+"getClientWithLead";
  let setting = {
    method: "GET",
    url: url,
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token,
    },
  };

  axios(setting)
    .then((res) => {
      let response = res.data;
      if (response.type != "error") {
        setData(response.data);
      
      } else {
      
      }
    })
    .catch((error) => {
    
    });
};
export const obtenerLogs = (setData, store) => {
  const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;

  let url = ENTRYPOINT+"sgi/logs";
  let setting = {
    method: "GET",
    url: url,
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token,
    },
  };
  mostrarLoader(true);

  axios(setting)
    .then((res) => {
      let response = res.data;
      if (response.type != "error") {
        setData(response.data);
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
export const obtenerTodos = (tipo,setData, store,page,perPage,setTotalRows,search,status,setContadorColor) => {
  const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;

  let url = ENTRYPOINT+"clients/all?status="+status+"&q="+search+"&page="+(page+1)+"&perPage="+perPage+"&tipo="+tipo;
  let setting = {
    method: "GET",
    url: url,
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token,
    },
  };
  mostrarLoader(true);

  axios(setting)
    .then((res) => {
      let response = res.data;
      if (response.type != "error") {
        setData(response.data);
        mostrarLoader(false);
        setTotalRows(response.totalRows)
        mostrarNotificacion({ type: "success", message: response.message });

        setContadorColor(response.colorCount)
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
export const obtenerTodosTabla = (tipo,setData, store,page,perPage,setTotalRows,search,status,setContadorColor,filtro) => {
  const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;


  let params = ""
  if (filtro.length != 0) {
    filtro.map((e) => {
      params += "&" + e.tipo + "=" + e.valor
    })
  }
  let url = ENTRYPOINT+"clients/all?status="+status+"&q="+search+"&page="+(page+1)+"&perPage="+perPage+"&tipo="+tipo+" "+params;
  let setting = {
    method: "GET",
    url: url,
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token,
    },
  };
  mostrarLoader(true);

  axios(setting)
    .then((res) => {
      let response = res.data;
      if (response.type != "error") {
        setData(response.data);
        
       

        let newArray=[]
        response.data.map((e,i)=>{
          newArray.push({ ...e,numero:(i+1), position_name: (e.position != null ? (e.position != "Invalido" ? e.position : "Documentos no válidos") : "Procesando"), inicio: new Date(e.modificado).toLocaleString(),  city_name: e.city,  dependencia: (e.dependencia != null ? (e.dependencia == '1' ? 'SI' : 'NO') : "N/A"), asesor_name: (e.asesor != null ? e.asesor.nombres + " " + e.asesor.apellidos : "Sin asignar"), estado: e.estado_civil })
        })

        setData(newArray)
        mostrarLoader(false);
        setTotalRows(response.totalRows)
        mostrarNotificacion({ type: "success", message: response.message });

        setContadorColor(response.colorCount)
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
export const obtenerTodosNoAprobados = (tipo,setData, store) => {
  const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;

  let url = ENTRYPOINT+"clients/all?tipo="+tipo;
  let setting = {
    method: "GET",
    url: url,
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token,
    },
  };
  mostrarLoader(true);

  axios(setting)
    .then((res) => {
      let response = res.data;
      if (response.type != "error") {
        let datos=[]
        response.data.map((e)=> {
          if(e.position!="Aprobado"){
            datos.push({...e})
          }
        
        })
        setData(datos);
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


export const obtenerClientePrecalificador = (id,setData, store) => {
  const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;

  let url = ENTRYPOINT+"clients/precalificator_data?client_id="+id;
  let setting = {
    method: "GET",
    url: url,
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token,
    },
  };
  mostrarLoader(true);

  axios(setting)
    .then((res) => {
      let response = res.data;
      if (response.type != "error") {
        setData(response);
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

export const editarCliente = (data, store,changeStep,setValidation,setHasValidation) => {
  const { usuario, mostrarNotificacion, mostrarLoader } = store;
  const {
    spouse_id,monthly_iva,
    client_id,monthly_ivaS,
    dni,
    names,
    last_names,
    born_date,
    cellphone,
    dependencia,
    landline,
    address,civil,
    neighborhood,civil_name,
    city_id,
    recomendation_id,
    work_place,
    month_income,
    spouse_email,
    spouse_dni,
    spouse_names,
    spouse_last_names,
    spouse_born_date,
    spouse_cellphone,
    spouse_landline,
    referred_dni,
    referred_names,
    referred_proyect
    ,town,block,citadel,
    
  } = data;
  var raw = {
    ...data,
    spouse_id:spouse_id,
    client_id:client_id,
    dni:dni,monthly_ivaS:monthly_ivaS,
    monthly_iva:monthly_iva,
    names:names,dependence:dependencia
    ,town,block,citadel,
    referred_dni,
    referred_names,
    referred_proyect,civil,
    civil_name:civil_name,
    last_names:last_names,
    born_date:born_date,
    cellphone:cellphone,
    landline:landline,
    address:address,
    neighborhood:neighborhood,
    city_id:city_id,
    recomendation_id:recomendation_id,
    work_place:work_place,
    month_income:month_income,

    spouse_email,
    spouse_dni:spouse_dni,
    spouse_names:spouse_names,
    spouse_last_names:spouse_last_names,
    spouse_born_date:spouse_born_date,
    spouse_cellphone:spouse_cellphone,
    spouse_landline:spouse_landline
  };
  let url = ENTRYPOINT+"client/editar";
  let setting = {
    method: "POST",
    url: url,
    data: raw,
    body: raw,
    headers: { Accept: "application/json" },
  };
  mostrarLoader(true);

  axios(setting)
    .then((res) => {
      let response = res.data;
      if (response.type != "error") {
       if(changeStep!=null){
        changeStep()
       }
        mostrarLoader(false);
        mostrarNotificacion({ type: "success", message: response.message });
      } else {
        if(response.fields!=null){
          setValidation(response.fields)
          setHasValidation(true)
        }
        mostrarNotificacion({ type: "error", message: response.message });
        mostrarLoader(false);
      }
    })
    .catch((error) => {
      mostrarLoader(false);

      mostrarNotificacion({ type: "error", message: error.message });
    });
};
export const registrarCliente = (data, store,changeStep,setValidation,setHasValidation) => {
  const { usuario, mostrarNotificacion, mostrarLoader } = store;
  const {
    dni,
    names,
    last_names,
    born_date,
    cellphone,
    dependencia,
    landline,
    address,
    neighborhood,town,block,citadel,
    email,
    authorization,
    civil_name,
    civil,
    position,
    city_id,
    recomendation_id,
    work_place,
    month_income,
    spouse_dni,
    spouse_names,
    village_id,
    spouse_email,
    spouse_last_names,
    spouse_born_date,
    spouse_cellphone,
    spouse_landline,
    referred_dni,
    referred_names,
    referred_proyect,

    email_asesor,

    other_income,
    rent_expenses,
    food_expenses,
    clothing_expenses,
    basic_expenses,
    education_expenses,
    transport_expenses,

  } = data;
  var raw = {
    email_asesor,

    other_income,
    rent_expenses,
    food_expenses,
    clothing_expenses,
    basic_expenses,
    education_expenses,
    transport_expenses,

    email:email,
    authorization:authorization,
    dni:dni,town:town,block:block,citadel:citadel,
    civil:civil,
    referred_dni,
    referred_names,
    referred_proyect,
    civil_name:civil_name,
    position:position,
    names:names,
    village_id:village_id,
    dependence:dependencia,
    last_names:last_names,
    born_date:born_date,
    cellphone:cellphone,
    landline:landline,
    address:address,
    neighborhood:neighborhood,
    city_id:city_id,
    recomendation_id:recomendation_id,
    work_place:work_place,
    month_income:month_income,
    spouse_dni:spouse_dni,
    spouse_names:spouse_names,
    spouse_email:spouse_email,
    spouse_last_names:spouse_last_names,
    spouse_born_date:spouse_born_date,
    spouse_cellphone:spouse_cellphone,
    spouse_landline:spouse_landline
  };
  let url = ENTRYPOINT+"client/register";
  let setting = {
    method: "POST",
    url: url,
    data: raw,
    body: raw,
    headers: { Accept: "application/json" },
  };
  mostrarLoader(true);

  axios(setting)
    .then((res) => {
      let response = res.data;
      if (response.type != "error") {
        if(changeStep!=null){
          changeStep("2",response.id)
          
         
        }
       
        mostrarLoader(false);
        mostrarNotificacion({ type: "success", message: response.message });
      } else {
        if(response.fields!=null){
          setValidation(response.fields)
          setHasValidation(true)
        }
        
        mostrarNotificacion({ type: "error", message: response.message });
        mostrarLoader(false);
      }
    })
    .catch((error) => {
      mostrarLoader(false);

      mostrarNotificacion({ type: "error", message: error.message });
    });
};
export const registrarClienteAuth = (data,atras, store,setValidation,setHasValidation,subirConyuge) => {
  const { usuario, mostrarNotificacion, mostrarLoader } = store;
  const {
    dni,
    names,
    last_names,monthly_ivaS,
    born_date,
    cellphone,
    dependencia,
    landline,
    address,
    neighborhood,town,block,citadel,
    email,
    authorization,
    monthly_iva,
    civil_name,
    civil,
    position,
    city_id,
    recomendation_id,
    work_place,
    month_income,
    spouse_dni,
    spouse_names,
    village_id,
    spouse_email,
    spouse_last_names,
    spouse_born_date,
    spouse_cellphone,
    spouse_landline,
    referred_dni,
    referred_names,
    referred_proyect

  } = data;
  var raw = {
    ...data,
    email:email,
    authorization:authorization,
    dni:dni,town:town,block:block,citadel:citadel,
    civil:civil,monthly_ivaS:monthly_ivaS,
    referred_dni,
    monthly_iva:monthly_iva,
    referred_names,
    referred_proyect,
    civil_name:civil_name,
    position:position,
    names:names,
    village_id:village_id,
    dependence:dependencia,
    last_names:last_names,
    born_date:born_date,
    cellphone:cellphone,
    landline:landline,
    address:address,
    neighborhood:neighborhood,
    city_id:city_id,
    recomendation_id:recomendation_id,
    work_place:work_place,
    month_income:month_income,
    spouse_dni:spouse_dni,
    spouse_names:spouse_names,
    spouse_email:spouse_email,
    spouse_last_names:spouse_last_names,
    spouse_born_date:spouse_born_date,
    spouse_cellphone:spouse_cellphone,
    spouse_landline:spouse_landline
  };
  let url = ENTRYPOINT+"client/register_auth";
  let setting = {
    method: "POST",
    url: url,
    data: raw,
    body: raw,
    headers: { Accept: "application/json",
    Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token,
 },
  };
  mostrarLoader(true);

  axios(setting)
    .then((res) => {
      let response = res.data;
      if (response.type != "error") {
      
       
        mostrarLoader(false);
        mostrarNotificacion({ type: "success", message: response.message });
        subirConyuge()
        atras()
      } else {
        if(response.fields!=null){
          setValidation(response.fields)
          setHasValidation(true)
        }
        
        mostrarNotificacion({ type: "error", message: response.message });
        mostrarLoader(false);
      }
    })
    .catch((error) => {
      mostrarLoader(false);

      mostrarNotificacion({ type: "error", message: error.message });
    });
};
export const obtenerDataCliente = (dni,id,setData, store) => {
  const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;

  let url = ENTRYPOINT+"client/get_by_id?dni="+dni+"&client_id="+id;
  let setting = {
    method: "GET",
    url: url,
    headers: {
      Accept: "application/json",
      
    },
  };
  mostrarLoader(true);

  axios(setting)
    .then((res) => {
      let response = res.data;
      if (response.type != "error") {
 
        if(response.exist!=false){
          setData({client:{...response.client_data,email:response.email,province:response.province},spouse:response.spouse_data});
        }else{
          setData(null)
        }
     
        mostrarLoader(false);
       
      } else {
       
        mostrarLoader(false);
      }
    })
    .catch((error) => {
      mostrarLoader(false);

     
    });
};
export const obtenerDataClientePaso1 = (dni,id,setData, store,obtenerDataSGI) => {
  const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;

  let url = ENTRYPOINT+"client/get_by_id?dni="+dni+"&client_id="+id;
  let setting = {
    method: "GET",
    url: url,
    headers: {
      Accept: "application/json",
      
    },
  };
  mostrarLoader(true);

  axios(setting)
    .then((res) => {
      let response = res.data;
      if (response.type != "error") {
   
    
          setData({client:{...response.client_data,email:response.email,province:response.province},spouse:response.spouse_data});

       
        mostrarLoader(false);
        if(response.exist==false){
          obtenerDataSGI(dni)

        }
       
       
      } else {
       
        mostrarLoader(false);
      }
    })
    .catch((error) => {
      mostrarLoader(false);

     
    });
};
export const obtenerDataClienteSgi = (dni,setData,setSeller, store) => {
  const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;

  let url = ENTRYPOINT+"sgi/get_data?dni="+dni;
  let setting = {
    method: "GET",
    url: url,
    headers: {
      Accept: "application/json",
      
    },
  };
  mostrarLoader(true);

  axios(setting)
    .then((res) => {
      let response = res.data;
      if (response.type != "error") {
        let arrayNames = response.nombres_apellidos.trim().split(" ")
        let nombres  =arrayNames.splice(0,(arrayNames.length/2)).join(" ");
        let apellidos = arrayNames.splice(0,arrayNames.length).join(" ")
    
        let data={
          dni:response.cedula,
          names:nombres,
          last_names:apellidos,
          born_date:response.fecha_nacimiento,
          email:response.email,
          cellphone:response.celular,
          landline:response.telefono,
          civil:response.estado_civil==2?(response.estado_civil==3?5:1):6,
          address: response.direccion,
          citadel:response.referencia_domicilio,
          city_id:response.ciudad==75?93:response.ciudad,
          recomendation_id:getActivacionId(response.medio),
          email_asesor:response.correo_asesor,
          month_income:response.ingresos,
          other_income:response.otros_ingresos,
          rent_expenses:response.arriendo,
          food_expenses:response.alimentacion,
          clothing_expenses:response.vestimenta,
          basic_expenses:response.servicio_basicos,
          education_expenses:response.educacion,
          transport_expenses:response.transporte,
          spouse_dni:response.cedula_conyugue,
          spouse_email:response.email_conyugue,
          spouse_cellphone:response.celular_conyugue,
          spouse_landline:response.telefono_conyugue,
          spouse_born_date:response.fecha_nacimiento_conyugue,
          spouse_names:response.nombres_apellidos_conyugue.split(' ')[0],
          spouse_last_names:response.nombres_apellidos_conyugue.split(' ')[1],


        }
        setData(data);
        mostrarLoader(false);
       
      } else {
       
        mostrarLoader(false);
      }
    })
    .catch((error) => {
      mostrarLoader(false);

     
    });
};

let activacionesSgi=[
  {id:1,name:"Activaciones",id_sgi:3},
  {id:2,name:"Digitales",id_sgi:2},
  {id:2,name:"Digitales",id_sgi:9},
  {id:2,name:"Digitales",id_sgi:8},
  {id:2,name:"Digitales",id_sgi:10},
  {id:1,name:"Digitales",id_sgi:13},
  {id:1,name:"Digitales",id_sgi:14},
  {id:5,name:"Digitales",id_sgi:17},
  {id:3,name:"Digitales",id_sgi:20},
  {id:3,name:"Digitales",id_sgi:22},
  {id:3,name:"Ferias",id_sgi:5},
  {id:4,name:"Masivos",id_sgi:1},
  {id:5,name:"Referidos",id_sgi:5},
  {id:6,name:"Otros",id_sgi:3},
]
const getActivacionId=(id_sgi)=> {
  let id_como = 1;
  activacionesSgi.map((e)=>{
    if(id_sgi==e.id_sgi){
      id_como=e.id;
    }
  
  })
  return id_como
}
export const tieneConyuge = (client_id,setData) => {

  let url = ENTRYPOINT+'client/has_spouse?client_id='+client_id;
  let setting = {
    method: "GET",
    url: url,
    headers: {
      Accept: "application/json",
      
    },
  };

  axios(setting)
    .then((res) => {
      let response = res.data;
      if (response.type != "error") {

        setData(response);
       
      } else {
       
   
      }
    })
    .catch((error) => {
    

     
    });
};
export const tieneDependencia = (client_id,setData) => {

  let url = ENTRYPOINT+'client/has_dependence?client_id='+client_id;
  let setting = {
    method: "GET",
    url: url,
    headers: {
      Accept: "application/json",
      
    },
  };

  axios(setting)
    .then((res) => {
      let response = res.data;
      if (response.type != "error") {

        setData(response);
       
      } else {
       
   
      }
    })
    .catch((error) => {
    

     
    });
};
export const tieneArchivos = (client_id,setData) => {

  let url = ENTRYPOINT+'client/files?client_id='+client_id;
  let setting = {
    method: "GET",
    url: url,
    headers: {
      Accept: "application/json",
      
    },
  };

  axios(setting)
    .then((res) => {
      let response = res.data;
      if (response.type != "error") {

        setData(response.files);
       
      } else {
       
   
      }
    })
    .catch((error) => {
    

     
    });
};
export const tieneArchivosS = (client_id,setData) => {

  let url = ENTRYPOINT+'spouse/files?spouse_id='+client_id;
  let setting = {
    method: "GET",
    url: url,
    headers: {
      Accept: "application/json",
      
    },
  };

  axios(setting)
    .then((res) => {
      let response = res.data;
      if (response.type != "error") {

        setData(response.files);
       
      } else {
       
   
      }
    })
    .catch((error) => {
    

     
    });
};

export const uploadFiles = (data, store) => {
  const { usuario, mostrarNotificacion, mostrarLoader } = store;

 
  var resp = new FormData()
  resp.append('dni-file', data.dni_file)
  resp.append('roles-file',  data.roles_file)
  resp.append('preca-file', data.preca_file)
  resp.append('ruc-filesi', data.ruc_filesi)
  resp.append('decla-filesi',  data.decla_filesi)
  resp.append('mov-filesi', data.mov_filesi)
  resp.append('dni',  data.dni)

  
  let url = ENTRYPOINT+"client/editFiles";
  let setting = {
    method: "POST",
    url: url,
    data: resp,
    body: resp,

  };
  mostrarLoader(true);

  axios(setting)
    .then((res) => {
      let response = res.data;
      if (response.type != "error") {
       
        mostrarLoader(false);
        //mostrarNotificacion({ type: "success", message: response.message });
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
export const upload = (data, store) => {
  const { usuario, mostrarNotificacion, mostrarLoader } = store;
 
 
  var resp = new FormData()
  if(data.client_id!=null){
    resp.append('client_id', data.client_id)
  }
  resp.append('dni-file', data.dni_file)
  resp.append('roles-file1',  data.roles_file)
  resp.append('roles-file2',  data.roles_file2)
  resp.append('roles-file3',  data.roles_file3)
  resp.append('preca-file', data.preca_file)
  resp.append('precalification_file', data.precalification_file)
  resp.append('mecanizado-file', data.mecanizado)

  resp.append('monthly_iva',  data.monthly_iva)
  
  resp.append('ruc-filesi', data.ruc_filesi)
  resp.append('decla-filesi',  data.decla_filesi)

  resp.append('decla_filesi2',  data.decla_filesi2)
  resp.append('decla_filesi3',  data.decla_filesi3)
  resp.append('decla_filesi4',  data.decla_filesi4)
  resp.append('decla_filesi5',  data.decla_filesi5)
  resp.append('decla_filesi6',  data.decla_filesi6)

  resp.append('declaIm-files',  data.renta_filesi)
  resp.append('mov-filesi', data.mov_filesi)
  resp.append('mov-filesi2', data.mov_filesi2)
  resp.append('mov-filesi3', data.mov_filesi3)

  
  resp.append('dni',  data.dni)
  resp.append('dependencia',  data.dependencia)

  resp.append('monthly_ivaO',  data.monthly_ivaO)
  resp.append('ruc_filesiO',  data.ruc_filesiO)
  resp.append('decla_filesiO',  data.decla_filesiO)
  resp.append('decla_filesi2O',  data.decla_filesi2O)
  resp.append('decla_filesi3O',  data.decla_filesi3O)
  resp.append('decla_filesi4O',  data.decla_filesi4O)
  resp.append('decla_filesi5O',  data.decla_filesi5O)
  resp.append('decla_filesi6O',  data.decla_filesi6O)

  
  resp.append('declaIm-filesO',  data.renta_filesiO)

 
  resp.append('mov_filesiO1',  data.mov_filesiO1)
  resp.append('mov_filesiO2',  data.mov_filesiO2)
  resp.append('mov_filesiO3',  data.mov_filesiO3)
  data.other_files.map((e)=>{
    resp.append('file_'+e.nombre+"_"+e.id,  e.file)

  })

  let url = ENTRYPOINT+"client/upload";
  let setting = {
    method: "POST",
    url: url,
    data: resp,
    body: resp,

  };


  axios(setting)
    .then((res) => {
      let response = res.data;
      if (response.type != "error") {
       
      
      //mostrarNotificacion({ type: "success", message: response.message });
      } else {
        //mostrarNotificacion({ type: "error", message: response.message });
  
      }
    })
    .catch((error) => {
  

     // mostrarNotificacion({ type: "error", message: error.message });
    });
};

export const uploadConyuge = (data, store) => {
  const { usuario, mostrarNotificacion, mostrarLoader } = store;

 


  var resp = new FormData()
  if(data.spouse_id!=null){
    resp.append('spouse_id', data.spouse_id)
  }
  resp.append('dni-file', data.dni_file)
  resp.append('roles-file1',  data.roles_file)
  resp.append('roles-file2',  data.roles_file2)
  resp.append('roles-file3',  data.roles_file3)
  resp.append('preca-file', data.preca_file)
  resp.append('monthly_iva',  data.monthly_iva)
  resp.append('ruc-filesi', data.ruc_filesi)
  resp.append('decla-filesi',  data.decla_filesi)       
  resp.append('mecanizado-file',  data.mecanizado)       

  resp.append('decla_filesi2',  data.decla_filesi2)
  resp.append('decla_filesi3',  data.decla_filesi3)
  resp.append('decla_filesi4',  data.decla_filesi4)
  resp.append('decla_filesi5',  data.decla_filesi5)
  resp.append('decla_filesi6',  data.decla_filesi6)

  resp.append('declaIm-files',  data.renta_filesi)
  resp.append('mov-filesi', data.mov_filesi)
  resp.append('mov-filesi2', data.mov_filesi2)
  resp.append('mov-filesi3', data.mov_filesi3)
  resp.append('dni',  data.dni)
  resp.append('dependencia',  data.dependencia)
  resp.append('monthly_ivaOS',  data.monthly_ivaO)
  resp.append('ruc_filesiOS',  data.ruc_filesiO)
  resp.append('decla_filesiOS',  data.decla_filesiO)
  resp.append('decla_filesi2OS',  data.decla_filesi2O)
  resp.append('decla_filesi3OS',  data.decla_filesi3O)
  resp.append('decla_filesi4OS',  data.decla_filesi4O)
  resp.append('decla_filesi5OS',  data.decla_filesi5O)
  resp.append('decla_filesi6OS',  data.decla_filesi6O)
  resp.append('declaIm-filesOS',  data.renta_filesiO)
  
  resp.append('mov_filesiO1',  data.mov_filesiO1)
  resp.append('mov_filesiO2',  data.mov_filesiO2)
  resp.append('mov_filesiO3',  data.mov_filesiO3)
  
  let url = ENTRYPOINT+"spouse/upload";
  let setting = {
    method: "POST",
    url: url,
    data: resp,
    body: resp,

  };


  axios(setting)
    .then((res) => {
      let response = res.data;
      if (response.type != "error") {
       
      
      //mostrarNotificacion({ type: "success", message: response.message });
      } else {
        //mostrarNotificacion({ type: "error", message: response.message });
  
      }
    })
    .catch((error) => {
  

     // mostrarNotificacion({ type: "error", message: error.message });
    });
};

export const downloadFiles = (datos,setData,store) => {
  const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;
  const {dni,tipo}=datos
  let url = ENTRYPOINT+"client/download?dni="+dni+"&tipo="+tipo;
  let setting = {
    method: "GET",
    url: url,
    responseType: 'blob',
    headers: {
      Accept: "application/json",
    }
  };
  mostrarLoader(true);

  axios(setting)
    .then((res) => {
      console.log("ER")
      console.log(res)
      if(res.data.type!="error"){
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'file.pdf'); //or any other extension
        document.body.appendChild(link);
   
        var oReq = new XMLHttpRequest();
  
        var URLToPDF = url;
  
        oReq.open("GET", URLToPDF, true);
  
        oReq.responseType = "blob";
  
        oReq.onload = function() {
            // Once the file is downloaded, open a new window with the PDF
            // Remember to allow the POP-UPS in your browser
            const file = new Blob([oReq.response], { type: 'application/pdf' });
  
            const fileURL = URL.createObjectURL(file);
            setData(fileURL)
            //window.open(fileURL, "_blank");
        };
  
        oReq.send();
        mostrarLoader(false);
      
      }else{
      
        mostrarLoader(false);
        
      }
      
    })
    .catch((error) => {
      mostrarLoader(false);
   
    });
};
export const exportFiles = (store) => {
  const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;
  
  let url = ENTRYPOINT+"clients/export"
  let setting = {
    method: "GET",
    url: url,
    responseType: 'blob',
    headers: {
      Accept: "application/json",
    }
  };
  mostrarLoader(true);

  axios(setting)
    .then((res) => {
      console.log("ER")
      console.log(res)
      if(res.data.type!="error"){
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'reporte.xlsx'); //or any other extension
        document.body.appendChild(link);
   
        link.click();
        mostrarLoader(false);
      
      }else{
      
        mostrarLoader(false);
        
      }
      
    })
    .catch((error) => {
      mostrarLoader(false);
   
    });
};
export const eliminarCliente = (client_id,store,cargarData) => {
  const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;

  let url = ENTRYPOINT+"client/delete";
  var raw = {
    client_id:client_id,
  };
  let setting = {
    method: "DELETE",
    url: url,
    data: raw,
    body: raw,
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
        cargarData()
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
export const importar = (data,store) => {
  const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;
  var resp = new FormData()
  resp.append('excel-file', data.excelFile)
  
  let url = ENTRYPOINT+"clients/import";
  let setting = {
    method: "POST",
    url: url,
    data: resp,
    body: resp,
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

export const importarData = (data, store) => {
  const { usuario, mostrarNotificacion, mostrarLoader } = store;
  
  let url = ENTRYPOINT+"importData";
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