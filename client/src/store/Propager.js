import React from 'react'
import Initializer from './Initializer'
import { useHistory } from "react-router-dom";

export default function Propager(props) {
    let history = useHistory();

    const {usuario,cargarUsuario}=React.useContext(Initializer)
    React.useEffect(()=>{
        if(usuario==null){      
       
            let auth = localStorage.getItem("auth");
            if(auth!=null){
                cargarUsuario(auth)

           
                    history.push("/panel")
               
            }else{
                if(history.location.pathname!="/login"){
                    history.push("/bienvenida")
                }
              
               
            }
         
        }
    },[])

    return (
        props.children
    )
}
