import React, { useState, useEffect, useContext } from "react";
import background from "../../../assets/backgroundMini.jpg";

import Box from "@material-ui/core/Box";


import Grid from "@material-ui/core/Grid";

import { InsertCommentSharp } from "@material-ui/icons";
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
export default function Transition(props) {



  return (

      <div
        style={{
          width: "403.2px",
          height:'700px',
          marginTop:'50px',
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundImage:  `url(${background})`,
    backgroundRepeat: 'no-repeat',

    backgroundSize: 'cover',
    backgroundPosition: 'center',
        }}
      >
          <p id="alert-dialog-slide-description" style={{   fontSize: '18px',
    textAlign: 'center',
    margin: '0px',color:'#22428b',
    padding:'0px 45px',
    fontWeight: 'bold'}}>
              ¡TE ESPERAMOS CON LA INFORMACIÓN PENDIENTE!
          </p>
            <p id="alert-dialog-slide-description" style={{  fontSize: '17px',
    textAlign: 'center',marginBottom: '25px',color:'black',
    padding: '0px 60px'}}>
              ¡No pierdas la oportunidad de <span style={{fontWeight: 'bold'}}>ganar $2.000* de descuento</span> en el precio de tu futura casa y muchos premios más!
          </p>
         <div style={{bottom: '-150px',
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'}}>
         <button
              style={{
                fontWeight: "bold",
                borderRadius: "5px",
                marginTop:'50px',
                padding: "5px",
                color: "white",
                cursor: 'pointer',
                backgroundColor: "#213f87",

                width: '250px',
    height: '40px'
              }}
              onClick={()=>props.changeStep()}
            >
              LISTO
            </button>
            <p style={{    fontSize: '11px',marginTop:'10px',textAlign: 'center',
    padding: '0px 45px',color:'white'}}>
              *Promoción por tiempo limitado. Aplican restricciones.
          </p>
           </div> 
       
      </div>


  );
}
