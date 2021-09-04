import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import PersonIcon from '@material-ui/icons/Person';
import Hidden from '@material-ui/core/Hidden';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Avatar from '@material-ui/core/Avatar';
import DashboardIcon from '@material-ui/icons/Dashboard';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import { useHistory } from "react-router-dom";
import Toolbar from '@material-ui/core/Toolbar';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {PUBLIC_PATH} from '../config/API'
import ListIcon from '@material-ui/icons/List';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Initializer from '../store/Initializer'
import { desencriptarJson } from '../utils/security'
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import { cerrarSesion, obtenerUsuario } from '../utils/API/auth';
import { useLocation, Switch } from 'react-router-dom';
import logo from '../assets/logoPeque.png'
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.up('sm')]: {
            display: 'flex',
        },
        overflow:'hidden'
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

function ResponsiveDrawer(props) {
    const { window } = props;
    let history = useHistory();
    const location = useLocation();
    const classes = useStyles();
    const theme = useTheme();

    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [cambio, setCambio] = React.useState(null)
    const [info, setInfo] = React.useState(null)
    const [names,setNames]=React.useState('')
    const initializer = useContext(Initializer);
    React.useEffect(()=>{
        if (initializer.usuario != null) {
        obtenerUsuario(setInfo,initializer)
        }
    }, [initializer.usuario])
    React.useEffect(()=>{
        if (info!= null) {
            setNames(info.names+" "+info.last_names)
        }
    }, [info])
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const cerrar = () => {
        cerrarSesion(initializer)
    }
    const comprobador = (val) => {

        if (location.pathname == val) {
            return { backgroundColor: '#2196f3', borderRadius: 7, color: 'white', marginRight: 5, marginLeft: 5 }
        } else {
            if(location.pathname =="/evaluacion"&&val=="/evaluaciones"){
                return { backgroundColor: '#2196f3', borderRadius: 7, color: 'white', marginRight: 5, marginLeft: 5 }

            }else{
                return { borderRadius: 7, marginRight: 5, marginLeft: 5 }

            }
        }


    }
    const drawer = (
        <div >
            <div style={{ marginBottom: 15, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <img src={logo} style={{ marginTop: 20, marginBottom: 15, height: 30, width: 124 }} alt="" srcset="" />
                <Avatar style={{ width: 80, height: 80 }}>
                    {
                        info!=null?
                            info.image_path!=null?

                            <img src={info!=null?PUBLIC_PATH+info.image_path:""} style={{height:80,width:80,  objectFit: 'cover'}} alt="" srcset="" />

                            :
                            <PersonIcon fontSize="large" style={{ fontSize: 50 }} />

                        :
                        <PersonIcon fontSize="large" style={{ fontSize: 50 }} />

                    }
                </Avatar>
                <Typography variant="subtitle1" style={{ fontSize: 15, color: '#929396' }}>
                    Administrador
                </Typography>
                <div style={{
                    width: '150px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden', textAlign: 'center',
                    textOverflow: 'ellipsis'
                }}>
                    <Typography variant="subtitle1" style={{ fontSize: 15, color: '#929396' }}>
                        {names}
                    </Typography>

                </div>


            </div>

            <Divider />
            <div style={{ justifyContent: 'space-between', flexDirection: 'column', display: 'flex', height: '100%' }}>
                <List style={{ padding: 10 }} >

                    <ListItem button onClick={() => props.history.push('panel')} style={comprobador('/panel')}>
                        <ListItemIcon style={{ color: 'inherit' }}><DashboardIcon /> </ListItemIcon>
                        <ListItemText primary={'Dashboard'} />
                    </ListItem>
                    <ListItem button onClick={() => props.history.push('sistemas')} style={comprobador('/sistemas')}>
                        <ListItemIcon style={{ color: 'inherit' }}><DesktopWindowsIcon style={{ color: 'inherit' }} /> </ListItemIcon>
                        <ListItemText primary={'Sistemas'} />
                    </ListItem>
                    <ListItem button onClick={() => props.history.push('evaluaciones')} style={comprobador('/evaluaciones')}>
                        <ListItemIcon style={{ color: 'inherit' }}><ListIcon style={{ color: 'inherit' }} /> </ListItemIcon>
                        <ListItemText primary={'Evaluaciones'} />
                    </ListItem>
                 
                </List>

                <div>
                    <Divider />
                    <List>
                        <ListItem button onClick={() => props.history.push('ajustes')}  style={comprobador('/ajustes')} >
                            <ListItemIcon style={{ color: 'inherit' }}><SettingsIcon /> </ListItemIcon>
                            <ListItemText primary={'Configuración'} />
                        </ListItem>
                        <ListItem button onClick={cerrar}>
                            <ListItemIcon><ExitToAppIcon /> </ListItemIcon>
                            <ListItemText primary={'Salir'} />
                        </ListItem>

                    </List>
                </div>
            </div>


        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;
    console.log(history)
    return (
        <div className={classes.root}>
            <CssBaseline />

            {
                // initializer.usuario != null ?
                history.location.pathname != "/bienvenida" && history.location.pathname != "/login" ?
                    <nav className={classes.drawer} aria-label="mailbox folders">
                        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                        <Hidden smUp implementation="css">
                            <Drawer
                                container={container}
                                variant="temporary"
                                anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                                open={mobileOpen}
                                onClose={handleDrawerToggle}
                                classes={{
                                    paper: classes.drawerPaper,
                                }}
                                ModalProps={{
                                    keepMounted: true, // Better open performance on mobile.
                                }}
                            >
                                {drawer}
                            </Drawer>
                        </Hidden>
                        <Hidden xsDown implementation="css">
                            <Drawer
                                classes={{
                                    paper: classes.drawerPaper,
                                }}
                                variant="permanent"
                                open
                            >
                                {drawer}
                            </Drawer>
                        </Hidden>
                    </nav>

                    :
                    null
            }

            <main  className={history != null ? history.location.pathname != "/bienvenida" ? classes.content : "" : ""}>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    style={{display:history.location.pathname == "/bienvenida"  ||history.location.pathname == "/login"  ?'none':''}}
                    onClick={handleDrawerToggle}
                    className={classes.menuButton}
                >
                    <MenuIcon />
                </IconButton>
                {props.children}
            </main>
        </div>
    );
}

ResponsiveDrawer.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default ResponsiveDrawer;
