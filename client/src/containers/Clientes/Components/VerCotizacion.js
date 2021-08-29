import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import GetAppIcon from '@material-ui/icons/GetApp';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import Chip from '@material-ui/core/Chip';
import noValue from '../../../assets/noValue.svg'
import RefreshIcon from '@material-ui/icons/Refresh';
import Grid from "@material-ui/core/Grid";

import Initializer from "../../../store/Initializer";
import EmailIcon from '@material-ui/icons/Email';

import Box from "@material-ui/core/Box";
import { enviarCotizacion } from "../../../utils/API/clientes";

import MenuItem from "@material-ui/core/MenuItem";
import SendIcon from '@material-ui/icons/Send';
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box pt={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: "relative",
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog(props) {
    const initializer = useContext(Initializer);
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [link, setLink] = React.useState("");



    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);

    };

    useEffect(() => {
        if (open) {
            props.obtenerCotizacionCliente(setLink)
        }
    }, [open])

    const enviarCorreo = () => {

        enviarCotizacion({ client_id: props.client_id, link: link }, initializer)
    };
    const refrescar = () => {
        setLink("")
        props.obtenerCotizacionCliente(setLink)
    };

    const descargar = () => {

        const link2 = document.createElement('a');
        link2.href = "http://" + link;
        link2.setAttribute(
            'download',
            `FileName.pdf`,
        );
        link2.target = "_blank"
        document.body.appendChild(link2);
        link2.click();
        document.body.removeChild(link2);
    };
    return (
        <React.Fragment>


            <MenuItem onClick={handleClickOpen}>Obtener cotización</MenuItem>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Ver cotización
            </Typography>
                        <Button autoFocus color="inherit" onClick={handleClose}>
                            Cerrar
            </Button>
                    </Toolbar>
                </AppBar>

                <Grid container>
                    <Grid item xs={12} md={12} style={{ display: 'flex', alignItems: 'center', margin: 15, overflowX: 'auto' }}>

                        <Chip
                            disabled={link == ""}
                            style={{ marginRight: 10 }}
                            icon={<EmailIcon />}
                            label="Enviar cotización al interesado"
                            onClick={enviarCorreo}

                        />
                        <Chip
                            style={{ marginRight: 10 }}
                            disabled={link == ""}
                            icon={<GetAppIcon />}
                            label="Descargar"
                            onClick={descargar}

                        />
                        <Chip
                            disabled={link == ""}
                            icon={<RefreshIcon />}
                            label="Refrescar"
                            onClick={refrescar}

                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        {link != "" ?
                            link == '0' ?
                                <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                                    <img src={noValue} style={{ height: 200, width: 190 }} alt="" />
                                    <p>El interesado no posee cotizaciones realizadas</p>
                                </div>
                                :
                                <iframe
                                    onerror={"this.onerror=null;alert(2);this.src='https://docs.google.com/viewer?url=http://" + link + "&embedded=true';"}
                                    src={"https://docs.google.com/viewer?url=http://" + link + "&embedded=true"}
                                    frameborder="0"
                                    width="100%"
                                    height={window.innerHeight}
                                ></iframe>
                            :
                            <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                                <img src={noValue} style={{ height: 200, width: 190 }} alt="" />
                                <p>El asesor no existe o no posee permisos para acceder</p>
                            </div>
                        }



                    </Grid>
                </Grid>

            </Dialog>
        </React.Fragment>
    );
}
