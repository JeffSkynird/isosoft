import React, { useContext,useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import GetAppIcon from "@material-ui/icons/GetApp";
import Grid from "@material-ui/core/Grid";

import Select from "@material-ui/core/Select";
import Initializer from "../../store/Initializer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import { downloadFiles } from "../../utils/API/clientes";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import { tieneArchivos,tieneArchivosS } from "../../utils/API/clientes";
import InputLabel from "@material-ui/core/InputLabel";
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import Tooltip from "@material-ui/core/Tooltip";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

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
  const [excelFile, setExcelFile] = React.useState(null);
  const [data, setData] = React.useState("");
  const [tipo, setTipo] = React.useState("");
  const [tipoS, setTipoS] = React.useState("");
  const [files, setFiles] = useState([]);
  const [filesS, setFilesS] = useState([]);
  const [value, setValue] = React.useState(0);
  React.useEffect(() => {
    console.log("ENTRO")
    tieneArchivos(props.client_id,setFiles)
    tieneArchivosS(props.spouse_id,setFilesS)

}, [props.client_id,props.spouse_id]);
  const handleChange = (event, newValue) => {
    setData(null)
    setValue(newValue);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setExcelFile(null);
  };
  const donwload = () => {
    if(value==0){
      downloadFiles({dni:props.dni,tipo},setData,initializer);
    }else{
      downloadFiles({dni:props.dniS,tipo:tipoS},setData,initializer);
    }
    
  };
  const splitear=(nombre)=>{
    let tn =nombre.split(',');
    let tf = tn.join(" ");
    return tf
  }
  return (
    <React.Fragment>
  
  <Tooltip title="Ver archivos">
                    <IconButton aria-label="Ver archivos"   onClick={handleClickOpen}>
      <VisibilityOutlinedIcon />
    </IconButton>
    </Tooltip>
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
              Ver archivos
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Cerrar
            </Button>
          </Toolbar>
        </AppBar>
        <Box ml={2} mr={2}>
       
          <Paper  style={{marginTop:'10px'}} square>
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
              <Tab label="Cliente"  />
              <Tab label="Cónyuge"  disabled={!props.married}/>
             
            </Tabs>
          </Paper>
          <TabPanel value={value} index={0}>
          <Grid container>
          <Grid item xs={12} md={12}>
          <Typography variant="h6" style={{marginBottom:'10px'}}>
              Tipo: {props.dependence==1?"Dependiente":"Independiente"}
            </Typography>
          </Grid>
            <Grid item xs={12}  md={12}>
              <FormControl variant="outlined" style={{ width: "100%" }}>
                <InputLabel id="label3">Tipo de archivo</InputLabel>
                <Select
                  labelId="label3"
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value)}
                  label="ciu3"
                >
                  <MenuItem value="">
                    <em>Seleccione una tipo</em>
                  </MenuItem>
                  <MenuItem value="cedula">
                    <em>Cédula</em>
                  </MenuItem>
                {/*   <MenuItem value="rolesPagoMecanizado">
                    <em> Roles de pago</em>
                  </MenuItem> */}
                  <MenuItem value="mecanizado">
                    <em> Mecanizado del IESS</em>
                  </MenuItem>
                  <MenuItem value="precalificacionHipotecaria">
                    <em> Buró de crédito</em>
                  </MenuItem>{" "}
                  <MenuItem value="precalification">
                    <em> Precalificación hipotecaria</em>
                  </MenuItem>{" "}

                  
                  <MenuItem value="rucRice">
                    <em> Copia del RUC o RISE</em>
                  </MenuItem>
                  <MenuItem value="declaracionIva">
                    <em> Declaración del IVA de los últimos 6 meses</em>
                  </MenuItem>
                  <MenuItem value="declaracionImpuestoRenta">
                    <em> Declaración del impuesto a la renta</em>
                  </MenuItem>
                  <MenuItem value="movimientosCuenta">
                    <em> Movimientos de cuenta de los últimos 3 meses</em>
                  </MenuItem>
                  {
                    props.otherIncome!=0&&props.otherIncome!=null?
                   
                            <MenuItem value="rucRiceO">
                    <em> Otros ingresos: Copia del RUC o RISE</em>
                  </MenuItem>
                  :null}
                  {
                    props.otherIncome!=0&&props.otherIncome!=null?
                    <MenuItem value="declaracionIvaO">
                    <em> Otros ingresos: Declaración del IVA de los últimos 6 meses</em>
                  </MenuItem>
                  :null}
                  {
                    props.otherIncome!=0&&props.otherIncome!=null?
                    <MenuItem value="declaracionImpuestoRentaO">
                    <em> Otros ingresos: Declaración del impuesto a la renta</em>
                  </MenuItem>
                  :null}
                   {
                    props.otherIncome!=0&&props.otherIncome!=null?
                    <MenuItem value="movimientosCuentaO">
                    <em> Otros ingresos: Movimientos de cuenta de los últimos 3 meses</em>
                  </MenuItem>
                  :null}
                  {
                    files.map((e)=>{
                   
                      let tm = e.split("_")
                      if(tm.length>1){
                        let fin = splitear(tm[1]);
                        return (
                          <MenuItem value={e}>
                          <em> {fin}</em>
                        </MenuItem>
                        )
                      }

                    })
                  }
                 
                 
                   
            
                </Select>
              </FormControl>
            </Grid>
            <Grid item  xs={12} md={12}>
              <Button
                style={{ marginTop: "10px" }}
                variant="contained"
                color="primary"
                onClick={() => donwload()}
              >
                Cargar
              </Button>
            </Grid>
            <Grid item  xs={12} md={12} xs={12}>
              {data != "" ? (
                <iframe
                  src={data}
                  frameborder="0"
                  width="100%"
                  height={window.innerHeight}
                ></iframe>
              ) : null}
            </Grid>
            </Grid>
            </TabPanel>
            <TabPanel value={value} index={1}>
            <Grid container>
          <Grid item xs={12} md={12}>
          <Typography variant="h6" style={{marginBottom:'10px'}}>
              Tipo: {props.dependenceS==1?"Dependiente":"Independiente"}
            </Typography>
          </Grid>
            <Grid item xs={12}  md={12}>
              <FormControl variant="outlined" style={{ width: "100%" }}>
                <InputLabel id="label">Tipo de archivo</InputLabel>
                <Select
                  labelId="label"
                  value={tipoS}
                  onChange={(e) => setTipoS(e.target.value)}
                  label="ciu"
                >
                  <MenuItem value="">
                    <em>Seleccione una tipo</em>
                  </MenuItem>
                  <MenuItem value="cedulaS">
                    <em>Cédula</em>
                  </MenuItem>
                 {/*  <MenuItem value="rolesPagoMecanizadoS">
                    <em> Roles de pago</em>
                  </MenuItem> */}
                  <MenuItem value="mecanizadoS">
                    <em> Mecanizado del IESS</em>
                  </MenuItem>
                  <MenuItem value="precalificacionHipotecariaS">
                    <em> Buró de crédito</em>
                  </MenuItem>{" "}
                  <MenuItem value="rucRiceS">
                    <em> Copia del RUC o RISE</em>
                  </MenuItem>
                  <MenuItem value="declaracionIvaS">
                    <em> Declaración del IVA de los últimos 6 meses</em>
                  </MenuItem>
                  <MenuItem value="declaracionImpuestoRentaS">
                    <em> Declaración del impuesto a la renta</em>
                  </MenuItem>
                  <MenuItem value="movimientosCuentaS">
                    <em> Movimientos de cuenta de los últimos 3 meses</em>
                  </MenuItem>

                  {
                    props.otherIncomeS!=0&&props.otherIncomeS!=null?
                   
                    <MenuItem value="rucRiceOS">
                    <em> Otros ingresos: Copia del RUC o RISE</em>
                  </MenuItem>
                  :null}
                  {
                    props.otherIncomeS!=0&&props.otherIncomeS!=null?
                    <MenuItem value="declaracionIvaOS">
                    <em> Otros ingresos: Declaración del IVA de los últimos 6 meses</em>
                  </MenuItem>
                  :null}
                  {
                    props.otherIncomeS!=0&&props.otherIncomeS!=null?
                    <MenuItem value="declaracionImpuestoRentaOS">
                    <em> Otros ingresos: Declaración del impuesto a la renta</em>
                  </MenuItem>
                  :null}
                   {
                    props.otherIncomeS!=0&&props.otherIncomeS!=null?
                    <MenuItem value="movimientosCuentaOS">
                    <em> Otros ingresos: Movimientos de cuenta de los últimos 3 meses</em>
                  </MenuItem>
                  :null}
                  

                  {
                    filesS.map((e)=>{
                      let tm = e.split("_")
                      if(tm.length>1){
                        let fin = splitear(tm[1]);
                        return (
                          <MenuItem value={e}>
                          <em> {fin}</em>
                        </MenuItem>
                        )
                      }

                    })
                  }
                 
                  
                 
                </Select>
              </FormControl>
            </Grid>
            <Grid item  xs={12} md={12}>
              <Button
                style={{ marginTop: "10px" }}
                variant="contained"
                color="primary"
                onClick={() => donwload()}
              >
                Cargar
              </Button>
            </Grid>
            <Grid item  xs={12} md={12} xs={12}>
              {data != "" ? (
                <iframe
                  src={data}
                  frameborder="0"
                  width="100%"
                  height={window.innerHeight}
                ></iframe>
              ) : null}
            </Grid>
            </Grid>
            </TabPanel>
         
        </Box>
      </Dialog>
    </React.Fragment>
  );
}
