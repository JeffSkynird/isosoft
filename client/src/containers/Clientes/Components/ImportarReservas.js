import React, { useContext } from "react";
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
import { importar } from "../../../utils/API/pagos";
import Initializer from "../../../store/Initializer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import LinearProgress from '@material-ui/core/LinearProgress';


function createData(
    cedula_cliente,
    reserva,
    nombres_cliente,
    proyecto,
    correo,
    valor,

) {
  return {
    cedula_cliente,
    reserva,
    nombres_cliente,
    proyecto,
    correo,
    valor,
  };
}

const rows = [
 
  createData(
    "xxxxxxxx",
    "xxxxx",
    "Nombre Ejemplo",
    "Nombre proyecto",
    "ejp@gmail.com",
    "xxxxxx",
  ),
  createData(
    "xxxxxxxx",
    "xxxxx",
    "Nombre Ejemplo",
    "Nombre proyecto",
    "ejp@gmail.com",
    "xxxxxx",
  ),
];

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
  const [loader, setLoader] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setExcelFile(null);

  };
  const importe=()=>{
    if (excelFile != null) {
        importar({ excelFile },setLoader, initializer);
        //setOpen(false);
        setExcelFile(null);
      } else {
        initializer.mostrarNotificacion({
          type: "error",
          message: "Por favor, eliga un archivo para continuar",
        });
      }
  }
  return (
    <div>
      <Button
        startIcon={<GetAppIcon />}
        variant="contained"
        color="default"
        onClick={handleClickOpen}
      >
        Importar
      </Button>
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
              Importar datos
            </Typography>
            <Button autoFocus color="inherit" onClick={importe}>
              Guardar
            </Button>
          </Toolbar>
        </AppBar>
        {loader!=false?
        <LinearProgress color="secondary" />:null

        }
        <Box mt={2} ml={2} mr={2}>
          <Grid container>
            <Grid item xs={12} md={12}>
              <Typography variant="subtitle1" className={classes.title}>
                Por favor, siga el formato y orden descrito a continuación para
                las cabeceras del documento:
              </Typography>
            </Grid>
            <Grid item xs={12} md={12}>
              <TableContainer component={Paper}>
                <Table
                  className={classes.table}
                  size="small"
                  aria-label="a dense table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>Cédula</TableCell>
                      <TableCell align="right">Reserva</TableCell>
                      <TableCell align="right">Cliente</TableCell>
                      <TableCell align="right">Proyecto</TableCell>
                      <TableCell align="right">Email</TableCell>

                      <TableCell align="right">Valor pendiente de pago</TableCell>

                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow key={row.cedula_cliente}>
                        <TableCell component="th" scope="row">
                          {row.cedula_cliente}
                        </TableCell>
                        <TableCell align="right">
                          {row.reserva}
                        </TableCell>
                        <TableCell align="right">
                          {row.nombres_cliente}
                        </TableCell>
                        <TableCell align="right">
                          {row.proyecto}
                        </TableCell>
                        <TableCell align="right">
                          {row.correo}
                        </TableCell>
                        <TableCell align="right">
                          {row.valor}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Box mt={2}>
              <Grid item xs={12} md={12}>
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="excelFile"
                  accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                  type="file"
                  onChange={(e) => setExcelFile(e.target.files[0])}
                />
                <label htmlFor="excelFile">
                  <Button
                    variant="contained"
                    color="secondary"
                    component="span"
                  >
                    Elegir archivo en formato (.xlsx) {excelFile!=null?"("+excelFile.name+")":""}
                  </Button>
                </label>
              </Grid>
            </Box>
          </Grid>
        </Box>
      </Dialog>
    </div>
  );
}
