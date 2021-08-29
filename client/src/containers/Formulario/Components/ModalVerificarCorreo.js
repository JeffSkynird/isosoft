import React,{useContext} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import logo from "../../../assets/logoF.JPG";
import {verificarCodigo } from "../../../utils/API/clientes";
import Initializer from '../../../store/Initializer'

import '../style/verificacion.css'
import ErrorVerification from './ErrorVerification'
import SuccessVerification from './SuccessVerification'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
  const initializer= useContext(Initializer);

 const {open}= props
 const [success,setSuccess]= React.useState(null)
 const [code1,setCode1]= React.useState('')
 const [code2,setCode2]= React.useState('')
 const [code3,setCode3]= React.useState('')
 const [code4,setCode4]= React.useState('')

 const verificar=(e)=>{
  verificarCodigo({email:props.email,dni:props.cedula,code:(""+code1+code2+code3+code4)},setSuccess,initializer)
 }

 React.useEffect(()=>{
  if(success==true){
    props.confirmar()
   
   
  }
 },[success])
 const divC=({children})=>{
   return(
     <div style={{backgroundColor:'white',maxWidth: '444px'}}>
     {children}
     </div>
   )
 }

  return (
    <div>
      
      <Dialog
      maxWidth={'xs'}
        open={open}
        PaperComponent={divC}
        TransitionComponent={Transition}
        keepMounted
        onClose={()=>props.setOpen()}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title" style={{padding: '0px'}}>
            <div style={{padding: '0px',
    alignItems: 'center',
    display: 'flex',flexDirection:'column',
    justifyContent: 'center'}}>
 <img
            src={logo}
            alt=""
     
            style={{ width: "50%", height: "111px", marginBottom: "15px" }}
          />
          <div
            style={{
              backgroundColor: "#213f87",
              width: "100%",
              display: "flex",
              color: "white",
              justifyContent: "center",
            }}
          >
            <p
              style={{
                fontWeight: "bold",
                fontSize: "16px",
                padding: "0px",
                margin: "8px",
              }}
            >
              VERIFICACIÓN DE CORREO
            </p>
          </div>
            </div>
      
        </DialogTitle>
        <DialogContent style={{justifyContent: 'center',
    alignItems: 'center',paddingTop:'0px',paddingLeft: '15px',
    paddingRight: '15px',
    display: 'flex',
    flexDirection: 'column'}}>
        {
            success==null?
            <div style={{paddingBottom: '60px',margin:'0px 10px 10px 10px',boxShadow: '0 0 3px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.24)',display: "flex",
            flexDirection: "column",
            alignItems: "center",}}>
        <DialogContentText id="alert-dialog-slide-description" style={{    fontSize: '18px',fontWeight:'bold',color:'#22428b',marginTop:'35px',textAlign: 'center',
    padding: '0px 45px'}}>
              A CONTINUACIÓN INGRESA EL CÓDIGO ENVIADO A TU CORREO
          </DialogContentText>
          <div id="dialog">
          <div id="form" style={{    display: 'flex',
    justifyContent: 'center'}}> 
              <input id="code1" type="text" value={code1} onChange={(e)=>{
                if(e.target.value.length<=1){
                  setCode1(e.target.value)
                  document.getElementById("code2").focus();
                }else{
                  setCode1(e.target.value[1])
                  document.getElementById("code2").focus();

                }
                
                
              }}/>
              <input type="text" id="code2" value={code2}  onChange={(e)=>{
                if(e.target.value.length<=1){
                  setCode2(e.target.value)
                  document.getElementById("code3").focus();
                }else{
                  setCode2(e.target.value[1])
                  document.getElementById("code3").focus();

                }
                
                
              }}/>
              <input type="text" id="code3" value={code3} onChange={(e)=>{
                if(e.target.value.length<=1){
                  setCode3(e.target.value)
                  document.getElementById("code4").focus();
                }else{
                  setCode3(e.target.value[1])
                  document.getElementById("code4").focus();

                }
                
                
              }}/>
              <input type="text" id="code4" value={code4} onChange={(e)=>{
                if(e.target.value.length<=1){
                  setCode4(e.target.value)
              
                }else{
                  setCode4(e.target.value[1])
                 

                }
                
                
              }}/>

          </div>
          </div>
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
              onClick={verificar}
            >
              INGRESAR
            </button>
        </div>
        :
        success==true?
        <SuccessVerification  onClose={()=>props.setOpen()}/>
        :
        <ErrorVerification  onClose={()=>props.setOpen()}/>
        }
        
        
        </DialogContent>

        <DialogActions>
       
        </DialogActions>
      </Dialog>
    </div>
  );
}