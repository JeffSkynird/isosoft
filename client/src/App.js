
import React, { useContext, useState } from 'react';
import AppBar from './components/AppBar'
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link, Redirect
} from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
//Containers
import blue from '@material-ui/core/colors/blue';
import pink from '@material-ui/core/colors/pink';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import lightBlue from '@material-ui/core/colors/lightBlue';
import Initializer from './store/Initializer'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import LinearProgress from '@material-ui/core/LinearProgress';
import Login from './containers/main/Login'
import { useHistory } from "react-router-dom";
import Drawer2 from './components/Drawer2'
import Bienvenida from './containers/main/Bienvenida'

import Evaluaciones from './containers/panel/Evaluaciones'
import Evaluacion from './containers/panel/Evaluacion'

import Sistemas from './containers/panel/Sistemas'
import Resultado from './containers/panel/Resultado';
import Panel from './containers/panel/Panel';
import Settings from './containers/panel/Settings';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function App(props) {
  const { usuario, notificacion, mostrarNotificacion, loader, sound, playSound } = useContext(Initializer);
  let history = useHistory();
  const [colorP, setColorP] = useState(blue)
  const [colorS, setColorS] = useState(blue)
  const [white, setWhite] = useState(createMuiTheme({
    palette: {
      primary: colorP,
      secondary: colorS,
      type: 'light',
    },

  }))
  const [dark, setDark] = useState(createMuiTheme({
    palette: {
      primary: colorP,

      secondary: colorS,

      type: 'dark',
    },

  }))
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    mostrarNotificacion(null);
  };
  React.useEffect(() => {
    if (notificacion != null) {

      setTimeout(function () { mostrarNotificacion(null) }, 3000);
    }
  }
    , [notificacion])
  var themeLight = createMuiTheme({
    palette: {
      primary: colorP,
      secondary: colorS,
      type: 'light',
    },

  });
  var themeDark = createMuiTheme({
    palette: {
      primary: colorP,

      secondary: colorS,

      type: 'dark',
    },

  });
  React.useEffect(() => {
    setWhite(createMuiTheme({
      palette: {
        primary: {
          main: colorP[500],
        },

        secondary: {
          main: colorS['A400'],
        },
        type: 'light',
      },

    }))
    setDark(createMuiTheme({
      palette: {
        primary: {
          main: colorP[500],
        },
        secondary: {
          main: colorS['A400'],
        },
        type: 'dark',
      },

    }))
  }, [colorP, colorS])
  let themeFinal = white
  let tm = localStorage.getItem("theme");


  let [themeColor, setThemeColor] = useState(themeFinal);
  let changeTheme = () => {
    let ct = themeColor.palette.type === "light" ? dark : white;
    setThemeColor(ct);
    let color = themeColor.palette.type == "light" ? "dark" : "light"
    localStorage.setItem("theme", color);
    // play(playSound,'ok')
  }
  let changeThemeColor = (pr, se) => {
    setColorP(pr)
    setColorS(se)
  }

  return (
    <ThemeProvider theme={tm == "dark" ? dark : white}>
      <React.Fragment>

        <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={notificacion != null} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={notificacion != null ? notificacion.type : "success"}>
            {notificacion != null ? notificacion.message : ""}
          </Alert>
        </Snackbar>

        {loader != false ?
          <LinearProgress style={{ zIndex: 9999 }} color="secondary" />

          :
          null
        }


        <CssBaseline />

        <Grid container style={{ flexGrow: 1 }}>
          <Grid item xs={12}>

            <Drawer2  history={history}>
              <Box component="main"  >

                <Switch>
                  <Route exact path="/bienvenida" component={Bienvenida} />
                  <Route exact path="/evaluaciones" component={Evaluaciones} />
                  <Route exact path="/evaluacion" component={Evaluacion} />
                  <Route exact path="/mensaje" component={Resultado} />
                  <Route exact path="/panel" component={Panel} />

                  <Route exact path="/sistemas" component={Sistemas} />

                  <Route exact path="/ajustes" component={Settings} />

                  <Route exact path="/login" component={Login} />
                  <Route render={() => <Redirect to="/bienvenida" />} />
                </Switch>



              </Box>
            </Drawer2>

          </Grid>
        </Grid>



      </React.Fragment>
    </ThemeProvider>

  );
}

