import React,{useContext} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';

import Typography from '@material-ui/core/Typography';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import BarChart from './components/BarChart';
import LineChart from './components/LineChart';
import PieChart from './components/PieChart';
import KpiChart from './components/KpiChart';

import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Initializer from '../../store/Initializer'
import GroupOutlinedIcon from '@material-ui/icons/GroupOutlined';
import { obtenerKpisA,obtenerKpisAsesor,obtenerClientesPorTipo ,obtenerCitasPorMes,obtenerLeadsPorMes} from "../../utils/API/dashboard";
import Skeleton from '@material-ui/lab/Skeleton';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'by Ambiensa ©'}
      
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(4),
    maxWidth:'100%'
  },
  paper: {
   
  },
  fixedHeight: {

  },
}));

export default function Dashboard(props) {
  const initializer= useContext(Initializer);
  


  const classes = useStyles();

  const [kpi1,setKpi1]=React.useState(0)
  const [kpi2,setKpi2]=React.useState(0)
  const [kpi3,setKpi3]=React.useState(0)
  const [kpi4,setKpi4]=React.useState(0)

  const [clientsCount,setClientsCount]=React.useState([])
  const [months,setMonths]=React.useState([])


  const [citesCount,setCitesCount]=React.useState([])
  const [monthsCites,setMonthsCites]=React.useState([])
  
  const [clientsType,setClientsType]=React.useState([])
  const [types,setType]=React.useState([])

  const [assesors,setAssesors]=React.useState([])
  const [productions,setProductions]=React.useState([])

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    
  React.useEffect(()=>{
     
    if(initializer.usuario!=null){
      obtenerKpisA(setKpi1,setKpi2,initializer)
     
      obtenerClientesPorTipo(setClientsType,setType,initializer);
  
      obtenerLeadsPorMes(setClientsCount,setMonths,initializer);

      obtenerCitasPorMes(setCitesCount,setMonthsCites,initializer);
    //  obtenerKpisAsesor(setKpi1,initializer);
    }




},[initializer.usuario])

  return (

  
      initializer.usuario!=null?
        <Container  className={classes.container}>
      <Box mb={2} mt={1}>
                <Typography variant="h6" component="h6">
                    {"Panel general"}
                </Typography>
            </Box>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={3} >
              <Paper className={fixedHeightPaper}>
            
              <  KpiChart title="Leads nuevos" value={kpi1}/>
              </Paper>
            </Grid>
            <Grid item xs={12} md={3} >
              <Paper className={fixedHeightPaper}>
              <  KpiChart title="Leads pendientes" value={kpi1}/>
              </Paper>
            </Grid>
            <Grid item xs={12} md={3} >
              <Paper className={fixedHeightPaper}>
              <  KpiChart title="Leads atendidos" value={0}/>
              </Paper>
            </Grid>
            <Grid item xs={12} md={3} >
              <Paper className={fixedHeightPaper}>
              <  KpiChart title="Citas" value={kpi2}/>
              </Paper>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              
                {
                  clientsCount.length!=0&&months!=0?
                  <Paper className={fixedHeightPaper}>
                  <BarChart key="1" values={clientsCount} categories={months} text="Leads atendidos por mes"/>
                  </Paper>
                  :
                  <Skeleton height={200}/> 
              
                }
            
          
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
             
            {
                  monthsCites.length!=0&&citesCount.length!=0?
                  <Paper className={fixedHeightPaper}>
                    <LineChart label="Citas" values={citesCount} categories={monthsCites} text="Citas creadas por mes"/>
                  </Paper>
                  :
                  <Skeleton height={200}/> 
              
                }
            
        
          </Grid>
          
           
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      :
      null
   
  );
}