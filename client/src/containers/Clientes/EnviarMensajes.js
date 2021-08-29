import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from '@material-ui/core/CardHeader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { obtenerTodos} from '../../utils/API/clientes.js'
import Initializer from '../../store/Initializer'
import { enviarMensajeMultiple} from '../../utils/API/templates.js'


const useStyles = makeStyles((theme) => ({
    root: {
      margin: 'auto',
    },
    cardHeader: {
      padding: theme.spacing(1, 2),
    },
    list: {
      width: '100%',
      height: 230,
      backgroundColor: theme.palette.background.paper,
      overflow: 'auto',
    },
    button: {
      margin: theme.spacing(0.5, 0),
    },
  }));
  
  function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1);
  }
  
  function intersection(a, b) {
    return a.filter((value) => b.indexOf(value) !== -1);
  }
  
  function union(a, b) {
    return [...a, ...not(b, a)];
  }
  

export default function EnviarMensajes(props) {
    const classes = useStyles();
    const initializer= React.useContext(Initializer);
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState([]);
  const [right, setRight] = React.useState([]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);
    
  React.useEffect(()=>{
     
    if(initializer.usuario!=null){
         obtenerTodos("interesados",setLeft,initializer);
 
    }




},[initializer.usuario])
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };
  if (props.location.state == null) {
    props.history.push("/email_templates");
    return null;
  }
  const enviarMultple=()=>{
      if(right!=0){
        let nue=[]
        right.slice().map((e)=>{
            nue.push(e.id)
        })
        enviarMensajeMultiple({clients_id:nue,template_id:props.location.state.template_id,},initializer)
      }else{
        initializer.mostrarNotificacion({ type: "error", message: "Seleccione clientes antes de enviar" });
      }
    
  }
  const customList = (title, items) => (
    <Card>
      <CardHeader
        className={classes.cardHeader}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={numberOfChecked(items) === items.length && items.length !== 0}
            indeterminate={numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}
            disabled={items.length === 0}
            inputProps={{ 'aria-label': 'all items selected' }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} seleccionados`}
      />
      <Divider />
      <List className={classes.list} dense component="div" role="list">
        {items.map((value) => {
          const labelId = `transfer-list-all-item-${value}-label`;

          return (
            <ListItem key={value.id} role="listitem" button onClick={handleToggle(value)}>
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${value.names} ${value.last_names}`} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Card>
  );
    return (
        <Box mt={2} ml={2} mr={2}>
              <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        <Link color="inherit" onClick={() => props.history.push("dashboard")}>
          Dashboard
        </Link>
        <Link
          color="inherit"
          onClick={() => props.history.go(-1)}
        >
          Plantillas
        </Link>
        <Typography color="textPrimary">Enviar</Typography>
      </Breadcrumbs>
      <Box mb={2} mt={1}>
        <Typography variant="h6" component="h6">
          Enviar mensajes multiples
        </Typography>
      </Box>
             <Card >
      
        <CardContent>
        <Grid container spacing={2} alignItems="center" className={classes.root}>
      <Grid item xs={12} md={5}>{customList('Clientes', left)}</Grid>
      <Grid item xs={12} md={2}>
        <Grid container direction="column" alignItems="center">
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12} md={5}>{customList('Seleccionado', right)}</Grid>
    </Grid>
        </CardContent>
        <CardActions>
          <Button
            startIcon={<SaveOutlinedIcon />}
            variant="contained"
            color="secondary"
            onClick={() => enviarMultple()}
          >
            Enviar
          </Button>
        </CardActions>
      </Card>
   
        </Box>
    )
}
