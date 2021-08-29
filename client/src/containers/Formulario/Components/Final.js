import React, { useState, useEffect, useContext } from "react";
import background from "../../../assets/backgroundMini.jpg";

import Box from "@material-ui/core/Box";
import DoneIcon from '@material-ui/icons/Done';

import logo from "../../../assets/logoF.JPG";

import Grid from "@material-ui/core/Grid";

import { InsertCommentSharp } from "@material-ui/icons";
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
export default function Final(props) {



  return (

      <div
        style={{
          width: "403.2px",
          height:'700px',
          marginTop:'50px',
          display: "flex",
          flexDirection: "column",
     
          alignItems: "center",
          backgroundColor: 'white'
          
        }}
      >
            <div style={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%'}}>
            <img
            src={logo}
            alt=""
          
            style={{ width: "60%",
            marginTop: '20px'}}
          />
            </div>
          <div style={{display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '30px',
    borderStyle: 'solid',
    borderColor: '#ccc',
    borderWidth: '1px',
    padding: '10px',
    margin: '30px 15px'}}>
          <p id="alert-dialog-slide-description" style={{   fontSize: '18px',
    textAlign: 'center',
    margin: '0px',color:'#22428b',
    padding:'0px 45px',
    fontWeight: 'bold'}}>
              ¡HAZ COMPLETADO CON ÉXITO EL FORMULARIO!
          </p>
          <p id="alert-dialog-slide-description" style={{  fontSize: '17px',
    textAlign: 'center',marginBottom: '25px',
    padding: '0px 40px',color:'black'}}>
              Recibirás tus premios y descuento al concretar la reserva de tu casa con tu asesor
          </p>
          <div style={{borderColor:'#22428b',borderRadius:'130px',display:'flex',justifyContent:'center',alignItems:'center',height:'130px',width:'130px',borderWidth:'13px',borderStyle:'solid'}}>
            <DoneIcon style={{fontSize: '108px',color:'#5fb0db'}} />
            </div>
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
              onClick={()=>props.changeStep()}
            >
              LISTO
            </button>
           
          </div>
          <p style={{ textAlign: "center" ,marginTop: '0px',color:'black'}}>© Ambiensa 2020</p>
       
      </div>


  );
}
