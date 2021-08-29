import React, { Component, useContext } from "react";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SettingsIcon from '@material-ui/icons/Settings';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import Menu from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import Link from "@material-ui/core/Link";
import Settings from "@material-ui/icons/Settings";
import AnnouncementIcon from '@material-ui/icons/Announcement';
import ExpandLess from "@material-ui/icons/ExpandLess";
import PhoneForwardedIcon from '@material-ui/icons/PhoneForwarded';
import ViewDayIcon from '@material-ui/icons/ViewDay';
import ExpandMore from "@material-ui/icons/ExpandMore";
import NotificationsIcon from '@material-ui/icons/Notifications';
import InfoIcon from '@material-ui/icons/Info';
import HomeIcon from '@material-ui/icons/Home';
import Collapse from "@material-ui/core/Collapse";
import PublicIcon from "@material-ui/icons/Public";
import GroupOutlinedIcon from "@material-ui/icons/GroupOutlined";
import HomeWorkOutlinedIcon from "@material-ui/icons/HomeWorkOutlined";
import PermContactCalendarOutlinedIcon from "@material-ui/icons/PermContactCalendarOutlined";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import GroupAddOutlinedIcon from "@material-ui/icons/GroupAddOutlined";
import PersonAddDisabledOutlinedIcon from "@material-ui/icons/PersonAddDisabledOutlined";
import PlaceOutlinedIcon from "@material-ui/icons/PlaceOutlined";
import AccountBoxOutlinedIcon from "@material-ui/icons/AccountBoxOutlined";
import FormatListNumberedRtlIcon from "@material-ui/icons/FormatListNumberedRtl";
import { makeStyles } from "@material-ui/core/styles";
import { Link as RouterLink } from "react-router-dom";
import ListSubheader from "@material-ui/core/ListSubheader";
import PersonalVideoOutlinedIcon from "@material-ui/icons/PersonalVideoOutlined";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PaymentIcon from "@material-ui/icons/Payment";
import ReceiptIcon from "@material-ui/icons/Receipt";
import Initializer from "../store/Initializer";
import { encriptarJson, desencriptarJson } from "../utils/security";
import { obtenerPermiso } from '../utils/API/managers.js'
import { cerrarSesion } from '../utils/API/auth'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ListAltIcon from '@material-ui/icons/ListAlt';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import { play } from '../utils/sound'
export default function TemporaryDrawer(props) {
  const initializer = useContext(Initializer);
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });
  const [open, setOpen] = React.useState(false);
  const [tipo, setTipo] = React.useState("client");
  const [pago, setPago] = React.useState(null);
  const [permiso, setPermiso] = React.useState([]);

  React.useEffect(() => {
    if (initializer.usuario != null) {
      setTipo(JSON.parse(desencriptarJson(initializer.usuario)).user.type_user);
      if (
        JSON.parse(desencriptarJson(initializer.usuario)).user.position != null
      ) {
        setPago(
          JSON.parse(desencriptarJson(initializer.usuario)).user.position
        );
      }
      obtenerPermiso(setPermiso, initializer);
    }
  }, [initializer.usuario]);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
    play(initializer.playSound, 'click')
  };

  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [open4, setOpen4] = React.useState(false);
  const [open5, setOpen5] = React.useState(false);
  const [open6, setOpen6] = React.useState(false);
  const [open7, setOpen7] = React.useState(false);
  const [open8, setOpen8] = React.useState(false);
  const [open9, setOpen9] = React.useState(false);
  const [open10, setOpen10] = React.useState(false);

  const handleClick = () => {
    setOpen2(!open2);
  };
  const logout = () => {
    cerrarSesion(initializer)


    props.history.push('/login');
  }
  const existe = (e) => {
    let existe = false;
    permiso.slice().map((e2) => {
      if (e == e2) {
        existe = true
      }

    })
    return existe
  };
  const list = (anchor) => (
    <div
      style={{
        width: 250,
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
      role="presentation"
      //onClick={         toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List
        dense={true}
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            General
          </ListSubheader>
        }
      >
        {
          existe('Interesados') ?
            <div>
              <ListItem button onClick={handleClick}>
                <ListItemIcon>
                  <GroupOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Interesados" />
                {open2 ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={open2} timeout="auto" unmountOnExit>
                <List dense={true} component="div" disablePadding>
                  <Link
                    underline="none"
                    component={RouterLink}
                    to="/clientes"
                    onClick={() => {
                      setState({ left: false });
                    }}
                    color="inherit"
                  >
                    <ListItem button className={classes.nested}>
                      <ListItemIcon>
                        <GroupAddOutlinedIcon />
                      </ListItemIcon>
                      <ListItemText primary="Interesados" />
                    </ListItem>
                  </Link>

                  {/*   <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <GroupOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Aprobados" />
              </ListItem> */}

                  {/* <Link
              underline="none"
              component={RouterLink}
              to="/negados"
              onClick={() => {
                setState({ left: false });
              }}
              color="inherit"
            >
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <PersonAddDisabledOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Negados" />
              </ListItem>
            </Link>
            <Link
              underline="none"
              component={RouterLink}
              to="/validados"
              onClick={() => {
                setState({ left: false });
              }}
              color="inherit"
            >
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <AccountBoxOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Validados" />
              </ListItem>
            </Link>
           */}
                </List>
              </Collapse>
            </div>

            :
            null
        }
        {existe('InteresadosNoValidos') ? (
          <Link
            underline="none"
            component={RouterLink}
            to="/clientes_no_validos"
            onClick={() => setState({ left: false })}
            color="inherit"
          >
            <ListItem button>
              <ListItemIcon>
                {" "}
                <PersonAddDisabledOutlinedIcon />{" "}
              </ListItemIcon>
              <ListItemText primary="Interesados No Validos" />
            </ListItem>
          </Link>
        ) : null}


        {existe('Agenda') && tipo != "manager" ? (


          <div>
            <ListItem button onClick={() => setOpen5(!open5)}>
              <ListItemIcon>
                <FormatListNumberedRtlIcon />
              </ListItemIcon>
              <ListItemText primary="Citas / Llamadas" />
              {open5 ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open5} timeout="auto" unmountOnExit>
              <List dense={true} component="div" disablePadding>
                <Link
                  underline="none"
                  component={RouterLink}
                  to="/agenda"
                  onClick={() => setState({ left: false })}
                  color="inherit"
                >
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      {" "}
                      <CalendarTodayIcon />{" "}
                    </ListItemIcon>
                    <ListItemText primary="Agenda" />
                  </ListItem>
                </Link>
                <Link
                  underline="none"
                  component={RouterLink}
                  to="/citations"
                  onClick={() => setState({ left: false })}
                  color="inherit"
                >
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      {" "}
                      <PhoneForwardedIcon />{" "}
                    </ListItemIcon>
                    <ListItemText primary="Historial" />
                  </ListItem>
                </Link>


              </List>

            </Collapse>
          </div>
        ) : null}
        {existe('Gestion de metas') ? (
          <Link
            underline="none"
            component={RouterLink}
            to="/goals_config"
            onClick={() => setState({ left: false })}
            color="inherit"
          >
            <ListItem button>
              <ListItemIcon>
                {" "}
                <SettingsIcon />{" "}
              </ListItemIcon>
              <ListItemText primary="Gestión de metas" />
            </ListItem>
          </Link>
        ) : null}
        {1==2&&existe('Precalificador') ? (

          <div>
            <ListItem button onClick={() => setOpen5(!open5)}>
              <ListItemIcon>
                <FormatListNumberedRtlIcon />
              </ListItemIcon>
              <ListItemText primary="Precalificador" />
              {open5 ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open5} timeout="auto" unmountOnExit>
              <List dense={true} component="div" disablePadding>
                <Link
                  underline="none"
                  component={RouterLink}
                  to="/precalificador/opciones"
                  onClick={() => setState({ left: false })}
                  color="inherit"
                >
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      {" "}
                      <SettingsOutlinedIcon />{" "}
                    </ListItemIcon>
                    <ListItemText primary="Ajustes" />
                  </ListItem>
                </Link>
              </List>
            </Collapse>
          </div>
        ) : null}
        {existe('Grupos/KPIS') ? (
          <div>


            <ListItem button onClick={() => setOpen6(!open6)}>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Grupos y KPI" />
              {open6 ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open6} timeout="auto" unmountOnExit>
              <List dense={true} component="div" disablePadding>
                <Link
                  underline="none"
                  component={RouterLink}
                  to="/grupos"
                  onClick={() => setState({ left: false })}
                  color="inherit"
                >
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      {" "}
                      <GroupOutlinedIcon />{" "}
                    </ListItemIcon>
                    <ListItemText primary="Grupos" />
                  </ListItem>
                </Link>
                <Link
                  underline="none"
                  component={RouterLink}
                  to="/kpis"
                  onClick={() => setState({ left: false })}
                  color="inherit"
                >
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      {" "}
                      <FormatListNumberedRtlIcon />{" "}
                    </ListItemIcon>
                    <ListItemText primary="KPI" />
                  </ListItem>
                </Link>
              </List>
            </Collapse>
          </div>
        ) : null}

      </List>

      <List
        dense={true}
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Administración
            </ListSubheader>
        }
      >
        {existe('Asesores') ? (
          <Link
            underline="none"
            component={RouterLink}
            to="/asesores"
            onClick={() => setState({ left: false })}
            color="inherit"
          >
            <ListItem button>
              <ListItemIcon>
                {" "}
                <PermContactCalendarOutlinedIcon />{" "}
              </ListItemIcon>
              <ListItemText primary="Asesores" />
            </ListItem>
          </Link>
        ) : null}
        {existe('Supervisores') ? (
          <Link
            underline="none"
            component={RouterLink}
            to="/supervisores"
            onClick={() => setState({ left: false })}
            color="inherit"
          >
            <ListItem button>
              <ListItemIcon>
                {" "}
                <PermContactCalendarOutlinedIcon />{" "}
              </ListItemIcon>
              <ListItemText primary="Supervisores" />
            </ListItem>
          </Link>
        ) : null}
    
{/* {existe('Productos')&& (
      <div>
        <ListItem button onClick={() => setOpen10(!open10)}>
          <ListItemIcon>
            <HomeWorkOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Productos" />
          {open10 ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open10} timeout="auto" unmountOnExit>
          <List dense={true} component="div" disablePadding>
            <Link
              underline="none"
              component={RouterLink}
              to="/proyectos"
              onClick={() => setState({ left: false })}
              color="inherit"
            >
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  {" "}
                  <HomeWorkOutlinedIcon />{" "}
                </ListItemIcon>
                <ListItemText primary="Proyectos" />
              </ListItem>
            </Link>
            <Link
              underline="none"
              component={RouterLink}
              to="/villas"
              onClick={() => setState({ left: false })}
              color="inherit"
            >
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  {" "}
                  <HomeIcon />{" "}
                </ListItemIcon>
                <ListItemText primary="Villas" />
              </ListItem>
            </Link>
          </List>
        </Collapse>

      </div>
      )} */}

{/* 
        {existe('Ubicacion') ? (
          <div>
            <ListItem button onClick={() => setOpen3(!open3)}>
              <ListItemIcon>
                <PlaceOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Ubicación" />
              {open3 ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open3} timeout="auto" unmountOnExit>
              <List dense={true} component="div" disablePadding>
                <Link
                  underline="none"
                  component={RouterLink}
                  to="/ciudades"
                  onClick={() => setState({ left: false })}
                  color="inherit"
                >
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      {" "}
                      <LocationCityIcon />{" "}
                    </ListItemIcon>
                    <ListItemText primary="Cantones" />
                  </ListItem>
                </Link>
                <Link
                  underline="none"
                  component={RouterLink}
                  to="/provincias"
                  onClick={() => setState({ left: false })}
                  color="inherit"
                >
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      {" "}
                      <PublicIcon />{" "}
                    </ListItemIcon>
                    <ListItemText primary="Provincias" />
                  </ListItem>
                </Link>
                <Link
                  underline="none"
                  component={RouterLink}
                  to="/paises"
                  onClick={() => setState({ left: false })}
                  color="inherit"
                >
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      {" "}
                      <PublicIcon />{" "}
                    </ListItemIcon>
                    <ListItemText primary="Paises" />
                  </ListItem>
                </Link>
              </List>
            </Collapse>

          </div>

        ) : null} */}
        {existe('Sistema') ? (
          <div>
            <ListItem button onClick={() => setOpen4(!open4)}>
              <ListItemIcon>
                <PersonalVideoOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Sistema" />
              {open4 ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open4} timeout="auto" unmountOnExit>
              <List dense={true} component="div" disablePadding>
                <Link
                  underline="none"
                  component={RouterLink}
                  to="/email_templates"
                  onClick={() => setState({ left: false })}
                  color="inherit"
                >
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      {" "}
                      <MailOutlineIcon />{" "}
                    </ListItemIcon>
                    <ListItemText primary="Plantilla de mensajes" />
                  </ListItem>
                </Link>
                <Link
                  underline="none"
                  component={RouterLink}
                  to="/sgi_logs"
                  onClick={() => setState({ left: false })}
                  color="inherit"
                >
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      {" "}
                      <ListAltIcon />{" "}
                    </ListItemIcon>
                    <ListItemText primary="Logs" />
                  </ListItem>
                </Link>
              </List>
            </Collapse>

          </div>

        ) : null}



      </List>

      {existe('Eventos')&& (
      <div>
        <ListItem button onClick={() => setOpen9(!open9)}>
          <ListItemIcon>
            <AnnouncementIcon />
          </ListItemIcon>
          <ListItemText primary="Eventos" />
          {open9 ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open9} timeout="auto" unmountOnExit>
          <List dense={true} component="div" disablePadding>
            <Link
              underline="none"
              component={RouterLink}
              to="/noticias"
              onClick={() => setState({ left: false })}
              color="inherit"
            >
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  {" "}
                  <NotificationsIcon />{" "}
                </ListItemIcon>
                <ListItemText primary="Noticias" />
              </ListItem>
            </Link>
            <Link
              underline="none"
              component={RouterLink}
              to="/promociones"
              onClick={() => setState({ left: false })}
              color="inherit"
            >
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  {" "}
                  <InfoIcon />{" "}
                </ListItemIcon>
                <ListItemText primary="Promociones" />
              </ListItem>
            </Link>
          </List>
        </Collapse>

      </div>
      )}

      {existe('Pagos') ? (
        <div>
          <ListItem button onClick={() => setOpen7(!open7)}>
            <ListItemIcon>
              <PaymentIcon />
            </ListItemIcon>
            <ListItemText primary="Pagos" />
            {open7 ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open7} timeout="auto" unmountOnExit>
            <List dense={true} component="div" disablePadding>

              <Link
                underline="none"
                component={RouterLink}
                to="/pagos"
                onClick={() => setState({ left: false })}
                color="inherit"
              >
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    {" "}
                    <PaymentIcon />{" "}
                  </ListItemIcon>
                  <ListItemText primary="Pagos" />
                </ListItem>
              </Link>
              <Link
                underline="none"
                component={RouterLink}
                to="/reservas"
                onClick={() => setState({ left: false })}
                color="inherit"
              >
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    {" "}
                    <ReceiptIcon />{" "}
                  </ListItemIcon>
                  <ListItemText primary="Reservas" />
                </ListItem>
              </Link>


            </List>
          </Collapse>

        </div>
      ) : null}
      {
        existe('Usuarios') ? (
          <Link
            underline="none"
            component={RouterLink}
            to="/managers"
            onClick={() => setState({ left: false })}
            color="inherit"
          >
            <ListItem button>
              <ListItemIcon>
                {" "}
                <AccountBoxOutlinedIcon />{" "}
              </ListItemIcon>
              <ListItemText primary="Usuarios" />
            </ListItem>
          </Link>

        ) : null}

      {
        existe('Roles') ? (
          <Link
            underline="none"
            component={RouterLink}
            to="/roles"
            onClick={() => setState({ left: false })}
            color="inherit"
          >
            <ListItem button>
              <ListItemIcon>
                {" "}
                <AccountBoxOutlinedIcon />{" "}
              </ListItemIcon>
              <ListItemText primary="Roles" />
            </ListItem>
          </Link>
        ) : null}


      <ListItem button onClick={logout}>
        <ListItemIcon>
          {" "}
          <ExitToAppIcon />{" "}
        </ListItemIcon>
        <ListItemText primary="Salir" />
      </ListItem>

    </div>
  );

  return (
    <div>
      {
        <React.Fragment>
          <IconButton
            onClick={toggleDrawer("left", true)}
            color="inherit"
            edge="start"
            aria-label="delete"
            size="medium"
          >
            <Menu fontSize="inherit" />
          </IconButton>
          <Drawer
            anchor={"left"}
            open={state["left"]}
            onClose={toggleDrawer("left", false)}
          >
            {list("left")}
          </Drawer>
        </React.Fragment>
      }
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));
