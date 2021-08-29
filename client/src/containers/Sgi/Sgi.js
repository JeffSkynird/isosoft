import React,{useContext} from 'react'
import { LocalizationTable,TableIcons} from '../../utils/table.js'
import MaterialTable from "material-table";
import Initializer from '../../store/Initializer'
import { obtenerLogs} from '../../utils/API/clientes.js'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grow from '@material-ui/core/Grow';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Grow ref={ref} {...props} />;
});
export default function Crm() {
    const initializer= useContext(Initializer);
    const [open, setOpen] = React.useState({ status: false, body: "", params: "" });

    const [data,setData]=React.useState([])
    React.useEffect(()=>{
     
            if(initializer.usuario!=null){
                obtenerLogs(setData,initializer);
            }
      

        
    
    },[initializer.usuario])
    
    function IsJsonString(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
 }
    return (

        <React.Fragment>
   
           
            <MaterialTable
            icons={TableIcons}
            columns={[
                
                { title: "Fecha", field: "created_at" },
                { title: "Url", field: "url" },
                { title: "Método", field: "metodo" },
                { title: "Parámetros", field: "entrada" },

                { title: "Respuesta", field: "response" },


    
         
    
    
            ]}
            
          
            data={
                data.map((e)=>{
                    return ({...e,created_at:new Date(e.creado_en).toLocaleString(),seller:e.cambio_vendedor==1?"Sí":"No",response:e.respuesta!=""?IsJsonString(e.respuesta)?JSON.parse(e.respuesta).message:e.response:"No hay respuesta"})
               })
           }
         
            localization={LocalizationTable}
            title="SGI Logs"
       
            options={{
    
      
                pageSize: 30,
                pageSizeOptions: [30, 50, 100],

                actionsColumnIndex: -1,

                search: true,
                maxBodyHeight: 350,
                padding: 'dense',
                headerStyle: {
                    textAlign: 'left'
                },
                cellStyle: {
                    textAlign: 'left'
                },
                searchFieldStyle: {

                    padding: 5
                }
            }}
    
        />
        </React.Fragment>
    )
}
