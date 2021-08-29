import React from 'react'
import DoneIcon from '@material-ui/icons/Done';
import success from '../../../assets/success.JPG'
export default function SuccessVerification(props) {
    return (
        <div style={{marginTop:'10px',display:'flex',flexDirection:'column',alignItems:'center'}}>
      
            <div style={{borderColor:'#22428b',borderRadius:'130px',display:'flex',justifyContent:'center',alignItems:'center',height:'130px',width:'130px',borderWidth:'13px',borderStyle:'solid'}}>
            <DoneIcon style={{fontSize: '108px',color:'#5fb0db'}} />
            </div>
            <p id="alert-dialog-slide-description" style={{    fontSize: '18px',fontWeight:'bold',color:'#22428b',marginTop:'10px',textAlign: 'center',
    padding: '0px 45px'}}>
              VERIFICACIÓN EXITOSA
          </p>
          <button
              style={{
                fontWeight: "bold",
                borderRadius: "5px",
                padding: "5px",
                color: "white",
                cursor: 'pointer',
                backgroundColor: "#213f87",

                width: '200px',
    height: '35px'
              }}
              onClick={props.onClose}
            >
              LISTO
            </button>
        </div>
    )
}
