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
import { obtenerVillas} from "../../utils/API/villas.js";

import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
export default function Asignar(props) {
  const initializer = useContext(Initializer);
  const [asessorData, setAsessorData] = React.useState([]);
  const [asessor, setAsessor] = React.useState("");
  const [tipo, setTipo] = React.useState("");
  const [villaData, setVillaData] = React.useState([]);
  const [villa, setVilla] = React.useState("");
  useEffect(() => {
    if(initializer.usuario!=null){
        obtenerTodos(setAsessorData, initializer);
        obtenerVillas(setVillaData)
    }
   
  }, [initializer.usuario]);
  const dato=props.location.state
  useEffect(()=>{
    if(dato!=null){
      if(dato.villa!=null){
        setVilla(dato.villa.id)
      }
       
        setAsessor(dato.asesor_id)

        
    }
  },[])
  if(props.location.state==null){
    props.history.push("/clientes")
    return null
  }


 const asignar=()=>{

    asignarAsesor({asessor_id:asessor,client_id:dato.id,village_id:villa},initializer)
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
            <Typography color="textPrimary">Asignación</Typography>
        </Breadcrumbs>
        </Box>
      <Grid container>
        <Grid item md={12} xs={12}>
          <Card>
            <CardContent>
            <Typography color="textPrimary">Asignar un asesor</Typography>
              <FormControl variant="outlined" style={{ width: "100%",marginTop:'10px' }}>
                <InputLabel id="label">Asesor</InputLabel>
                <Select
                  labelId="label"
                  value={asessor}
                  onChange={(e) => setAsessor(e.target.value)}
                  label="ciu"
                >
                  <MenuItem value="">
                    <em>Seleccione una tipo</em>
                  </MenuItem>
                  {asessorData.map((e)=>(
                         <MenuItem key={e.id} value={e.id}>
                         <em>{e.names}</em>
                       </MenuItem>
                  ))}
                </Select>
              </FormControl>
             
              <FormControl variant="outlined" style={{ width: "100%",marginTop:'10px' }}>
                <InputLabel id="label2">Villa</InputLabel>
                <Select
                  labelId="label2"
                  value={villa}
                  onChange={(e) => setVilla(e.target.value)}
                  label="ciu2"
                >
                  <MenuItem value="">
                    <em>Seleccione una villa</em>
                  </MenuItem>
                  {villaData.map((e)=>(
                         <MenuItem key={e.id} value={e.id}>
                         <em>{e.name}</em>
                       </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Grid item md={12}>
                    <Button
                    style={{marginTop:"10px"}}
                      variant="contained"
                      color="primary"
                      onClick={()=>asignar()}
                    >
                      Asignar
                    </Button>
                  </Grid>
             
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
