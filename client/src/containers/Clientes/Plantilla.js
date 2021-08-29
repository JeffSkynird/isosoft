import React, { useContext, useState } from "react";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import FileCopyIcon from '@material-ui/icons/FileCopy';
import DescriptionIcon from '@material-ui/icons/Description';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Box from "@material-ui/core/Box";
import Alert from '@material-ui/lab/Alert';
import VisibilityIcon from '@material-ui/icons/Visibility';
import PeopleIcon from '@material-ui/icons/People';
import Skeleton from '@material-ui/lab/Skeleton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ClearIcon from '@material-ui/icons/Clear';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import FormatListNumberedOutlinedIcon from '@material-ui/icons/FormatListNumberedOutlined';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormControl from "@material-ui/core/FormControl";
import VerArchivos from "../Precalificador/VerArchivos";
import Paper from "@material-ui/core/Paper";
import Switch from "@material-ui/core/Switch";
import FormHelperText from "@material-ui/core/FormHelperText";
import GetAppIcon from "@material-ui/icons/GetApp";
import { obtenerPermiso } from "../../utils/API/managers.js";
import Tooltip from "@material-ui/core/Tooltip";
import PublishOutlinedIcon from '@material-ui/icons/PublishOutlined';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import es from 'date-fns/locale/es'
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import PersonPinIcon from '@material-ui/icons/PersonPin';
import PublishIcon from '@material-ui/icons/Publish';
import Backdrop from '@material-ui/core/Backdrop';
import Menu from '@material-ui/core/Menu';
import VerCotizacion from './Components/VerCotizacion'
import CrearCotizacion from './Components/CrearCotizacion'
import InfoIcon from "@material-ui/icons/Info";
import {
  obtenerClientePrecalificador,
  cotizar,
  precalificar,
  tieneArchivos,
  obtenerCotizacion,
  upload,
  uploadConyuge,
} from "../../utils/API/clientes.js";
import EmailIcon from '@material-ui/icons/Email';
import HomeWorkIcon from '@material-ui/icons/HomeWork';

import InputLabel from "@material-ui/core/InputLabel";
import Initializer from "../../store/Initializer";
import Card from "@material-ui/core/Card";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import Chip from "@material-ui/core/Chip";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from '@material-ui/core/IconButton';
import { obtenerEstadoCivil } from "../../utils/API/civil";

import {
  obtenerOpciones, obtenerParametrosSgi,
  registrarOpciones,
  actualizarCalificacionArchivo,
  obtenerDetalleArchivosS,
  downloadFiles,
  editarClienteS,
} from "../../utils/API/precalificator";
import InputAdornment from "@material-ui/core/InputAdornment";
import AddCircleOutline from "@material-ui/icons/AddCircleOutline";
import { obtenerTodos } from "../../utils/API/ciudades";
import { obtenerTodosProvincia } from "../../utils/API/provinces";
import DateFnsUtils from "@date-io/date-fns"; // choose your lib

import DetallePlantilla from "./Components/DetallePlantilla";
import DetalleBuro from "./Components/DetalleBuro";
import DetalleAhorro from "./Components/DetalleAhorro";


import FilesUploaded from "./Components/FilesUploaded";
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import {
  DatePicker,
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { obtenerRecomendaciones } from "../../utils/API/recomendaciones";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import { convertirDate, dateFormatA } from "../../utils/Date";
import Tab from "@material-ui/core/Tab";
import Divider from "@material-ui/core/Divider";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { withStyles } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import { RefreshOutlined } from "@material-ui/icons";
import { makeStyles } from '@material-ui/core/styles';
import PersonIcon from '@material-ui/icons/Person';
import './table.css'
import { obtenerDocumentosFormulario, obtenerDocumentosProyecto } from "../../utils/API/sgi";
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
const Accordion = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);
const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));
export default function Plantilla(props) {
  const theme = useTheme();

  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const initializer = useContext(Initializer);
  const dato = props.location.state;
  const [documents, setDocuments] = useState([])
  const [documentsS, setDocumentsS] = useState([])

  const [filesSelected, setFilesSelected] = useState([])
  const [filesSelectedS, setFilesSelectedS] = useState([])


  const [value, setValue] = React.useState(2);
  const [value2, setValue2] = React.useState(0);
  const [data, setData] = React.useState(null);
  const [permiso, setPermiso] = React.useState([]);
  const [cedula, setCedula] = React.useState("");

  const [nombres, setNombres] = React.useState("");
  const [apellidos, setApellidos] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [celular, setCelular] = React.useState("");
  const [telefono, setTelefono] = React.useState("");
  const [direccion, setDireccion] = React.useState("");
  const [domicilio, setDomicilio] = React.useState("");
  const [villa, setVilla] = React.useState("");
  const [manzana, setManzana] = React.useState("");
  const [ciudadela, setCiudadela] = React.useState("");
  const [sector, setSector] = React.useState("");

  const [uafeObservation, setUafeObservation] = React.useState("");
  const [riesgoObservation, setRiesgoObservation] = React.useState("");

  const [civilData, setCivilData] = useState([]);

  const [income, setIncome] = React.useState(0);
  const [otherIncome, setOtherIncome] = React.useState(0);
  const [rentExpenses, setRentExpenses] = React.useState(0);
  const [foodExpenses, setFoodExpenses] = React.useState(0);
  const [clothingExpenses, setClothingExpenses] = React.useState(0);
  const [basicExpenses, setBasicExpenses] = React.useState(0);
  const [educationExpenses, setEducationExpenses] = React.useState(0);
  const [otherExpenses, setOtherExpenses] = React.useState(0);
  const classes = useStyles();
  const [position, setPosition] = React.useState("");

  const [colorA, setColorA] = React.useState("transparent");
  const [colorP, setColorP] = React.useState("transparent");
  const [colorR, setColorR] = React.useState("transparent");
  const [colorN, setColorN] = React.useState("transparent");
  const [opciones, setOpciones] = React.useState([]);
  const [parametros, setParametros] = React.useState([]);

  const [rangoM, setRangoM] = React.useState("");
  const [rango1, setRango1] = React.useState("");
  const [rangoMin, setRangoMin] = React.useState("");

  const [rangoBuroM, setRangoBuroM] = React.useState("");
  const [rangoBuro, setRangoBuro] = React.useState("");
  const [rangoMinBuro, setRangoMinBuro] = React.useState("");

  const [rangoAhorroM, setRangoAhorroM] = React.useState("");

  const [rangoAhorro, setRangoAhorro] = React.useState("");
  const [rangoMinAhorro, setRangoMinAhorro] = React.useState("");

  const [precalificationRango, setPrecalificationRango] = useState(0);

  const [nacimiento, setNacimiento] = useState(new Date());
  const [referencia, setReferencia] = React.useState("");
  const [ciudadData, setCiudadData] = useState({ data: [], backup: [] });
  const [ciudad, setCiudad] = useState("");
  const [recomendationData, setRecomendationData] = useState([]);
  const [recomendation, setRecomendation] = useState("");

  const [ivaMensual, setIvaMensual] = React.useState(false);
  const [ivaMensualO, setIvaMensualO] = React.useState(false);
  const [ivaMensualOS, setIvaMensualOS] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);


  const [ivaMensualS, setIvaMensualS] = React.useState(false);

  const [cedulaR, setCedulaR] = useState("");

  const [nombreR, setNombreR] = useState("");
  const [proyectoR, setProyectoR] = useState("");
  const [civil, setCivil] = useState("77");

  const [cedulaS, setCedulaS] = useState("");
  const [nombresS, setNombresS] = useState();
  const [apellidosS, setApellidosS] = useState();
  const [nacimientoS, setNacimientoS] = useState("");
  const [celularS, setCelularS] = useState("");
  const [telefonoS, setTelefonoS] = useState("");
  const [emailS, setEmailS] = useState("");
  const [incomeS, setIncomeS] = React.useState(0);
  const [otherIncomeS, setOtherIncomeS] = React.useState(0);
  const [rentExpensesS, setRentExpensesS] = React.useState(0);
  const [foodExpensesS, setFoodExpensesS] = React.useState(0);
  const [clothingExpensesS, setClothingExpensesS] = React.useState(0);
  const [basicExpensesS, setBasicExpensesS] = React.useState(0);
  const [educationExpensesS, setEducationExpensesS] = React.useState(0);
  const [transporteExpenses, setTransporteExpenses] = React.useState(0);
  const [transporteExpensesS, setTransporteExpensesS] = React.useState(0);



  const [dniFile, setDniFile] = useState(null);
  const [rolesFle, setRolesFile] = useState(null);
  const [rolesFle2, setRolesFile2] = useState(null);
  const [rolesFle3, setRolesFile3] = useState(null);
  const [precaFile, setPrecaFile] = useState(null);
  const [mecanizado, setMecanizado] = useState(null);
  const [mecanizadoS, setMecanizadoS] = useState(null);

  const [rucFiles, setRucFiles] = useState(null);
  const [ivaDeclarationFile, setIvaDeclarationFile] = useState(null);
  const [ivaDeclarationFile2, setIvaDeclarationFile2] = useState(null);
  const [ivaDeclarationFile3, setIvaDeclarationFile3] = useState(null);
  const [ivaDeclarationFile4, setIvaDeclarationFile4] = useState(null);
  const [ivaDeclarationFile5, setIvaDeclarationFile5] = useState(null);
  const [ivaDeclarationFile6, setIvaDeclarationFile6] = useState(null);
  const [precalificationFile, setPrecalificationFile] = useState(null);
  const [accounMovFile, setAccountMovFile] = useState(null);
  const [accounMovFile2, setAccountMovFile2] = useState(null);
  const [accounMovFile3, setAccountMovFile3] = useState(null);
  const [rentaDeclarationFile, setRentaDeclarationFile] = useState(null);
  const [dependencia, setDependencia] = useState(true);
  //OTHER FILES
  const [rucFilesO, setRucFilesO] = useState(null);
  const [ivaDeclarationFileO, setIvaDeclarationFileO] = useState(null);
  const [ivaDeclarationFile2O, setIvaDeclarationFile2O] = useState(null);
  const [ivaDeclarationFile3O, setIvaDeclarationFile3O] = useState(null);
  const [ivaDeclarationFile4O, setIvaDeclarationFile4O] = useState(null);
  const [ivaDeclarationFile5O, setIvaDeclarationFile5O] = useState(null);
  const [ivaDeclarationFile6O, setIvaDeclarationFile6O] = useState(null);

  const [rentaDeclarationFileO, setRentaDeclarationFileO] = useState(null);
  const [accounMovFileO, setAccountMovFileO] = useState(null);
  const [accounMovFile2O, setAccountMovFile2O] = useState(null);
  const [accounMovFile3O, setAccountMovFile3O] = useState(null);

  const [dniFileS, setDniFileS] = useState(null);
  const [rolesFleS, setRolesFileS] = useState(null);
  const [rolesFle2S, setRolesFile2S] = useState(null);

  const [rolesFle3S, setRolesFile3S] = useState(null);

  const [accounMovFileS, setAccountMovFileS] = useState(null);

  const [accounMovFile2S, setAccountMovFile2S] = useState(null);
  const [accounMovFile3S, setAccountMovFile3S] = useState(null);

  const [precaFileS, setPrecaFileS] = useState(null);
  const [rucFilesS, setRucFilesS] = useState(null);
  const [ivaDeclarationFileS, setIvaDeclarationFileS] = useState(null);
  const [rentaDeclarationFileS, setRentaDeclarationFileS] = useState(null);
  const [ivaDeclarationFile2S, setIvaDeclarationFile2S] = useState(null);
  const [ivaDeclarationFile3S, setIvaDeclarationFile3S] = useState(null);
  const [ivaDeclarationFile4S, setIvaDeclarationFile4S] = useState(null);
  const [ivaDeclarationFile5S, setIvaDeclarationFile5S] = useState(null);
  const [ivaDeclarationFile6S, setIvaDeclarationFile6S] = useState(null);
  //OTHER FILES
  const [rucFilesOS, setRucFilesOS] = useState(null);
  const [ivaDeclarationFileOS, setIvaDeclarationFileOS] = useState(null);
  const [ivaDeclarationFile2OS, setIvaDeclarationFile2OS] = useState(null);
  const [ivaDeclarationFile3OS, setIvaDeclarationFile3OS] = useState(null);
  const [ivaDeclarationFile4OS, setIvaDeclarationFile4OS] = useState(null);
  const [ivaDeclarationFile5OS, setIvaDeclarationFile5OS] = useState(null);
  const [ivaDeclarationFile6OS, setIvaDeclarationFile6OS] = useState(null);
  const [rentaDeclarationFileOS, setRentaDeclarationFileOS] = useState(null);
  const [accounMovFileOS, setAccountMovFileOS] = useState(null);
  const [accounMovFile2OS, setAccountMovFile2OS] = useState(null);
  const [accounMovFile3OS, setAccountMovFile3OS] = useState(null);

  const [dependenciaS, setDependenciaS] = useState(true);
  const [obligation, setObligation] = useState("");
  const [uafe, setUafe] = useState("");
  const [risk, setRisk] = useState("");

  const [roleData, setRoleData] = useState(0);
  const [roleDataS, setRoleDataS] = useState(null);
  const [incomeTS, setIncomeTS] = useState(null);


  const [buro, setBuro] = useState(0);
  const [buroS, setBuroS] = useState(null);

  const [precalification, setPrecalification] = useState(0);

  const [provinciaData, setProvinciaData] = useState({ data: [], backup: [] });
  const [provincia, setProvincia] = useState("");
  const [openDetalle, setOpenDetalle] = useState(false);
  const [openDetalleBuro, setOpenDetalleBuro] = useState(false);

  const [openDetalleAhorro, setOpenDetalleAhorro] = useState(false);
  const [files, setFiles] = useState([]);
  const [openFilesUploaded, setOpenFilesUploaded] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [link2, setLink2] = useState("");
  const [validation, setValidation] = useState({
    dni: 1,
    names: 1,
    last_names: 1,
    cellphone: 1,
    landline: 1,
    email: 1,
    civil: 1,
    recomendation_id: 1,
    spouse_dni: 1,
    spouse_names: 1,
    spouse_email: 1,
    spouse_last_names: 1,
  });
  const [hasValidation, setHasValidation] = useState(false);
  const handleChangeExpand = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const [reward, setReward] = useState("");
  const [direction, setDirection] = React.useState('up');
  const [openSpeed, setOpenSpeed] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);

  const [estadoP, setEstadoP] = React.useState('');

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  React.useEffect(() => {
    if (link2 != "") {

      let popupWindow = window.open("http://" + link2, 'name', 'width=800,height=800');
      // let popupWindow = window.open('http://www.facebook.com/sharer.php?s=100&p[title]=Fb Share&p[summary]=Facebook share popup&p[url]=javascript:fbShare("http://jsfiddle.net/stichoza/EYxTJ/")&p[images][0]="http://goo.gl/dS52U"', 'sharer', 'toolbar=0,status=0,width=548,height=325');
      if (popupWindow && !popupWindow.closed) {
        popupWindow.focus();
      }
      setLink2("")
    }
  }, [link2])
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  }
  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const handleDirectionChange = (event) => {
    setDirection(event.target.value);
  };

  const handleHiddenChange = (event) => {
    setHidden(event);
  };

  const handleCloseSpeed = () => {
    setOpenSpeed(false);
  };

  const handleOpenSpeed = () => {
    setOpenSpeed(true);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue == 1) {
      handleHiddenChange(true)
      handleCloseSpeed()
    } else {
      handleHiddenChange(false)
    }
  };
  const getId = (nombre) => {
    let datos = [
      {
        id: 1,
        name: "SOLTERO",
      },
      {
        id: 2,
        name: "CASADO",
      },
      {
        id: 3,
        name: "UNION LIBRE",
      },
      {
        id: 4,
        name: "DIVORCIADO",
      },
      {
        id: 5,
        name: "VIUDO",
      },
      {
        id: 6,
        name: "CASADO - SEPARACIÓN DE BIENES",
      },
    ];
    let id_civil = "";
    datos.map((e) => {
      if (nombre == e.name) {
        id_civil = e.id;
      }
    });
    return id_civil;
  };
  const getName = (id) => {
    let datos = [
      {
        id: 1,
        name: "SOLTERO",
      },
      {
        id: 2,
        name: "CASADO",
      },
      {
        id: 3,
        name: "UNION LIBRE",
      },
      {
        id: 4,
        name: "DIVORCIADO",
      },
      {
        id: 5,
        name: "VIUDO",
      },
      {
        id: 6,
        name: "CASADO - SEPARACIÓN DE BIENES",
      },
    ];
    let id_civil = "";
    datos.map((e) => {
      if (id == e.id) {
        id_civil = e.name;
      }
    });
    return id_civil;
  };
  React.useEffect(() => {
    obtenerTodosProvincia(setProvinciaData, initializer);
    obtenerEstadoCivil(setCivilData)
  }, []);
  const actualizar = () => {
    obtenerTodosProvincia(setProvinciaData, initializer);
    obtenerTodos(setCiudadData);
    obtenerRecomendaciones(setRecomendationData);
    if (initializer.usuario != null) {
      obtenerPermiso(setPermiso, initializer);
      if (dato != null) {
        obtenerClientePrecalificador(dato.id, setData, initializer);
        obtenerOpciones(setOpciones, initializer);
        obtenerParametrosSgi(setParametros);

      }
    }
  }
  const changeProvince = (id) => {
    let data = [];
    ciudadData.backup.slice().map((e) => {
      if (e.province_id == id) {
        data.push({ ...e });
      }
    });

    setCiudadData({ ...ciudadData, data: data });
    setProvincia(id);
  };
  const precalificarCliente = () => {
    precalificar({ dni: cedula }, initializer, recargar);
  };

  React.useEffect(() => {
    if (data != null) {
      obtenerDocumentosFormulario({ tipo_iva: data.client.iva_mensual == 0 ? 'S' : 'M', id_labor: data.client.dependencia == 1 ? 1 : 2, id_estado_civil: data.client.id_estado_civil }, setDocuments)


      tieneArchivos(data.client.id, setFiles)
      setCedula(data.client.cedula);
      setPosition(data.client.color);
      setNombres(data.client.nombres);
      setApellidos(data.client.apellidos);
      setEmail(data.email);
      setCelular(data.client.celular);
      setTelefono(data.client.telefono);
      setDireccion(data.client.direccion);
      setVilla(data.client.numero_villa);
      setManzana(data.client.calle);
      setCiudadela(data.client.referencia_direccion);

      setNacimiento(convertirDate(data.client.fecha_nacimiento.replaceAll("-", "/")));
      setReward(data.client.regalo);
      setCiudad(data.client.id_ciudad);
      setRecomendation(data.client.medio_id);

      setUafe(data.client.estado_uafe);
      setRisk(data.client.estado_riesgo);
      setEstadoP(data.client.estado_compra);

      setUafeObservation(data.client.observacion_uafe);
      setRiesgoObservation(data.client.observacion_riesgo);
      setProvincia(data.province);
      setCivil(data.client.id_estado_civil);
      setIncome(data.client.sueldo);
      setOtherExpenses(data.client.otros_egresos);

      setOtherIncome(data.client.otros_ingresos);
      setRentExpenses(data.client.egreso_renta);
      setFoodExpenses(data.client.egreso_comida);
      setClothingExpenses(data.client.egreso_ropa);
      setBasicExpenses(data.client.egreso_servicios_basicos);
      setEducationExpenses(data.client.egreso_educacion);
      setTransporteExpenses(data.client.egreso_transporte);
      setCedulaR(data.client.cedula_referido);
      setNombreR(data.client.nombres_referido);
      setProyectoR(data.client.id_proyecto_referido);
      setDependencia(data.client.dependencia == 0 ? false : true);
      setRoleData(data.role != null ? data.role : 0);
      setIncomeTS(data.roleS != null ? data.roleS : 0);

      setIvaMensual(data.client.iva_mensual != null ? (data.client.iva_mensual == 1 ? true : false) : false);


      setBuroS(data.buro_spouse)
      setBuro(data.buro != null ? data.buro : 0);
      setPrecalification(
        data.precalification != null ? data.precalification : 0
      );
      setObligation(data.obligation != null ? data.obligation : 0);

      if (data.spouse != null) {
        setEmailS(data.spouse.correo);
        setCedulaS(data.spouse.cedula);
        setNombresS(data.spouse.nombres);
        setApellidosS(data.spouse.apellidos);
        setDependenciaS(data.spouse.dependencia == 1 ? true : false);
        setCelularS(data.spouse.celular);
        setTelefonoS(data.spouse.telefono);
        setIvaMensualS(data.spouse.iva_mensual != null ? (data.spouse.iva_mensual == 1 ? true : false) : false);
        obtenerDetalleArchivosS(data.spouse.id, setRoleDataS, initializer);
        setIncomeS(data.spouse.sueldo);
        setOtherIncomeS(data.spouse.otros_ingresos);
        setRentExpensesS(data.spouse.egreso_renta);
        setFoodExpensesS(data.spouse.egreso_comida);
        setClothingExpensesS(data.spouse.egreso_ropa);
        setBasicExpensesS(data.spouse.egreso_servicios_basicos);
        setEducationExpensesS(data.spouse.egreso_educacion);
        setTransporteExpensesS(data.spouse.egreso_transporte);

        obtenerDocumentosFormulario({ tipo_iva: data.spouse.iva_mensual == 0 ? 'S' : 'M', id_labor: data.spouse.dependencia == 1 ? 1 : 2, id_estado_civil: data.client.id_estado_civil }, setDocumentsS)
      }
    }
  }, [data]);
  React.useEffect(() => {
    if (opciones.length != 0) {
      setColorA(opciones[0].color.split(",")[1]);
      setColorP(opciones[0].color.split(",")[0]);
      setColorR(opciones[0].color.split(",")[2]);
      setColorN(opciones[0].color.split(",")[3]);

      /* setRangoM(opciones[0].income_range.split(",")[0]);
       setRango1(opciones[0].income_range.split(",")[1]);
       setRangoMin(opciones[0].income_range.split(",")[2]);*/

      /*setRangoBuroM(opciones[0].buro_range.split(",")[0]);
      setRangoBuro(opciones[0].buro_range.split(",")[1]);
      setRangoMinBuro(opciones[0].buro_range.split(",")[2]);

      setRangoAhorroM(opciones[0].savings_range.split(",")[0]);
      setRangoAhorro(opciones[0].savings_range.split(",")[1]);
      setRangoMinAhorro(opciones[0].savings_range.split(",")[2]);

      setPrecalificationRango(opciones[0].precalification_range);*/
    }
  }, [opciones]);

  React.useEffect(() => {
    if (parametros.length != 0) {

      setRangoM(parametros.sueldo.hasta);
      setRango1(parametros.sueldo.hasta + "-" + parametros.sueldo.desde);
      setRangoMin(parametros.sueldo.desde);

      setRangoBuroM(parametros.score.hasta);
      setRangoBuro(parametros.score.hasta + "-" + parametros.score.desde);
      setRangoMinBuro(parametros.score.desde);

      setRangoAhorroM(parametros.ahorro.hasta);
      setRangoAhorro(parametros.ahorro.hasta + "-" + parametros.ahorro.desde);
      setRangoMinAhorro(parametros.ahorro.desde);

      setPrecalificationRango(parametros.precalificacion.hasta);
    }
  }, [parametros]);

  const recargar = () => {
    obtenerTodos(setCiudadData);
    obtenerRecomendaciones(setRecomendationData);

    obtenerPermiso(setPermiso, initializer);

    obtenerClientePrecalificador(dato.id, setData, initializer);
    obtenerOpciones(setOpciones, initializer);
    obtenerParametrosSgi(setParametros);
  };
  React.useEffect(() => {
    obtenerTodos(setCiudadData);
    obtenerRecomendaciones(setRecomendationData);
    if (initializer.usuario != null) {
      obtenerPermiso(setPermiso, initializer);
      if (dato != null) {
        obtenerClientePrecalificador(dato.id, setData, initializer);
        obtenerOpciones(setOpciones, initializer);
        obtenerParametrosSgi(setParametros);
      }
    }
  }, [initializer.usuario]);
  if (props.location.state == null) {
    props.history.push("/clientes");
    return null;
  }
  let ingresosTotales = 0;
  let ingresosTotalesDoc = 0;
  let egresosTotales = 0;
  let ahorroNeto = 0;
  let ahorroNetoDoc = 0;
  let montoMaximo = 0;
  let montoMaximoDoc = 0;
  let cuotaHipotecaria = 0;

  let cuotaHipotecariaDoc = 0;

  let ingresosTotalesS = 0;
  let egresosTotalesS = 0;
  let ahorroNetoS = 0;
  let montoMaximoS = 0;
  let cuotaHipotecariaS = 0;

  let ingresosTotalF = 0;
  let egresosTotalF = 0;
  let ahorroNetoTotalF = 0;
  let montoMaximoTotalF = 0;
  let cuotaHipotecariaTotalF = 0;
  let ingresosFinales = 0;
  if (data != null) {
    //NUEVO
    //ingresosTotales = Number(income) + Number(otherIncome) * 0.4;
    ingresosTotales = Number(income) + Number(otherIncome);
    let newOtherIncome = ingresosTotales * 0.4;
    if (otherIncome != 0 && otherIncome != null) {
      if (newOtherIncome <= Number(otherIncome)) {
        ingresosTotales = Number(income) + newOtherIncome;
      }
    }
    ingresosTotalesDoc = Number(roleData);
    ingresosFinales = ingresosTotalesDoc;
    if (roleDataS != null) {
      ingresosFinales =

        ingresosTotalesDoc;
    }

    egresosTotales =
      Number(rentExpenses) +
      Number(foodExpenses) +
      Number(clothingExpenses) +
      Number(basicExpenses) +
      Number(educationExpenses) +
      Number(transporteExpenses) + Number(obligation) + Number(otherExpenses);
    ahorroNeto = ingresosTotales - egresosTotales;

    ahorroNetoDoc = ingresosTotalesDoc - egresosTotales;
    //montoMaximo = ahorroNeto / (0.579321233492573 / 100);
    montoMaximo = (ahorroNeto / 0.579321233492573) * 100;
    montoMaximoDoc = (ahorroNetoDoc / 0.579321233492573) * 100;
    cuotaHipotecaria = (ahorroNeto / ingresosTotales) * 100;
    cuotaHipotecariaDoc = (ahorroNetoDoc / ingresosTotalesDoc) * 100;

    if (data.spouse != null) {
      ingresosTotalesS = Number(incomeS) + Number(otherIncomeS);
      let newOtherIncomeS = ingresosTotalesS * 0.4;
      if (otherIncomeS != 0 && otherIncomeS != null) {
        if (newOtherIncomeS <= Number(otherIncomeS)) {
          ingresosTotalesS = Number(incomeS) + newOtherIncomeS;
        }
      }

      ingresosTotales = ingresosTotales + ingresosTotalesS;
      ahorroNeto = ingresosTotales - egresosTotales;
      montoMaximo = (ahorroNeto / 0.579321233492573) * 100;

      cuotaHipotecaria = (ahorroNeto / ingresosTotales) * 100;

      ahorroNetoS = ingresosTotalesS - egresosTotalesS;
      montoMaximoS = ahorroNetoS / (0.579321233492573 / 100);
      cuotaHipotecariaS = (ahorroNetoS / ingresosTotalesS) * 100;

      ingresosTotalF = ingresosTotales + ingresosTotalesS;
      egresosTotalF = egresosTotales + egresosTotalesS;
      ahorroNetoTotalF = ahorroNeto + ahorroNetoS;
      montoMaximoTotalF = montoMaximo + montoMaximoS;
      cuotaHipotecariaTotalF = cuotaHipotecaria + cuotaHipotecariaS;
    }
  }
  const calcularIngresos = (ingresos) => {
    let valor = "Sin valor";
    if (Number(ingresos) >= Number(rangoM)) {
      valor = "Aprobado";
    } else if (
      Number(ingresos) >= Number(rango1.split("-")[1]) &&
      Number(ingresos) <= Number(rango1.split("-")[0])
    ) {
      valor = "En revision";
    } else if (Number(ingresos) <= Number(rangoMin)) {
      valor = "Negado";
    }
    return valor;
  };
  const calcularScore = (puntos, puntosS) => {
    if (puntosS != null) {
      let val1 = evaluarBuro(puntos)
      let val2 = evaluarBuro(puntosS)
      if (val1 == "Aprobado" && val2 == "Aprobado") {
        return 'Aprobado'
      } else if (val1 == "Aprobado" && val2 == "Negado") {
        return "En revision"
      } else if (val1 == "Aprobado" && val2 == "En revision") {
        return "En revision"
      } else if (val1 == "En revision" && val2 == "Aprobado") {
        return "En revision"
      } else if (val1 == "En revision" && val2 == "En revision") {
        return "En revision"
      } else if (val1 == "En revision" && val2 == "Negado") {
        return "En revision"
      } else if (val1 == "Negado" && val2 == "Aprobado") {
        return "En revision"
      } else if (val1 == "Negado" && val2 == "En revision") {
        return "En revision"
      } else if (val1 == "Negado" && val2 == "Negado") {
        return "Negado"
      }
    } else {
      let valor = "Sin valor";
      if (Number(puntos) >= Number(rangoBuroM)) {
        valor = "Aprobado";
      } else if (
        Number(puntos) >= Number(rangoBuro.split("-")[1]) &&
        Number(puntos) <= Number(rangoBuro.split("-")[0])
      ) {
        valor = "En revision";
      } else if (Number(puntos) <= Number(rangoMinBuro)) {
        valor = "Negado";
      }
      return valor;
    }

  };
  const evaluarBuro = (puntos) => {
    let valor = "Sin valor";
    if (Number(puntos) >= Number(rangoBuroM)) {
      valor = "Aprobado";
    } else if (
      Number(puntos) >= Number(rangoBuro.split("-")[1]) &&
      Number(puntos) <= Number(rangoBuro.split("-")[0])
    ) {
      valor = "En revision";
    } else if (Number(puntos) <= Number(rangoMinBuro)) {
      valor = "Negado";
    }
    return valor;
  }

  const calcularPrecalification = (puntos) => {
    let valor = "Sin valor";
    if (Number(puntos) >= Number(precalificationRango)) {
      valor = "Aprobado";
    } else {
      valor = "Negado";
    }
    return valor;
  };
  const calcularAhorro = (ahorro) => {
    let valor = "Sin valor";
    if (Number(ahorro) >= Number(rangoAhorroM)) {
      valor = "Aprobado";
    } else if (
      Number(ahorro) >= Number(rangoAhorro.split("-")[1]) &&
      Number(ahorro) <= Number(rangoAhorro.split("-")[0])
    ) {
      valor = "En revision";
    } else if (Number(ahorro) <= Number(rangoMinAhorro)) {
      valor = "Negado";
    }
    return valor;
  };
  const obtenerColor = (valor) => {
    if (valor == "Aprobado") {
      return colorA;
    } else if (valor == "En revision") {
      return colorR;
    } else if (valor == "Negado") {
      return colorN;
    } else {
      return colorN;
    }
  };
  const subirArchivos = () => {
    upload(
      {
        monthly_iva: ivaMensual == true ? 1 : 0,
        monthly_ivaO: ivaMensualO == true ? 1 : 0,
        dependencia: dependencia ? 0 : 1,
        dni: cedula,
        dni_file: retornoDocumentosPorId(1,"cli"),
        roles_file: rolesFle,
        roles_file2: rolesFle2,
        roles_file3: rolesFle3,
        preca_file: retornoDocumentosPorId(3,"cli"),
        mecanizado: retornoDocumentosPorId(2,"cli"),

        precalification_file: retornoDocumentosPorId(4,"cli"),
        ruc_filesi:  retornoDocumentosPorId(9,"cli"),
        decla_filesi:ivaMensual==true?retornoDocumentosPorId(50,"cli"):retornoDocumentosPorId(6,"cli"),


        decla_filesi2: retornoDocumentosPorId(51,"cli"),
        decla_filesi3: retornoDocumentosPorId(52,"cli"),
        decla_filesi4: retornoDocumentosPorId(53,"cli"),
        decla_filesi5: retornoDocumentosPorId(54,"cli"),
        decla_filesi6: retornoDocumentosPorId(55,"cli"),


        renta_filesi:retornoDocumentosPorId(7,"cli"),
        mov_filesi: retornoDocumentosPorId(80,"cli"),
        mov_filesi2: retornoDocumentosPorId(81,"cli"),
        mov_filesi3: retornoDocumentosPorId(82,"cli"),
        other_files:retornoOtrosArchivos('cli'),
        ruc_filesiO: rucFilesO != null ? rucFilesO : null,
        decla_filesiO: ivaDeclarationFileO != null ? ivaDeclarationFileO : null,
        decla_filesi2O: ivaDeclarationFile2O != null ? ivaDeclarationFile2O : null,
        decla_filesi3O: ivaDeclarationFile3O != null ? ivaDeclarationFile3O : null,
        decla_filesi4O: ivaDeclarationFile4O != null ? ivaDeclarationFile4O : null,
        decla_filesi5O: ivaDeclarationFile5O != null ? ivaDeclarationFile5O : null,
        decla_filesi6O: ivaDeclarationFile6O != null ? ivaDeclarationFile6O : null,
        renta_filesiO:
          rentaDeclarationFileO != null ? rentaDeclarationFileO : null,
        mov_filesiO1: accounMovFileO != null ? accounMovFileO : null,
        mov_filesiO2: accounMovFile2O != null ? accounMovFile2O : null,
        mov_filesiO3: accounMovFile3O != null ? accounMovFile3O : null,
      },
      initializer
    );
  };

  const subirConyuge = () => {
    if (civil == 2 || civil == 3 || civil == 6) {
      uploadConyuge(
        {
          dependencia: dependenciaS ? 0 : 1,
          monthly_iva: ivaMensualS == true ? 1 : 0,
          monthly_ivaO: ivaMensualOS == true ? 1 : 0,
          dni: cedulaS,
          dni_file: retornoDocumentosPorId(1,"con"),

          roles_file: rolesFleS,
          roles_file2: rolesFle2S,
          roles_file3: rolesFle3S,
          preca_file: retornoDocumentosPorId(3,"con"),
          mecanizado: retornoDocumentosPorId(2,"con"),
          ruc_filesi:  retornoDocumentosPorId(9,"con"),
          decla_filesi: ivaMensualS?retornoDocumentosPorId(50,"con"):retornoDocumentosPorId(6,"con"),

          decla_filesi2: retornoDocumentosPorId(51,"con"),
          decla_filesi3: retornoDocumentosPorId(52,"con"),
          decla_filesi4: retornoDocumentosPorId(53,"con"),
          decla_filesi5: retornoDocumentosPorId(54,"con"),
          decla_filesi6: retornoDocumentosPorId(55,"con"),

          renta_filesi:retornoDocumentosPorId(7,"con"),
          mov_filesi: retornoDocumentosPorId(80,"con"),
          mov_filesi2: retornoDocumentosPorId(81,"con"),
          mov_filesi3: retornoDocumentosPorId(82,"con"),
          other_files:retornoOtrosArchivos('con'),

          ruc_filesiO: rucFilesOS != null ? rucFilesOS : null,
          decla_filesiO: ivaDeclarationFileOS != null ? ivaDeclarationFileOS : null,
          decla_filesi2O: ivaDeclarationFile2OS != null ? ivaDeclarationFile2OS : null,
          decla_filesi3O: ivaDeclarationFile3OS != null ? ivaDeclarationFile3OS : null,
          decla_filesi4O: ivaDeclarationFile4OS != null ? ivaDeclarationFile4OS : null,
          decla_filesi5O: ivaDeclarationFile5OS != null ? ivaDeclarationFile5OS : null,
          decla_filesi6O: ivaDeclarationFile6OS != null ? ivaDeclarationFile6OS : null,
          renta_filesiO:
            rentaDeclarationFileOS != null ? rentaDeclarationFileOS : null,

          mov_filesiO1: accounMovFileOS != null ? accounMovFileOS : null,
          mov_filesiO2: accounMovFile2OS != null ? accounMovFile2OS : null,
          mov_filesiO3: accounMovFile3OS != null ? accounMovFile3OS : null,
        },
        initializer
      );
    }
  };
  const editar = () => {
    if (validarCedula(cedula)) {
      if (validacion()) {
        editarClienteS(
          {
            purchase_status: estadoP,
            uafe_observation: uafeObservation,
            risk_observation: riesgoObservation,
            monthly_iva: ivaMensual == true ? 1 : 0,
            monthly_ivaS: ivaMensualS == true ? 1 : 0,
            other_monthly_iva: ivaMensualO == true ? 1 : 0,
            other_monthly_ivaS: ivaMensualOS == true ? 1 : 0,
            client_id: data.client.id,
            dni: cedula,
            uafe: uafe,
            risk: risk,
            names: nombres,
            last_names: apellidos,
            cellphone: celular,
            reference: referencia,
            born_date: dateFormatA(nacimiento),
            city_id: ciudad,
            recomendation_id: recomendation,
            civil: civil,
            referred_dni: cedulaR,
            referred_names: nombreR,
            referred_proyect: proyectoR,
            obligation: obligation,
            landline: telefono,
            address: direccion,
            neighborhood: sector,
            block: manzana,
            town: villa,
            citadel: ciudadela,
            position: position,
            email: email,
            income: income,
            other_income: otherIncome,
            other_expenses: otherExpenses,
            rent_expenses: rentExpenses,
            food_expenses: foodExpenses,
            clothing_expenses: clothingExpenses,
            basic_expenses: basicExpenses,
            education_expenses: educationExpenses,
            transport_expenses: transporteExpenses,
            spouse_id: data.spouse != null ? data.spouse.id : "",
            spouse_dni: cedulaS,
            spouse_names: nombresS,
            spouse_last_names: apellidosS,
            spouse_born_date: nacimientoS,
            spouse_cellphone: celularS,
            spouse_email: emailS,

            month_income_spouse: incomeS,
            other_income_spouse: otherIncomeS,
            rent_expenses_spouse: rentExpensesS,
            food_expenses_spouse: foodExpensesS,
            clothing_expenses_spouse: clothingExpensesS,
            basic_expenses_spouse: basicExpensesS,
            education_expenses_spouse: educationExpensesS,
            transport_expenses_spouse: transporteExpensesS,
          },
          initializer,
          setValidation,
          setHasValidation,
          subirConyuge, atras
        );
        subirArchivos();
        actualizarBuro();

      }
    } else {
      initializer.mostrarNotificacion({
        type: "error",
        message: "Conyuge: Cédula inválida",
      });
    }
  };

  const cotizarCliente = () => {

    cotizar(
      {
        cedula_interesado: cedula
      },
      initializer, setLink2

    );

    handleCloseMenu()
  };
  const obtenerCotizacionCliente = (setLink) => {

    obtenerCotizacion(cedula,
      initializer, setLink

    );
    handleCloseMenu()

  };

  function validarCedula(cad1) {
    var cad = "";
    if (cad1 != null) {
      cad = cad1;
    }
    var total = 0;
    var longitud = cad.length;
    var longcheck = longitud - 1;

    if (cad !== "" && longitud === 10) {
      for (let i = 0; i < longcheck; i++) {
        if (i % 2 === 0) {
          var aux = cad.charAt(i) * 2;
          if (aux > 9) aux -= 9;
          total += aux;
        } else {
          total += parseInt(cad.charAt(i)); // parseInt o concatenará en lugar de sumar
        }
      }

      total = total % 10 ? 10 - (total % 10) : 0;

      if (cad.charAt(longitud - 1) == total) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  const ver = () => { };
  const descargar = () => {
    downloadFiles(
      { client_id: data.client.id, dni: data.client.cedula },
      initializer
    );
  };

  const tienePermiso = (tipo) => {
    let existe = false;
    permiso.slice().map((e2) => {
      if (tipo == e2) {
        existe = true;
      }
    });
    return existe;
  };

  const actualizarBuro = () => {
    if (data != null) {
      actualizarCalificacionArchivo(
        { client_id: data.client.id, buro: buro, obligation: obligation },
        initializer
      );
    }
  };
  const existeCedula = () => {
    let retorno = false
    if (files != null) {
      files.map((e) => {
        if (e == "cedula") {
          retorno = true
        }
      })
    }
    return retorno;

  };



  const validarEmail = (valor) => {
    if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(valor)) {
      return true;
    } else {
      return false;
    }
  }
  const validacion = () => {
    let pass = true
    let msg = ''
    if (!validarEmail(email)) {
      pass = false
      msg += '\n* Email inválido'
    }
    if (celular.length != 10) {
      pass = false
      msg += '\n* Longitud del celular'
    }
    if (telefono.length != 9) {
      pass = false
      msg += '\n* Longitud del convencional'
    }
    if (civil == 2 || civil == 3 || civil == 6) {
      if (!validarEmail(emailS)) {
        pass = false
        msg += '\n* Cónyuge: Email inválido'
      }
      if (celularS.length != 10) {
        pass = false
        msg += '\n* Cónyuge: Longitud del celular'
      }
      if (telefonoS.length != 9) {
        pass = false
        msg += '\n* Cónyuge: Longitud del convencional'
      }
    }
    if (pass == false) {
      initializer.mostrarNotificacion({ type: "error", message: msg });

    }
    return pass
  }
  const atras = () => {
    props.history.push("/clientes")
  }
  const obtenerNombre = (val) => {
    let nombre = ""
    filesSelected.map((e) => {
        console.log(e)
        console.log(val + "==" + e.name)
        if (val == e.name) {
            nombre = e.file.name
        }
    })
    return nombre
}
const obtenerNombreS = (val) => {
    let nombre = ""
    filesSelectedS.map((e) => {
        console.log(e)
        console.log(val + "==" + e.name)
        if (val == e.name) {
            nombre = e.file.name
        }
    })
    return nombre
}
const retornoDocumentosPorId=(val,tipo)=>{
  let fil = null
  if(tipo=="cli"){
      filesSelected.map((e)=>{
          if(val==e.id){
              fil=e.file
          }
      })
  }else{
      filesSelectedS.map((e)=>{
          if(val==e.id){
              fil=e.file
          }
      })
  }
  
  return fil
}
const retornoOtrosArchivos=(tipo)=>{
  let fil = null
  let ar=[1,3,2,4,9,50,51,52,53,54,55,6,7,80,81,82]
  let ret = []
  if(tipo=="cli"){
      filesSelected.map((e)=>{
 
          if(ar.includes(parseInt(e.id))==false){
              let tn =e.nombre.split(' ');
              let tf = tn.join(",");
             ret.push({nombre:tf,id:parseInt(e.id),file:e.file});
          }
      })
  }else{
      filesSelectedS.map((e)=>{
          if(ar.includes(parseInt(e.id))==false){
              let tn =e.nombre.split(' ');
              let tf = tn.join(",");
              ret.push({nombre:tf,id:parseInt(e.id),file:e.file});
          }
      })
  }
  
  return ret
}

  const archivosSubidos=(nm)=>{
   
    let fin = false
    files.map((e)=>{
      if(e==nm){
        fin = true
      }
    })
    return fin
  }
  return (
    <Box mt={2} ml={2} mr={2}>
      <Backdrop open={openSpeed} style={{ zIndex: 500 }} />

      {openDetalle != false ? (
        <DetallePlantilla
          total={roleData}
          married={civil == 2 || civil == 3 || civil == 6}
          client_id={data != null ? data.client.id : 0}
          spouse_id={data.spouse != null ? data.spouse.id : 0}
          open={openDetalle}
          handleClose={() => setOpenDetalle(false)}
        />
      ) : null}
      {openDetalleAhorro != false ? (
        <DetalleAhorro
          client_id={data != null ? data.client.id : 0}
          spouse_id={data.spouse != null ? data.spouse.id : 0}
          open={openDetalleAhorro}
          married={civil == 2 || civil == 3 || civil == 6}
          ingresos={{ client: ingresosTotalesDoc, spouse: incomeTS }}
          egresos={{ client: egresosTotales, spouse: 0 }}
          ahorro={{ client: ahorroNetoDoc, spouse: incomeTS != 0 ? (incomeTS) : 0 }}
          handleClose={() => setOpenDetalleAhorro(false)}
        />
      ) : null}
      {openDetalleBuro != false ? (
        <DetalleBuro
          married={civil == 2 || civil == 3 || civil == 6}
          client_id={data != null ? data.client.id : 0}
          spouse_id={data.spouse != null ? data.spouse.id : 0}
          open={openDetalleBuro}
          handleClose={() => setOpenDetalleBuro(false)}
        />
      ) : null}
      {openFilesUploaded != false ? (
        <FilesUploaded
          married={civil == 2 || civil == 3 || civil == 6}
          dependence={data != null ? data.client.dependencia : ""}
          client_id={data != null ? data.client.id : 0}
          dependenceS={data.spouse != null ? data.spouse.dependencia : ""}
          spouse_id={data.spouse != null ? data.spouse.id : 0}
          open={openFilesUploaded}
          handleClose={() => setOpenFilesUploaded(false)}
        />
      ) : null}




      <Card>
        <CardContent>
          <Paper square style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="simple tabs example"
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab icon={<PersonPinIcon />} label="Actualizar interesado" />
              <Tab icon={<PublishIcon />} label="Cargar archivos" />
              <Tab icon={<FormatListNumberedOutlinedIcon />} label="Resultado" />
            </Tabs>

            <div

            >
              <Tooltip title="Cancelar">
                <IconButton aria-label="Cancelar" onClick={() => atras()}>
                  <ArrowBackIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Refrescar">
                <IconButton aria-label="Refrescar" onClick={() => actualizar()}>
                  <RefreshOutlined />
                </IconButton>
              </Tooltip>
              <Tooltip title="Crear">
                <IconButton aria-label="Crear" onClick={() => props.history.push("/clientes/crear")}>
                  <AddCircleOutline />
                </IconButton>
              </Tooltip>
              <Tooltip title="Cotizar">
                <IconButton aria-label="Cotizar" onClick={handleClickMenu} >
                  <AttachMoneyIcon />
                </IconButton>
              </Tooltip>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
              >

                {/* <CrearCotizacion cotizarCliente={cotizarCliente}/> */}
                <MenuItem onClick={cotizarCliente}>Crear cotización</MenuItem>
                {/* <MenuItem onClick={obtenerCotizacionCliente}>Obtener cotización</MenuItem> */}

                <VerCotizacion client_id={data != null ? data.client.id : 0} dni={cedula} obtenerCotizacionCliente={obtenerCotizacionCliente} />
              </Menu>
              <VerArchivos
                fullScreen={fullScreen}
                style={{ marginRight: "5px" }}
                dni={data != null ? data.client.cedula : ""}
                otherIncome={otherIncome}
                client_id={data != null ? data.client.id : 0}
                spouse_id={data!=null?data.spouse != null ? data.spouse.id : 0:0}

                otherIncomeS={otherIncomeS}
                married={civil == 2 || civil == 3 || civil == 6}
                dniS={
                  data != null ? (data.spouse != null ? data.spouse.cedula : "") : ""
                }
                dependence={data != null ? data.client.dependencia : ""}
                dependenceS={
                  data != null
                    ? data.spouse != null
                      ? data.spouse.dependencia
                      : ""
                    : 1
                }
              />

              <Tooltip title="Descargar">
                <IconButton aria-label="descargar" onClick={descargar}>
                  <GetAppIcon />
                </IconButton>
              </Tooltip>


            </div>

          </Paper>

          <TabPanel value={value} index={0}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={12} style={{ display: 'flex' }}>


                <PersonIcon fontSize="small" style={{ marginLeft: 5, marginRight: 5 }} /> <span style={{ fontWeight: 'bold', textTransform: 'capitalize' }}>{nombres.toLowerCase()} {apellidos.toLowerCase()}</span>

              </Grid>
              <Grid item xs={12} md={12}>
                <Accordion expanded={expanded === 'panel1'} onChange={handleChangeExpand('panel1')}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <Typography className={classes.heading}><AssignmentIndIcon fontSize="small" style={{ marginRight: 5 }} />Datos personales</Typography>
                    <Typography className={classes.secondaryHeading}>Validación de cédula</Typography>
                  </AccordionSummary>
                  <AccordionDetails>

                    <Grid container spacing={2}>

                      <Grid item xs={12} md={4}>
                        <TextField
                          label="Cédula"
                          variant="outlined"
                          error={!validarCedula(cedula)}
                          helperText={!validarCedula(cedula) ? "Cédula inválida." : ""}
                          style={{ width: "100%" }}

                          onChange={(e) => {
                            const re = /^[0-9\b]+$/;

                            if (e.target.value === "" || re.test(e.target.value)) {
                              setCedula(e.target.value);
                            }
                          }}
                          value={cedula}
                        />
                      </Grid>

                      <Grid item xs={12} md={4}>
                        <TextField
                          label="Nombres"
                          variant="outlined"
                          style={{ width: "100%" }}
                          error={validation.names == null}
                          helperText={validation.names == null ? "Rquerido" : ""}
                          onChange={(e) => {
                            if (new RegExp("^[a-zA-Z ]+$").test(e.target.value)) {
                              setNombres(e.target.value)
                            }
                          }
                          }
                          value={nombres}
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <TextField
                          label="Apellidos"
                          variant="outlined"
                          error={validation.last_names == null}
                          helperText={validation.last_names == null ? "Rquerido" : ""}
                          style={{ width: "100%" }}
                          onChange={(e) => {
                            if (new RegExp("^[a-zA-Z ]+$").test(e.target.value)) {
                              setApellidos(e.target.value)
                            }

                          }}
                          value={apellidos}
                        />
                      </Grid>


                      <Grid item md={4} xs={12}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}>
                          <KeyboardDatePicker
                            autoOk
                            inputVariant="outlined"
                            label="Fecha de nacimiento"
                            style={{ width: "100%" }}
                            format="dd/MM/yyyy"
                            value={nacimiento}
                            helperText=""
                            InputAdornmentProps={{ position: "start" }}
                            onChange={(date) => setNacimiento(date)}
                          />
                        </MuiPickersUtilsProvider>
                      </Grid>
                      <Grid item md={4} xs={12}>
                        <FormControl
                          variant="outlined"
                          style={{ width: "100%" }}
                          error={validation.recomendation_id == null}
                        >
                          <InputLabel id="label">
                            ¿Cómo se enteró de nosotros?
                          </InputLabel>
                          <Select
                            labelId="label"
                            value={recomendation}
                            onChange={(e) => setRecomendation(e.target.value)}
                            label="¿Cómo se enteró de nosotros?"
                          >
                            <MenuItem value="">
                              <em>Seleccione un opción</em>
                            </MenuItem>
                            {recomendationData.map((e) => (
                              <MenuItem key={e.id_medios} value={e.id_medios}>
                                <em>{e.med_descrip}</em>
                              </MenuItem>
                            ))}
                          </Select>
                          {validation.recomendation_id == null ? (
                            <FormHelperText>Requerido</FormHelperText>
                          ) : null}
                        </FormControl>
                      </Grid>

                      <Grid item md={4} xs={12}>
                        <FormControl
                          variant="outlined"
                          style={{ width: "100%" }}
                          error={validation.civil == null}
                        >
                          <InputLabel id="label1">Estado civil</InputLabel>
                          <Select
                            labelId="label1"
                            value={civil}
                            onChange={(e) => setCivil(e.target.value)}
                            label="Estado civil"
                          >
                            <MenuItem value="">
                              <em>Seleccione una opción</em>
                            </MenuItem>

                            {civilData.map((e) => (

                              <MenuItem key={e.id_estacivil} value={e.id_estacivil}>
                                <em>{e.est_descrip}</em>
                              </MenuItem>
                            ))}
                          </Select>
                          {validation.civil == null ? (
                            <FormHelperText>Requerido</FormHelperText>
                          ) : null}
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={12}>

                        <FormControl variant="outlined" style={{ width: "100%" }}>
                          <InputLabel id="label1">Estado del prospecto (Entrevistas)</InputLabel>
                          <Select
                            labelId="label1"
                            value={estadoP}

                            onChange={(e) => setEstadoP(e.target.value)}
                            label="Estado del prospecto (Entrevistas)"
                          >
                            <MenuItem value="">
                              <em>Seleccione una opción</em>
                            </MenuItem>
                            <MenuItem key={"2"} value={"2"}>
                              <em>Alto (Va a comprar en 8 días)</em>
                            </MenuItem>
                            <MenuItem key={"1"} value={"1"}>
                              <em>Medio (Va a comprar en un mes)</em>
                            </MenuItem>
                            <MenuItem key={"0"} value={"0"}>
                              <em>Bajo (No esta decidido)</em>
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      {recomendation == 4 ? (
                        <Grid item container spacing={2}>
                          <Grid item xs={12} md={12}>
                            <Typography style={{ fontWeight: "bold" }}>
                              Datos del referidor
                            </Typography>
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <TextField
                              label="Cédula"
                              error={!validarCedula(cedulaR)}
                              helperText={
                                !validarCedula(cedulaR) ? "Cédula inválida." : ""
                              }
                              variant="outlined"
                              style={{ width: "100%" }}
                              onChange={(e) => {
                                const re = /^[0-9\b]+$/;

                                if (e.target.value === "" || re.test(e.target.value)) {
                                  setCedulaR(e.target.value);
                                }
                              }}
                              value={cedulaR}
                            />
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <TextField
                              label="Nombres completos"
                              variant="outlined"
                              style={{ width: "100%" }}
                              onChange={(e) => {
                                if (new RegExp("^[a-zA-Z ]+$").test(e.target.value)) {
                                  setNombreR(e.target.value)
                                }
                              }}
                              value={nombreR}
                            />
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <TextField
                              label="Proyecto donde compró"
                              variant="outlined"
                              style={{ width: "100%" }}
                              onChange={(e) => setProyectoR(e.target.value)}
                              value={proyectoR}
                            />
                          </Grid>
                        </Grid>
                      ) : null}
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              </Grid>
              <Grid item xs={12} md={12}>

                <Accordion expanded={expanded === 'panel2'} onChange={handleChangeExpand('panel2')}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <Typography className={classes.heading}><EmailIcon fontSize="small" style={{ marginRight: 5 }} />Datos de contacto</Typography>
                    <Typography className={classes.secondaryHeading}>Validación de correo</Typography>
                  </AccordionSummary>
                  <AccordionDetails>

                    <Grid container spacing={2}>

                      <Grid item xs={12} md={4}>
                        <TextField
                          label="Email"
                          error={validation.email == null}
                          helperText={validation.email == null ? "Rquerido" : ""}
                          variant="outlined"
                          style={{ width: "100%" }}
                          onChange={(e) => setEmail(e.target.value)}
                          value={email}
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <TextField
                          label="Celular"
                          variant="outlined"
                          style={{ width: "100%" }}


                          onChange={(e) => {
                            const re = /^[0-9\b]+$/;

                            if (e.target.value === "" || re.test(e.target.value)) {
                              setCelular(e.target.value);
                            }
                          }}
                          value={celular}
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <TextField
                          label="Teléfono fijo"
                          variant="outlined"
                          style={{ width: "100%" }}

                          onChange={(e) => {
                            const re = /^[0-9\b]+$/;

                            if (e.target.value === "" || re.test(e.target.value)) {
                              setTelefono(e.target.value);
                            }
                          }}
                          value={telefono}
                        />
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              </Grid>
              <Grid item xs={12} md={12}>
                <Accordion expanded={expanded === 'panel3'} onChange={handleChangeExpand('panel3')}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <Typography className={classes.heading}><HomeWorkIcon fontSize="small" style={{ marginRight: 5 }} />Datos de domicilio</Typography>
                    <Typography className={classes.secondaryHeading}>Ubicación</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={4}>
                        <TextField
                          label="Calle 1"
                          variant="outlined"
                          style={{ width: "100%" }}
                          onChange={(e) => setDireccion(e.target.value)}
                          value={direccion}
                        />
                      </Grid>

                      <Grid item xs={12} md={4}>
                        <TextField
                          label="Número de villa"
                          variant="outlined"
                          style={{ width: "100%" }}
                          onChange={(e) => setVilla(e.target.value)}
                          value={villa}
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <TextField
                          label="Calle 2"
                          variant="outlined"
                          style={{ width: "100%" }}
                          onChange={(e) => setManzana(e.target.value)}
                          value={manzana}
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <TextField
                          label="Otra descripción de dirección"
                          variant="outlined"
                          style={{ width: "100%" }}
                          onChange={(e) => setCiudadela(e.target.value)}
                          value={ciudadela}
                        />
                      </Grid>



                      <Grid item md={4} xs={12}>
                        <FormControl variant="outlined" style={{ width: "100%" }}>
                          <InputLabel id="provin">Provincia</InputLabel>
                          <Select
                            labelId="provin"
                            value={provincia}
                            onChange={(e) => changeProvince(e.target.value)}
                            label="Provincia"
                          >
                            <MenuItem value="">
                              <em>Seleccione una provincia</em>
                            </MenuItem>
                            {provinciaData.data.map((e) => (
                              <MenuItem key={e.id_provincia} value={e.id_provincia}>
                                <em>{e.pv_descrip}</em>
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item md={4} xs={12}>
                        <FormControl variant="outlined" style={{ width: "100%" }}>
                          <InputLabel id="label">Cantón</InputLabel>
                          <Select
                            labelId="label"
                            value={ciudad}
                            onChange={(e) => setCiudad(e.target.value)}
                            label="Cantón"
                          >
                            <MenuItem value="">
                              <em>Seleccione un cantón</em>
                            </MenuItem>
                            {ciudadData.data.map((e) => (
                              <MenuItem key={e.id_ciudad} value={e.id_ciudad}>
                                <em>{e.cd_descrip}</em>
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              </Grid>
              <Grid item xs={12} md={12}>
                <Accordion expanded={expanded === 'panel4'} onChange={handleChangeExpand('panel4')}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <Typography className={classes.heading}><AttachMoneyIcon fontSize="small" style={{ marginRight: 5 }} />Datos de ingresos y egresos</Typography>
                    <Typography className={classes.secondaryHeading}>Ingresos y egresos</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={2}>
                      <Grid item md={12} xs={12}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={dependencia}
                              onChange={() => {
                                setDependencia(!dependencia);
                                obtenerDocumentosFormulario({ tipo_iva: ivaMensual==false ? 'S' : 'M', id_labor: (!dependencia) == true ? 1 : 2, id_estado_civil: data.client.id_estado_civil }, setDocuments)

                                if (!dependencia == true) {
                                  setRucFiles(null);
                                  setIvaDeclarationFile(null);
                                  setAccountMovFile(null);
                                } else {
                                  setRolesFile(null);
                                  setPrecaFile(null);
                                }
                              }}
                              name="checkedA"
                              inputProps={{ "aria-label": "secondary checkbox" }}
                            />
                          }
                          label="¿Posee relación de dependencia?"
                        />
                      </Grid>

                      {
                        dependencia ?
                          otherIncome != 0 && otherIncome != null ?
                            <Grid item md={12} xs={12}>
                              <FormControlLabel
                                control={
                                  <Switch
                                    checked={ivaMensualO}
                                    onChange={() => {
                                      setIvaMensualO(!ivaMensualO);


                                    }}

                                    inputProps={{
                                      "aria-label": "secondary checkbox",
                                    }}
                                  />
                                }
                                label="Otros ingresos: ¿Declara IVA mensualmente?"
                              />
                            </Grid>
                            : null
                          :
                          <Grid item md={12} xs={12}>
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={ivaMensual}
                                  onChange={() => {
                                    setIvaMensual(!ivaMensual);
                                    obtenerDocumentosFormulario({ tipo_iva: (!ivaMensual)==false ? 'S' : 'M', id_labor: dependencia==true ? 1 : 2, id_estado_civil: data.client.id_estado_civil }, setDocuments)
                                  }}
                                  name="checkedA"
                                  inputProps={{ "aria-label": "secondary checkbox" }}
                                />
                              }
                              label="¿Declara IVA mensualmente?"
                            />
                          </Grid>
                      }

                      <Grid item xs={12} md={6}>
                        <TextField
                          label="Ingresos"
                          variant="outlined"
                          style={{ width: "100%" }}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">$</InputAdornment>
                            ),
                          }}

                          onChange={(e) => {
                            const re = /^[0-9\b]+$/;

                            if (e.target.value === "" || re.test(e.target.value)) {
                              setIncome(e.target.value);
                            }
                          }}
                          value={income}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          label="Otros ingresos"
                          variant="outlined"
                          style={{ width: "100%" }}

                          onChange={(e) => {
                            const re = /^[0-9\b]+$/;

                            if (e.target.value === "" || re.test(e.target.value)) {
                              setOtherIncome(e.target.value);
                            }
                          }}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">$</InputAdornment>
                            ),
                          }}
                          value={otherIncome}
                        />
                      </Grid>
                      <Grid item xs={12} md={12}>
                        <Typography style={{ fontWeight: "bold" }} color="textPrimary">
                          Egresos:
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <TextField
                          label="Renta"
                          variant="outlined"
                          style={{ width: "100%" }}

                          onChange={(e) => {
                            const re = /^[0-9\b]+$/;

                            if (e.target.value === "" || re.test(e.target.value)) {
                              setRentExpenses(e.target.value);
                            }
                          }}
                          value={rentExpenses}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">$</InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <TextField
                          label="Comida"
                          variant="outlined"
                          style={{ width: "100%" }}


                          onChange={(e) => {
                            const re = /^[0-9\b]+$/;

                            if (e.target.value === "" || re.test(e.target.value)) {
                              setFoodExpenses(e.target.value);
                            }
                          }}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">$</InputAdornment>
                            ),
                          }}
                          value={foodExpenses}
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <TextField
                          label="Ropa"
                          variant="outlined"
                          style={{ width: "100%" }}

                          onChange={(e) => {
                            const re = /^[0-9\b]+$/;

                            if (e.target.value === "" || re.test(e.target.value)) {
                              setClothingExpenses(e.target.value);
                            }
                          }}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">$</InputAdornment>
                            ),
                          }}
                          value={clothingExpenses}
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <TextField
                          label="Servicios básicos"
                          variant="outlined"
                          style={{ width: "100%" }}

                          onChange={(e) => {
                            const re = /^[0-9\b]+$/;

                            if (e.target.value === "" || re.test(e.target.value)) {
                              setBasicExpenses(e.target.value);
                            }
                          }}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">$</InputAdornment>
                            ),
                          }}
                          value={basicExpenses}
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <TextField
                          label="Educación"
                          variant="outlined"
                          style={{ width: "100%" }}

                          onChange={(e) => {
                            const re = /^[0-9\b]+$/;

                            if (e.target.value === "" || re.test(e.target.value)) {
                              setEducationExpenses(e.target.value);
                            }
                          }}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">$</InputAdornment>
                            ),
                          }}
                          value={educationExpenses}
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <TextField
                          label="Transporte"
                          variant="outlined"
                          style={{ width: "100%" }}


                          onChange={(e) => {
                            const re = /^[0-9\b]+$/;

                            if (e.target.value === "" || re.test(e.target.value)) {
                              setTransporteExpenses(e.target.value);
                            }
                          }}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">$</InputAdornment>
                            ),
                          }}
                          value={transporteExpenses}
                        />
                      </Grid>
                      <Grid item xs={12} md={12}>
                        <TextField
                          label="Otros gastos"
                          variant="outlined"
                          style={{ width: "100%" }}

                          onChange={(e) => {
                            const re = /^[0-9\b]+$/;

                            if (e.target.value === "" || re.test(e.target.value)) {
                              setOtherExpenses(e.target.value);
                            }
                          }}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">$</InputAdornment>
                            ),
                          }}
                          value={otherExpenses}
                        />
                      </Grid>
                      <Grid item xs={12} md={12}>
                        <TextField
                          label="Buró de crédito"
                          variant="outlined"
                          style={{ width: "100%" }}

                          onChange={(e) => {
                            const re = /^[0-9\b]+$/;

                            if (e.target.value === "" || re.test(e.target.value)) {
                              setBuro(e.target.value);
                            }
                          }}
                          InputProps={{
                            readOnly: !tienePermiso("Uafe") || !tienePermiso("Riesgo"),
                          }}
                          value={buro}
                        />
                      </Grid>

                      <Grid item md={12} xs={12}>
                        <TextField
                          label="Obligaciones"
                          variant="outlined"
                          style={{ width: "100%" }}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">$</InputAdornment>
                            ),
                          }}

                          onChange={(e) => {
                            const re = /^[0-9\b]+$/;

                            if (e.target.value === "" || re.test(e.target.value)) {
                              setObligation(e.target.value);
                            }
                          }}
                          value={obligation}
                        />
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              </Grid>

              <Grid item xs={12} md={12}>
                <Accordion expanded={expanded === 'panel5'} onChange={handleChangeExpand('panel5')}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <Typography className={classes.heading}><PersonIcon fontSize="small" style={{ marginRight: 5 }} />Uafe/Riesgo</Typography>
                    <Typography className={classes.secondaryHeading}>Estado</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={2}>
                      <Grid item md={6} xs={6}>
                        <FormControl variant="outlined" style={{ width: "100%" }}>
                          <InputLabel id="label1">Listas de control</InputLabel>
                          <Select
                            labelId="label1"
                            value={uafe}
                            disabled={!tienePermiso("Uafe")}
                            onChange={(e) => setUafe(e.target.value)}
                            label="Listas de control"
                          >
                            <MenuItem value="">
                              <em>Seleccione una opción</em>
                            </MenuItem>
                            <MenuItem key={"APROBADO"} value={"APROBADO"}>
                              <em>APROBADO</em>
                            </MenuItem>
                            <MenuItem key={"EN REVISIÓN"} value={"EN REVISIÓN"}>
                              <em>EN REVISIÓN</em>
                            </MenuItem>
                            <MenuItem key={"NEGADO"} value={"NEGADO"}>
                              <em>NEGADO</em>
                            </MenuItem>
                          </Select>
                        </FormControl>
                        <TextField
                          label="Observación"
                          variant="outlined"
                          style={{ marginTop: "10px", width: "100%" }}
                          onChange={(e) => setUafeObservation(e.target.value)}

                          value={uafeObservation}
                        />
                      </Grid>
                      <Grid item md={6} xs={6}>
                        <FormControl variant="outlined" style={{ width: "100%" }}>
                          <InputLabel id="label1">Estado Riesgo</InputLabel>
                          <Select
                            labelId="label1"
                            value={risk}
                            disabled={!tienePermiso("Uafe")}
                            onChange={(e) => setRisk(e.target.value)}
                            label="Estado Riesgo"
                          >
                            <MenuItem value="">
                              <em>Seleccione una opción</em>
                            </MenuItem>
                            <MenuItem key={"APROBADO"} value={"APROBADO"}>
                              <em>APROBADO</em>
                            </MenuItem>
                            <MenuItem key={"EN REVISIÓN"} value={"EN REVISIÓN"}>
                              <em>EN REVISIÓN</em>
                            </MenuItem>
                            <MenuItem key={"NEGADO"} value={"NEGADO"}>
                              <em>NEGADO</em>
                            </MenuItem>
                          </Select>
                        </FormControl>
                        <TextField
                          label="Observación"
                          variant="outlined"
                          style={{ marginTop: "10px", width: "100%" }}
                          onChange={(e) => setRiesgoObservation(e.target.value)}

                          value={riesgoObservation}
                        />
                      </Grid>

                    </Grid>
                  </AccordionDetails>
                </Accordion>
              </Grid>
              {civil == 2 || civil == 3 || civil == 6 ? (
                <Grid item xs={12} md={12}>
                  <Accordion expanded={expanded === 'panel6'} onChange={handleChangeExpand('panel6')}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                    >
                      <Typography className={classes.heading}><PeopleIcon fontSize="small" style={{ marginRight: 5 }} />Cónyuge</Typography>
                      <Typography className={classes.secondaryHeading}>Datos personales</Typography>
                    </AccordionSummary>
                    <AccordionDetails>

                      <Grid container spacing={2}>
                        <Grid item xs={12} md={4}>
                          <TextField
                            label="Cédula"
                            variant="outlined"
                            error={!validarCedula(cedulaS)}
                            helperText={
                              !validarCedula(cedulaS)
                                ? "Cédula inválida."
                                : ""
                            }
                            style={{ width: "100%" }}
                            onChange={(e) => {
                              const re = /^[0-9\b]+$/;

                              if (
                                e.target.value === "" ||
                                re.test(e.target.value)
                              ) {
                                setCedulaS(e.target.value);
                              }
                            }}
                            value={cedulaS}
                          />
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <TextField
                            label="Nombres"
                            error={validation.spouse_names == null}
                            helperText={
                              validation.spouse_names == null
                                ? "Rquerido"
                                : ""
                            }
                            variant="outlined"
                            style={{ width: "100%" }}
                            onChange={(e) => {
                              if (new RegExp("^[a-zA-Z ]+$").test(e.target.value)) {
                                setNombresS(e.target.value)

                              }
                            }}
                            value={nombresS}
                          />
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <TextField
                            label="Apellidos"
                            error={validation.spouse_last_names == null}
                            helperText={
                              validation.spouse_last_names == null
                                ? "Rquerido"
                                : ""
                            }
                            variant="outlined"
                            style={{ width: "100%" }}
                            onChange={(e) => {
                              if (new RegExp("^[a-zA-Z ]+$").test(e.target.value)) {
                                setApellidosS(e.target.value)
                              }
                            }}
                            value={apellidosS}
                          />
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <TextField
                            label="Celular"
                            variant="outlined"
                            style={{ width: "100%" }}
                            onChange={(e) => {
                              const re = /^[0-9\b]+$/;

                              if (
                                e.target.value === "" ||
                                re.test(e.target.value)
                              ) {
                                setCelularS(e.target.value);
                              }
                            }}
                            value={celularS}
                          />
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <TextField
                            label="Teléfono fijo"
                            variant="outlined"
                            style={{ width: "100%" }}
                            onChange={(e) => {
                              const re = /^[0-9\b]+$/;

                              if (
                                e.target.value === "" ||
                                re.test(e.target.value)
                              ) {
                                setTelefonoS(e.target.value);
                              }
                            }}
                            value={telefonoS}
                          />
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <TextField
                            label="Email"
                            variant="outlined"
                            error={validation.spouse_email == null}
                            helperText={
                              validation.spouse_email == null
                                ? "Rquerido"
                                : ""
                            }
                            style={{ width: "100%" }}
                            onChange={(e) => setEmailS(e.target.value)}
                            value={emailS}
                          />
                        </Grid>
                        <Grid item md={12} xs={12}>
                          <FormControlLabel
                            control={
                              <Switch
                                checked={dependenciaS}
                                onChange={() => {
                                  setDependenciaS(!dependenciaS);

                                  if (!dependenciaS == true) {
                                    setRucFilesS(null);
                                    setIvaDeclarationFileS(null);
                                    setAccountMovFileS(null);
                                  } else {
                                    setRolesFileS(null);
                                    setPrecaFileS(null);
                                  }
                                }}
                                name="checkedA"
                                inputProps={{
                                  "aria-label": "secondary checkbox",
                                }}
                              />
                            }
                            label="¿Posee relación de dependencia?"
                          />
                        </Grid>
                        {
                          !dependenciaS ?
                            <Grid item md={12} xs={12}>
                              <FormControlLabel
                                control={
                                  <Switch
                                    checked={ivaMensualS}
                                    onChange={() => {
                                      setIvaMensualS(!ivaMensualS);

                                    }}
                                    name="checkedAS"
                                    inputProps={{ "aria-label": "secondary checkbox" }}
                                  />
                                }
                                label="¿Declara IVA mensualmente?"
                              />
                            </Grid>
                            : null
                        }
                        {
                          otherIncomeS != 0 ?
                            <Grid item md={12} xs={12}>
                              <FormControlLabel
                                control={
                                  <Switch
                                    checked={ivaMensualOS}
                                    onChange={() => {
                                      setIvaMensualOS(!ivaMensualOS);


                                    }}

                                    inputProps={{
                                      "aria-label": "secondary checkbox",
                                    }}
                                  />
                                }
                                label="Otros ingresos: ¿Declara IVA mensualmente?"
                              />
                            </Grid>
                            : null
                        }

                        <Grid item xs={12} md={6}>
                          <TextField
                            label="Ingresos"
                            variant="outlined"
                            style={{ width: "100%" }}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  $
                                </InputAdornment>
                              ),
                            }}

                            onChange={(e) => {
                              const re = /^[0-9\b]+$/;

                              if (e.target.value === "" || re.test(e.target.value)) {
                                setIncomeS(e.target.value);
                              }
                            }}
                            value={incomeS}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                            label="Otros ingresos"
                            variant="outlined"
                            style={{ width: "100%" }}

                            onChange={(e) => {
                              const re = /^[0-9\b]+$/;

                              if (e.target.value === "" || re.test(e.target.value)) {
                                setOtherIncomeS(e.target.value);
                              }
                            }}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  $
                                </InputAdornment>
                              ),
                            }}
                            value={otherIncomeS}
                          />
                        </Grid>


                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                </Grid>)
                : null}


            </Grid>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Grid container alignItems="center">
              <Grid item xs={12} md={12} style={{ display: 'flex' ,marginBottom:10}}>
                <div style={{ display: 'flex' }}>
                  <PersonIcon fontSize="small" style={{ marginLeft: 5, marginRight: 5 }} /> <span style={{ fontWeight: 'bold', textTransform: 'capitalize' }}>{nombres.toLowerCase()} {apellidos.toLowerCase()}</span>

                </div>
                {/*      <Button size="small" color={value2==0?"secondary":"default"} onClick={() =>{
                
               if(value2==0){
                setValue2(1)                 
               }else{
                setValue2(0)
               }

              
              }}>
                  {value2==0?<DescriptionIcon fontSize="small" style={{ marginRight: 5 }} />:<ArrowBackIcon fontSize="small" style={{ marginRight: 5 }} />} {value2==1?'Cancelar':'Precalificar'}
                </Button> */}


                {/*    <Chip label="Actualizar" /> */}
              </Grid>

              {/*  <Grid item md={12} xs={12}>
                  <Tabs
                    value={value2}
                    onChange={(event, newValue) => setValue2(newValue)}
                    aria-label="simple tabs example"
                    variant="scrollable"
                    scrollButtons="auto"
                  >
                    <Tab icon={<FileCopyIcon />} label="Requeridos" />
                    <Tab icon={<DescriptionIcon />} label="Actualizar" />
                  </Tabs>
                </Grid> */}
              <Grid item md={12} xs={12}>

                <Grid container item md={12} xs={12}>
                  {
                    documents.length != 0 ?
                      <TableContainer component={Paper}>
                        <Table aria-label="simple table" size="small">
                          <TableHead>
                            <TableRow>
                              <TableCell style={{ fontWeight: "bold" }}>
                                Nombre
                              </TableCell>
                              <TableCell
                                style={{ fontWeight: "bold" }}
                                align="right"
                              >
                                Archivo
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {
                              documents.map((e, i) => (
                                <TableRow>
                                  <TableCell component="th" scope="row">
                                    {e.nombre}
                                  </TableCell>
                                  <TableCell align="right">
                                    {" "}
                                    {
                                      e.numero_archivos == 1 ?

                                        <div
                                          style={{
                                            marginRight: "5px",
                                          }}
                                        >
                                          <input
                                            accept="image/*"
                                            style={{ display: "none" }}
                                            id={"cli" + e.nombre}
                                            accept="application/pdf"
                                            type="file"
                                            onChange={(a) => {
                                                    let temp = filesSelected.slice()
                                                    temp.push({nombre:e.nombre, id:e.id_tipo_documento!=5&&e.id_tipo_documento!=8?e.id_tipo_documento:e.id_tipo_documento+""+0, name: "cli" + e.id_tipo_documento + e.nombre, file: a.target.files[0] })
                                                    setFilesSelected(temp)
                                                }}
                                          />
                                          <label htmlFor={"cli" + e.nombre}>
                                            <Button
                                              variant="contained"
                                              color="primary"
                                              startIcon={<CloudUploadIcon />}
                                              component="span"
                                            >
                                                {obtenerNombre("cli" + e.id_tipo_documento + e.nombre) != "" ? (
                                                            "(" + obtenerNombre("cli" + e.id_tipo_documento + e.nombre).substring(0, 4) + "..." + ")"
                                                        ) : "Adjuntar"}
                                            </Button>
                                          </label>
                                        </div>

                                        :
                                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                          {
                                            Array(e.numero_archivos).fill(1).map((a, o) => (
                                              <div
                                                style={{
                                                  marginRight: "5px",
                                                }}
                                              >
                                                <input
                                                  accept="image/*"
                                                  style={{ display: "none" }}
                                                  id={"cli" + e.nombre + o}
                                                  accept="application/pdf"
                                                  type="file"
                                                  onChange={(a) => {
                                                    let temp = filesSelected.slice()
                                                    temp.push({nombre:e.nombre,id:e.id_tipo_documento!=5&&e.id_tipo_documento!=8?e.id_tipo_documento:e.id_tipo_documento+""+o, name: "cli" + o + "" + e.id_tipo_documento + e.nombre, file: a.target.files[0] })
                                                    setFilesSelected(temp)
                                                }}
                                                />
                                                <label htmlFor={"cli" + e.nombre + o}>
                                                  <Button
                                                    variant="contained"
                                                    color="primary"
                                                    startIcon={<CloudUploadIcon />}
                                                    component="span"
                                                  >
                                                      {obtenerNombre("cli" + o + "" + e.id_tipo_documento + e.nombre) != "" ? (
                                                                        "(" + obtenerNombre("cli" + o + "" + e.id_tipo_documento + e.nombre).substring(0, 4) + "..." + ")"
                                                                    ) : "Adjuntar"}
                                                  </Button>
                                                </label>
                                              </div>

                                            ))
                                          }
                                        </div>

                                    }
                                  </TableCell>
                                </TableRow>


                              ))


                            }
                          </TableBody>
                        </Table>
                      </TableContainer>
                      : Array(4).fill(1).map((e) => (
                        <div style={{ marginBottom: 10, width: '100%', display: 'flex', justifyContent: 'space-between' }} >
                          <Skeleton animation="wave" width="20%" height={36} />
                          <Skeleton animation="wave" width="20%" height={36} />
                        </div>
                      ))
                  }



                  {civil == 2 || civil == 3 || civil == 6 ? (
                    <div>
                      
                      <div style={{ display: 'flex', marginTop: 15 }}>
                        <PersonIcon fontSize="small" style={{ marginLeft: 5, marginRight: 5 }} /> <span style={{ fontWeight: 'bold', textTransform: 'capitalize' }}>Cónyuge: {nombres.toLowerCase()} {apellidos.toLowerCase()}</span>
  
                      </div>
                      {
                      documentsS.length != 0 ?
                    <TableContainer component={Paper}>
                      <Table aria-label="simple table" size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell style={{ fontWeight: "bold" }}>
                              Nombre
                            </TableCell>
                            <TableCell
                              style={{ fontWeight: "bold" }}
                              align="right"
                            >
                              Archivo
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {
                            documentsS.map((e, i) => (
                              <TableRow>
                                <TableCell component="th" scope="row">
                                  {e.nombre}
                                </TableCell>
                                <TableCell align="right">
                                  {" "}
                                  {
                                    e.numero_archivos == 1 ?
  
                                      <div
                                        style={{
                                          marginRight: "5px",
                                        }}
                                      >
                                        <input
                                          accept="image/*"
                                          style={{ display: "none" }}
                                          id={"con" + e.nombre}
                                          accept="application/pdf"
                                          type="file"
                                          onChange={(a) => {

                                            let temp = filesSelectedS.slice()
                                            temp.push({nombre:e.nombre,id:e.id_tipo_documento!=5&&e.id_tipo_documento!=8?e.id_tipo_documento:e.id_tipo_documento+""+0, name: "con" + e.id_tipo_documento + e.nombre, file: a.target.files[0] })
                                            setFilesSelectedS(temp)
                                        }}
                                        />
                                        <label htmlFor={"con" + e.nombre}>
                                          <Button
                                            variant="contained"
                                            color="primary"
                                            startIcon={<CloudUploadIcon />}
                                            component="span"
                                          >
                                               {obtenerNombreS("con" + e.id_tipo_documento + e.nombre) != "" ? (
                                                                    "(" + obtenerNombreS("con" + e.id_tipo_documento + e.nombre).substring(0, 4) + "..." + ")"
                                                                ) : "Adjuntar"}
                                          </Button>
                                        </label>
                                      </div>
  
                                      :
                                      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        {
                                          Array(e.numero_archivos).fill(1).map((a, o) => (
                                            <div
                                              style={{
                                                marginRight: "5px",
                                              }}
                                            >
                                              <input
                                                accept="image/*"
                                                style={{ display: "none" }}
                                                id={"con" + e.nombre + o}
                                                accept="application/pdf"
                                                type="file"
                                                onChange={(a) => {
                                                  let temp = filesSelectedS.slice()
                                                  temp.push({ nombre:e.nombre, id:e.id_tipo_documento!=5&&e.id_tipo_documento!=8?e.id_tipo_documento:e.id_tipo_documento+""+o,name: "con" + o + "" + e.id_tipo_documento + e.nombre, file: a.target.files[0] })
                                                  setFilesSelectedS(temp)
                                              }}
                                              />
                                              <label htmlFor={"con" + e.nombre + o}>
                                                <Button
                                                  variant="contained"
                                                  color="primary"
                                                  startIcon={<CloudUploadIcon />}
                                                  component="span"
                                                >
                                                      {obtenerNombreS("con" + o + "" + e.id_tipo_documento + e.nombre) != "" ? (
                                                                                "(" + obtenerNombreS("con" + o + "" + e.id_tipo_documento + e.nombre).substring(0, 4) + "..." + ")"
                                                                            ) : "Adjuntar"}
                                                </Button>
                                              </label>
                                            </div>
  
                                          ))
                                        }
                                      </div>
  
                                  }
                                </TableCell>
                              </TableRow>
  
  
                            ))
  
  
                          }
                        </TableBody>
                      </Table>
                    </TableContainer>
                        : Array(4).fill(1).map((e) => (
                    <div style={{ marginBottom: 10, width: '100%', display: 'flex', justifyContent: 'space-between' }} >
                      <Skeleton animation="wave" width="20%" height={36} />
                      <Skeleton animation="wave" width="20%" height={36} />
                    </div>
                    ))}
                    </div>
                      ) : null}


                </Grid>


              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Grid item xs={12} md={12} style={{ display: 'flex', marginBottom: "5px", justifyContent: 'space-between', alignItems: 'center' }}   >
              <div style={{ display: 'flex' }}>
                <PersonIcon fontSize="small" style={{ marginLeft: 5, marginRight: 5 }} />
                <span style={{ fontWeight: 'bold', textTransform: 'capitalize' }}>{nombres.toLowerCase()} {apellidos.toLowerCase()}</span>

              </div>

              <Button size="small" color="secondary" onClick={() => setOpenFilesUploaded(true)}>
                <VisibilityIcon fontSize="small" style={{ marginRight: 5 }} /> Ver subidos
              </Button>
            </Grid>
            <Grid
              item
              xs={12}
              md={12}
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              {/*    <Button
                style={{ marginBottom: "5px" }}
                variant="contained"
                color="secondary"
                onClick={() => precalificarCliente()}
              >
                Pre calificar
              </Button> */}
              <div></div>
              {/*       <Button
                color="secondary"
                onClick={() => setOpenFilesUploaded(true)}
              >
                Ver subidos
              </Button> */}
            </Grid>

            <Grid item xs={12} md={12}>
              <table id="customers" className="tg" style={{ width: "100%", overflowX: 'auto' }}>
                <thead>
                  <tr>
                    <th
                      className="tg-0pky"
                      colspan="1"
                      style={{ fontWeight: "bold", textAlign: "center" }}
                    >
                      Descripción
                    </th>
                    <th
                      className="tg-0pky"
                      colspan="2"
                      style={{ width: 100, fontWeight: "bold", textAlign: "center" }}
                    >
                      Parametros de la Política
                    </th>

                    <th
                      className="tg-0pky"
                      style={{ fontWeight: "bold", textAlign: "center" }}
                    >
                      Resultado documentos
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td
                      className="tg-0pky"
                      style={{ verticalAlign: "middle", textAlign: "center" }}
                    >
                      Cédula
                    </td>
                    <td
                      colspan="2"
                      className="tg-0pky"
                      style={{ verticalAlign: "middle", textAlign: "center" }}
                    >
                      Válida
                    </td>

                    <td
                      className="tg-0pky"
                      style={{ verticalAlign: "middle", textAlign: "center" }}
                    >
                      {data != null
                        ? data.client.position == "." ||
                          data.client.position == "Paso 1" ||
                          data.client.position == "Paso 2" ||
                          data.client.position == "Invalido" || !existeCedula()
                          ? "No válida"
                          : "Válida"
                        : "Cargando"}
                    </td>
                  </tr>
                  <tr>
                    <td
                      className="tg-0pky"
                      rowspan="3"
                      style={{ verticalAlign: "middle", textAlign: "center" }}
                    >
                      Buró de crédito
                    </td>
                    <td
                      className="tg-xwmr"
                      colspan="2"
                      style={{ backgroundColor: colorA }}
                    >
                      <span style={{ backgroundColor: "transparent" }}>
                        &gt;
                      </span>
                      {rangoBuroM}
                    </td>

                    <td
                      className="tg-c3ow"
                      rowspan="3"
                      style={{
                        verticalAlign: "middle",
                        backgroundColor: obtenerColor(calcularScore(buro, buroS)),
                      }}
                    >
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        {buro}p
                        <Tooltip title="Ver resumen de buró crédito">
                          <InfoIcon
                            style={{ cursor: "pointer", marginLeft: 10 }}
                            fontSize="small"
                            onClick={() => setOpenDetalleBuro(true)}
                          />
                        </Tooltip>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td className="tg-kusv" style={{ backgroundColor: colorR }}>
                      {rangoBuro.split("-")[0]}p
                    </td>
                    <td className="tg-kusv" style={{ backgroundColor: colorR }}>
                      {rangoBuro.split("-")[1]}p
                    </td>
                  </tr>
                  <tr>
                    <td
                      className="tg-tw5s"
                      colspan="2"
                      style={{ backgroundColor: colorN }}
                    >
                      &lt;{rangoMinBuro}p
                    </td>
                  </tr>

                  {/*    <tr>
                    <td
                      className="tg-0pky"
                      style={{
                        verticalAlign: "middle",
                        textAlign: "center",
                        paddingTop: "10px",
                        paddingBottom: "10px",
                      }}
                    >
                      Precalificación hipotecaria
                    </td>
                    <td
                      className="tg-xwmr"
                      colspan="2"
                      style={{
                        backgroundColor: colorA,
                        verticalAlign: "middle",
                      }}
                    >
                      <span style={{ backgroundColor: "transparent" }}>
                        &gt;
                      </span>
                      ${precalificationRango}
                    </td>

                    <td
                      className="tg-c3ow"
                      rowspan="1"
                      style={{
                        verticalAlign: "middle",
                        backgroundColor: obtenerColor(
                          calcularPrecalification(precalification)
                        ),
                      }}
                    >
                      ${precalification}
                    </td>
                  </tr> */}

                  <tr>
                    <td
                      className="tg-0pky"
                      rowspan="3"
                      style={{ verticalAlign: "middle", textAlign: "center" }}
                    >
                      Ingresos
                    </td>
                    <td
                      className="tg-loh0"
                      colspan="2"
                      style={{ backgroundColor: colorA }}
                    >
                      <span
                        style={{
                          color: "black",
                          backgroundColor: "transparent",
                        }}
                      >
                        &gt; ${rangoM}
                      </span>
                    </td>

                    <td
                      className="tg-0pky"
                      rowspan="3"
                      style={{
                        verticalAlign: "middle",
                        textAlign: "center",
                        backgroundColor: obtenerColor(
                          calcularIngresos(ingresosFinales)
                        ),
                      }}
                    >
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        ${Number(ingresosFinales).toFixed(2)}{" "}
                        <Tooltip title="Ver resumen de ingresos">
                          <InfoIcon
                            style={{ cursor: "pointer", marginLeft: 10 }}
                            fontSize="small"
                            onClick={() => setOpenDetalle(true)}
                          />
                        </Tooltip>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td className="tg-1i2r" style={{ backgroundColor: colorR }}>
                      ${rango1.split("-")[0]}
                    </td>
                    <td className="tg-1i2r" style={{ backgroundColor: colorR }}>
                      ${rango1.split("-")[1]}
                    </td>
                  </tr>
                  <tr>
                    <td
                      className="tg-bci8"
                      colspan="2"
                      style={{ backgroundColor: colorN }}
                    >
                      &lt;${rangoMin}
                    </td>
                  </tr>
                  {
                    civil == 2 || civil == 3 || civil == 6 ?
                      <React.Fragment>
                        <tr>
                          <td
                            className="tg-0pky"
                            rowspan="3"
                            style={{ verticalAlign: "middle", textAlign: "center" }}
                          >
                            Ingresos (cónyuge)
                          </td>
                          <td
                            className="tg-loh0"
                            colspan="2"
                            style={{ backgroundColor: colorA }}
                          >
                            <span
                              style={{
                                color: "black",
                                backgroundColor: "transparent",
                              }}
                            >
                              &gt;= ${rangoM}
                            </span>
                          </td>

                          <td
                            className="tg-0pky"
                            rowspan="3"
                            style={{
                              verticalAlign: "middle",
                              textAlign: "center",
                              backgroundColor: obtenerColor(
                                calcularIngresos(incomeTS)
                              ),
                            }}
                          >
                            <div
                              style={{ display: "flex", justifyContent: "center" }}
                            >
                              ${Number(incomeTS).toFixed(2)}{" "}

                            </div>
                          </td>
                        </tr>

                        <tr>
                          <td className="tg-1i2r" style={{ backgroundColor: colorR }}>
                            ${rango1.split("-")[0]}
                          </td>
                          <td className="tg-1i2r" style={{ backgroundColor: colorR }}>
                            ${rango1.split("-")[1]}
                          </td>
                        </tr>
                        <tr>
                          <td
                            className="tg-bci8"
                            colspan="2"
                            style={{ backgroundColor: colorN }}
                          >
                            &lt;=${rangoMin}
                          </td>
                        </tr>
                      </React.Fragment>


                      : null
                  }
                  <tr>
                    <td
                      className="tg-0lax"
                      rowspan="3"
                      style={{ verticalAlign: "middle", textAlign: "center" }}
                    >
                      Ahorro neto
                      <br />
                    </td>
                    <td
                      className="tg-gm47"
                      colspan="2"
                      style={{ backgroundColor: colorA }}
                    >
                      <span
                        style={{
                          color: "black",
                          backgroundColor: "transparent",
                        }}
                      >
                        &gt; {rangoAhorroM}%
                      </span>
                    </td>

                    <td
                      className="tg-0lax"
                      rowspan="3"
                      style={{
                        verticalAlign: "middle",
                        textAlign: "center",
                        backgroundColor: obtenerColor(
                          calcularAhorro(cuotaHipotecariaDoc)
                        ),
                      }}
                    >

                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        {cuotaHipotecariaDoc != 0
                          ? isFinite(Math.round(Number(cuotaHipotecariaDoc))) ? Math.round(Number(cuotaHipotecariaDoc)) : 0
                          : 0}
                        % (${ahorroNetoDoc > 0 ? Number(ahorroNetoDoc).toFixed(2) : 0})
                        <Tooltip title="Ver detalle de ahorro neto">
                          <InfoIcon
                            style={{ cursor: "pointer", marginLeft: 10 }}
                            fontSize="small"
                            onClick={() => setOpenDetalleAhorro(true)}
                          />
                        </Tooltip>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="tg-s7ni" style={{ backgroundColor: colorR }}>
                      {rangoAhorro.split("-")[0]}%
                    </td>
                    <td className="tg-s7ni" style={{ backgroundColor: colorR }}>
                      {rangoAhorro.split("-")[1]}%
                    </td>
                  </tr>
                  <tr>
                    <td
                      className="tg-nx4l"
                      colspan="2"
                      style={{ backgroundColor: colorN }}
                    >
                      &lt;{rangoMinAhorro}%
                    </td>
                  </tr>
                  {
                    1 == 2 ?
                      <React.Fragment>
                        <tr>
                          <td
                            className="tg-0lax"
                            rowspan="3"
                            style={{ verticalAlign: "middle", textAlign: "center" }}
                          >
                            Ahorro neto
                            <br />
                          </td>
                          <td
                            className="tg-gm47"
                            colspan="2"
                            style={{ backgroundColor: colorA }}
                          >
                            <span
                              style={{
                                color: "black",
                                backgroundColor: "transparent",
                              }}
                            >
                              &gt;= {rangoAhorroM}%
                            </span>
                          </td>
                          <td
                            className="tg-0lax"
                            rowspan="3"
                            style={{
                              verticalAlign: "middle",
                              textAlign: "center",
                              backgroundColor: obtenerColor(
                                calcularAhorro(cuotaHipotecaria)
                              ),
                            }}
                          >
                            {(incomeTS - egresosTotales) / incomeTS}%
                          </td>
                          <td
                            className="tg-0lax"
                            rowspan="3"
                            style={{
                              verticalAlign: "middle",
                              textAlign: "center",
                              backgroundColor: obtenerColor(
                                calcularAhorro(((incomeTS - egresosTotales) / incomeTS) * 100)
                              ),
                            }}
                          >

                            <div
                              style={{ display: "flex", justifyContent: "center" }}
                            >
                              {(incomeTS - egresosTotales) / incomeTS}

                              {(incomeTS - egresosTotales) / incomeTS != 0
                                ? isFinite(Math.round(Number(((incomeTS - egresosTotales) / incomeTS) * 100))) ? Math.round(Number(((incomeTS - egresosTotales) / incomeTS) * 100)) : 0
                                : 0}
                              % (${incomeTS - egresosTotales > 0 ? Number(incomeTS - egresosTotales).toFixed(2) : 0})
                              <Tooltip title="Ver detalle de ahorro neto">
                                <InfoIcon
                                  style={{ cursor: "pointer", marginLeft: 10 }}
                                  fontSize="small"
                                  onClick={() => setOpenDetalleAhorro(true)}
                                />
                              </Tooltip>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="tg-s7ni" style={{ backgroundColor: colorR }}>
                            {rangoAhorro.split("-")[0]}%
                          </td>
                          <td className="tg-s7ni" style={{ backgroundColor: colorR }}>
                            {rangoAhorro.split("-")[1]}%
                          </td>
                        </tr>
                        <tr>
                          <td
                            className="tg-nx4l"
                            colspan="2"
                            style={{ backgroundColor: colorN }}
                          >
                            &lt;={rangoMinAhorro}%
                          </td>
                        </tr>

                      </React.Fragment>
                      : null
                  }
                </tbody>
              </table>
            </Grid>
            <Grid item xs={12} md={12} style={{ display: 'none' }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p style={{ fontWeight: "bold" }}>Monto máximo</p>
                <p style={{ fontSize: 18 }}>
                  ${" "}
                  {(roleData != null ? Number(roleData).toFixed(2) : 0) != 0
                    ? montoMaximoDoc.toFixed(2)
                    : 0}
                </p>
              </div>
            </Grid>
            {/* <Grid item xs={12} md={12}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p style={{ fontWeight: "bold" }}>Obligaciones</p>
                <p style={{ fontSize: 18 }}>
                  $ {Number(obligation).toFixed(2)}
                </p>
              </div>
            </Grid> */}
          </TabPanel>
        </CardContent>

        {
          value != 2 && (
            <CardActions>
              <Button
                startIcon={<SaveOutlinedIcon />}
                variant="contained"
                color="secondary"
                onClick={() => editar()}
              >
                Guardar
              </Button>
              <Button startIcon={<ClearIcon />} variant="contained" color="default" onClick={() => atras()}>
                Cancelar
              </Button>
            </CardActions>
          )


        }

      </Card>

      <SpeedDial
        ariaLabel="SpeedDial example"
        style={{ position: 'fixed', right: 10, bottom: 10 }}
        hidden={scrollPosition < 200}
        icon={<SpeedDialIcon />}
        onClose={handleCloseSpeed}
        onOpen={handleOpenSpeed}
        open={openSpeed}
        direction={direction}
      >
        <SpeedDialAction
          icon={<SaveOutlinedIcon />}
          onClick={() => editar()}
          tooltipTitle={"Guardar"}

        />
        <SpeedDialAction
          icon={<GetAppIcon />}
          onClick={descargar}
          tooltipTitle={"Exportar"}

        />

        <SpeedDialAction
          icon={<FormatListNumberedOutlinedIcon />}
          onClick={() => handleChange(1, 1)}
          tooltipTitle={"Ver precalificador"}

        />
        <SpeedDialAction
          icon={<PublishOutlinedIcon />}
          onClick={() => setOpenFilesUploaded(true)}
          tooltipTitle={"Ver subidos"}

        />
        <SpeedDialAction
          icon={<ArrowBackIcon />}
          onClick={() => atras()}
          tooltipTitle={"Cancelar"}

        />



      </SpeedDial>





    </Box>
  );
}
