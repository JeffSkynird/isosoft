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
import { obtenerTodos ,asignarAsesor} from "../../utils/API/asessors.js";
import { cambiarUafe} from "../../utils/API/clientes";

import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
export default function Risk(props) {
    const initializer = useContext(Initializer);
    const [uafe, setUafe] = React.useState("");
   
      React.useEffect(()=>{
        if(props.location.state!=null){
        setUafe(props.location.state.uafe_status)
        }
    },[])
    if(props.location.state==null){
        props.history.push("/clientes")
        return null
      }
    
    const asignar=()=>{

        cambiarUafe({client_id:props.location.state.id,status:uafe},initializer)
     }
    return (
        <Box  mt={2} ml={2} mr={2}>
            <Box>
                <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                <a color="inherit" onClick={()=>window.location.href="/dashboard"}>
                    Dashboard
                </a>
                <a color="inherit" onClick={()=>props.history.go(-1)}>
                Interesados
                </a>
                <Typography color="textPrimary">Asignación (UAFE)</Typography>
            </Breadcrumbs>
            </Box>
          <Grid container>
            <Grid item md={12} xs={12}>
              <Card>
                <CardContent>
                <Typography color="textPrimary">Asignar un estado</Typography>
                <Grid item md={12} xs={12} style={{marginTop:15}}>
                <FormControl
                  variant="outlined"
                  style={{ width: "100%" }}
                
                >
                  <InputLabel id="label1">Estado del cliente</InputLabel>
                  <Select
                    labelId="label1"
                    value={uafe}
                    onChange={(e) => setUafe(e.target.value)}
                    label="re"
                  >
                    <MenuItem value="">
                      <em>Seleccione una opción</em>
                    </MenuItem>
                    <MenuItem key={"APROBADO"} value={"APROBADO"}>
                      <em>APROBADO</em>
                    </MenuItem>
                    <MenuItem key={"EN REVISIÓN"} value={"EN REVISIÓN"}>
                      <em>EN REVISIÓN</em>
                    </MenuItem>
                    <MenuItem key={"NEGADO"} value={"NEGADO"}>
                      <em>NEGADO</em>
                    </MenuItem>
                  </Select>
                 
                </FormControl>
              </Grid>
                 
                  <Grid item md={12}>
                        <Button
                        style={{marginTop:"10px"}}
                          variant="contained"
                          color="secondary"
                         onClick={()=>asignar()}
                        >
                          Guardar
                        </Button>
                      </Grid>
                 
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      );
}
