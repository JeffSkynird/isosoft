import React, { useContext } from "react";
import { obtenerOpciones,registrarOpciones } from "../../utils/API/precalificator";
import Initializer from "../../store/Initializer";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";

import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { ColorPicker } from "material-ui-color";

export default function Editar(props) {
  const initializer = useContext(Initializer);
  const [opciones, setOpciones] = React.useState([]);

  const [precalification, setPrecalification] = React.useState([]);

  const [colorA, setColorA] = React.useState("transparent");
  const [colorP, setColorP] = React.useState("transparent");
  const [colorR, setColorR] = React.useState("transparent");
  const [colorN, setColorN] = React.useState("transparent");

  const [rangoM, setRangoM] = React.useState("");
  const [rango1, setRango1] = React.useState("");
  const [rangoMin, setRangoMin] = React.useState("");

  const [rangoBuro, setRangoBuro] = React.useState("");
  const [rangoMinBuro, setRangoMinBuro] = React.useState("");

  const [rangoAhorro, setRangoAhorro] = React.useState("");
  const [rangoMinAhorro, setRangoMinAhorro] = React.useState("");

  React.useEffect(() => {
    if (initializer.usuario != null) {
      obtenerOpciones(setOpciones, initializer);
    }
  }, [initializer.usuario]);
  React.useEffect(() => {
    if (opciones.length!=0) {
        setColorA(opciones[0].color.split(",")[1])
        setColorP(opciones[0].color.split(",")[0])
        setColorR(opciones[0].color.split(",")[2])
        setColorN(opciones[0].color.split(",")[3])

        setRangoM(opciones[0].income_range.split(",")[0])
        setRango1(opciones[0].income_range.split(",")[1])
        setRangoMin(opciones[0].income_range.split(",")[2])

        setRangoBuro(opciones[0].buro_range.split(",")[1])
        setRangoMinBuro(opciones[0].buro_range.split(",")[2])

        setRangoAhorro(opciones[0].savings_range.split(",")[1])
        setRangoMinAhorro(opciones[0].savings_range.split(",")[2]) 

        setPrecalification(opciones[0].precalification_range) 
    }
  }, [opciones]);
  const guardar=()=> {
    let buro=(Number(rangoBuro.split('-')[0])+1)+","+rangoBuro+","+rangoMinBuro
  
    let ingreso=(Number(rango1.split('-')[0])+1)+","+rango1+","+rangoMin
   
    let ahorro=(Number(rangoAhorro.split('-')[0])+1)+","+rangoAhorro+","+rangoMinAhorro
    //registrarOpciones({color:colorP+','+colorA+','+colorR+','+colorN,income:rangoM+','+rango1+','+rangoMin,score:'0'},initializer)
    registrarOpciones({precalification:precalification,color:colorP+','+colorA+','+colorR+','+colorN,income:ingreso,buro:buro,savings:ahorro,score:'0'},initializer)
  }
  return (
    <Box mt={2} ml={2} mr={2}>
      <Box>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          <a
            color="inherit"
            onClick={() => (window.location.href = "/dashboard")}
          >
            Dashboard
          </a>

          <Typography color="textPrimary">Precalificador</Typography>
        </Breadcrumbs>
      </Box>
      <Grid container>
        <Grid item md={12} xs={12}>
          <Box mb={2} mt={1}>
            <Typography variant="h6" component="h6">
              Opciones del pre calificador
            </Typography>
          </Box>

          <Card>
            <CardContent>
              <Typography color="textPrimary" style={{ fontWeight: "bold",marginBottom:'10px'  }}>
                Colores
              </Typography>
              <Grid container>
                <Grid item md={3} xs={12}>
 


                  <Typography color="textPrimary">Aprobado</Typography>
                  <ColorPicker value={colorA} onChange={(e)=>{setColorA("#"+e.hex)}}/>
                </Grid>
                <Grid item md={3} xs={12}>
                  <Typography color="textPrimary">En proceso</Typography>
                  <ColorPicker value={colorP} onChange={(e)=>{setColorP("#"+e.hex)}}/>
                </Grid>
                <Grid item md={3} xs={12}>
                  <Typography color="textPrimary">Revisión</Typography>
                  <ColorPicker value={colorR}  onChange={(e)=>{setColorR("#"+e.hex)}}/>
                </Grid>
                <Grid item md={3} xs={12}>
                  <Typography color="textPrimary">Negado</Typography>
                  <ColorPicker value={colorN}  onChange={(e)=>{setColorN("#"+e.hex)}}/>
                </Grid>
              </Grid>
              <Typography color="textPrimary" style={{ fontWeight: "bold",marginTop:'10px',marginBottom:'10px' }}>
                Rango de valores de buró de crédito
              </Typography>
              <Grid container spacing={2}>
              
              <Grid item md={0} xs={12}>
                  <TextField
                  label="Rango máximo"
                  variant="outlined"
                  style={{ width: "100%" }}
                  value={'500'}
                  onChange={(e) => {
                      setRangoM(e.target.value)
                  }}
                  />
              </Grid>
              <Grid item md={6} xs={12}>
                  <TextField
                  label="Rango intermedio"
                  variant="outlined"
                  style={{ width: "100%" }}
                  value={rangoBuro}
                  onChange={(e) => {
                      setRangoBuro(e.target.value)
                  }}
                
                  />
              </Grid>
              <Grid item md={6} xs={12}>
              <TextField
                label="Rango mínimo"
                variant="outlined"
                style={{ width: "100%" }}
                value={rangoMinBuro}
                  onChange={(e) => {
                      setRangoMinBuro(e.target.value)
                  }}
              />
            </Grid>
              
            </Grid>
              <Typography color="textPrimary" style={{ fontWeight: "bold",marginTop:'10px',marginBottom:'10px' }}>
                Rango de valores de ingresos
              </Typography>
              <Grid container spacing={2}>
           
                <Grid item md={0} xs={12}>
                    <TextField
                    label="Rango máximo"
                    variant="outlined"
                    style={{ width: "100%"}}
                    value={rangoM}
                    onChange={(e) => {
                        setRangoM(e.target.value)
                    }}
                    />
                </Grid>
                <Grid item md={6} xs={12}>
                    <TextField
                    label="Rango intermedio"
                    variant="outlined"
                    style={{ width: "100%" }}
                    value={rango1}
                    onChange={(e) => {

                        setRango1(e.target.value)

              
                    }}
                   
                    />
                </Grid>
                
                <Grid item md={6} xs={12}>
                <TextField
                  label="Rango mínimo"
                  variant="outlined"
                  style={{ width: "100%" }}
                  value={rangoMin}
                    onChange={(e) => {
                        setRangoMin(e.target.value)
                    }}
                />
              </Grid>
              </Grid>

              <Typography color="textPrimary" style={{ fontWeight: "bold",marginTop:'10px',marginBottom:'10px' }}>
                Rango de valores de ahorro neto
              </Typography>
              <Grid container spacing={2}>
           
           <Grid item md={0} xs={12}>
               <TextField
               label="Rango máximo"
               variant="outlined"
               style={{ width: "100%",}}
               value={'36%'}
               onChange={(e) => {
                   setRangoM(e.target.value)
               }}
               />
           </Grid>
           <Grid item md={6} xs={12}>
               <TextField
               label="Rango intermedio"
               variant="outlined"
               style={{ width: "100%" }}
               value={rangoAhorro}
               onChange={(e) => {
                   setRangoAhorro(e.target.value)
               }}
               />
           </Grid>
           
           <Grid item md={6} xs={12}>
           <TextField
             label="Rango mínimo"
             variant="outlined"
             style={{ width: "100%" }}
             value={rangoMinAhorro}
               onChange={(e) => {
                   setRangoMinAhorro(e.target.value)
               }}
           />
         </Grid>
         </Grid>
           
         <Typography color="textPrimary" style={{ fontWeight: "bold",marginTop:'10px',marginBottom:'10px' }}>
                Constante de la precalificación hipotecaria
              </Typography>
              <Grid container spacing={2}>
           
           <Grid item md={12} xs={12}>
               <TextField
               label="Constante"
               variant="outlined"
               style={{ width: "100%"}}
               value={precalification}
               onChange={(e) => {
                   setPrecalification(e.target.value)
               }}
               />
           </Grid>
           </Grid>
              <Grid item md={12}>
                <Button
                  style={{ marginTop: "10px" }}
                  variant="contained"
                  color="secondary"
                  onClick={()=>guardar()}
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
