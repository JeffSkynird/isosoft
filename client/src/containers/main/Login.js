import React from 'react';

import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import splashL from '../../assets/login.png'
import splashR from '../../assets/register.png'

import Register from './Register'
import Iniciar from './Iniciar'
import { useMediaQuery, useTheme } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.,
        display: 'flex',
        flexDirection: 'column',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignIn(props) {
    const dato = props.location.state;
    const theme = useTheme();

    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const classes = useStyles();
    const [tab,setTab]=React.useState(0)


    React.useEffect(()=>{
        console.log(dato)
        if(dato!=undefined){
            if(dato.hasOwnProperty('register')){
                setTab(1)
            }
        }
        
    },[dato])
    return (

        <div className={classes.paper}>
            <Card style={{ padding: 30 }}>
                <CardContent>

                    <Grid style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ marginRight: fullScreen?0:30 }} >
                            <div style={{display:'flex',marginBottom:10,alignItems:'center',justifyContent:'space-between'}}>
                                <IconButton aria-label="back" size="small" onClick={() => window.location.href="/bienvenida"}>
                                    <ArrowBackIcon />
                                </IconButton>
                                {
                                    tab==0?
                                    <Typography variant="subtitle1" style={{ fontSize: 12, color: '#929396' }}>
                                    ¿No tienes cuenta? <span style={{cursor:"pointer",color:'#2196f3'}} onClick={() =>setTab(1)}>Registrate</span>
                                </Typography>
                                    :
                                    <Typography variant="subtitle1" style={{ fontSize: 12, color: '#929396' }}>
                                   Tienes una cuenta?  <span style={{cursor:"pointer",color:'#2196f3'}} onClick={() =>setTab(0)}>Inicia sesión</span>
                                </Typography>
                                }
                           
                            </div>

                            <Typography component="h1" variant="h5">
                            {tab==0?'Inicia sesión':'Registrate ahora'}
                            </Typography>
                            <Typography variant="subtitle1" style={{ fontSize: 15, color: '#929396' }}>
                                Accede al portal administrativo
                            </Typography>
                            {
                            tab==0?
                            <Iniciar classes={classes}/>
                            :
                            <Register classes={classes} setTab={setTab}/>
                        } 
                        </div>
                    

                        <img src={tab==0?splashL:splashR} style={{display:fullScreen?'none':'', width: 350, height: 260 }} alt="" srcset="" />
                    </Grid>

                </CardContent>

            </Card>

        </div>

    );
}
