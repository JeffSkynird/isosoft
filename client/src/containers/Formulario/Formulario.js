import React, { useState, useEffect, useContext } from "react";
import datos from "../../assets/datos.JPG";
import InputMask from 'react-input-mask';
import Button from "@material-ui/core/Button";

import Box from "@material-ui/core/Box";
import Initializer from "../../store/Initializer";
import {
  editarCliente,
  uploadFiles,
  registrarCliente,
  upload,estaVerificado,
  obtenerDataClientePaso1,
  crearCodigo,obtenerDataClienteSgi
} from "../../utils/API/clientes";

import Grid from "@material-ui/core/Grid";
import "./style/Main.css";
import { obtenerTodos } from "../../utils/API/ciudades";
import { obtenerTodosProvincias } from "../../utils/API/provinces";

import { obtenerEstadoCivil } from "../../utils/API/civil";
import { obtenerNacionalidades } from "../../utils/API/nacionalidad";
import {obtenerProyectos} from '../../utils/API/villas'

import { obtenerRecomendaciones } from "../../utils/API/recomendaciones";
import { convertirDate, dateFormatA } from "../../utils/Date";

import ModalVerificarCorreo from "./Components/ModalVerificarCorreo";
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {
  DatePicker,
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

export default function Formulario(props) {
  const initializer = useContext(Initializer);

  const [open, setOpen] = useState(false);

  const [ecuatoriano, setEcuatoriano] = useState(true);
  const [autorization, setAutorization] = useState(true);

  
  const [cedula, setCedula] = useState("");
  const [nombre1, setNombre1] = useState("");
  const [nombre2, setNombre2] = useState("");
  const [apellido1, setApellido1] = useState("");
  const [apellido2, setApellido2] = useState("");
  const [nacimiento, setNacimiento] = useState('');
  const [civil, setCivil] = useState("");
  const [celular, setCelular] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [direccion, setDireccion] = useState("");
  const [manzana, setManzana] = React.useState("");
  const [villa, setVilla] = React.useState("");
  const [ciudadela, setCiudadela] = React.useState("");
  const [cedulaValida, setCedulaValida] = useState("");
  const [showButton, setShowButton] = useState(true);
  const [ciudad, setCiudad] = useState("");
  const [ciudadData, setCiudadData] = useState({data:[],backup:[]});


  const [cedulaS, setCedulaS] = useState("");
  const [nombre1S, setNombre1S] = useState("");
  const [nombre2S, setNombre2S] = useState("");
  const [apellido1S, setApellido1S] = useState("");
  const [apellido2S, setApellido2S] = useState("");

  const [nacimientoS, setNacimientoS] = useState(new Date());
  const [celularS, setCelularS] = useState("");
  const [telefonoS, setTelefonoS] = useState("");
  const [emailS, setEmailS] = useState("");
  const [recomendationData, setRecomendationData] = useState([]);
  const [recomendation, setRecomendation] = useState("");
  const [nacionalidad, setNacionalidad] = useState("");
  const [nacionalidadData, setNacionalidadData] = useState([]);

  const [cedulaR, setCedulaR] = useState("");

  const [nombreR, setNombreR] = useState("");
  const [proyectoR, setProyectoR] = useState("");

  const [clientId, setClientId] = useState(null);

  const [province, setProvince] = useState("");
  const [provinceData, setProvinceData] = useState([]);

  //const [civil, setProvince] = useState("");
  const [civilData, setCivilData] = useState([]);


  const [openDate, setOpenDate] = useState(false);


  const [proyectoData, setProyectoData] = useState([]);
  const [proyecto, setProyecto] = useState("");

  
  const [errors, setErrors] = useState({email:false,emailS:false,dni:false,dniS:false,dniR:false});
  const [validation,setValidation]=useState({dni:1,names:1,last_names:1,cellphone:1,landline:1,email:1,civil_name:1,recomendation_id:1,spouse_dni:1,spouse_names:1,spouse_email:1,spouse_last_names:1})
  const [hasValidation,setHasValidation]=useState(false)

  const [verified, setVerified] = useState(null);

  const [seller,setSeller]=useState(null)
  const [dataCliente, setDataCliente] = useState(null);
  const [dataClienteSgi, setDataClienteSgi] = useState(null);
 React.useEffect(()=>{
  let url = new URL(window.location);
  let c = url.searchParams.get("client_id");

  let client_id=props.client_id!=null?props.client_id:c

  if(client_id!=null){
    setCedulaValida(true);
    props.setTitle('RESERVA HOY MISMO')
    obtenerDataClientePaso1(cedula,client_id, setDataCliente, initializer,obtenerDataSGI);
  }
 

 },[props.client_id])
 useEffect(()=>{
  if(dataClienteSgi!=null){
    setCedula(dataClienteSgi.dni)

    setNombre1(dataClienteSgi.names.split(" ")[0]);
    setNombre2(dataClienteSgi.names.split(" ").length>=2?dataClienteSgi.names.split(" ")[1]:"");
    setApellido1(dataClienteSgi.last_names.split(" ")[0]);
    setApellido2(dataClienteSgi.last_names.split(" ").length>=2?dataClienteSgi.last_names.split(" ")[1]:"");




    setEmail(dataClienteSgi.email);
    setCelular(dataClienteSgi.cellphone);
    setTelefono(dataClienteSgi.landline);
    setDireccion(dataClienteSgi.address);
    setVilla("");
    setManzana("");
    setCiudadela(dataClienteSgi.citadel);
    setNacimiento(dataClienteSgi.born_date);
    setNacionalidad("");
    setCiudad(dataClienteSgi.city_id);
    
    setRecomendation(dataClienteSgi.recomendation_id);

    setCedulaR("");
    setNombreR("");
    setProyectoR("");

    setEcuatoriano(true);
    setCivil(dataClienteSgi.civil);
    if (dataClienteSgi.spouse_dni != null) {
      setEmailS(dataClienteSgi.spouse_email);
      setCedulaS(dataClienteSgi.spouse_dni);

      setNombre1S(dataClienteSgi.spouse_names);
      setNombre2S("");
      setApellido1S(dataClienteSgi.spouse_last_names);
      setApellido2S("");

      setNacimientoS(convertirDate(dataClienteSgi.spouse_born_date));
      setCelularS(dataClienteSgi.spouse_cellphone);
      setTelefonoS(dataClienteSgi.spouse_landline);
    }
  }
 },[dataClienteSgi])
  useEffect(() => {
    obtenerTodos(setCiudadData);
    obtenerTodosProvincias(setProvinceData,initializer)
    obtenerRecomendaciones(setRecomendationData);
    obtenerEstadoCivil(setCivilData)
    obtenerNacionalidades(setNacionalidadData)

    obtenerProyectos(setProyectoData)
  }, []);
  const changeProvince=(id)=>{
    let data=[]
    ciudadData.backup.slice().map((e)=>{
      if(e.id_provincia==id){
        data.push({...e})
      }
    })
    
    setCiudadData({...ciudadData,data:data})
    setProvince(id)
  }
  function validarCedula(cad) {
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

      total = total % 10 ? 10 - (total % 10) : 0;

      if (cad.charAt(longitud - 1) == total) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  function ingresarCedula(cedula) {
    setDataCliente(null);
    if (validarCedula(cedula)) {
      setCedulaValida(true);
      //setShowButton(false);
      //const timer = setTimeout(() => setShowButton(true), 3000);
      props.setTitle('RESERVA TU CASA HOY MISMO')
    } else {
      initializer.mostrarNotificacion({ type: "error", message:'Cédula inválida' });
      setCedulaValida(false);

     // setShowButton(false);
      //const timer = setTimeout(() => setShowButton(true), 3000);
      props.setTitle('RESERVA HOY MISMO')
    }
  }
  const obtenerDataSGI=(dni)=>{
    
    obtenerDataClienteSgi(dni,setDataClienteSgi,setSeller,initializer);

  }
  useEffect(() => {
    if (dataCliente != null) {
      if (dataCliente.client.email != null) {
        setCedula(dataCliente.client.cedula)
        setNombre1(dataCliente.client.nombres.split(" ")[0]);
        setNombre2(dataCliente.client.nombres.split(" ").length>=2?dataCliente.client.nombres.split(" ")[1]:"");
        setApellido1(dataCliente.client.apellidos.split(" ")[0]);
        setApellido2(dataCliente.client.apellidos.split(" ").length>=2?dataCliente.client.apellidos.split(" ")[1]:"");

        setEmail(dataCliente.client.email);
        setCelular(dataCliente.client.celular);
        setTelefono(dataCliente.client.telefono);
        setDireccion(dataCliente.client.direccion);
        setVilla(dataCliente.client.numero_villa);
        setManzana(dataCliente.client.calle);
        setCiudadela(dataCliente.client.referencia_direccion);
        setNacimiento(dataCliente.client.fecha_nacimiento);
        setNacionalidad(dataCliente.client.id_nacionalidad);
        setCiudad(dataCliente.client.id_ciudad);
        setProvince(dataCliente.client.province);
        setRecomendation(dataCliente.client.medio_id);

        setCedulaR(dataCliente.client.cedula_referido);
        setNombreR(dataCliente.client.nombres_referido);
        setProyectoR(dataCliente.client.id_proyecto_referido);

        setEcuatoriano(dataCliente.client.id_nacionalidad == null ? true : false);
        setCivil(dataCliente.client.id_estado_civil);
        if (dataCliente.spouse != null) {
          setEmailS(dataCliente.spouse.correo);
          setCedulaS(dataCliente.spouse.cedula);

          setNombre1S(dataCliente.spouse.nombres.split(" ")[0]);
          setNombre2S(dataCliente.spouse.nombres.split(" ").length>=2?dataCliente.spouse.nombres.split(" ")[1]:"");
          setApellido1S(dataCliente.spouse.apellidos.split(" ")[0]);
          setApellido2S(dataCliente.spouse.apellidos.split(" ").length>=2?dataCliente.spouse.apellidos.split(" ")[1]:"");

          setNacimientoS(convertirDate(dataCliente.spouse.fecha_nacimiento));
          setCelularS(dataCliente.spouse.celular);
          setTelefonoS(dataCliente.spouse.telefono);
        }
      }else{
        
      }
    }
  }, [dataCliente]);
  useEffect(
    (e) => {
      if (cedulaValida == true) {
        if (cedula != "") {
          if (validarCedula(cedula)) {
            obtenerDataClientePaso1(cedula,0, setDataCliente, initializer,obtenerDataSGI);
          }
        }
      }
    },
    [cedula, cedulaValida]
  );
  const getId = (nombre) => {
    let datos1 = [
      {
        id: 1,
        name: "SOLTERO",
      },
      {
        id: 2,
        name: "CASADO",
      },
      {
        id: 3,
        name: "UNION LIBRE",
      },
      {
        id: 4,
        name: "DIVORCIADO",
      },
      {
        id: 5,
        name: "VIUDO",
      },
      {
        id: 6,
        name: "CASADO - SEPARACIÓN DE BIENES",
      },
    ];
    let id_civil = "";

    datos1.map((e) => {
      if (nombre == e.name) {
        id_civil = e.id;
      }
    });
    return id_civil;
  };
  const getName = (id) => {


    let datos1 = [
      {
        id: 1,
        name: "SOLTERO",
      },
      {
        id: 2,
        name: "CASADO",
      },
      {
        id: 3,
        name: "UNION LIBRE",
      },
      {
        id: 4,
        name: "DIVORCIADO",
      },
      {
        id: 5,
        name: "VIUDO",
      },
      {
        id: 6,
        name: "CASADO - SEPARACIÓN DE BIENES",
      },
    ];
    let id_civil = "";
    datos1.map((e) => {
     
      if (id == e.id) {
        id_civil = e.name;
      }
    });
  
    return id_civil;
  };

  const obtenerClienteData = (e) => {
    if (e.key === "Enter" || e.key === "Tab") {
      if (cedula != "") {
        ingresarCedula(cedula);
      }
    }
  };
  const vaciarCampos = () => {
    setCedulaValida(false);
    setCedula("");
    setDataCliente(null);
    setNombre1("");
    setNombre2("");

    setApellido1("");
    setApellido2("");

    setEmail("");
    setCelular("");
    setTelefono("");
    setDireccion("");
    setVilla("");
    setManzana("");
    setCiudadela("");

    setNacimiento("");

    setCivil("");

    setEmailS("");
    setCedulaS("");
    setNombre1S("");
    setNombre2S("");

    setApellido1S("");
    setApellido2S("");

    setNacimientoS("");
    setCelularS("");
    setTelefonoS("");
  };
  const changeStp=()=>{
    props.changeStep("2", dataCliente.client.id);
  }
  const editarDatos = () => {
    if (validarCedula(cedula)) {
      editarCliente(
        {
          client_id: dataCliente.client.id,
          dni: cedula,
          names: nombre1 + " " + nombre2,
          last_names: apellido1 + " " + apellido2,
          cellphone: celular,

          born_date: nacimiento == "" ? "10/10/2020" : nacimiento,
          civil: civil,
          civil_name: getName(civil),
          neighborhood: dataCliente.client.neighborhood,
          position: dataCliente.client.position,
          landline: telefono,
          address: direccion == "" ? "N/A" : direccion,
          referred_dni: cedulaR,
          referred_names: nombreR,
          referred_proyect: proyectoR,
          work_place:dataCliente.client.work_place,
          town: villa == "" ? "N/A" : villa,
          block: manzana == "" ? "N/A" : manzana,
          citadel: ciudadela == "" ? "N/A" : ciudadela,
          nacionalidad: nacionalidad,
          email: email,
          city_id: ciudad,
          dependencia: dataCliente.client.dependence,
          recomendation_id: recomendation,
          month_income: dataCliente.client.month_income,
          spouse_id: dataCliente.spouse != null ? dataCliente.spouse.id : "",
          spouse_dni: cedulaS,
          spouse_names: nombre1S + " " + nombre2S,
          spouse_last_names: apellido1S + " " + apellido2S,
          spouse_born_date: "2020-12-10",
          spouse_cellphone: celularS,
          spouse_email: emailS,
        },
        initializer,changeStp,setValidation,setHasValidation
      );
      
    } else {
      initializer.mostrarNotificacion({
        type: "error",
        message: "Conyuge: Cédula inválida",
      });
      setVerified(null)
    }
  };
  React.useEffect(()=>{
    if(hasValidation){
      setOpen(false)
      setHasValidation(false)
      setVerified(null)
    }
  },[hasValidation])
  const editar = () => {
    if (validarCedula(cedula)) {
      if (cedulaS != "") {
        registrarCliente(
          {
            email: email,
            authorization: 1,
            civil: civil,
            civil_name: getName(civil),

            referred_dni: cedulaR,
            referred_names: nombreR,
            referred_proyect: proyectoR,
            //DATA SGI
            email_asesor:dataClienteSgi!=null?dataClienteSgi.email_asesor:null,
            month_income: dataClienteSgi!=null?dataClienteSgi.month_income:null,
            other_income: dataClienteSgi!=null?dataClienteSgi.other_income:null,
            rent_expenses: dataClienteSgi!=null?dataClienteSgi.rent_expenses:null,
            food_expenses: dataClienteSgi!=null?dataClienteSgi.food_expenses:null,
            clothing_expenses: dataClienteSgi!=null?dataClienteSgi.clothing_expenses:null,
            basic_expenses: dataClienteSgi!=null?dataClienteSgi.basic_expenses:null,
            education_expenses: dataClienteSgi!=null?dataClienteSgi.education_expenses:null,
            transport_expenses: dataClienteSgi!=null?dataClienteSgi.transport_expenses:null,

            spouse_email: emailS,
            dni: cedula,
            names: nombre1 + " " + nombre2,
            last_names: apellido1 + " " + apellido2,
            born_date: nacimiento == "" ? "10/10/2020" : nacimiento,
            cellphone: celular,
            landline: telefono,
            address: direccion == "" ? "N/A" : direccion,
            neighborhood: "NORTE",
            nacionalidad: nacionalidad,
            town: villa == "" ? "N/A" : villa,
            block: manzana == "" ? "N/A" : manzana,
            citadel: ciudadela == "" ? "N/A" : ciudadela,
            city_id: ciudad,
            dependencia: 0,
            recomendation_id: recomendation,
         

            position: "Paso 1",
            spouse_dni: cedulaS,
            spouse_names: nombre1S + " " + nombre2S,
            spouse_last_names: apellido1S + " " + apellido2S,
            spouse_born_date: "2020-10-10",
            spouse_cellphone: celularS,
            spouse_landline: telefonoS,
          },
          initializer,
          props.changeStep,setValidation,setHasValidation
        );
      } else {
        registrarCliente(
          {
               //DATA SGI
               email_asesor:dataClienteSgi!=null?dataClienteSgi.email_asesor:null,
               month_income: dataClienteSgi!=null?dataClienteSgi.month_income:null,
               other_income: dataClienteSgi!=null?dataClienteSgi.other_income:null,
               rent_expenses: dataClienteSgi!=null?dataClienteSgi.rent_expenses:null,
               food_expenses: dataClienteSgi!=null?dataClienteSgi.food_expenses:null,
               clothing_expenses: dataClienteSgi!=null?dataClienteSgi.clothing_expenses:null,
               basic_expenses: dataClienteSgi!=null?dataClienteSgi.basic_expenses:null,
               education_expenses: dataClienteSgi!=null?dataClienteSgi.education_expenses:null,
               transport_expenses: dataClienteSgi!=null?dataClienteSgi.transport_expenses:null,
   
            email: email,
            dni: cedula,
            civil: civil,
            civil_name: getName(civil),
            names: nombre1 + " " + nombre2,
            last_names: apellido1 + " " + apellido2,
            born_date: nacimiento == "" ? "10/10/2020" : nacimiento,
            cellphone: celular,
            landline: telefono,
            address: direccion == "" ? "N/A" : direccion,
            neighborhood: "NORTE",
            town: villa == "" ? "N/A" : villa,
            block: manzana == "" ? "N/A" : manzana,
            citadel: ciudadela == "" ? "N/A" : ciudadela,
            nacionalidad: nacionalidad,
            position: "Paso 1",

            referred_dni: cedulaR,
            referred_names: nombreR,
            referred_proyect: proyectoR,

            city_id: ciudad,
      
            recomendation_id: recomendation,
            dependencia: 0,
          },
          initializer,
          props.changeStep,setValidation,setHasValidation
        );
      }
    } else {
      initializer.mostrarNotificacion({
        type: "error",
        message: "Cédula inválida",
      });
      setVerified(null)
    }
  };
  const confirmar = () => {
 
      if (dataCliente != null) {
      if (dataCliente.client.email != null) {
        editarDatos();
      }else{
        editar();
      }
      } else {
        editar();
      }
    
  };
  const verificarEmail=()=>{
    estaVerificado({email:email},setVerified,initializer)
  }
  React.useEffect(()=>{
    if(verified!=null){
      if(verified==false){
        crearCodigoEmail()
      }else{
        confirmar()
      }
     
    }
  },[verified])
  const crearCodigoEmail = () => {
    if(civil==2 ||civil==3||civil==6){
      if(validarCedula(cedulaS)){
        if(email!=""){
          if(cedula!=""){

            crearCodigo({ email: email, dni: cedula }, initializer);
            setOpen(true);
          }else{
            initializer.mostrarNotificacion({
              type: "error",
              message: "Cédula: requerido.",
            });
          }
        }else{
          initializer.mostrarNotificacion({
            type: "error",
            message: "Correo: requerido.",
          });
        }
      
      }else{
        initializer.mostrarNotificacion({
          type: "error",
          message: "Conyuge: Cédula inválida",
        });
        setVerified(null)
      }
    }else{
      if(email!=""){
        if(cedula!=""){
          crearCodigo({ email: email, dni: cedula }, initializer);
          setOpen(true);
        }else{
          initializer.mostrarNotificacion({
            type: "error",
            message: "Cédula: requerido.",
          });
        }
       
      }else{
        initializer.mostrarNotificacion({
          type: "error",
          message: "Correo: requerido.",
        });
      }
    }
   
    
  };

  return (
    <React.Fragment>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "15%",
            marginTop: "15px",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              backgroundColor: "#22428b",
              borderRadius: "13px",
              height: "13px",
              width: "13px",
            }}
          ></div>
          <div
            style={{
              backgroundColor: "#cbcbcb",
              borderRadius: "13px",
              height: "13px",
              width: "13px",
              cursor:'pointer'
            }}
            onClick={()=>{
                if (dataCliente != null) {
                  if (dataCliente.client.email != null) {
                   props.changeStep('2', dataCliente.client.id)
                  }

        
                }
            
            }}
          ></div>
          <div
            style={{
              backgroundColor: "#cbcbcb",
              borderRadius: "13px",
              height: "13px",
              width: "13px",
              cursor:'pointer'
            }}
            onClick={()=>{
              if (dataCliente != null) {
                if (dataCliente.client.email != null) {
                 props.changeStep('3', dataCliente.client.id)
                }

      
              }
          
          }}
          ></div>
        </div>
        <p style={{ margin: "5px", color: "#214088" }}>PASO 1 DE 3</p>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={datos}
          alt=""
   
          style={{ width: "6%", height: "45px" }}
        />
        <p
          style={{
            width: "150px",
            color: "#575757 ",
            margin: "0px",
            textAlign: "center",
          }}
        >
          Por favor ingresa tus datos personales
        </p>
      </div>
      <div>
        <p style={{ color: "#575757", fontSize: "13px" }}>
          Tengo cédula ecuatoriana:{" "}
          <span>
            <label htmlFor="si" style={{ display: "inline-flex" }}>
              {" "}
              Sí{" "}
              <input
                type="radio"
                name=""
                id="si"
                checked={ecuatoriano == true ? true : false}
                onChange={() => {
                  setEcuatoriano(true);
                }}
              />
            </label>
            <label htmlFor="no" style={{ display: "inline-flex" }}>
              No{" "}
              <input
                type="radio"
                name=""
                id="no"
                checked={ecuatoriano == false ? true : false}
                onChange={() => {
                  setEcuatoriano(false);
                }}
              />
            </label>
          </span>
        </p>
      </div>
      <div>
        <p style={{ fontSize: "13px", textAlign: "center",color:'black' }}>
          Por favor ingresa tu cédula para continuar
        </p>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            paddingLeft: "30px",

            paddingRight: "30px",
          }}
        >
          {ecuatoriano == true ? (
            <input
              style={{
                width: "60%",
                padding: "6px",
                marginRight: "5px",
                height: "32px",
                borderColor:validation.dni!=null?"" :"red",borderWidth:validation.dni!=null?"":'1px',validation:validation.dni!=null?"":'solid'
              }}
              type="number"
              name=""
              id=""
              placeholder="Número de cédula"
              onChange={(e) => setCedula(e.target.value)}
              value={cedula}
              onKeyDown={obtenerClienteData}
            />
          ) : (
            <input
              style={{
                width: "60%",
                padding: "6px",
                marginRight: "5px",
                height: "32px",
                borderColor:validation.dni!=null?"":"red",borderWidth:validation.dni!=null?"":'1px',borderStyle:validation.dni!=null?"":'solid'
              }}
              type="text"
              name=""
              id=""
              placeholder="Pasaporte"
              onChange={(e) => setCedula(e.target.value)}
              value={cedula}
              onKeyDown={obtenerClienteData}
            />
          )}

          {showButton ? (
         
                   <Button
                   style={{
                    width: "40%",
                 
             
                    padding: "4px",
                    color: "white",
                    backgroundColor: "#213f87",
                  }}
                   variant="contained"
                   color="primary"
                   onClick={(e) => ingresarCedula(cedula)}
                 >
                   INGRESAR
                 </Button>
          ) : cedulaValida == true ? (
            <p style={{ marginLeft: "5px",textAlign:'center',marginBottom: '0px',
            marginTop: '0px' }}>
              <span style={{ color: "#00a72f" }}>&#10003; </span>Cédula válida
            </p>
          ) : (
            <p style={{ marginLeft: "5px" ,textAlign:'center',marginBottom: '0px',
            marginTop: '0px' }}>
              <span style={{ color: "red" }}>&#10006; </span>Cédula inválida
            </p>
          )}
        </div>
      </div>
      <div
        style={{
          opacity: cedulaValida == false || cedulaValida == "" ? "0.3" : "",
          pointerEvents:
            cedulaValida == false || cedulaValida == "" ? "none" : "",
          justifyContent: "center",
          display: "flex",
          width: "100%",
          flexDirection: "column",
          paddingLeft: "30px",
          color: "#575757",
          paddingRight: "30px",
          marginTop: "10px",
        }}
      >
        {!ecuatoriano ? (
     /*      <input
            style={{ padding: "6px", marginBottom: "10px" }}
            type="text"
            name=""
            id=""
            placeholder="Nacionalidad"
            onChange={(e) => setNacionalidad(e.target.value)}
            value={nacionalidad}
          /> */
          <select
          name=""
          id=""
          style={{ padding: "6px", marginBottom: "10px" , color: "#959595", borderColor:validation.civil_name!=null?"" :"red",borderWidth:validation.civil_name!=null?"":'1px',borderStyle:validation.civil_name!=null?"":'solid'   }}
          onChange={(e) => setNacionalidad(e.target.value)}
          value={nacionalidad}
        >
          <option value="">Seleccione la nacionalidad</option>
          {nacionalidadData.map((e) => (
            <option key={e.id_nacionalidad} value={e.id_nacionalidad}>
              {e.nac_descrip}
            </option>
          ))}
        </select>
        ) : null}
        <input
          style={{ padding: "6px",borderColor:validation.names!=null?"" :"red",borderWidth:validation.names!=null?"":'1px',borderStyle:validation.names!=null?"":'solid'}}
          type="text"
          name=""
          id=""
          placeholder="Primer nombre"
          onChange={(e) => setNombre1(e.target.value.toUpperCase())}
          value={nombre1}
        />
        <input
          style={{ padding: "6px", marginTop: "10px",borderColor:validation.names!=null?"" :"red",borderWidth:validation.names!=null?"":'1px',borderStyle:validation.names!=null?"":'solid' }}
          type="text"
          name=""
          id=""
          placeholder="Segundo nombre"
          onChange={(e) => setNombre2(e.target.value.toUpperCase())}
          value={nombre2}
        />
        <input
          style={{ padding: "6px", marginTop: "10px",borderColor:validation.last_names!=null?"" :"red",borderWidth:validation.last_names!=null?"":'1px',borderStyle:validation.last_names!=null?"":'solid' }}
          type="text"
          name=""
          id=""
          placeholder="Primer apellido"
          onChange={(e) => setApellido1(e.target.value.toUpperCase())}
          value={apellido1}
        />
        <input
          style={{ padding: "6px", marginTop: "10px",borderColor:validation.last_names!=null?"" :"red",borderWidth:validation.last_names!=null?"":'1px',borderStyle:validation.last_names!=null?"":'solid' }}
          type="text"
          name=""
          id=""
          placeholder="Segundo apellido"
          onChange={(e) => setApellido2(e.target.value.toUpperCase())}
          value={apellido2}
        />

   
        <InputMask onDoubleClick={(e) => setOpenDate(!openDate)} onChange={(e) => setNacimiento(e.target.value)}   value={nacimiento}   style={{ padding: "6px", marginTop: "10px"}} placeholder="Fecha de nacimiento DD/MM/AA" maskPlaceholder="dd/mm/yyyy" mask="99/99/9999" maskChar=" " />
         <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker open={openDate} onClose={()=>setOpenDate(false)} style={{display:'none',color:'#959595',fontSize:'13.33px'}} size={13} label="Fecha de nacimiento" format="dd/MM/yyy" value={nacimiento} onChange={(e)=>setNacimiento(dateFormatA(e))} />
          
        </MuiPickersUtilsProvider>

        <p style={{ color: "#214088" }}>Información de contacto</p>
        <input
          style={{ padding: "6px",borderColor:validation.email!=null?"" :"red",borderWidth:validation.email!=null?"":'1px',borderStyle:validation.email!=null?"":'solid' }}
          type="email"
          name=""
          id=""
          placeholder="Correo"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          style={{ padding: "6px", marginTop: "10px"}}
          type="number"
          name=""
          id=""
          placeholder="Celular"
          onChange={(e) => setCelular(e.target.value)}
          value={celular}
        />
        <input
          style={{ padding: "6px", marginTop: "10px", marginTop: "10px",  }}
          type="number"
          name=""
          id=""
          placeholder="Teléfono fijo"
          onChange={(e) => setTelefono(e.target.value)}
          value={telefono}
        />
        <p style={{ color: "#214088" }}>Estado civil</p>
        <select
          name=""
          id=""
          style={{ padding: "6px", marginTop: "10px", color: "#959595", marginTop: "10px",borderColor:validation.civil_name!=null?"" :"red",borderWidth:validation.civil_name!=null?"":'1px',borderStyle:validation.civil_name!=null?"":'solid'   }}
          onChange={(e) => setCivil(e.target.value)}
          value={civil}
        >
          <option value="">Estado civil</option>
          {civilData.map((e) => (
            <option key={e.id_estacivil} value={e.id_estacivil}>
              {e.est_descrip}
            </option>
          ))}
        </select>
        {civil == 2 || civil == 3||civil==6 ? (
          <div
            style={{
             
            
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <p style={{ color: "#214088", }}>Datos del conyuge</p>
            <input
              style={{
                padding: "6px",
                marginRight: "5px",
                height: "32px",
                width: "100%",
                borderColor:!errors.dniS?"" :"red",borderWidth:!errors.dniS?"":'1px',borderStyle:!errors.dniS?"":'solid'
              }}
              type="number"
              name=""
              id=""
              placeholder="Número de cédula"
              onChange={(e) => setCedulaS(e.target.value)}
              value={cedulaS}
              onBlur={(e)=>{
                if (!validarCedula(e.target.value)) {
                  setErrors({...errors,dniS:true})
                }else{
                  setErrors({...errors,dniS:false})
                }
              }}
             
            />
             {
              errors.dniS?
              cedulaS!=""||cedulaS!=null?<p style={{    width: '100%',color:'red',margin:'0px'}}>Cédula inválida</p>:null
              :null
            }
            <input
              style={{
                marginTop: "10px",
                padding: "6px",
                marginRight: "5px",
                height: "32px",
                width: "100%"
                ,borderColor:validation.spouse_names!=null?"" :"red",borderWidth:validation.spouse_names!=null?"":'1px',borderStyle:validation.spouse_names!=null?"":'solid' 
              }}
              type="text"
              name=""
              id=""
              placeholder="Primer nombre"
              onChange={(e) => setNombre1S(e.target.value.toUpperCase())}
              value={nombre1S}
            />
            <input
              style={{
                marginTop: "10px",
                padding: "6px",
                marginRight: "5px",
                height: "32px",
                width: "100%",
                borderColor:validation.spouse_names!=null?"" :"red",borderWidth:validation.spouse_names!=null?"":'1px',borderStyle:validation.spouse_names!=null?"":'solid' 
              }}
              type="text"
              name=""
              id=""
              placeholder="Segundo nombre"
              onChange={(e) => setNombre2S(e.target.value.toUpperCase())}
              value={nombre2S}
            />
            <input
              style={{
                marginTop: "10px",
                padding: "6px",
                marginRight: "5px",
                height: "32px",
                width: "100%",
                borderColor:validation.spouse_last_names!=null?"" :"red",borderWidth:validation.spouse_last_names!=null?"":'1px',borderStyle:validation.spouse_last_names!=null?"":'solid' 
              }}
              type="text"
              name=""
              id=""
              placeholder="Primer apellido"
              onChange={(e) => setApellido1S(e.target.value.toUpperCase())}
              value={apellido1S}
            />
            <input
              style={{
                marginTop: "10px",
                padding: "6px",
                marginRight: "5px",
                height: "32px",
                width: "100%",
                borderColor:validation.spouse_last_names!=null?"" :"red",borderWidth:validation.spouse_last_names!=null?"":'1px',borderStyle:validation.spouse_last_names!=null?"":'solid' 
              }}
              type="text"
              name=""
              id=""
              placeholder="Segundo apellido"
              onChange={(e) => setApellido2S(e.target.value.toUpperCase())}
              value={apellido2S}
            />

            
            <p style={{ color: "#214088" }}>Información de contacto</p>
            <input
              style={{
                padding: "6px",
                marginRight: "5px",
                height: "32px",
                width: "100%",
                borderColor:validation.spouse_email!=null?"" :"red",borderWidth:validation.spouse_email!=null?"":'1px',borderStyle:validation.spouse_email!=null?"":'solid' 
              }}
              type="email"
              name=""
              id=""
              placeholder="Correo"
              onChange={(e) => setEmailS(e.target.value)}
              value={emailS}
            />
            <input
              style={{
                marginTop: "10px",
                padding: "6px",
                marginRight: "5px",
                height: "32px",
                width: "100%",
              }}
              type="number"
              name=""
              id=""
              placeholder="Celular"
              onChange={(e) => setCelularS(e.target.value)}
              value={celularS}
            />
            <input
              style={{
                marginTop: "10px",
                padding: "6px",
                marginRight: "5px",
                height: "32px",
                width: "100%",
              }}
              type="number"
              name=""
              id=""
              placeholder="Teléfono fijo"
              onChange={(e) => setTelefonoS(e.target.value)}
              value={telefonoS}
            />
          </div>
        ) : null}
        <p style={{ color: "#214088" }}>Domicilio</p>
        <input
          style={{ padding: "6px" }}
          type="text"
          name=""
          id=""
          placeholder="Calle 1"
          onChange={(e) => setDireccion(e.target.value.toUpperCase())}
          value={direccion}
        />

        <input
          style={{ padding: "6px", marginTop: "10px" }}
          type="text"
          name=""
          id=""
          placeholder="Calle 2"
          onChange={(e) => setManzana(e.target.value.toUpperCase())}
          value={manzana}
        />
        <input
          style={{ padding: "6px", marginTop: "10px" }}
          type="text"
          name=""
          id=""
          placeholder="Número de villa"
          onChange={(e) => setVilla(e.target.value.toUpperCase())}
          value={villa}
        />
        <input
          style={{ padding: "6px", marginTop: "10px" }}
          type="text"
          name=""
          id=""
          placeholder="Otra descripción de dirección"
          onChange={(e) => setCiudadela(e.target.value.toUpperCase())}
          value={ciudadela}
        />
        <select
          labelId="label"
          value={province}
          onChange={(e) => changeProvince(e.target.value)}
          label="province"
          style={{ marginTop: "10px", color: "#959595", padding: "6px" }}
        >
          <option value="">Seleccione una provincia</option>
          {provinceData.map((e) => (
            <option key={e.id_provincia} value={e.id_provincia}>
              {e.pv_descrip}
            </option>
          ))}
        </select>
        <select
          labelId="label"
          value={ciudad}
          onChange={(e) => setCiudad(e.target.value)}
          label="ciu"
          style={{ marginTop: "10px", color: "#959595", padding: "6px" }}
        >
          <option value="">Seleccione un cantón</option>
          {ciudadData.data.map((e) => (
            <option key={e.id_ciudad} value={e.id_ciudad}>
              {e.cd_descrip}
            </option>
          ))}
        </select>
        <select
          labelId="label"
          value={recomendation}
          onChange={(e) => setRecomendation(e.target.value)}
          label="ciu"
          style={{ marginTop: "10px", color: "#959595", padding: "6px" , marginTop: "10px",borderColor:validation.recomendation_id!=null?"" :"red",borderWidth:validation.recomendation_id!=null?"":'1px',borderStyle:validation.recomendation_id!=null?"":'solid'  }}
        >
          <option value="">¿Cómo se enteró de nosotros?</option>
          {recomendationData.map((e) => (
            <option key={e.id_medios} value={e.id_medios}>
              {e.med_descrip}
            </option>
          ))}
        </select>
        {recomendation == 4 ? (
          <div>
            <p style={{ color: "#214088",marginBottom: '0px' }}>Datos del referidor</p>
            <input
              style={{ borderColor:!errors.dniR?"" :"red",borderWidth:!errors.dniR?"":'1px',borderStyle:!errors.dniR?"":'solid',padding: "6px", marginTop: "10px" ,width:'100%'}}
              type="text"
              name=""
              id=""
              placeholder="Cédula"
              onChange={(e) => setCedulaR(e.target.value.toUpperCase())}
              onBlur={(e)=>{
                if (!validarCedula(e.target.value)) {
                  setErrors({...errors,dniR:true})
                }else{
                  setErrors({...errors,dniR:false})
                }
              }}
              value={cedulaR}
            />
            {
              errors.dniR?
              cedulaR!=""||cedulaR!=null?<p style={{color:'red',margin:'0px'}}>Cédula inválida</p>:null
              :null
            }
      
               <input
              style={{ padding: "6px", marginTop: "10px",width:'100%' }}
              type="text"
              name=""
              id=""
              placeholder="Nombres completos"
              onChange={(e) => setNombreR(e.target.value.toUpperCase())}
              value={nombreR}
            />
          {/*      <input
              style={{ padding: "6px", marginTop: "10px",width:'100%' }}
              type="text"
              name=""
              id=""
              placeholder="Proyecto donde compro"
              onChange={(e) => setProyectoR(e.target.value.toUpperCase())}
              value={proyectoR}
            /> */}
             <select
              name=""
              id=""
              style={{ width: '100%',padding: "6px", marginTop: "10px", color: "#959595" }}
              onChange={(e) => setProyectoR(e.target.value)}
              value={proyectoR}
            >
              <option value="">Proyecto donde compro</option>
              {proyectoData.map((e) => (
            <option key={e.id_proyecto} value={e.id_proyecto}>
              {e.pry_descrip}
            </option>
          ))}
              
            </select>
          </div>
        ) : null}
        <p style={{ color: "#214088" }}>Autorización de Buró de Crédito</p>
        <div style={{ display: "flex" }}>
          <input
            type="checkbox"
            name=""
            checked={autorization}
            onChange={()=>setAutorization(!autorization)}
            id="autori"
            style={{ marginRight: "10px" }}
          />
          <label htmlFor="autori" style={{ fontSize: "11px", margin: "0px" }}>
            Autorizo de manera expresa e irrevocable a Ambiensa S.A. para que
            obtenga, cuantas veces lo considere necesario, de cualquier fuente
            de información, incluidos los Burós de información crediticia,
            autorizados por la Superintendencia de Bancos y Seguros y la Central
            de Riesgos, referencias relativas e información personal sobre mi
            comportamiento crediticio, etc.
          </label>
        </div>

        <p style={{ textAlign: "center" }}>
          ¡Presiona CONTINUAR para cumplir tu sueño!
        </p>
        <button
          style={{
            fontWeight: "bold",
            borderRadius: "5px",
            padding: "5px",
            color: "white",
            cursor: "pointer",
            backgroundColor: "#213f87",
          }}
          onClick={verificarEmail}
        >
          CONTINUAR
        </button>
        <div style={{ display: "flex", justifyContent: "center",marginBottom: '10px' }}>
          <div
            style={{
              display: "flex",
              width: "18%",
              marginTop: "15px",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                backgroundColor: "#22428b",
                borderRadius: "13px",
                height: "13px",
                width: "13px",
              }}
            ></div>
            <div
              style={{
                backgroundColor: "#cbcbcb",
                borderRadius: "13px",
                height: "13px",
                width: "13px",
                cusor:'pointer'
              }}
              onClick={()=>{
                if (dataCliente != null) {
                  if (dataCliente.client.email != null) {
                   props.changeStep('2', dataCliente.client.id)
                  }

        
                }
            
            }}
            ></div>
            <div
              style={{
                backgroundColor: "#cbcbcb",
                borderRadius: "13px",
                height: "13px",
                width: "13px",
                cursor:'pointer'
              }}
              onClick={()=>{
                if (dataCliente != null) {
                  if (dataCliente.client.email != null) {
                   props.changeStep('3', dataCliente.client.id)
                  }

        
                }
            
            }}
            ></div>
          </div>
        </div>
      </div>

      {open == true ? (
        <ModalVerificarCorreo
          vaciarCampos={vaciarCampos}
          confirmar={confirmar}
          email={email}
          cedula={cedula}
          open={open}
          setOpen={() =>{
            setVerified(null)
             setOpen(false)
         
          }}
        />
      ) : null}
    </React.Fragment>
  );
}
