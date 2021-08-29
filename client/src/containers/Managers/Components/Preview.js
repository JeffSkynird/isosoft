import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Avatar from '@material-ui/core/Avatar';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';

const messages = [
  {
    id: 1,
    primary: 'Titulo',
    secondary: "Detalle o cuerpo de texto",
    person: '/static/images/avatar/5.jpg',
  },
  {
    id: 2,
    primary: 'Titulo',
    secondary: "Detalle",
    person: '/static/images/avatar/1.jpg',
  },
  {
    id: 3,
    primary: 'Titulo',
    secondary: "Detalle o cuerpo de texto",
    person: '/static/images/avatar/2.jpg',
  },
  {
    id: 4,
    primary: 'Titulo',
    secondary: "Detalle",
    person: '/static/images/avatar/3.jpg',
  },
  {
    id: 5,
    primary: 'Titulo',
    secondary: "Detalle o cuerpo de texto",
    person: '/static/images/avatar/4.jpg',
  },
  {
    id: 6,
    primary: 'Titulo',
    secondary: "Detalle",
    person: '/static/images/avatar/5.jpg',
  },
  {
    id: 7,
    primary: 'Titulo',
    secondary: "Detalle o cuerpo de texto",
    person: '/static/images/avatar/1.jpg',
  },
];

const useStyles = makeStyles((theme) => ({
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  paper: {
    paddingBottom: 50,
    height:350,overflowY:'auto'
  },
  list: {
    marginBottom: theme.spacing(2),
  },
  subheader: {
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
   position:'relative'
  },
  grow: {
    flexGrow: 1,
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
  },
}));

export default function BottomAppBar() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
   
      <Paper square className={classes.paper}>
        <Typography className={classes.text} variant="h5" gutterBottom>
        Previsualización
        </Typography>
        <List className={classes.list}>
          {messages.map(({ id, primary, secondary, person }) => (
            <React.Fragment key={id}>
              {id === 1 && <ListSubheader className={classes.subheader}>Hoy</ListSubheader>}
              {id === 3 && <ListSubheader className={classes.subheader}>Ayer</ListSubheader>}
              <ListItem button>
                <ListItemAvatar>
                  <Avatar alt="Profile Picture" src={person} />
                </ListItemAvatar>
                <ListItemText primary={primary} secondary={secondary} />
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      </Paper>
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="open drawer">
            <MenuIcon />
          </IconButton>
          <Fab color="secondary" aria-label="add" className={classes.fabButton}>
            <AddIcon />
          </Fab>
          <div className={classes.grow} />
          <IconButton color="inherit">
            <SearchIcon />
          </IconButton>
          <IconButton edge="end" color="inherit">
            <MoreIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}