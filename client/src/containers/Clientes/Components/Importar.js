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
import { importar } from "../../../utils/API/clientes";
import Initializer from "../../../store/Initializer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
function createData(
  cedula_cliente,
  nombres_cliente,
  apellidos_cliente,
  correo_cliente,
  nacimiento_cliente,
  celular_cliente,
  telefono_cliente,
  direccion_cliente,
  zona_cliente,
  canton_cliente,
  civil_cliente,
  recomendación_cliente,
  ingresos_cliente,
  conyuge_cedula,
  conyuge_nombres,
  conyuge_apellidos,
  conyuge_nacimiento,
  conyuge_correo,
  conyuge_celular,
  conyuge_telefono
) {
  return {
    cedula_cliente,
    nombres_cliente,
    apellidos_cliente,
    correo_cliente,
    nacimiento_cliente,
    celular_cliente,
    telefono_cliente,
    direccion_cliente,
    zona_cliente,
    canton_cliente,
    civil_cliente,
    recomendación_cliente,
    ingresos_cliente,
    conyuge_cedula,
    conyuge_nombres,
    conyuge_apellidos,
    conyuge_nacimiento,
    conyuge_correo,
    conyuge_celular,
    conyuge_telefono,
  };
}

const rows = [
  createData(
    "xxxxxxxx",
    "Nombre Ejemplo",
    "Apellido Ejemplo",
    "ejp@gmail.com",
    "1995-12-19",
    "xxxxxx",
    "xxxxxxx",
    "Ejemplo",
    "Norte",
    1,
    "Casado",
    1,
    700,
    "xxxxx",
    "Ejemplo nombres",
    "Ejemplo apellidos",
    "1995-12-19",
    "eje@gmail.com",
    "xxxxxx",
    "xxxxx"
  ),
  createData(
    "xxxxxxxx",
    "Nombre Ejemplo",
    "Apellido Ejemplo",
    "ejp@gmail.com",
    "1995-12-19",
    "xxxxxx",
    "xxxxxxx",
    "Ejemplo",
    "Norte",
    1,
    "Casado",
    1,
    700,
    "xxxxx",
    "Ejemplo nombres",
    "Ejemplo apellidos",
    "1995-12-19",
    "eje@gmail.com",
    "xxxxxx",
    "xxxxx"
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setExcelFile(null);

  };
  const importe=()=>{
    if (excelFile != null) {
        importar({ excelFile }, initializer);
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
                      <TableCell>cedula_cliente</TableCell>
                      <TableCell align="right">nombres_cliente</TableCell>
                      <TableCell align="right">apellidos_cliente</TableCell>
                      <TableCell align="right">correo_cliente</TableCell>
                      <TableCell align="right">nacimiento_cliente</TableCell>

                      <TableCell align="right">celular_cliente</TableCell>

                      <TableCell align="right">telefono_cliente</TableCell>

                      <TableCell align="right">direccion_cliente</TableCell>

                      <TableCell align="right">zona_cliente</TableCell>

                      <TableCell align="right">canton_cliente</TableCell>
                      <TableCell align="right">civil_cliente</TableCell>
                      <TableCell align="right">recomendación_cliente</TableCell>
                      <TableCell align="right">ingresos_cliente</TableCell>
                      <TableCell align="right">conyuge_cedula</TableCell>
                      <TableCell align="right">conyuge_nombres</TableCell>
                      <TableCell align="right">conyuge_apellidos</TableCell>
                      <TableCell align="right">conyuge_nacimiento</TableCell>
                      <TableCell align="right">conyuge_correo</TableCell>
                      <TableCell align="right">conyuge_celular</TableCell>
                      <TableCell align="right">conyuge_telefono</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow key={row.cedula_cliente}>
                        <TableCell component="th" scope="row">
                          {row.cedula_cliente}
                        </TableCell>
                        <TableCell align="right">
                          {row.nombres_cliente}
                        </TableCell>
                        <TableCell align="right">
                          {row.apellidos_cliente}
                        </TableCell>
                        <TableCell align="right">
                          {row.correo_cliente}
                        </TableCell>
                        <TableCell align="right">
                          {row.nacimiento_cliente}
                        </TableCell>
                        <TableCell align="right">
                          {row.celular_cliente}
                        </TableCell>

                        <TableCell align="right">
                          {row.telefono_cliente}
                        </TableCell>
                        <TableCell align="right">
                          {row.direccion_cliente}
                        </TableCell>
                        <TableCell align="right">{row.zona_cliente}</TableCell>
                        <TableCell align="right">
                          {row.canton_cliente}
                        </TableCell>
                        <TableCell align="right">{row.civil_cliente}</TableCell>
                        <TableCell align="right">
                          {row.recomendación_cliente}
                        </TableCell>
                        <TableCell align="right">
                          {row.ingresos_cliente}
                        </TableCell>
                        <TableCell align="right">
                          {row.conyuge_cedula}
                        </TableCell>
                        <TableCell align="right">
                          {row.conyuge_nombres}
                        </TableCell>
                        <TableCell align="right">
                          {row.conyuge_apellidos}
                        </TableCell>
                        <TableCell align="right">
                          {row.conyuge_nacimiento}
                        </TableCell>
                        <TableCell align="right">
                          {row.conyuge_correo}
                        </TableCell>
                        <TableCell align="right">
                          {row.conyuge_celular}
                        </TableCell>
                        <TableCell align="right">
                          {row.conyuge_telefono}
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
