import React,{useContext} from "react";
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
import Initializer from '../../store/Initializer'

const ExamplePDFViewer = (props) => {
    const initializer= useContext(Initializer);
    const [data, setData] = React.useState("");
    const [tipo, setTipo] = React.useState("");
if(props.location.state==null){
    props.history.push("/clientes")
    return null
}else{
    const {dni}=props.location.state

    const donwload = () => {
      downloadFiles({dni,tipo},setData,initializer);
    };
    return (
      <Box mt={2} ml={2} mr={2}>
        <Grid container>
          <Grid item md={12} xs={12}>
         
            <Card>
                <CardContent>
                
                  <Grid item md={12}>
                    <FormControl variant="outlined" style={{ width: "100%" }}>
                      <InputLabel id="label">Tipo de archivo</InputLabel>
                      <Select
                        labelId="label"
                        value={tipo}
                        onChange={(e) => setTipo(e.target.value)}
                        label="ciu"
                      >
                        <MenuItem value="">
                          <em>Seleccione una tipo</em>
                        </MenuItem>
                        <MenuItem value="cedula">
                          <em>Cédula</em>
                        </MenuItem>
                        <MenuItem value="rolesPagoMecanizado">
                          <em> Roles de pago o mecanizado</em>
                        </MenuItem>
                        <MenuItem value="precalificacionHipotecaria">
                          <em> Buró de crédito</em>
                        </MenuItem>{" "}
                        <MenuItem value="precalification">
                          <em> Precalificación hipotecaria</em>
                        </MenuItem>{" "}
                        <MenuItem value="rucRice">
                          <em> Copia del RUC o RISE</em>
                        </MenuItem>
                        <MenuItem value="declaracionIva">
                          <em> Declaración del IVA de los últimos 6 meses</em>
                        </MenuItem>
                        <MenuItem value="movimientosCuenta">
                          <em> Movimientos de cuenta de los últimos 3 meses</em>
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item md={12}>
                    <Button
                    style={{marginTop:"10px"}}
                      variant="contained"
                      color="primary"
                      onClick={() => donwload()}
                    >
                      Cargar
                    </Button>
                  </Grid>
             
                </CardContent>
              </Card>
          
          </Grid>
          <Grid item md={12} xs={12}>
            {data != "" ? (
              <iframe
                src={data}
                frameborder="0"
                width="100%"
                height={window.innerHeight}
              ></iframe>
            ) : null}
          </Grid>
        </Grid>
      </Box>
    );
}

};

export default ExamplePDFViewer;
