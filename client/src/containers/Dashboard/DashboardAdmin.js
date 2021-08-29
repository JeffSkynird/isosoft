import React, { useContext } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';

import Typography from '@material-ui/core/Typography';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import BarChart from './components/BarChart';
import LineChart from './components/LineChart';
import PieChart from './components/PieChart';
import KpiChart from './components/KpiChart';
import HomeIcon from '@material-ui/icons/Home';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Initializer from '../../store/Initializer'
import GroupOutlinedIcon from '@material-ui/icons/GroupOutlined';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Skeleton from '@material-ui/lab/Skeleton';
import Dashboard from './Dashboard'
import DashboarRendimiento from './DashboarRendimiento'
import CalendarGoals from './CalendarioMetas'
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import GoalAdmin from '../Goals/GoalAdmin'
import SupervisorRendimiento from './SupervisorRendimiento'
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
    maxWidth: '100%'
  },
  paper: {

  },
  fixedHeight: {

  },
}));

export default function Dashboard1(props) {
  const initializer = useContext(Initializer);
  const theme = useTheme();

  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));


  const classes = useStyles();


  const [tab, setTab] = React.useState(0)

  const [assesors, setAssesors] = React.useState([])
  const [productions, setProductions] = React.useState([])

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);



  return (


    initializer.usuario != null ?
      <Container className={classes.container}>
        {
          tab == 0 ?
            <Dashboard {...props} />
            :
            tab == 1 ?
              <DashboarRendimiento {...props} />

              :
              tab==2?
              <SupervisorRendimiento {...props}/>
              :
              <GoalAdmin {...props}/>
        }

        <BottomNavigation
          value={tab}

          onChange={
            (event, newValue) => {
              setTab(newValue);
            }
          }
          style={{
            width: '100%',
            position: 'fixed',
            bottom: 0,
            right: 0,
            left: 0,
            zIndex: 599
          }}
          showLabels

        >
          <BottomNavigationAction label="Principal" icon={<HomeIcon />} />
          <BottomNavigationAction label={fullScreen?"R. Asesores":"Rendimiento de asesores"} icon={<TrendingUpIcon />} />
          <BottomNavigationAction label={fullScreen?"R. Supervisores":"Rendimiento de supervisores"} icon={<TrendingUpIcon />} />

          <BottomNavigationAction label={fullScreen?"G. de metas":"Gestión de metas"} icon={<CalendarTodayIcon />} />

        </BottomNavigation>
      </Container>
      :
      null

  );
}