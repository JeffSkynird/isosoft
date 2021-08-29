import React from "react";
import Formulario from "./Formulario";
import Paso2 from "./Paso2";
import Paso3 from "./Paso3";
import Transition from './Components/Transition'
import Transition2 from './Components/Transition2'
import Final from './Components/Final'
import TransicionRuleta from './Components/TransicionRuleta'
import RuletaSuccess from './Components/RuletaSuccess'

import Grid from "@material-ui/core/Grid";
import logo from "../../assets/logoF2.png";
import Paper from "@material-ui/core/Paper";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
export default function Container() {
  let url = new URL(window.location);
  let c = url.searchParams.get("step");
  let init='1'

  if(c!=null){
    init=c
  }
  const theme = useTheme();

  const [step, setStep] = React.useState(init);
  const [client_id, setClient_id] = React.useState(null);
  const [title, setTitle] = React.useState('RESERVA HOY MISMO');
  const [reward, setReward] = React.useState(null);
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));
 const changeStep=(paso,id)=>{
   setStep(paso)
   setClient_id(id)
 }
 React.useEffect(()=>{
    if(reward!=null){
      setStep('-4')

    }
 },[reward])

  return (
    <Grid
      container
      justify="center"
      component="main"
      style={{
        height: "100%",
      
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        background: "url(" + require("../../assets/prueba.png") + ")",
      }}
    >
      {
        step==1||step==2||step==3?
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        style={{ margin:fullScreen? '0px':"15px", maxWidth: fullScreen?'100%':"340px" ,backgroundColor:'white'}}
      
        elevation={6}
        square
      >
          <div
          style={{
            maxWidth: "403.2px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src={logo}
            alt=""
        
            style={{ width: "236.833px", height: "100px", marginBottom: "15px" }}
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
              ¡{title}!
            </p>
          </div>
          <div
            style={{
              margin: "0px 10px 10px 10px",
              boxShadow:
                "0 0 3px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.24)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
        {step == 1 ? <Formulario client_id={client_id}  changeStep={changeStep} setTitle={setTitle}/> : null}
        {step == 2 ? <Paso2 client_id={client_id} changeStep={changeStep}/> : null}
        {step == 0 ? <Transition client_id={client_id}/> : null}

        {step == 3 ? <Paso3 client_id={client_id} changeStep={changeStep}/> : null}
        </div>
        <p style={{ textAlign: "center" ,marginTop: '0px',color:'black'}}>© Ambiensa 2020</p>

        </div>
      </Grid>
      :
      <div style={{height:'100vh'}}>
  {step==0?
      <Transition client_id={client_id} changeStep={()=>changeStep('-3',client_id)}/>
      :
      null}

{step==-3?
      <TransicionRuleta client_id={client_id} changeStep={()=>changeStep('-4',client_id)} onReward={setReward}/>
      :
      null}

      {step==-1?
      <Transition2 client_id={client_id} changeStep={()=>changeStep('3',client_id)}/>
      :
      null}
 {step==-2?
      <Final client_id={client_id} changeStep={()=>window.location.href='https://www.ambiensa.com/'}/>
      :
      null}
 {step==-4?
  
    reward!=null?
    <RuletaSuccess client_id={client_id}  reward={reward} changeStep={()=>changeStep('3',client_id)}/>
    :
    null
  
      
      :
      null}

      </div>
    
      }
    </Grid>
  );
}
