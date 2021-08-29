import React,{useEffect} from "react";
 
import Wheel from "./Ruleta";


import {
    enviarRegalo
  } from "../../../utils/API/clientes";

import background from '../../../assets/Ruleta.png'

export default function RuletaSuccess(props){
    const [change,setChange] = React.useState(0);
  const places = [
      { name: "ESCOGE TÚ EL PREMIO", color: "#1092C6", image: "" },
      { name: "OLLA ARROCERA", color: "#D01277", image: "" },
      { name: "JUEGO DE OLLAS", color: "#34B44A", image: "" },
      { name: "HORNO", color: "#F05024", image: "" },
      { name: "ESCOGE DOS PREMIOS", color: "#1193C7", image: "" },
      { name: "LICUADORA", color: "#FFC40D", image: "" },
      { name: "PARRILLA", color: "#ED1B2B", image: "" }
    ];
  React.useEffect(()=>{
    if(change==1){
      props.changeStep()
    }
  },[change])

  
    return (
        <div
        style={{
          width: "450.2px",
          height:'700px',
          marginTop:'50px',
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundImage:  `url(${background})`,
    backgroundRepeat: 'no-repeat',

    backgroundSize: 'cover',

        }}
      >
            <p id="alert-dialog-slide-description" style={{   fontSize: '18px',
    textAlign: 'center',
    margin: '140px 0px 15px',color:'#22428b',
    padding:'0px 45px',
    fontWeight: 'bold'}}>
              ¡GANASTE:  {props.reward}!
          </p>
          <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'130px',width:'130px'}}>
            
            {
              props.reward!="ESCOGE TÚ EL PREMIO"||props.reward!="ESCOGE DOS PREMIOS"?
              <img
            src={'https://api.ambiensa.info/storage/email_storage/'+props.reward+'.png'}
            alt=""
   
            style={{ width: "160px"}}
          />
:null
            }
            </div>
          
          <p id="alert-dialog-slide-description" style={{  fontSize: '17px',color:'black',
    textAlign: 'center',
    padding: '0px 60px'}}>
              ¡Sube tus documentos para poder reclamar estos premios al momento de hacer tu reserva!
          </p>

          <button
              style={{
                fontWeight: "bold",
                borderRadius: "5px",
                marginTop:'50px',
                padding: "5px",
                color: "white",
                cursor: 'pointer',
                backgroundColor: "#213f87",
                marginBottom: '15px',
                width: '250px',
    height: '40px'
              }}
              onClick={()=>{
                  
                  if(props.reward!=null){
                    enviarRegalo({client_id:props.client_id,reward:props.reward},setChange)
                  }
              
              }}
            >
              LISTO
            </button>
           
            <p style={{ textAlign: "center" ,marginTop: '0px',color:'black'}}>Imagen de premios es referencial</p>
       
      </div>
    );
 
}

 