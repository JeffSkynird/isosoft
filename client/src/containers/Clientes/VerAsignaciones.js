import React, { useEffect, useContext } from "react";
import Select from "@material-ui/core/Select";
import { downloadFiles } from "../../utils/API/clientes";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Initializer from "../../store/Initializer";
import { obtenerLead } from "../../utils/API/leads.js";
import Typography from '@material-ui/core/Typography';
import { LocalizationTable,TableIcons} from '../../utils/table.js'
import MaterialTable from "material-table";
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
export default function VerAsignaciones(props) {
    const initializer= useContext(Initializer);

    const [data,setData]=React.useState([])
   
    const dato=props.location.state
    React.useEffect(()=>{
     
            if(initializer.usuario!=null){
                if(dato!=null){
                    obtenerLead(dato.id,setData,initializer);
                }
                
            }
        
    
    },[initializer.usuario])
    if(props.location.state==null){
        props.history.push("/clientes")
        return null
      }
    
    return (
        <Box mt={2} ml={2} mr={2}>
            <Grid container justify='space-between' alignItems="center" style={{marginBottom:'10px'}}>
                <Box>
                    <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                    <Link color="inherit"  onClick={()=>window.location.href="/dashboard"}>
                        Dashboard
                    </Link>
                    <Link color="inherit"  onClick={()=>props.history.go(-2)}>
                        Clientes
                    </Link>
                    <Typography color="textPrimary">Asignación</Typography>
                </Breadcrumbs>
                </Box>
             
            </Grid>
          <Grid container>
         
                <Grid item xs="12">
                    <MaterialTable
                                icons={TableIcons}
                                columns={[
                                    { title: "Cliente", field: "client", type: "numeric" },
                                    { title: "Asesor", field: "asessor" },
                                    { title: "Villa", field: "village" },
                                    { title: "Estado", field: "status" },
                                  
                             


                                ]}
                                
                              
                                data={
                                    data.map((e)=>{
                                        if(e.asessor==null){
                                            return ({client:e.client.names+e.client.last_names,asessor:"Sin asignar",village:e.village.name,status:e.status.name})
                                        }else{
                                            return ({client:e.client.names+e.client.last_names,asessor:e.asessor.names+e.client.last_names,village:e.village.name,status:e.status.name})
                                        }
                                      
                                   })
                               }
                             
                                localization={LocalizationTable}
                                title="Clientes"
                                actions={[
                                    {
                                        icon: TableIcons.Edit,
                                        tooltip: 'Editar',
                                      
                                        onClick: (event, rowData) =>     props.history.push("/clientes/asignar",{...rowData,client_id:dato.id,village:data[0].village.id,asessor:(data[0].asessor!=null?data[0].asessor.id:"")})
                                    } 
                                   
                                ]}

                                options={{
                     
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
                </Grid>
            </Grid>
        </Box>
    )
}
