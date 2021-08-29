import React, { useContext } from "react";
import { obtenerGoalsConfig,editarGoalsConfig } from "../../utils/API/goals";
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

export default function Goals(props) {
  const initializer = useContext(Initializer);


  const [inEffectiveCites, setInEffectiveCites] = React.useState("");
  const [effectiveCites, setEffectiveCites] = React.useState("");
  const [effectiveCalls, setEffectiveCalls] = React.useState("");
  const [inEffectiveCalls, setInEffectiveCalls] = React.useState("");
  const [goals, setGoals] = React.useState(null);

  React.useEffect(() => {
    if (initializer.usuario != null) {
        obtenerGoalsConfig(setGoals, initializer);
    }
  }, [initializer.usuario]);
  React.useEffect(() => {
    if (goals!=null) {
     
       setInEffectiveCites(goals.ineffective_citations)
       setInEffectiveCalls(goals.ineffective_calls)
       setEffectiveCalls(goals.effective_calls)
       setEffectiveCites(goals.effective_citations)
    }
  }, [goals]);
  const guardar=()=> {

    
    editarGoalsConfig({effective_calls:effectiveCalls,effective_citations:effectiveCites,ineffective_calls:inEffectiveCalls,ineffective_citations:inEffectiveCites},initializer)
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

          <Typography color="textPrimary">Metas</Typography>
        </Breadcrumbs>
      </Box>
      <Grid container>
        <Grid item md={12} xs={12}>
          <Box mb={2} mt={1}>
            <Typography variant="h6" component="h6">
             Metas de vendedores mensuales
            </Typography>
          </Box>

          <Card>
            <CardContent>
              <Grid container spacing={2}>
              
              <Grid item md={6} xs={12}>
                  <TextField
                  label="Citas agendadas"
                  variant="outlined"
                  style={{ width: "100%" }}
                  value={inEffectiveCites}
                  onChange={(e) => {
                      setInEffectiveCites(e.target.value)
                  }}
                  />
              </Grid>
              <Grid item md={6} xs={12}>
                  <TextField
                  label="Citas efectivas (entrevistas)"
                  variant="outlined"
                  style={{ width: "100%" }}
                  value={effectiveCites}
                  onChange={(e) => {
                    setEffectiveCites(e.target.value)
                  }}
                
                  />
              </Grid>
              <Grid item md={6} xs={12}>
              <TextField
                label="Llamadas salientes"
                variant="outlined"
                style={{ width: "100%" }}
                value={inEffectiveCalls}
                  onChange={(e) => {
                      setInEffectiveCalls(e.target.value)
                  }}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                label="Llamadas efectivas"
                variant="outlined"
                style={{ width: "100%" }}
                value={effectiveCalls}
                  onChange={(e) => {
                      setEffectiveCalls(e.target.value)
                  }}
              />
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
              </Grid>   </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
